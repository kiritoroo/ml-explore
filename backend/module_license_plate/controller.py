import numpy as np
import cv2 as cv
import utils as uts
import imutils
from tensorflow import keras

MODEL_PATH = "module_license_plate/models/model_lp.h5"
WIDTH_INPUT = 200
HEIGHT_INPUT = 200
model_lp = keras.models.load_model(MODEL_PATH)

def image_lp_detect(image_cv: np.matrix) -> np.matrix:
  global model_lp

  image_cv = uts.convert_to_rgb(image_cv)
  image_raw = image_cv.copy()
  image_input = image_cv.copy()
  image_output = image_cv.copy()

  WIDTH_RAW = image_raw.shape[1]
  HEIGHT_RAW = image_raw.shape[0]

  image_input = cv.resize(image_input, (WIDTH_INPUT, HEIGHT_INPUT))
  image_input= np.expand_dims(image_input, axis=0)
  image_input = np.array(image_input)
  image_input = image_input / 255

  _boundingbox = model_lp.predict(image_input)
  _boundingbox = _boundingbox[0]*255
  rescale_ratio_x = WIDTH_RAW / 200
  rescale_ratio_y = HEIGHT_RAW / 200
  xmin_rescaled = int(_boundingbox[0] * rescale_ratio_x)
  ymin_rescaled = int(_boundingbox[1] * rescale_ratio_y)
  xmax_rescaled = int(_boundingbox[2] * rescale_ratio_x)
  ymax_rescaled = int(_boundingbox[3] * rescale_ratio_y)

  image_output = cv.rectangle(image_output,
    (xmin_rescaled, ymin_rescaled),
    (xmax_rescaled, ymax_rescaled),
    (0, 255, 0), thickness=2)
  
  return image_output