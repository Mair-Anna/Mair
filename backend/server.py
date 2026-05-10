import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import replicate
import os

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "MAIR API fonctionne!"}

class TryOnRequest(BaseModel):
    userImage: str
    garmentImage: str

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    result = cloudinary.uploader.upload(contents)
    return {"url": result["secure_url"]}

@app.post("/api/tryon")
async def tryon(request: TryOnRequest):
    output = replicate.run(
        "subhash25rawat/flux-vton:a02643ce418c0e12bad371c4adbfaec0dd1cb34b034ef37650ef205f92ad6199",
        input={
            "part": "dresses",
            "image": request.userImage,
            "garment": request.garmentImage
        }
    )
    return {"result_url": str(output)}