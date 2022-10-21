import BaseRequest from '@/service/base/base'

import { SERVICE } from '@/common/global-constant'

const request = new BaseRequest({
  baseURL: SERVICE.BASE_URL,
  timeout: SERVICE.TIME_OUT
})

export {
  request
}