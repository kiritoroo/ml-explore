import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
  title="Machine Learning Playground",
  version="1.0.0"
)

from module_face_detect.router import module_face_detect_router
from module_face_recognition.router import module_face_recog_router
from module_face_mask.router import module_face_mask_router
from module_license_plate.router import module_license_plate_router
from module_en_digit.router import module_en_digit_router
from module_vn_digit.router import module_vn_digit_router
from module_cali_house.router import module_cali_house_router
from module_fruit_clf.router import module_fruit_clf_router
from module_animal_clf.router import module_animal_clf_router

app.include_router(module_face_detect_router)
app.include_router(module_face_recog_router)
app.include_router(module_face_mask_router)
app.include_router(module_license_plate_router)
app.include_router(module_en_digit_router)
app.include_router(module_vn_digit_router)
app.include_router(module_cali_house_router)
app.include_router(module_fruit_clf_router)
app.include_router(module_animal_clf_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/", tags=['Root'])
async def root() -> dict:
  """Test API Endpoint"""
  return { 
    "message": "Machine Learning Playground"
  }

if __name__ == "__main__":
  uvicorn.run(
    "main:app",
    host=os.environ.get('DOMAIN'),
    port=int(os.environ.get('PORT')),
    log_level="info",
    reload=True
  )