from fastapi import APIRouter, Form
import utils as uts
from module_cali_house import controller as ctl
module_cali_house_router = APIRouter(
  prefix="/api/module_cali_house",
  tags=["Module Cali House Price Predict"]
)

@module_cali_house_router.get('/data')
async def get_data():
  data = ctl.get_data()

  return {
    "data": data
  }

@module_cali_house_router.get('/rand_predict')
async def get_rand_predict():
  result = ctl.get_rand_predict()

  return result