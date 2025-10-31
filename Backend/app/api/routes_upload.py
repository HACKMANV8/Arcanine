from pathlib import Path
from fastapi import APIRouter, UploadFile, File,HTTPException, Depends,status

import sys
import os
import http.client
import urllib.parse
import json
# from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from app.models.user_model import SignupUser, LoginUser
# from db.database import users_collection  # your Mongo connection
from app.db.database import users_collection
from app.utils.jwt_helper import create_access_token
# from app.middleware.auth_middleware import get_current_user
# router = APIRouter()
from app.middleware.auth_utils import get_current_user
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from app.utils.config import JWT_SECRET_KEY, JWT_ALGORITHM

sys.path.append(r'D:\Hacktons\HackMan\AI')
import prediction
import testing

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
            testing.getdataresponce(abs_path)
        except Exception as e:
            print(f"⚠️ Prediction failed for {file.filename}: {e}")

        urls.append({
            "filename": file.filename,
            "url": f"/uploads/{file.filename}"
        })
    outputresponce= testing.finalize_results()
    # print(json.dumps(outputresponce, indent=2))
    print("djjjjjjjjjjjjjjjjjjjjjjjj",outputresponce)
    mobile="8431036155"
    user = await users_collection.find_one({"mobile": mobile})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Add plant data to user's 'plantResponses' array
    await users_collection.update_one(
        {"mobile": mobile},
        {"$push": {"plantResponses": outputresponce}}
    )

    return {"message": "Plant response added successfully!"}

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


@router.post("/signup")
async def signup(user: SignupUser):
    # Check if user already exists
    existing_user = await users_collection.find_one({"mobile": user.mobile})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash password
    hashed_password = pwd_context.hash(user.password)

    # Save to DB
    await users_collection.insert_one({
        "name": user.name,
        "mobile": user.mobile,
        "location": user.location,
        "password": hashed_password
    })

    # Generate token
    token = create_access_token({"sub": user.mobile})
    return {
        "message": "User created successfully",
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/login")
async def login(user: LoginUser):
    db_user = await users_collection.find_one({"mobile": user.mobile})
    if not db_user or not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid mobile number or password")

    token = create_access_token({"sub": db_user["mobile"]})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/")
def getdata():
    return {"message": "Auth service ready 🚀"}

# @router.get("/dashboard")
# async def get_dashboard(current_user: dict = Depends(get_current_user)):
#     return {
#         "message": "Welcome to your dashboard!",
#         "user": current_user
#     }