
export type HttpResponse<T> = {
   status: number,
   data: T,
   message: string
}

export type Httpresult<T> = Promise<HttpResponse<T>>


