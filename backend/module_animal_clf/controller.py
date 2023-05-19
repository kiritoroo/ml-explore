from tensorflow import keras
import cv2 as cv
import numpy as np

WIDTH_INPUT = 256
HEIGHT_INPUT = 256
MODEL_PATH = "module_animal_clf/models/model_animal.h5"
ANIMALS_CATEGORIES = ["Con Mèo", "Con Bò", "Con Chó", "Con Voi", "Con Gấu Trúc"]

model_animal = keras.models.load_model(MODEL_PATH)

def image_animal_predict(image_cv: np.matrix) -> str:
  global model_animal

  image_input = image_cv.copy()
  dim = (WIDTH_INPUT, HEIGHT_INPUT)
  image_input = cv.resize(image_input, dim)
  image_input= np.expand_dims(image_input, axis=0)
  image_input = np.array(image_input)
  image_input = image_input / 255
  prediction = model_animal.predict(image_input)

  return ANIMALS_CATEGORIES[np.argmax(prediction)]