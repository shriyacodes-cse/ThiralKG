from fastapi import APIRouter
from app.models.schemas import FoodReport
from app.database.firestore import db
from app.services.ai_routing import determine_route
from app.services.ngo_matching import find_nearest_ngos

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/report-food")
def report_food(report: FoodReport):
    # Determine the route based on AI logic
    route_details = determine_route(report.quantity, report.time_cooked)
    
    # Matching NGOs using Distance logic
    # Assumes donor lat/lng is provided; fallback built-in inside matching logic
    ngos = db.get_ngos()
    matching_result = find_nearest_ngos(report.lat, report.lng, ngos)
    
    # Attach AI route data to report
    report_dict = report.dict()
    report_dict.update(route_details)
    
    # Add to Database
    report_id = db.add_report(report_dict)
    
    highest_ngo = matching_result[0] if matching_result else None
    
    return {
        "id": report_id,
        "food_type": report.food_type,
        "quantity": report.quantity,
        "route": route_details["route"],
        "priority": route_details["priority"],
        "recommended_receiver": route_details["recommended_receiver"],
        "matched_ngo": highest_ngo
    }

@router.get("/ngos")
def get_ngos(lat: float = None, lng: float = None):
    # Returns all ngos or ranked based on location
    all_ngos = db.get_ngos()
    if lat and lng:
        return find_nearest_ngos(lat, lng, all_ngos)
    return all_ngos

@router.get("/impact")
def get_impact():
    return db.get_impact_metrics()

@router.get("/heatmap")
def get_heatmap():
    # Provide aggregation data for map heat visualization
    reports = db.get_reports()
    heatmap_data = []
    
    for r in reports:
        # Some default location if lat/lng is string "Chennai" without coords
        lat = r.get("lat") or 13.0827
        lng = r.get("lng") or 80.2707
        
        # Jitter slightly for visual spread of mock data if they have same coords
        import random
        # Real logic would bucket based on actual user coordinates
        lat += random.uniform(-0.01, 0.01)
        lng += random.uniform(-0.01, 0.01)

        heatmap_data.append({
            "lat": lat,
            "lng": lng,
            "intensity": r.get("quantity", 0) / 100.0,
            "type": r.get("route", "DONATION"),
            "quantity": r.get("quantity", 0),
            "food_type": r.get("food_type", "")
        })
        
    return heatmap_data
