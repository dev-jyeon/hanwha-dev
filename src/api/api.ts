export type ApiResponse<T> = {
    data: T,
    success: boolean;
    message?: string;
}

export type RequestOptions ={
    timeout?: number
}