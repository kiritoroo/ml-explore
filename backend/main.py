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
app.include_router(module_face_detect_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
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