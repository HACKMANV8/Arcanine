from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
# from app.utils.config import JWT_SECRET, JWT_ALGORITHM
from app.utils.config import JWT_SECRET_KEY, JWT_ALGORITHM

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload  # contains user info (like name, mobile, etc.)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
