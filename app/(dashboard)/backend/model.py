import os
import cv2
import torch
from ultralytics import YOLO
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# Define paths
UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "public/processed_videos"
LATEST_PROCESSED_VIDEO = None  # Store the latest processed video name

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Load the YOLO model
yolo_model = YOLO("yolov8n.pt")

def ai_smart_crop(input_path, output_path, target_width, target_height):
    global LATEST_PROCESSED_VIDEO  # Track the latest processed video
    cap = cv2.VideoCapture(input_path)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, cap.get(cv2.CAP_PROP_FPS), (target_width, target_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_height, frame_width, _ = frame.shape
        aspect_ratio = target_width / target_height

        # Run YOLO object detection
        results = yolo_model(frame)
        boxes = results[0].boxes.xyxy.cpu().numpy()

        if len(boxes) > 0:
            x_min, y_min, x_max, y_max = boxes[0]
        else:
            x_min, y_min, x_max, y_max = 0, 0, frame_width, frame_height

        x_center, y_center = (x_min + x_max) // 2, (y_min + y_max) // 2

        if frame_width / frame_height > aspect_ratio:
            new_width = int(frame_height * aspect_ratio)
            x_start = max(0, min(x_center - new_width // 2, frame_width - new_width))
            cropped_frame = frame[:, x_start:x_start + new_width]
        else:
            new_height = int(frame_width / aspect_ratio)
            y_start = max(0, min(y_center - new_height // 2, frame_height - new_height))
            cropped_frame = frame[int(y_start):int(y_start + new_height), :]

        resized_frame = cv2.resize(cropped_frame, (target_width, target_height))
        out.write(resized_frame)

    cap.release()
    out.release()

    # Save the latest processed video filename
    LATEST_PROCESSED_VIDEO = os.path.basename(output_path)


@app.route("/upload/", methods=["POST"])
def upload_video():
    file = request.files.get("file")
    resolution = request.form.get("resolution", "1920x1080")  # Default resolution
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    width, height = map(int, resolution.split("x"))
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_filename = f"processed_{file.filename}"
    output_path = os.path.join(PROCESSED_FOLDER, output_filename)

    file.save(input_path)
    ai_smart_crop(input_path, output_path, width, height)

    return jsonify({"processed_video": output_filename})


@app.route("/latest_video/", methods=["GET"])
def get_latest_video():
    if LATEST_PROCESSED_VIDEO:
        return jsonify({"latest_video": f"/processed/{LATEST_PROCESSED_VIDEO}"})
    return jsonify({"error": "No processed videos found"}), 404


@app.route("/processed/<filename>")
def serve_video(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True)
