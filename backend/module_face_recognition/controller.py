import numpy as np
import cv2 as cv
import utils as uts
import imutils
import joblib
from PIL import ImageFont, ImageDraw, Image

MODEL_DETECT_PATH = "module_face_recognition/models/face_detection_yunet_2022mar.onnx"
MODEL_RECOG_PATH = "module_face_recognition/models/face_recognition_sface_2021dec.onnx"
MODEL_SVC_PATH = "module_face_recognition/models/face_recog_svc.pkl"
FACE_CATEGORIES = ["Avicii", "Kiên Trung", "Mai Tuệ", "MartinGarrix"]
WIDTH_INPUT = 320
HEIGHT_INPUT = 320
CAPTURE_WIDTH = 640
CAPTURE_HEIGHT = 480

streaming_running = False
vc = None
detector = cv.FaceDetectorYN.create(
  MODEL_DETECT_PATH, "",
  (320, 320), 0.9, 0.3, 5000
)
recognizer = cv.FaceRecognizerSF.create(
  MODEL_RECOG_PATH, ""
)
model_svc = joblib.load(MODEL_SVC_PATH)

def image_recog_face(image_cv: np.matrix) -> np.matrix:
  global detector
  global recognizer
  global model_svc

  image_cv = uts.convert_to_rgb(image_cv)
  image_raw = image_cv.copy()
  image_input = image_cv.copy()
  image_output = image_cv.copy()
  image_input = cv.resize(image_input, (WIDTH_INPUT, HEIGHT_INPUT))
  
  WIDTH_RAW = image_raw.shape[1]
  HEIGHT_RAW = image_raw.shape[0]

  _, coords = detector.detect(image_input)

  if coords is not None:
    for coord in coords:
      x1, y1, w, h = coord[:4]
      x1 = x1*(WIDTH_RAW/WIDTH_INPUT)
      y1 = y1*(HEIGHT_RAW/HEIGHT_INPUT)
      w = w*(WIDTH_RAW/WIDTH_INPUT)
      h = h*(HEIGHT_RAW/HEIGHT_INPUT)

      color = (0, 255, 0)
      thickness = 2

      start_point = (int(x1), int(y1))
      end_point = (int(x1+w), int(y1+h))
      image_output = cv.rectangle(image_output, start_point, end_point, color, thickness)

      cropped_face_img = image_output[start_point[1]:end_point[1], start_point[0]:end_point[0]]
      face_feature = recognizer.feature(cropped_face_img)
      test_predict = model_svc.predict(face_feature)
      result = FACE_CATEGORIES[test_predict[0]]

      start_point = (int(x1), int(y1+h))
      end_point = (int(x1+w), int(y1+h+50))
      image_output = cv.rectangle(image_output, start_point, end_point, color, -1)
      fontpath = "assets/pro.ttf"
      font = ImageFont.truetype(fontpath, 25 + int(WIDTH_RAW/100))
      img_pil = Image.fromarray(image_output)
      draw = ImageDraw.Draw(img_pil)
      draw.text((int(x1+20), int(y1+h+10)), result, font = font, fill = (255, 255, 255))
      image_output = np.array(img_pil)

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

def stream_detect_recog() -> None:
  global vc
  global streaming_running
  global detector
  global recognizer
  global model_svc

  while streaming_running:   
    ret, frame = vc.read()
    if not ret: break
    if frame is None: continue

    frame = imutils.resize(frame, width=CAPTURE_WIDTH)
    frame_raw = frame.copy()
    frame_input = frame.copy()
    frame_output = frame.copy()
    frame_input = cv.resize(frame_input, (WIDTH_INPUT, HEIGHT_INPUT))

    _, coords = detector.detect(frame_input)

    if coords is not None:
      for coord in coords:
        x1, y1, w, h = coord[:4]
        x1 = x1*(CAPTURE_WIDTH/WIDTH_INPUT)
        y1 = y1*(CAPTURE_HEIGHT/HEIGHT_INPUT)
        w = w*(CAPTURE_WIDTH/WIDTH_INPUT)
        h = h*(CAPTURE_HEIGHT/HEIGHT_INPUT)

        color = (0, 255, 0)
        thickness = 2

        start_point = (int(x1), int(y1))
        end_point = (int(x1+w), int(y1+h))
        frame_output = cv.rectangle(frame_output, start_point, end_point, color, thickness)

        cropped_face_img = frame_output[start_point[1]:end_point[1], start_point[0]:end_point[0]]
        if cropped_face_img.shape[0] > 0 and cropped_face_img.shape[1] > 0:
          face_feature = recognizer.feature(cropped_face_img)
          test_predict = model_svc.predict(face_feature)
          result = FACE_CATEGORIES[test_predict[0]]

          start_point = (int(x1), int(y1+h))
          end_point = (int(x1+w), int(y1+h+50))
          frame_output = cv.rectangle(frame_output, start_point, end_point, color, -1)
          fontpath = "assets/pro.ttf"
          font = ImageFont.truetype(fontpath, 25 + int(CAPTURE_HEIGHT/100))
          frm_pil = Image.fromarray(frame_output)
          draw = ImageDraw.Draw(frm_pil)
          draw.text((int(x1+20), int(y1+h+10)), result, font = font, fill = (255, 255, 255))
          frame_output = np.array(frm_pil)

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + uts.imgcv_to_bytes(frame_output) + b'\r\n'
    )

  vc.release()
  cv.destroyAllWindows()