import cv2 as cv
from matplotlib import pyplot as plt
import tensorflow as tf
import numpy as np
import os
import shutil

FOLDER_INPUT = "./dataset/raw"
FOLDER_OUTPUT = "./dataset/cut-face"
CATEGORIES = ["Avicii", "KienTrung", "MaiTue", "MartinGarrix"]

model_path = 'model/face_detection_yunet_2022mar.onnx'
detector = cv.FaceDetectorYN.create(
  model_path, "",
  (320, 320), 0.9, 0.3, 5000
)

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
      image_input = cv.resize(image, (320, 320))

      img_result = image.copy()
      _, faces = detector.detect(image_input)

      if faces is not None:
        x1, y1, w, h = faces[0][:4]
        x1 = x1*(image.shape[1]/320)
        y1 = y1*(image.shape[0]/320)
        w = w*(image.shape[1]/320)
        h = h*(image.shape[0]/320)

        start_point = (int(x1), int(y1))
        end_point = (int(x1+w), int(y1+h))
        cropped_face_img = img_result[start_point[1]:end_point[1], start_point[0]:end_point[0]]

        cv.imwrite("{}/{}_face_{}.jpg".format(os.path.join(FOLDER_OUTPUT, category), category, index), cropped_face_img)
  print("Done!")