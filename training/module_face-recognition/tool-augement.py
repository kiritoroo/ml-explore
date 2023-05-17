import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import numpy as np
import tensorflow as tf
import cv2
import shutil

def aug_combine(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 50
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    rotation_range=20,
    shear_range=25,
    width_shift_range=[-2, 2],
    height_shift_range=[-2, 2],
    zoom_range=0.3)

  gen = my_gen.flow(image_data, batch_size=1)
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imwrite("{}/{}_combine_{}.png".format(file_dir, image_name, index), image)

def aug_rotate(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 10
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    rotation_range=20, fill_mode='nearest')
    
  gen = my_gen.flow(image_data, batch_size=1)
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imwrite("{}/{}_rotate_{}.png".format(file_dir, image_name, index), image)

def aug_shear(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 20
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    shear_range=50)
    
  gen = my_gen.flow(image_data, batch_size=1)
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imwrite("{}/{}_shear_{}.png".format(file_dir, image_name, index), image)

def aug_shift(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 10
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    width_shift_range=[-2, 2],
    height_shift_range=[-2, 2])
    
  gen = my_gen.flow(image_data, batch_size=1)
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    cv2.imwrite("{}/{}_shift_{}.png".format(file_dir, image_name, index), image)

def aug_zoom(image_data: cv2.Mat, image_name: str, file_dir: str) -> None:
  numb_gen = 10
  my_gen = tf.keras.preprocessing.image.ImageDataGenerator(
    zoom_range=0.3)
    
  gen = my_gen.flow(image_data, batch_size=1)
  for index in range(numb_gen):
    my_batch = gen.next()
    image = my_batch[0].astype('uint8')
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    try:
      cv2.imwrite("{}/{}_zoom_{}.png".format(file_dir, image_name, index), image)
    except:
      print('err')

IMAGES_RAW_DIR = "./dataset/re-scale"
IMAGES_GEN_DIR = "./dataset/augement"
CATEGORIES = ["Avicii", "KienTrung", "MaiTue", "MartinGarrix"]

if __name__ == "__main__":
  """ Create Directory """
  if os.path.exists(IMAGES_GEN_DIR):
    shutil.rmtree(IMAGES_GEN_DIR)
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