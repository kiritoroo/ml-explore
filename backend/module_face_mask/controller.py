import numpy as np
import cv2 as cv
import utils as uts
import imutils
from keras.models import load_model
from keras.applications.mobilenet_v2 import preprocess_input
from keras.preprocessing.image import image_utils
import cv2 as cv
from typing import Union
import numpy as np
from PIL import ImageFont, ImageDraw, Image

PROTO_FACE_DETECT_PATH = "module_face_mask/models/face_detec.prototxt"
MODEL_FACE_DETECT_PATH = "module_face_mask/models/model_face.h5"
MODEL_MASK_DETECT_PATH = "module_face_mask/models/model_mask.h5"
WIDTH_INPUT = 320
HEIGHT_INPUT = 320
CAPTURE_WIDTH = 640
CAPTURE_HEIGHT = 480

streaming_running = False
vc = None
face_net = cv.dnn.readNet(PROTO_FACE_DETECT_PATH, MODEL_FACE_DETECT_PATH)
mask_net = load_model(MODEL_MASK_DETECT_PATH)

def predict_mask(frame, face_net, mask_net) -> Union[list, list]:
  (h, w)= frame.shape[:2]
  blob = cv.dnn.blobFromImage(
    frame,
    1.0,
    (224,224),
    (104.0, 177.0, 123.0))
  face_net.setInput(blob)
  detections = face_net.forward()

  faces=[]
  locs=[]
  preds=[]
    
  for i in range(0, detections.shape[2]):
    confidence = detections[0,0,i,2]
    if confidence>0.5:
      box = detections[0,0,i,3:7]*np.array([w,h,w,h])
      (startX, startY, endX, endY)= box.astype("int")
          
      (startX, startY) = (max(0, startX), max(0, startY))
      (endX, endY) = (min(w-1, endX), min(h-1, endY))
          
      face = frame[startY:endY, startX:endX]
      face = cv.cvtColor(face, cv.COLOR_BGR2RGB)
      face = cv.resize(face, (224,224))
      face = image_utils.img_to_array(face)
      face = preprocess_input(face)
          
      faces.append(face)
      locs.append((startX, startY, endX, endY))
    
  if len(faces)>0:
    faces = np.array(faces, dtype="float32")
    preds = mask_net.predict(faces, batch_size=32)
        
  return (locs, preds)

def image_detect_mask(image_cv: np.matrix) -> np.matrix:
  global face_net
  global mask_net

  image_output = image_cv.copy()
  (locs, preds) = predict_mask(image_output, face_net=face_net, mask_net=mask_net)

  for (box, pred) in zip(locs, preds):
    (startX, startY, endX, endY) = box
    (mask, withoutMask) = pred
    
    label = ""
    color = (255, 255, 255)
    if mask > withoutMask:
      label = "Đeo khẩu trang"
      color = (139, 247, 149)
    else:
      label = "Không đeo khẩu trang"
      color = (73, 92, 255)
          
    fontpath = "assets/pro.ttf"
    font = ImageFont.truetype(fontpath, 20)
    img_pil = Image.fromarray(image_output)
    draw = ImageDraw.Draw(img_pil)
    draw.text((startX, endY+5), label, font = font, fill = color)
    image_output = np.array(img_pil)

    cv.rectangle(image_output, (startX, startY), (endX, endY), color, 2)

    cv.rectangle(image_output, (startX, endY - 20), (endX, endY), color, cv.FILLED)
    cv.putText(image_output, "{:.2f}%".format(max(mask, withoutMask)*100), (startX + 6, endY - 6), cv.FONT_HERSHEY_DUPLEX, 0.5, (255, 255, 255),2)

  return image_output

def start_stream():
  global vc
  vc = cv.VideoCapture(0, cv.CAP_DSHOW)
  vc.set(cv.CAP_PROP_FRAME_WIDTH, CAPTURE_WIDTH)
  vc.set(cv.CAP_PROP_FRAME_HEIGHT,CAPTURE_HEIGHT)
  vc.set(cv.CAP_PROP_FPS, 30)
  vc.set(cv.CAP_PROP_FOURCC, cv.VideoWriter_fourcc(*'MJPG'))
  
  global streaming_running
  if vc.isOpened(): streaming_running = True
  else: streaming_running = False

def stop_stream():
  global streaming_running
  streaming_running = False

def stream_detect_mask() -> None:
  global vc
  global streaming_running
  global face_net
  global mask_net

  while streaming_running:   
    ret, frame = vc.read()
    if not ret: break
    if frame is None: continue

    frame_output = frame.copy()
    (locs, preds) = predict_mask(frame_output, face_net=face_net, mask_net=mask_net)

    for (box, pred) in zip(locs, preds):
      (startX, startY, endX, endY) = box
      (mask, withoutMask) = pred
      
      label = ""
      color = (255, 255, 255)
      if mask > withoutMask:
        label = "Đeo khẩu trang"
        color = (139, 247, 149)
      else:
        label = "Không đeo khẩu trang"
        color = (73, 92, 255)
            
      fontpath = "assets/pro.ttf"
      font = ImageFont.truetype(fontpath, 20)
      img_pil = Image.fromarray(frame_output)
      draw = ImageDraw.Draw(img_pil)
      draw.text((startX, endY+5), label, font = font, fill = color)
      frame_output = np.array(img_pil)

      cv.rectangle(frame_output, (startX, startY), (endX, endY), color, 2)

      cv.rectangle(frame_output, (startX, endY - 20), (endX, endY), color, cv.FILLED)
      cv.putText(frame_output, "{:.2f}%".format(max(mask, withoutMask)*100), (startX + 6, endY - 6), cv.FONT_HERSHEY_DUPLEX, 0.5, (255, 255, 255),2)

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + uts.imgcv_to_bytes(frame_output) + b'\r\n'
    )

  vc.release()
  cv.destroyAllWindows()