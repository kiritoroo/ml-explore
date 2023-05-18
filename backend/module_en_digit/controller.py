from tensorflow import keras
import cv2
import numpy as np

WIDTH_INPUT = 28
HEIGHT_INPUT = 28
MODEL_PATH = "module_en_digit/models/model_en_digits.h5"

model_digit = keras.models.load_model(MODEL_PATH)

def predict_digit(image_cv: np.matrix) -> int:
  global model_digit

  image_input = image_cv.copy()
  B, G, R, A = cv2.split(image_input)
  alpha = A / 255
  R = (255 * (1 - alpha) + R * alpha).astype(np.uint8)
  G = (255 * (1 - alpha) + G * alpha).astype(np.uint8)
  B = (255 * (1 - alpha) + B * alpha).astype(np.uint8)
  image_input = cv2.merge((B, G, R))

  dim = (WIDTH_INPUT, HEIGHT_INPUT)
  image_input = cv2.resize(image_input, dim, interpolation = cv2.INTER_AREA)
  image_input = np.invert(np.array([image_input[:,:,0]]))
  
  prediction = model_digit.predict(image_input)

  return int(np.argmax(prediction))
