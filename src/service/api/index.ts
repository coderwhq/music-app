import { request } from './instance'

function getTopMv(offset: any, limit: any) {
  return request.get({
    url: '/top/mv',
    data: {
      offset,
      limit
    }
  })
}

function getVideoDetail(id: any, isMv: boolean) {
  let url: string = '/video/detail'
  if(isMv) {
    url = '/mv/detail'
  }
  return request.get({
    url,
    data: {
      [isMv ? 'mvid' : 'id']: id
    }
  })
}

function getVideoUrl(id: any, isMv: boolean) {
  let url: string = '/video/url'
  if(isMv) {
    url = '/mv/url'
  }
  return request.get({
    url,
    data: {
      id: id
    }
  })
}

function getRelatedVideo(id: any) {
  return request.get({
    url: '/related/allvideo',
    data: {
      id: id
    }
  })
}

export {
  getTopMv,
  getVideoUrl,
  getVideoDetail,
  getRelatedVideo
}
