from fastapi import APIRouter, Form
import utils as uts
from module_fruit_clf import controller as ctl

module_fruit_clf_router = APIRouter(
  prefix="/api/module_fruit_clf",
  tags=["Module Fruit Classification"]
)

@module_fruit_clf_router.post('/image')
async def predict_fruit(
  b64: str = Form(...)
) -> dict:
  image_cv = uts.b64_to_imgcv(b64)
  image_output = ctl.image_fruit_predict(image_cv)

  return {
    "result_b64": uts.imgcv_to_b64(image_output)
  }