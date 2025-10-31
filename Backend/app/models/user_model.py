from pydantic import BaseModel, Field

class SignupUser(BaseModel):
    name: str = Field(..., example="Neeraj Paramkar")
    mobile: str = Field(..., regex=r'^\d{10}$', example="9876543210")
    location: str = Field(..., example="Pune, India")
    password: str = Field(..., min_length=6)
    confirm_password: str = Field(..., min_length=6)

class LoginUser(BaseModel):
    mobile: str = Field(..., regex=r'^\d{10}$', example="9876543210")
    password: str
