import { useAxiosWrapper } from "./axiosWrapper";

interface IPOSTImageResponse {
  result_b64: string
}

interface IPredictResponse {
  predict_result: any
}

// API - Module Face Detection
export const POSTImageFaceDetect = (
  input_b64: string,
  callBack: (result_b64: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_face_detect/image', formData)
    .then((response: IPOSTImageResponse) => {
      callBack(`data:image/jpeg;base64,${response.result_b64}`);
    })
}

export const GETStartStreamFaceDetect = (
  callBack: (stream_url: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_detect/start_stream')
  .then((response) => {
    callBack('api/module_face_detect/stream');
  })
}

export const GETStopStreamFaceDetect = () => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_detect/stop_stream')
    .then((response) => {
    })
}

// API - Module Face Recognition
export const POSTImageFaceRecog = (
  input_b64: string,
  callBack: (result_b64: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_face_recog/image', formData)
    .then((response: IPOSTImageResponse) => {
      callBack(`data:image/jpeg;base64,${response.result_b64}`);
    })
}

export const GETStartStreamFaceRecog = (
  callBack: (stream_url: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_recog/start_stream')
  .then((response) => {
    callBack('api/module_face_recog/stream');
  })
}

export const GETStopStreamFaceRecog = () => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_recog/stop_stream')
    .then((response) => {
    })
}

// API - Module Face Mask
export const POSTImageFaceMask = (
  input_b64: string,
  callBack: (result_b64: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_face_mask/image', formData)
    .then((response: IPOSTImageResponse) => {
      callBack(`data:image/jpeg;base64,${response.result_b64}`);
    })
}

export const GETStartStreamFaceMask = (
  callBack: (stream_url: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_mask/start_stream')
  .then((response) => {
    callBack('api/module_face_mask/stream');
  })
}

export const GETStopStreamFaceMask = () => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/module_face_mask/stop_stream')
    .then((response) => {
    })
}

// API - Module License Plate
export const POSTImageLPDetect = (
  input_b64: string,
  callBack: (result_b64: string) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_license_plate/image', formData)
    .then((response: IPOSTImageResponse) => {
      callBack(`data:image/jpeg;base64,${response.result_b64}`);
    })
}

// API - Module English Digit Predict
export const POSTEnDigitPredict = (
  input_b64: string,
  callBack: (predict_result: any) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_en_digit', formData)
    .then((response: IPredictResponse) => {
      callBack(response.predict_result);
    })
}

// API - Module English Digit Predict
export const POSTVnDigitPredict = (
  input_b64: string,
  callBack: (predict_result: any) => void
) => {
  const axiosWrapper = useAxiosWrapper();
  const formData = new FormData()
  formData.append("b64", input_b64!)

  axiosWrapper.post('/module_vn_digit', formData)
    .then((response: IPredictResponse) => {
      callBack(response.predict_result);
    })
}