import os
from dotenv import load_dotenv

load_dotenv()

# ✅ Use consistent variable names
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")
JWT_ALGORITHM = "HS256"

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/")
DATABASE_NAME = "agromind"
