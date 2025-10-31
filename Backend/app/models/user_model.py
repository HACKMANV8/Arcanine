from pydantic import BaseModel, Field

class SignupUser(BaseModel):
    name: str = Field(..., example="Neeraj Paramkar")
    mobile: str = Field(..., pattern=r'^\d{10}$', examples=["9876543210"])
    location: str = Field(..., example="Pune, India")
    password: str = Field(..., min_length=6)

class LoginUser(BaseModel):
    mobile: str = Field(..., pattern=r'^\d{10}$', examples=["9876543210"])
    password: str
