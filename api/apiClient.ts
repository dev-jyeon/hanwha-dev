import instance from './fetcher.ts'; // Axios instance

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

type Method = 'get' | 'post' | 'put' | 'delete';
type RequestOptions = {
  timeout?: number;
};

const request = async <T>(
  method: Method,
  url: string,
  {
    params,
    data,
    timeout,
  }: {
    params?: any;
    data?: any;
    timeout?: number;
  } = {}
): Promise<T> => {
  const res = await instance.request<ApiResponse<T>>({
    url,
    method,
    params,
    data,
    timeout,
  });

  if (!res.data.success) {
    console.warn(`📢 Error:`, res.data.message);
  }

  return res.data.data;
};

const apiClient = {
  get: <T, P = any>(url: string, params?: P, options?: RequestOptions) =>
    request<T>('get', url, { params, timeout: options?.timeout }),

  post: <T, B = any>(url: string, body?: B, options?: RequestOptions) =>
    request<T>('post', url, { data: body, timeout: options?.timeout }),

  put: <T, B = any>(url: string, body?: B, options?: RequestOptions) =>
    request<T>('put', url, { data: body, timeout: options?.timeout }),

  delete: <T, P = any>(url: string, params?: P, options?: RequestOptions) =>
    request<T>('delete', url, { params, timeout: options?.timeout }),
};

export default apiClient;
