from fastapi import FastAPI, Path, UploadFile, File, Form
from fastapi.responses import FileResponse
import shutil
import os
from model import ai_smart_crop

app = FastAPI()

UPLOAD_DIR = "public/uploads/"
PROCESSED_DIR = "public/processed/"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), resolution: str = Form(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    width, height = map(int, resolution.split("x"))
    output_path = os.path.join(PROCESSED_DIR, f"processed_{file.filename}")

    ai_smart_crop(file_path, output_path, width, height)

    return {"processed_video": f"processed_{file.filename}"}

@app.get("/processed/{video_name}")
async def get_processed_video(video_name: str):
    file_path = os.path.join(PROCESSED_DIR, video_name)
    return FileResponse(file_path)

def get_latest_video(folder):
    """Fetch the most recently modified video file"""
    files = list(Path(folder).glob("processed_*.mp4"))
    if files:
        latest_file = max(files, key=os.path.getmtime)
        return latest_file.name
    return None
