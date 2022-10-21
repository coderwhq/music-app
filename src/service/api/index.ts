import { request } from './instance'

function getTopMv(config: any) {
  return request.get({
    url: '/top/mv',
    ...config
  })
}

export {
  getTopMv
}
