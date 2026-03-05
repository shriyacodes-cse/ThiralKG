from datetime import datetime
import re

def calculate_food_age_hours(time_cooked_str: str) -> float:
    """
    Parse 'time_cooked' like '7 PM' or '19:00' and calculate age in hours compared to now.
    For simplicity in prototype, handle basic formats or assume within today.
    """
    try:
        now = datetime.now()
        # Parse basic am/pm format or just string
        # Very rough estimation for prototype purposes
        parsed_time = None
        if "AM" in time_cooked_str.upper() or "PM" in time_cooked_str.upper():
            parsed_time = datetime.strptime(time_cooked_str.strip().upper(), "%I %p")
        elif ":" in time_cooked_str:
            parsed_time = datetime.strptime(time_cooked_str.strip(), "%H:%M")
        
        if parsed_time:
            cooked_datetime = datetime(now.year, now.month, now.day, parsed_time.hour, parsed_time.minute)
            # If time cooked is in the future based on today's date, it must be yesterday
            if cooked_datetime > now:
                cooked_datetime = cooked_datetime.replace(day=now.day - 1)
                
            delta = now - cooked_datetime
            return delta.total_seconds() / 3600.0
    except Exception:
        pass
    
    # Return 0 hours if unable to parse (safe fallback)
    return 0.0

def determine_route(quantity: int, time_cooked: str) -> dict:
    """
    AI Decision Engine based on business rules for routing surplus food.
    """
    food_age = calculate_food_age_hours(time_cooked)
    safe_window = 4.0

    if food_age > safe_window:
        return {
            "route": "BIOGAS_PLANT",
            "priority": "LOW",
            "recommended_receiver": "Waste-to-Energy Facility"
        }
        
    if quantity < 10:
        return {
            "route": "LOCAL_SHARE",
            "priority": "LOW",
            "recommended_receiver": "Local Community Members"
        }
    elif 10 <= quantity <= 50:
        return {
            "route": "COMMUNITY_KITCHEN",
            "priority": "MEDIUM",
            "recommended_receiver": "Nearby Community Kitchen"
        }
    else:
        return {
            "route": "NGO_PICKUP",
            "priority": "HIGH",
            "recommended_receiver": "Relevant NGO"
        }
