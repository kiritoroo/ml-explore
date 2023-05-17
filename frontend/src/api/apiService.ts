import { useAxiosWrapper } from "./axiosWrapper";

interface IPOSTImageResponse {
  result_b64: string
}

export const POSTImageFaceDetect = (
  input_b64: string,
  callBack: (result_b64: string) => void
  ) => {
    const axiosWrapper = useAxiosWrapper();
    const formData = new FormData()
    formData.append("b64", input_b64!)

    axiosWrapper.post('/router_module_face_detect/image', formData)
      .then((response: IPOSTImageResponse) => {
        callBack(`data:image/jpeg;base64,${response.result_b64}`)
      })
}

export const GETVideoStreamFaceDetect = 'api/router_module_face_detect/stream'

export const GETStopStreamFaceDetect = () => {
  const axiosWrapper = useAxiosWrapper();
  axiosWrapper.get('/router_module_face_detect/stop_stream')
  .then((response) => {
  })
}