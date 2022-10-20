interface RequestConfig<T = any> {
  baseURL?: string
  url?: string
  data?: T | object | string | ArrayBuffer
  header?: object
  method?: string
  timeout?: number
  interceptor?: InterceptorConfig
}

interface InterceptorConfig {
  interceptorRequest?: (config: RequestConfig) => RequestConfig
  interceptorResponse?: (res: any) => any
  interceptorResponseCatch?: (err: any) => any
}

export {
  RequestConfig,
  InterceptorConfig
}