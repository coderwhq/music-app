import type { RequestConfig, InterceptorConfig } from '@/common/global-type'

class BaseRequest {
  baseURL?: string
  timeout?: number
  interceptor?: InterceptorConfig
  constructor(config: RequestConfig) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
    this.interceptor = config.interceptor
  }
  // 拦截器先注册的先运行
  private request(config: any) {
    return new Promise((resolve, reject) => {
      // 实例共有的拦截器
      if(this.interceptor?.interceptorRequest) {
        config = this.interceptor.interceptorRequest(config)
      }
      // 请求私有的拦截器
      if(config.interceptor?.interceptorRequest) {
        config = config.interceptor.interceptorRequest(config)
      }
      uni.request({
        url: this.baseURL + config.url,
        timeout: this.timeout ?? config.timout ?? 10000,
        method: config.method ?? 'GET',
        data: config.data,
        success: (res: any) => {
          res = res.data
          if(this.interceptor?.interceptorResponse) {
            res = this.interceptor.interceptorResponse(res)
          }
          if(config.interceptor?.interceptorResponse) {
            res = config.interceptor.interceptorResponse(res)
          }
          resolve(res)
        },
        fail: (err: any) => {
          if(this.interceptor?.interceptorResponseCatch) {
            err = this.interceptor.interceptorResponseCatch(err)
          }
          if(config.interceptor?.interceptorResponseCatch) {
            err = config.interceptor.interceptorResponseCatch(err)
          }
          console.log(err)
          reject(err)
        }
      })
    })
  }
  
  get(config: any) {
    return this.request({ ...config, method: 'GET' })
  }
  
  post(config: any) {
    return this.request({ ...config, method: 'POST' })
  }
  
}

export default BaseRequest