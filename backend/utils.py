import numpy as np
import cv2 as cv
import base64

def b64_to_imgcv(b64: str) -> np.matrix:
  b64_decode = base64.b64decode(b64.split(';base64,').pop())
  img_np = np.frombuffer(b64_decode, dtype=np.uint8)
  img_cv = cv.imdecode(img_np, flags=cv.IMREAD_UNCHANGED)
  return img_cv

def resize_img(img: np.matrix, scale_percent: int) -> np.matrix:
  w = int(img.shape[1] * scale_percent / 100)
  h = int(img.shape[0] * scale_percent / 100)
  dim = (w, h)
  img_resize = cv.resize(img, dim, interpolation=cv.INTER_AREA)
  return img_resize

def imgcv_to_bytes(img: np.matrix) -> bytes:
  _, img_encoded = cv.imencode(".jpg", img=img)
  img_bytes = img_encoded.tobytes()
  return img_bytes

def imgcv_to_b64(img: np.matrix) -> str:
  img = imgcv_to_bytes(img)
  b64 = base64.b64encode(img)
  return b64

def convert_to_rgb(img: np.matrix):
  if img.shape[2] == 4:
    img = cv.cvtColor(img, cv.COLOR_RGBA2RGB)
  elif img.shape[2] < 3:
    img = cv.cvtColor(img, cv.COLOR_GRAY2RGB)
  return img