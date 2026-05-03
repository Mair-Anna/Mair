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
        "cuuupid/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f",
        input={
            "human_img": request.userImage,
            "garm_img": request.garmentImage,
            "garment_des": "a garment"
        }
    )
    return {"result_url": str(output)}