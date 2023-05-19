from fastapi import APIRouter, Form
import utils as uts
from module_animal_clf import controller as ctl

module_animal_clf_router = APIRouter(
  prefix="/api/module_animal_clf",
  tags=["Module Animal Classification"]
)


@module_animal_clf_router.post('/image')
async def image_animal_predict(
  b64: str = Form(...)
) -> dict:
  image_cv = uts.b64_to_imgcv(b64)
  predict_result = ctl.image_animal_predict(image_cv)

  return {
    "predict_result": predict_result
  }
