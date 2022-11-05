import { defineStore } from 'pinia'

import { getPlaylistDetail } from '@/service/api'

const useRankingStore = defineStore("rankingStore", {
  state: () => {
    return {
      upRanking: {},
      newRanking: {},
      originRanking: {},
      hotRanking: {}
    }
  },
  getters: {
    getRankSongMenu(): any {
      return [
        this.upRanking,
        this.newRanking,
        this.originRanking,
        this.hotRanking
      ]
    }
  },
  actions: {
    async getRankSongMenuAction(rankIdArr: any) {
      rankIdArr.forEach((id: any, idx: number) => {
        getPlaylistDetail(id)
          .then((res: any) => {
            switch(res.playlist.name) {
              case "飙升榜": 
                this.upRanking = res.playlist
                break 
              case "新歌榜":
                this.newRanking = res.playlist
                break 
              case "原创榜":
                this.originRanking = res.playlist
                break 
              case "热歌榜":
                this.hotRanking = res.playlist
                break 
            }
            // console.log(res)
            if(idx === rankIdArr.length - 1) return Promise.resolve()
          })
          .catch((err: any) => {
            console.log(err)
            return Promise.reject()
          })
      })
        
    }
  }
})

export default useRankingStore
