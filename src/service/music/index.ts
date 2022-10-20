import { request } from './instance'

function test() {
  return request.get({
    url: '/playlist/detail?id=6665838706'
  })
}

export {
  test
}
