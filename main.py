import requests
import json
API_KEY = "QiYe8COtkjeYV3h2sS6oA7jr13lRTDqv"  # replace with your Tomorrow.io API key
LOCATION = "delhi"

url = f"https://api.tomorrow.io/v4/weather/forecast?location={LOCATION}&apikey={API_KEY}"

headers = {
    "accept": "application/json",
    "accept-encoding": "deflate, gzip, br"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    daily_data = data.get("timelines", {}).get("daily", [])

    result = []

    for day in daily_data[:7]:  # next 7 days only
        date = day["time"].split("T")[0]
        v = day["values"]

        day_summary = {
            "date": date,
            "temperature": {
                "min": v.get("temperatureMin"),
                "max": v.get("temperatureMax"),
                "avg": v.get("temperatureAvg")
            },
            "humidity": v.get("humidityAvg"),
            "rain_chance": v.get("precipitationProbabilityAvg"),
            "rain_intensity": v.get("precipitationIntensityAvg"),
            "wind_speed": v.get("windSpeedAvg"),
            "cloud_cover": v.get("cloudCoverAvg"),
            "uv_index": v.get("uvIndexAvg"),
            "dew_point": v.get("dewPointAvg"),
            "soil_moisture": v.get("soilMoistureAvg", "N/A"),
            "weather_code": v.get("weatherCodeMax")
        }

        result.append(day_summary)
    print(result)
    # --- Save to JSON file ---


# import http.client
# import urllib.parse
# import json

# # ✅ Replace with your actual OpenWebNinja API key
# API_KEY = "sk-ak_2owr3nlwk5na9ep3vomvavhzo48h00mompbyd1u2mbpqgwn"

# # Setup
# conn = http.client.HTTPSConnection("api.openwebninja.com")
# headers = {'x-api-key': API_KEY}

# # Example: search for plant nurseries near Delhi
# params = urllib.parse.urlencode({
#     "query": "plant nursery",
#     "lat": 28.7041,
#     "lng": 77.1025,
#     "radius": 15000  # 15 km
# })

# # Make request
# conn.request("GET", f"/local-business-data/search?{params}", headers=headers)

# # Get response
# res = conn.getresponse()
# data = res.read()

# # Parse and pretty print JSON
# result = json.loads(data.decode("utf-8"))

# # Debug print full API response
# print("🔍 Full API Response:")
# print(json.dumps(result, indent=2))

# # Handle possible API error
# if result.get("status") == "ERROR":
#     print("❌ API Error:", result.get("error", {}))
# else:
#     # Extract only needed fields
#     filtered_results = []
#     for business in result.get("data", []):
#         filtered = {
#             "name": business.get("name"),
#             "rating": business.get("rating"),
#             "opening_status": business.get("opening_status"),
#             "place_link": business.get("place_link"),
#             "owner_name": business.get("owner_name"),
#             "type": business.get("type"),
#             "address": business.get("address"),
#         }
#         filtered_results.append(filtered)

#     # Print only useful info if available
#     print("\n✅ Filtered Results:")
#     print(json.dumps(filtered_results, indent=2, ensure_ascii=False))

# import http.client
# import urllib.parse
# import json

# # Setup
# conn = http.client.HTTPSConnection("api.openwebninja.com")
# headers = { 'x-api-key': "ak_2owr3nlwk5na9ep3vomvavhzo48h00mompbyd1u2mbpqgwn" }

# # Example: search for plant nurseries near Delhi
# params = urllib.parse.urlencode({
#     "query": "plant nursery",
#     "lat": 28.7041,
#     "lng": 77.1025,
#     "radius": 15000  # 15 km
# })


# # Make request
# conn.request("GET", f"/local-business-data/search?{params}", headers=headers)

# # Get response
# res = conn.getresponse()
# data = res.read()

# # Parse and pretty print JSON
# result = json.loads(data.decode("utf-8"))

# # Extract the needed fields only
# filtered_results = []
# for business in result.get("data", []):
#     filtered = {
#         "name": business.get("name"),
#         "rating": business.get("rating"),
#         "opening_status": business.get("opening_status"),
#         "place_link": business.get("place_link"),
#         "owner_name": business.get("owner_name"),
#         "type": business.get("type"),
#         "address": business.get("address"),
#     }
#     filtered_results.append(filtered)

# # Print in pretty JSON format
# print(json.dumps(filtered_results, indent=2,ensure_ascii=False))

# # Optional — save to a JSON file
# with open("nurseries_filtered.json", "w", encoding="utf-8") as f:
#     json.dump(filtered_results, f, indent=2, ensure_ascii=False)



# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# import os
# from pathlib import Path

# app = FastAPI()

# # Allow CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # or specify your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# @app.get('/')
# def data():
#     return "i am data"
# # Directory to save uploaded images
# UPLOAD_DIR = Path("uploads")
# UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# # Serve static files (to access images later)
# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# @app.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     file_path = UPLOAD_DIR / file.filename
#     with open(file_path, "wb") as buffer:
#         buffer.write(await file.read())
#         print(rf"D:\Hacktons\HackMan\uploads\{file.filename}")
#     # Return public URL or path
#     return {"filename": file.filename, "url": f"/uploads/{file.filename}"}