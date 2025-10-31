from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from models import SignupUser, LoginUser
from db import users_collection  # your Mongo connection
from utils import create_access_token  # your JWT helper

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup")
def signup(user: SignupUser):
    # Check if user already exists
    if users_collection.find_one({"mobile": user.mobile}):
        raise HTTPException(status_code=400, detail="User already exists")

    # Check password match
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Hash password
    hashed_password = pwd_context.hash(user.password)

    # Save to DB
    users_collection.insert_one({
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
def login(user: LoginUser):
    db_user = users_collection.find_one({"mobile": user.mobile})
    if not db_user or not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid mobile number or password")

    token = create_access_token({"sub": db_user["mobile"]})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/")
def getdata():
    return {"message": "Auth service ready 🚀"}
