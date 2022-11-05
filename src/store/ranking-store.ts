import { defineStore } from 'pinia'

import { getPlaylistDetail } from '@/service/api'

const useRankingStore = defineStore("rankingStore", {
  state(): any{
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
        
    },
    getMenuById(id: number) {
      let menu: any
      switch(id) {
        case this.upRanking.id:
          menu = this.upRanking
          break
        case this.newRanking.id:
          menu = this.newRanking
          break
        case this.originRanking.id:
          menu = this.originRanking
          break
        case this.hotRanking.id:
          menu = this.hotRanking
          break
      }
      return menu
    }
  }
})

export default useRankingStore
