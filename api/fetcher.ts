import axios from 'axios';
import type { AxiosResponse } from 'axios'; // ✅ 타입 전용으로만 import

const instance = axios.create({
  // baseURL: '',
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 3000, // 300ms는 너무 짧으니 3초로 늘림
});

// 인터셉터: 응답 데이터 콘솔 출력
instance.interceptors.response.use(
  (response) => {
    // console.log('📦 인터셉터에서 로깅:', response.data);
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
