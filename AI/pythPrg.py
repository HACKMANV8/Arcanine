from typing import List, Dict
from math import ceil
from datetime import datetime, timezone, timedelta
import pytz  # pip install pytz if needed

# --- helper funcs (same logic as earlier, compacted) ---
def _estimate_dryness(temp_avg: float, humidity: float, wind: float) -> float:
    t = max(0.0, min(1.0, temp_avg / 40.0))
    h = max(0.0, min(1.0, humidity / 100.0))
    w = max(0.0, min(1.0, wind / 10.0))
    dryness = 0.6 * t + 0.3 * (1 - h) + 0.1 * w
    return max(0.0, min(1.5, dryness))

def _water_needed_ml(plant: Dict, dryness: float) -> int:
    base = plant.get("base_water_ml")
    if base is None:
        if "pot_volume_l" in plant:
            base = plant["pot_volume_l"] * 200.0
        elif "pot_diameter_cm" in plant:
            d = plant["pot_diameter_cm"]
            base = ((d / 10.0) ** 2) * 200.0
        else:
            base = 250.0
    scaled = base * (1.0 + 0.5 * dryness)
    return int(ceil(scaled))

def _classify_task_description(action: str) -> str:
    a = action.lower()
    if "water" in a or "watering" in a:
        return "watering"
    if "fertil" in a:
        return "fertilizer"
    if "pest" in a or "inspect" in a or "check" in a:
        return "monitoring"
    if "protect" in a or "bring" in a or "cover" in a or "shade" in a:
        return "protection"
    if "skip" in a or "no watering" in a:
        return "note"
    return "maintenance"

# --- main generator that returns the format you requested ---
def generate_daycare_plan_json(weather: List[Dict], plant: Dict) -> List[Dict]:
    """
    Returns list of 7 dicts:
    {
      "day": int,
      "date": "YYYY-MM-DD",
      "status": "planned" | "completed",
      "tasks": [ {id, title, completed (bool), description}, ... ],
      "notes": "..."
    }
    """
    plan_out = []
    # Timezone: Asia/Kolkata (system requirement)
    tz = pytz.timezone("Asia/Kolkata")
    today = datetime.now(tz).date()

    soil_moisture = plant.get("soil_moisture_pct", None)
    soil_threshold = plant.get("soil_moisture_threshold_pct", 30)
    fertilize_interval = plant.get("fertilize_interval_days", None)
    last_fert_days_ago = plant.get("last_fertilized_days_ago", None)
    frost_tender = plant.get("frost_tender", False)
    min_temp_safe = plant.get("min_temp_c", -999)
    max_temp_safe = plant.get("max_temp_c", 999)
    check_every = plant.get("pest_check_every_days", 3)

    for i, day in enumerate(weather):
        day_index = i + 1
        d_date = day.get("date")
        # parse date safely (assume YYYY-MM-DD)
        try:
            dt = datetime.strptime(d_date, "%Y-%m-%d").date()
        except Exception:
            # fallback: treat as future planned
            dt = today + timedelta(days=i)
        status = "completed" if dt < today else "planned"

        tmax = day.get("temp_max", (day.get("temp_avg") or 20))
        tmin = day.get("temp_min", (day.get("temp_avg") or 10))
        tavg = (tmax + tmin) / 2.0
        precip = day.get("precip_mm", 0.0)
        humidity = day.get("humidity", 60.0)
        wind = day.get("wind_speed", 1.0)
        cloud = day.get("cloud_cover", 0.5)
        uv = day.get("uv_index", None)

        dryness = _estimate_dryness(tavg, humidity, wind)
        base_water_ml = _water_needed_ml(plant, dryness)

        actions = []
        notes_list = []

        # Watering decision
        will_rain = precip >= 5.0
        if soil_moisture is not None:
            if soil_moisture < soil_threshold and not will_rain:
                actions.append(f"Water: {base_water_ml} ml (soil {soil_moisture}% < {soil_threshold}%)")
                soil_moisture = min(100, soil_moisture + 15)
            elif will_rain:
                actions.append("Skip manual watering — significant rain expected.")
                notes_list.append(f"Forecast precipitation {precip} mm.")
                soil_moisture = min(100, soil_moisture + min(40, precip * 2))
            else:
                if dryness > 0.9:
                    actions.append(f"Light water: {int(ceil(base_water_ml * 0.5))} ml (very dry forecast)")
                    soil_moisture = min(100, soil_moisture + 8)
                else:
                    actions.append("No watering scheduled; monitor soil moisture.")
        else:
            if will_rain:
                actions.append("Skip manual watering — significant rain expected.")
                notes_list.append(f"Forecast precipitation {precip} mm.")
            else:
                if dryness > 0.4:
                    actions.append(f"Water: {base_water_ml} ml (dryness {dryness:.2f})")
                else:
                    actions.append("No watering scheduled; check soil if unsure.")

        # Sun / shade / move advice
        if (tmin < min_temp_safe) or (frost_tender and tmin <= 2.0):
            actions.append("Protect from cold: bring indoors/cover at night.")
            notes_list.append(f"Low temp expected: {tmin}°C.")
        if tmax > max_temp_safe or tmax >= 35.0:
            actions.append("Heat stress: provide afternoon shade and extra monitoring.")
            notes_list.append(f"High temp expected: {tmax}°C.")
        if (uv is not None and uv >= 8) or (cloud <= 0.2 and tmax >= 30):
            actions.append("High sun/UV: provide light shade during midday.")

        # Light availability check
        sun_need = plant.get("sun_exposure_hours", None)
        if sun_need is not None:
            avail = max(0.0, min(12.0, (1.0 - cloud) * 12.0))
            if avail < sun_need - 2.0:
                actions.append(f"Low-light alert: move to brighter spot (available≈{avail:.1f}h).")
            elif avail > sun_need + 3.0:
                actions.append("Plenty of sun: watch for leaf scorch; provide shade if needed.")

        # Fertilizer
        if fertilize_interval and last_fert_days_ago is not None:
            if last_fert_days_ago >= fertilize_interval:
                actions.append("Fertilize today (follow product instructions).")
                notes_list.append(f"Last fertilized {last_fert_days_ago} days ago.")
                last_fert_days_ago = 0
            else:
                last_fert_days_ago += 1
                notes_list.append(f"{fertilize_interval - last_fert_days_ago} days until next fertilization.")
        elif fertilize_interval and last_fert_days_ago is None:
            notes_list.append("Fertilizer schedule configured but last_fertilized_days_ago not provided.")

        # Pest check
        if (i % check_every) == 0:
            actions.append("Pest & health check: inspect leaves, stems, soil for pests/disease.")

        # Repot
        if plant.get("repot_needed", False):
            actions.append("Repotting reminder: repotting needed soon. Avoid repot on extreme weather day.")

        # Build tasks from actions
        tasks = []
        for j, a in enumerate(actions, start=1):
            task_id = f"{day_index}-{j}"
            task_desc = _classify_task_description(a)
            # mark "completed" True only if status is completed and action was a 'skip' or monitoring? 
            # Simpler: if status == completed then mark True (user's example did that).
            completed_flag = True if status == "completed" else False
            tasks.append({
                "id": task_id,
                "title": a,
                "completed": completed_flag,
                "description": task_desc
            })

        notes = " ".join(notes_list) if notes_list else ""
        plan_out.append({
            "day": day_index,
            "date": d_date,
            "status": status,
            "tasks": tasks,
            "notes": notes
        })

    return plan_out

