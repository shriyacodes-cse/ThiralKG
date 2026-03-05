import math
from typing import List, Dict

# Formula to calculate straight-line distance instead of actual Google Maps routing
# if an API key isn't present, to ensure the prototype works locally.
def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0  # Earth radius in kilometers

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance

def find_nearest_ngos(donor_lat: float, donor_lng: float, ngos: List[Dict]) -> List[Dict]:
    """
    Rank NGOs by distance using Haversine algorithm.
    In a real-world scenario, you would call:
    gmaps = googlemaps.Client(key='YOUR_API_KEY')
    gmaps.distance_matrix(...)
    """
    if donor_lat is None or donor_lng is None:
        # Fallback to a default center point (e.g. Chennai)
        donor_lat, donor_lng = 13.0827, 80.2707

    ranked_ngos = []
    for ngo in ngos:
        dist_km = haversine_distance(donor_lat, donor_lng, ngo["lat"], ngo["lng"])
        ranked_ngos.append({
            "ngo_name": ngo["name"],
            "distance": round(dist_km, 2), # in km
            "capacity": ngo["capacity"],
            "pickup_eta": f"{max(15, int(dist_km * 3))} mins", # Rough estimate based on distance
            "lat": ngo["lat"],
            "lng": ngo["lng"]
        })
    
    ranked_ngos.sort(key=lambda x: x["distance"])
    return ranked_ngos
