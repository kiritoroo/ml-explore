import numpy as np
import tensorflow as tf
import cv2

def aug_zoom(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 10
  # Zoom ngẫu nhiên
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    zoom_range=0.3)
    
  gen = my_gen.flow(image_data, batch_size=1)
  # Sinh ra 10 ảnh
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.IMREAD_GRAYSCALE)
    try:
      cv2.imwrite("{}/{}_zoom_{}.png".format(file_dir, image_name, index), image)
    except:
      print('err')