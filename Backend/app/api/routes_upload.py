from pathlib import Path
from fastapi import APIRouter, UploadFile, File
import sys
import os
import http.client
import urllib.parse
import json
sys.path.append(r'D:\Hacktons\HackMan\AI')
import prediction

router = APIRouter(prefix="/transcript", tags=["Transcript"])

# Correct upload directory
UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/upload")
async def upload_images(files: list[UploadFile] = File(...)):
    """
    Accept multiple images and process each one.
    """
    urls = []

    for file in files:
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        abs_path = str(file_path.resolve())
        print(f"✅ File saved at: {abs_path}")

        try:
            prediction.getdataresponce(abs_path)
        except Exception as e:
            print(f"⚠️ Prediction failed for {file.filename}: {e}")

        urls.append({
            "filename": file.filename,
            "url": f"/uploads/{file.filename}"
        })

    return {"uploaded": urls}

@router.post("/getnurseries")
def getnurseries():
    conn = http.client.HTTPSConnection("api.openwebninja.com")
    headers = { 'x-api-key': "ak_5ghyta27khzm91rfxpkwagm7jr36502soapz9wbevka5wrm" }

    # Example: search for plant nurseries near Delhi
    params = urllib.parse.urlencode({
        "query": "plant nursery",
        "lat": 16.3994,
        "lng": 74.3827,
        "radius": 15000  # 15 km
    })


    # Make request
    conn.request("GET", f"/local-business-data/search?{params}", headers=headers)

    # Get response
    res = conn.getresponse()
    data = res.read()

    # Parse and pretty print JSON
    result = json.loads(data.decode("utf-8"))

    # Extract the needed fields only
    filtered_results = []
    for business in result.get("data", []):
        filtered = {
            "name": business.get("name"),
            "rating": business.get("rating"),
            "opening_status": business.get("opening_status"),
            "place_link": business.get("place_link"),
            "owner_name": business.get("owner_name"),
            "type": business.get("type"),
            "address": business.get("address"),
        }
        filtered_results.append(filtered)

    # Print in pretty JSON format
    print(json.dumps(filtered_results, indent=2,ensure_ascii=False))

    # # Optional — save to a JSON file
    # with open("nurseries_filtered.json", "w", encoding="utf-8") as f:
    #     json.dump(filtered_results, f, indent=2, ensure_ascii=False)


