import google.generativeai as genai
from PIL import Image
import json
import ast
from typing import List, Dict, Any, Optional

# 🔑 Configure Gemini API key
genai.configure(api_key="")


def generate_7day_plan_via_gemini(
    weather_list: List[Dict[str, Any]],
    model_result: Dict[str, Any],
    image_path: Optional[str] = None,
    model_name: str = "gemini-2.5-flash",
    require_strict_schema: bool = True,
) -> List[Dict[str, Any]]:
    """
    Generates a 7-day plant care plan in strict JSON shape via Gemini.
    """
    model = genai.GenerativeModel(model_name)

    if len(weather_list) < 7:
        raise ValueError("weather_list must contain at least 7 days.")

    # ✅ Build weather summary for prompt
    weather7 = weather_list[:7]
    weather_lines = []
    for w in weather7:
        date = w.get("date", "")
        temp = w.get("temperature") or {}
        tmin = temp.get("min")
        tmax = temp.get("max")
        humidity = w.get("humidity", "")
        rain_chance = w.get("rain_chance", "")
        weather_lines.append(
            f"{date}: min={tmin}, max={tmax}, humidity={humidity}, rain_chance={rain_chance}"
        )
    weather_block = "\n".join(weather_lines)

    conf_val = model_result.get("confidence", 70)
    conf_pct = int(conf_val * 100) if isinstance(conf_val, float) and conf_val <= 1 else int(conf_val)
    treatment = model_result.get("treatment") or {}

    prompt = f"""
You are an expert plant-care assistant.
Inputs:
- Plant: "{model_result.get('plantName')}"
- Disease: "{model_result.get('disease')}"
- Model Confidence: {conf_pct}
- Severity: "{model_result.get('severity', 'Medium')}"
- Treatment: {json.dumps(treatment, indent=2)}

7-day weather:
{weather_block}

Task:
Return ONLY valid JSON (no text) — an array of 7 day objects in this exact format:
[
  {{
    "day": 1,
    "date": "YYYY-MM-DD",
    "status": "planned" | "completed" | "skipped",
    "tasks": [
      {{
        "id": "1-1",
        "title": "Check for new spots",
        "completed": true,
        "description": "Inspect the plant..."
      }}
    ],
    "notes": "Short daily summary"
  }}
]
Each task id must follow "<day>-<index>" format. Use weather & treatment to create realistic actions.
""".strip()

    # ✅ Prepare contents for Gemini
    contents = [prompt]
    if image_path:
        try:
            pil = Image.open(image_path).convert("RGB")
            contents.append(pil)
        except Exception as e:
            raise ValueError(f"Error opening image: {e}")

    # ✅ Call Gemini model
    print("🤖 Sending prompt to Gemini model...")
    response = model.generate_content(contents)

    # ✅ Extract response text
    raw_text = getattr(response, "text", None)
    if not raw_text:
        try:
            raw_text = response.candidates[0].content.parts[0].text
        except Exception:
            raise ValueError("Gemini returned no text response.")

    raw_text = raw_text.strip()

    # Remove code fences if present
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").lstrip()
        if raw_text.lower().startswith("json"):
            raw_text = raw_text[4:].lstrip()

    # ✅ Try parsing response as JSON
    try:
        parsed = json.loads(raw_text)
    except Exception:
        parsed = ast.literal_eval(raw_text)

    # ✅ Validate strict schema
    if require_strict_schema:
        if not isinstance(parsed, list) or len(parsed) != 7:
            raise ValueError(f"Expected 7-day array, got: {type(parsed)}")

        for i, day in enumerate(parsed, start=1):
            if set(day.keys()) != {"day", "date", "status", "tasks", "notes"}:
                raise ValueError(f"Invalid keys on day {i}")
            if day["day"] != i:
                raise ValueError(f"Day index mismatch on day {i}")
            if not isinstance(day["tasks"], list):
                raise ValueError(f"Tasks not list on day {i}")
            for t in day["tasks"]:
                if set(t.keys()) != {"id", "title", "completed", "description"}:
                    raise ValueError(f"Invalid task keys on day {i}")

    print("✅ Gemini returned valid structured data.")
    print(parsed)
    return parsed


# # -------------------- TEST RUN --------------------
# if __name__ == "__main__":
#     weather = [
#         {'date': '2025-10-31', 'temperature': {'min': 20.6, 'max': 29.6}, 'humidity': 87, 'rain_chance': 0},
#         {'date': '2025-11-01', 'temperature': {'min': 19.8, 'max': 31.4}, 'humidity': 46, 'rain_chance': 0},
#         {'date': '2025-11-02', 'temperature': {'min': 18.8, 'max': 30.7}, 'humidity': 45, 'rain_chance': 0},
#         {'date': '2025-11-03', 'temperature': {'min': 18.4, 'max': 31.1}, 'humidity': 43, 'rain_chance': 0},
#         {'date': '2025-11-04', 'temperature': {'min': 18.2, 'max': 30}, 'humidity': 50, 'rain_chance': 0},
#         {'date': '2025-11-05', 'temperature': {'min': 17.4, 'max': 30.1}, 'humidity': 51, 'rain_chance': 0},
#         {'date': '2025-11-06', 'temperature': {'min': 17.0, 'max': 29.0}, 'humidity': 50, 'rain_chance': 0},
#     ]

#     model_result = {
#         'plantName': 'Grape',
#         'disease': 'Black_rot',
#         'confidence': 87,
#         'severity': 'Medium',
#         'treatment': {
#             'immediate': [
#                 'Inspect all leaves thoroughly for signs of disease spread',
#                 'Remove affected leaves and dispose away from garden',
#                 'Apply appropriate organic or chemical fungicide treatment'
#             ],
#             'longTerm': [
#                 'Maintain optimal soil moisture balance without overwatering',
#                 'Monitor new growth regularly for early symptom detection',
#                 'Apply balanced fertilizer to strengthen plant immunity'
#             ],
#             'prevention': [
#                 'Avoid water stagnation by ensuring good drainage',
#                 'Prune affected areas early before disease spreads',
#                 'Maintain proper plant spacing for air circulation'
#             ]
#         },
#         'description': 'Black rot is a common plant disease affecting Grape.'
#     }

#     print("🌱 Generating 7-day care plan with Gemini...\n")
#     plan = generate_7day_plan_via_gemini(weather, model_result)
#     print(json.dumps(plan, indent=2))
