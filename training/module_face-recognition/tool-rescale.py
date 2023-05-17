import cv2 as cv
from matplotlib import pyplot as plt
import tensorflow as tf
import numpy as np
import os
import shutil

FOLDER_INPUT = "./dataset/cut-face"
FOLDER_OUTPUT = "./dataset/re-scale"
CATEGORIES = ["Avicii", "KienTrung", "MaiTue", "MartinGarrix"]

SCALE_WIDTH = 120
SCALE_HEIGHT = 120

if __name__ == "__main__":
  """ Create Directory """
  if os.path.exists(FOLDER_OUTPUT):
    shutil.rmtree(FOLDER_OUTPUT)
  os.mkdir(FOLDER_OUTPUT)
  for category in CATEGORIES:
    os.mkdir(os.path.join(FOLDER_OUTPUT, category))
  print("In Process...")
  for category in CATEGORIES:
    path = os.path.join(FOLDER_INPUT, category)
    for index, img_name in enumerate(os.listdir(path)):
      image = cv.imread(os.path.join(path, img_name))
      image_rescale = cv.resize(image, (SCALE_WIDTH, SCALE_HEIGHT))
      
      cv.imwrite("{}/{}_rescale_{}.jpg".format(os.path.join(FOLDER_OUTPUT, category), category, index), image_rescale)
  print("Done!")