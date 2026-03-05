import uuid
from typing import Dict, List
from datetime import datetime, timedelta

# Mock Firestore integration for hackathon prototyping to ensure seamless local runs.
# In a real environment, you would initialize firebase_admin and use the true firestore client.

class MockFirestore:
    def __init__(self):
        # Sample NGOs based in a similar region (e.g., Chennai area lat/lng)
        self.ngos = [
            {"id": "ngo1", "name": "Feeding Hands NGO", "capacity": 100, "lat": 13.0827, "lng": 80.2707},
            {"id": "ngo2", "name": "Community Share", "capacity": 50, "lat": 13.0604, "lng": 80.2495},
            {"id": "ngo3", "name": "Zero Waste Kitchen", "capacity": 200, "lat": 13.0123, "lng": 80.2114},
        ]
        
        # Sample reports
        self.food_reports = [
            {
                "id": "report1",
                "food_type": "Veg Biryani",
                "quantity": 120,
                "location": "Chennai",
                "time_cooked": (datetime.now() - timedelta(hours=2)).strftime("%I %p").lstrip("0"),
                "event_type": "Wedding",
                "route": "NGO_PICKUP",
                "timestamp": datetime.now().isoformat()
            },
            {
                "id": "report2",
                "food_type": "Leftover Sandwiches",
                "quantity": 8,
                "location": "Chennai",
                "time_cooked": (datetime.now() - timedelta(hours=1)).strftime("%I %p").lstrip("0"),
                "event_type": "Corporate Event",
                "route": "LOCAL_SHARE",
                "timestamp": datetime.now().isoformat()
            }
        ]

    def add_report(self, report_data: dict):
        report_data["id"] = str(uuid.uuid4())
        report_data["timestamp"] = datetime.now().isoformat()
        self.food_reports.append(report_data)
        return report_data["id"]

    def get_reports(self) -> List[Dict]:
        return self.food_reports

    def get_ngos(self) -> List[Dict]:
        return self.ngos

    def get_impact_metrics(self) -> dict:
        # Calculate derived metrics based on accumulated reports
        total_rescued = sum(r.get("quantity", 0) for r in self.food_reports if r.get("route") != "BIOGAS_PLANT")
        waste_prevented = total_rescued * 0.4  # Assume avg 0.4kg per meal
        co2_saved = total_rescued * 0.3
        energy_gen = sum((r.get("quantity", 0) * 0.4 * 0.5) for r in self.food_reports if r.get("route") == "BIOGAS_PLANT")
        
        return {
            "meals_rescued": total_rescued,
            "food_waste_prevented": waste_prevented,
            "co2_emissions_saved": co2_saved,
            "energy_generated": energy_gen
        }

db = MockFirestore()
