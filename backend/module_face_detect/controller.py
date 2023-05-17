import numpy as np
import cv2 as cv
import utils as uts
import imutils

MODEL_DETECT_PATH = "module_face_detect/models/face_detection_yunet_2022mar.onnx"
WIDTH_INPUT = 320
HEIGHT_INPUT = 320
streaming_running = False

def image_detect_face(image_cv: np.matrix) -> np.matrix:
  image_cv = uts.convert_to_rgb(image_cv)
  image_raw = image_cv.copy()
  image_input = image_cv.copy()
  image_output = image_cv.copy()
  image_input = cv.resize(image_input, (WIDTH_INPUT, HEIGHT_INPUT))

  WIDTH_RAW = image_raw.shape[1]
  HEIGHT_RAW = image_raw.shape[0]

  detector = cv.FaceDetectorYN.create(
    MODEL_DETECT_PATH, "",
    (320, 320), 0.9, 0.3, 5000
  )

  _, coords = detector.detect(image_input)

  if coords is not None:
    for coord in coords:
      x1, y1, w, h = coord[:4]
      x1 = x1*(WIDTH_RAW/WIDTH_INPUT)
      y1 = y1*(HEIGHT_RAW/HEIGHT_INPUT)
      w = w*(WIDTH_RAW/WIDTH_INPUT)
      h = h*(HEIGHT_RAW/HEIGHT_INPUT)

      color = (0, 255, 0)
      thickness = 3
      thickness = 2

      start_point = (int(x1), int(y1))
      end_point = (int(x1+w), int(y1+h))
      image_output = cv.rectangle(image_output, start_point, end_point, color, thickness)

  return image_output

def stream_detect_face() -> None:
  vc = cv.VideoCapture(0, cv.CAP_DSHOW)
  CAPTURE_WIDTH = 640
  CAPTURE_HEIGHT = 480
  vc.set(cv.CAP_PROP_FRAME_WIDTH, CAPTURE_WIDTH)
  vc.set(cv.CAP_PROP_FRAME_HEIGHT,CAPTURE_HEIGHT)
  vc.set(cv.CAP_PROP_FPS, 30)
  vc.set(cv.CAP_PROP_FOURCC, cv.VideoWriter_fourcc(*'MJPG'))
  width = vc.get(cv.CAP_PROP_FRAME_WIDTH)
  height = vc.get(cv.CAP_PROP_FRAME_HEIGHT)
  print("Available resolution:", width, "x", height)

  detector = cv.FaceDetectorYN.create(
    MODEL_DETECT_PATH, "",
    (320, 320), 0.9, 0.3, 5000
  )

  global streaming_running

  if vc.isOpened(): streaming_running = True
  else: streaming_running = False

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
        thickness = 3
        thickness = 2

        start_point = (int(x1), int(y1))
        end_point = (int(x1+w), int(y1+h))
        frame_output = cv.rectangle(frame_output, start_point, end_point, color, thickness)

    yield (
      b'--frame\r\n'
      b'Content-Type: image/jpeg\r\n\r\n' + uts.imgcv_to_bytes(frame_output) + b'\r\n'
    )

  vc.release()
  cv.destroyAllWindows()

def stop_stream():
    global streaming_running
    streaming_running = False