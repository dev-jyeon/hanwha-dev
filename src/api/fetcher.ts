import axios from 'axios';
import type { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 3000,
});

// 인터셉터: 응답 데이터 콘솔 출력
instance.interceptors.response.use(
  (response) => {
    return responseWrapper(response);
  },
  (error) => {
    console.log('API Error Code::', error);
    return Promise.reject(error);
  }
);

const responseWrapper = (target: AxiosResponse<any, any>) => {
  const { data } = target;
  const isError = data && typeof data === 'object' && 'name' in data;
  return {
    ...target,
    data: {
      data: data || null,
      success: !isError,
      message: data.name || undefined,
    },
  };
};

export default instance;
