from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Location(BaseModel):
    lat: float
    lng: float

class FoodReport(BaseModel):
    food_type: str
    quantity: int
    time_cooked: str
    location: str
    event_type: str
    lat: Optional[float] = None
    lng: Optional[float] = None

class NGODocument(BaseModel):
    id: str
    name: str
    capacity: int
    lat: float
    lng: float

class ImpactMetrics(BaseModel):
    meals_rescued: int
    food_waste_prevented: float
    co2_emissions_saved: float
    energy_generated: float
