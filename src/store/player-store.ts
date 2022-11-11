import { defineStore } from 'pinia'

import { getSongDetail } from '@/service/api'

import { getRandom } from '@/util'

const bgAudioManager  = uni.getBackgroundAudioManager()

const playermode = ['order', 'random', 'repeat']
const isplaying = ['resume', 'pause']

const usePlayerStore = defineStore("playerStore", {
  state(): any{
    return {
      
      // 当前歌曲的数据
      currentMusic: {},
      
      // 播放器的状态
      playerMode: 'order',
      isPlaying: 'resume',
      durationTime: 0,
      currentTime: 0,
      
      // 播放列表
      playList: [],
      currentIndex: 0
      
    }
  },
  actions: {
    async getCurrentMusicDataAction(id: any) {
      try {
        const res: any = await getSongDetail(id)
        
        this.currentMusic = res.songs[0]
        this.durationTime = this.currentMusic.dt
        this.currentTime = 0
        
        bgAudioManager.title = this.currentMusic.name
        bgAudioManager.src = `https://music.163.com/song/media/outer/url?id=${this.currentMusic.id}.mp3`
        bgAudioManager.startTime = 0
        bgAudioManager.onCanplay(() => {
          this.isPlaying = 'pause'
        })
        bgAudioManager.onPlay(() => {
          this.isPlaying = 'pause'
        })
        bgAudioManager.onPause(() => {
          this.isPlaying = 'resume'
        })
        bgAudioManager.onStop(() => {
          this.isPlaying = 'resume'
        })
        bgAudioManager.onEnded(() => {
          this.playNextMusic(true)
          if(this.playerMode === 'repeat') {
            this.playerSeek(0)
            this.isPlaying = 'pause'
            bgAudioManager.play()
          }
        })
        bgAudioManager.onPrev(() => {
          this.playPrevMusic()
        })
        bgAudioManager.onNext(() => {
          this.playNextMusic()
        })
        bgAudioManager.onTimeUpdate(() => {
          // s -> ms
          this.currentTime = bgAudioManager.currentTime * 1000
        })
        
        return Promise.resolve()
      }
      catch(err) {
        return Promise.reject(err)
      }
    },
    initPlayListAndCurrentIndexAction(data: any, index: any) {
      this.playList = data
      this.currentIndex = index
    },
    changePlayerModeAction() {
      const idx: number = playermode.indexOf(this.playerMode) + 1
      this.playerMode  = playermode[idx === 3 ? 0 : idx]
    },
    changeIsPlayingAction() {
      const idx: number = isplaying.indexOf(this.isPlaying) + 1
      this.isPlaying  = isplaying[idx === 2 ? 0 : idx]
      
      if(this.isPlaying === 'resume') {
        bgAudioManager.pause()
      } else {
        bgAudioManager.play()
      }
      
    },
    playPrevMusic() {
      if(this.playerMode === 'order' || this.playerMode === 'repeat') {
        const idx = this.currentIndex - 1
        this.currentIndex = idx === -1 ? this.playList.length - 1 : idx
      } else if(this.playerMode === 'random') {
        const idx = getRandom(0, this.playList.length - 1)
        this.currentIndex = idx
      }
    },
    playNextMusic(isAuto=false) {
      if(this.playerMode === 'order' || (this.playerMode === 'repeat' && !isAuto)) {
        const idx = this.currentIndex + 1
        this.currentIndex = idx === this.playList.length ? 0 : idx
      } else if(this.playerMode === 'random') {
        const idx = getRandom(0, this.playList.length - 1)
        this.currentIndex = idx
      }
    },
    playerSeek(position: any) {
      bgAudioManager.seek(position)
    }
  }
})

export default usePlayerStore
