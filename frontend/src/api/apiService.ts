import { useAxiosWrapper } from "./axiosWrapper";

interface IPOSTImageResponse {
  result_b64: string
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