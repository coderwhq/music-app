import { request } from './instance'

// 视频

// 获取topmv
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

// 首页

// 轮播图
function getBanner() {
  return request.get({
    url: '/banner',
    data: {
      type: 1
    }
  })
}

// 获取发现音乐
function getPersonalizedNewsong() {
  return request.get({
    url: '/personalized/newsong'
  })
}

// 获取热门歌单
function getTopPlaylist(cat="all") {
  return request.get({
    url: '/top/playlist',
    data: {
      cat
    }
  })
}

// 获取推荐歌单
function getRecommendPlaylist() {
  return request.get({
    url: '/personalized'
  })
}

// 获取巅峰榜
function getPlaylistRank() {
  return request.get({
    url: '/toplist'
  })
}

// 获取歌单详情
function getPlaylistDetail(id: any) {
  return request.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

// 获取热搜列表
function getSearchHot() {
  return request.get({
    url: "/search/hot"
  })
}

// 获取搜索建议
function getSearchSuggest(keywords: any) {
  return request.get({
    url: "/search/suggest",
    data: {
      keywords,
      type: "mobile"
    }
  })
}

// 搜索详情
function getSearchResult(keywords: any) {
  return request.get({
    url: "/search",
    data: {
      keywords
    }
  })
}

// 歌曲详情
function getSongDetail(id: any) {
  return request.get({
    url: '/song/detail',
    data: {
      ids: id
    }
  })
}

// 获取歌词
function getLyric(id: any) {
  return request.get({
    url: '/lyric',
    data: {
      id
    }
  })
}

export {
  getTopMv,
  getVideoUrl,
  getVideoDetail,
  getRelatedVideo,
  
  getBanner,
  getPersonalizedNewsong,
  getTopPlaylist,
  getRecommendPlaylist,
  getPlaylistRank,
  
  getPlaylistDetail,
  
  getSearchHot,
  getSearchSuggest,
  getSearchResult,
  
  getSongDetail,
  getLyric
}
