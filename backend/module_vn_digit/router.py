from fastapi import APIRouter, Form
import utils as uts
from module_vn_digit import controller as ctl

module_vn_digit_router = APIRouter(
  prefix="/api/module_vn_digit",
  tags=["Module Vietnamese Digit Predict"]
)

@module_vn_digit_router.post('/')
async def predict_digit(
  b64: str = Form(...)
) -> dict:
  image_cv = uts.b64_to_imgcv(b64)
  predict_result = ctl.predict_digit(image_cv)

  return {
    "predict_result": predict_result
  }
