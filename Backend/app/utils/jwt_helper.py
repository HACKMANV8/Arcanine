from datetime import datetime, timedelta
from jose import jwt
from app.utils.config import JWT_SECRET_KEY, JWT_ALGORITHM

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=5)):
    """
    Create a JWT access token with expiration.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt
