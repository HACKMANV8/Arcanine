
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from app.api import routes_upload
# import prediction
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def data():
    return "i am data"
app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")

app.include_router(routes_upload.router)