# -------------------------
# Example usage
# -------------------------
if __name__ == "__main__":
    # Example (replace with your JSON)
    weather_example = [
        {"date":"2025-11-01","temp_max":30,"temp_min":22,"precip_mm":0,"humidity":55,"wind_speed":1.5,"cloud_cover":0.1,"uv_index":8},
        {"date":"2025-11-02","temp_max":31,"temp_min":23,"precip_mm":0,"humidity":50,"wind_speed":1.2,"cloud_cover":0.05,"uv_index":9},
        {"date":"2025-11-03","temp_max":28,"temp_min":21,"precip_mm":6,"humidity":70,"wind_speed":2.0,"cloud_cover":0.6,"uv_index":4},
        {"date":"2025-11-04","temp_max":26,"temp_min":19,"precip_mm":2,"humidity":65,"wind_speed":1.0,"cloud_cover":0.5,"uv_index":5},
        {"date":"2025-11-05","temp_max":33,"temp_min":24,"precip_mm":0,"humidity":45,"wind_speed":2.5,"cloud_cover":0.1,"uv_index":10},
        {"date":"2025-11-06","temp_max":25,"temp_min":18,"precip_mm":0,"humidity":60,"wind_speed":1.0,"cloud_cover":0.7,"uv_index":3},
        {"date":"2025-11-07","temp_max":22,"temp_min":14,"precip_mm":8,"humidity":80,"wind_speed":1.2,"cloud_cover":0.9,"uv_index":2},
    ]

    plant_example = {
        "name": "Ficus elastica (Rubber Plant)",
        "pot_volume_l": 5.0,
        "soil_moisture_pct": 25,
        "soil_moisture_threshold_pct": 30,
        "sun_exposure_hours": 6,
        "fertilize_interval_days": 30,
        "last_fertilized_days_ago": 31,
        "frost_tender": True,
        "min_temp_c": 10,
        "max_temp_c": 40,
        "repot_needed": False,
        "pest_check_every_days": 3
    }

    plan = generate_daycare_plan_json(weather_example, plant_example)
    import json, pprint
    pprint.pprint(plan)
    # If you need JSON string:
    # print(json.dumps(plan, indent=2))
