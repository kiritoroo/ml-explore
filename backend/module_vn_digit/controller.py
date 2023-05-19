from tensorflow import keras
import cv2 as cv
import numpy as np

WIDTH_INPUT = 28
HEIGHT_INPUT = 28
MODEL_PATH = "module_vn_digit/models/model_vn_digits.h5"
DIGITS_CATEGORIES = ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười"]

model_digit = keras.models.load_model(MODEL_PATH)

def predict_digit(image_cv: np.matrix) -> str:
  global model_digit

  image_input = image_cv.copy()
  B, G, R, A = cv.split(image_input)
  alpha = A / 255
  R = (255 * (1 - alpha) + R * alpha).astype(np.uint8)
  G = (255 * (1 - alpha) + G * alpha).astype(np.uint8)
  B = (255 * (1 - alpha) + B * alpha).astype(np.uint8)
  image_input = cv.merge((B, G, R))

  dim = (WIDTH_INPUT, HEIGHT_INPUT)
  image_input = cv.resize(image_input, dim, interpolation = cv.INTER_AREA)
  image_input = np.invert(np.array([image_input[:,:,0]]))
  
  prediction = model_digit.predict(image_input)

  return str(DIGITS_CATEGORIES[np.argmax(prediction)])
