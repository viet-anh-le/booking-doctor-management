#import statement
from fastapi import FastAPI, UploadFile, File, HTTPException, status #building the API
from segmentation import get_yolov5, get_image_from_bytes #segmentation functions
from starlette.responses import Response #handling API responses
import io
from PIL import Image
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
from typing import List 
import cloudinary
from cloudinary.uploader import upload
import os 
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_KEY"),
    api_secret=os.getenv("CLOUD_SECRET")
)

#initialize and obtain the model
model = get_yolov5() 

#FastAPI application setup
app = FastAPI(
    title="Custom YOLOV5 Machine Learning API",
    description="""Obtain object value out of image
                    and return image and json result""",
    version="0.0.1",
)

#CORS (Cross-Origin Resource Sharing) middleware, allows the API to be accessed from different domains or origins. 

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Checking health of application, returns “OK” JSON response

@app.get('/notify/v1/health')
def get_health():
    """
    Usage on K8S
    readinessProbe:
        httpGet:   path: /notify/v1/health
            port: 80
    livenessProbe:
        httpGet:
            path: /notify/v1/health
            port: 80
    :return:
        dict(msg='OK')
    """
    return dict(msg='OK')


@app.post("/object-to-json")
async def detect_disease_return_json_result(files: List[UploadFile] = File(...)):
    results_list = []  # Danh sách kết quả cho tất cả ảnh

    # Đọc và xử lý nhiều ảnh
    binary_images = [await file.read() for file in files]
    input_images = get_image_from_bytes(binary_images)  # Lấy danh sách ảnh đã xử lý

    for input_image in input_images:
        results = model(input_image)  # Chạy mô hình YOLOv5
        detect_res = results.pandas().xyxy[0].to_json(orient="records")
        detect_res = json.loads(detect_res)
        results_list.append(detect_res)
    
    return {"results": results_list}

@app.post("/object-to-filepath")
async def detect_disease_return_file_path(files: List[UploadFile] = File(...)):
    # Danh sách chứa các đường dẫn ảnh
    image_urls = []

    # Đọc và xử lý nhiều ảnh
    for file in files:
        # Đọc file ảnh
        image_binary = await file.read()
        
        # Chuyển ảnh từ binary thành Image object
        img = Image.open(io.BytesIO(image_binary))
        
        # Chạy qua mô hình YOLOv5 để phát hiện đối tượng
        results = model(img)
        results.render()  # Vẽ các bounding boxes lên ảnh
        
        # Lấy ảnh đã render từ kết quả mô hình
        img_with_bboxes = results.ims[0]  # Lấy ảnh đã vẽ bounding boxes

        # 5. Convert numpy array -> Image object
        img_pil = Image.fromarray(img_with_bboxes)

        # 6. Save vào buffer memory (không ghi file local)
        buffer = io.BytesIO()
        img_pil.save(buffer, format="JPEG")  # hoặc "PNG"
        buffer.seek(0)

        # 7. Upload buffer lên Cloudinary
        upload_result = upload(
            buffer,  # Truyền buffer thay vì file
            resource_type="image",
            public_id=file.filename.rsplit(".", 1)[0] + "_processed" 
        )

        # 8. Lấy URL ảnh đã upload
        file_url = upload_result['secure_url']

        # 9. Thêm vào danh sách kết quả
        image_urls.append(file_url)

    # Trả về danh sách các đường dẫn ảnh dưới dạng JSON
    return JSONResponse(content={"image_urls": image_urls})