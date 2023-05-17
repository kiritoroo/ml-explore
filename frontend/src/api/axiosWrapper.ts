import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export { useAxiosWrapper };

function useAxiosWrapper() {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: '/api',
    timeout: 2000
  })

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method: string) {
    return (url: string, body?: any, params?: any) => {
      const config: AxiosRequestConfig = {
        method,
        headers: {}
      };
      if (body) {
        config.headers!['Content-Type'] = 'multipart/form-data';
        config.data = body;
      }
      if (params) {
        config.params = params;
      }
      return axiosInstance(url, config)
        .then(handleResponse)
        .catch(handleError);
    };
  }

  function handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  function handleError(error: AxiosError) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      
      throw new Error();
    } else {
      throw error;
    }
  }
}
