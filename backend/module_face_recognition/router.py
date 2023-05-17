from fastapi import APIRouter, Form
from fastapi.responses import StreamingResponse
import utils as uts
from module_face_recognition import controller as ctl

module_face_recog_router = APIRouter(
  prefix="/api/module_face_recog",
  tags=["Module Face Recognition"]
)

@module_face_recog_router.post('/image')
async def image_face_recog(
  b64: str = Form(...)
) -> dict:
  image_cv = uts.b64_to_imgcv(b64)
  image_output = ctl.image_recog_face(image_cv)

  return {
    "result_b64": uts.imgcv_to_b64(image_output)
  }

@module_face_recog_router.get('/start_stream')
async def start_stream() -> dict:
  ctl.start_stream()
  return {"message": "Stream started"}

@module_face_recog_router.get('/stop_stream')
async def stop_stream() -> dict:
  ctl.stop_stream()
  return {"message": "Stream stopped"}

@module_face_recog_router.get('/stream')
async def image_face_detect() -> dict:

  return StreamingResponse(
    ctl.stream_detect_recog(),
    media_type="multipart/x-mixed-replace; boundary=frame"
  )
