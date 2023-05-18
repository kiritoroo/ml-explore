from fastapi import APIRouter, Form
import utils as uts
from module_license_plate import controller as ctl

module_license_plate_router = APIRouter(
  prefix="/api/module_license_plate",
  tags=["Module License Plate"]
)

@module_license_plate_router.post('/image')
async def image_detect_lp(
  b64: str = Form(...)
) -> dict:
  image_cv = uts.b64_to_imgcv(b64)
  image_output = ctl.image_lp_detect(image_cv)

  return {
    "result_b64": uts.imgcv_to_b64(image_output)
  }
