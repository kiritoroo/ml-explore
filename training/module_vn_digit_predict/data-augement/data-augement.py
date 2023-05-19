import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import numpy as np
import tensorflow as tf
import cv2

from aug_shift import aug_shift
from aug_shear import aug_shear
from aug_rotate import aug_rotate
from aug_zoom import aug_zoom
from aug_combine import aug_combine

IMAGES_RAW_DIR = "./images-raw"
IMAGES_GEN_DIR = "./images-generate"
CATEGORIES = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]

if __name__ == "__main__":
  """ Create Directory """
  os.mkdir(IMAGES_GEN_DIR)
  for category in CATEGORIES:
    os.mkdir(os.path.join(IMAGES_GEN_DIR, category))
  print("In Process...")
  for category in CATEGORIES:
    path = os.path.join(IMAGES_RAW_DIR, category)
    for index, img_name in enumerate(os.listdir(path)):
      image = tf.keras.preprocessing.image.load_img(os.path.join(path, img_name))
      image_array = tf.keras.preprocessing.image.img_to_array(image)
      image_data = np.expand_dims(image_array, 0)
      
      """ Random Shift """
      aug_shift(
        image_data=image_data,
        image_name=category+"_"+str(index),
        file_dir=os.path.join(IMAGES_GEN_DIR, category))
      """ Random Shear """
      aug_shear(
        image_data=image_data,
        image_name=category+"_"+str(index),
        file_dir=os.path.join(IMAGES_GEN_DIR, category))
      """ Random Rotate """
      aug_rotate(
        image_data=image_data,
        image_name=category+"_"+str(index),
        file_dir=os.path.join(IMAGES_GEN_DIR, category))
      """ Random Zoom """
      aug_zoom(
        image_data=image_data,
        image_name=category+"_"+str(index),
        file_dir=os.path.join(IMAGES_GEN_DIR, category))
      """ Random Combine """
      aug_combine(
        image_data=image_data,
        image_name=category+"_"+str(index),
        file_dir=os.path.join(IMAGES_GEN_DIR, category))
  print("Done!")