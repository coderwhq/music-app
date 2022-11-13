import { defineStore } from 'pinia'

import { getSongDetail, getLyric } from '@/service/api'

import { getRandom, parseLyric } from '@/util'

const bgAudioManager  = uni.getBackgroundAudioManager()

const playermode = ['order', 'random', 'repeat']
const isplaying = ['resume', 'pause']

const usePlayerStore = defineStore("playerStore", {
  state(): any{
    return {
      // 是否是第一次播放
      isFirstPlay: true,
      
      // 当前歌曲的数据
      currentMusic: {},
      
      // 播放器的状态
      playerMode: 'order',
      isPlaying: 'resume',
      durationTime: 0, // ms
      currentTime: 0, // ms
      
      // 播放列表
      playList: [],
      currentIndex: 0,
      
      // 歌词
      lyricInfos: [],
      currentLyric: '',
      currentLyricIndex: 0,
      
    }
  },
  actions: {
    async getCurrentMusicDataAction(id: any) {
      try {
        
        this.lyricInfos = []
        this.currentLyric = ''
        this.currentLyricIndex = 0
        
        const res: any = await getSongDetail(id)
        await this.getCurrentMusicLyricAction(id)
        
        this.currentMusic = res.songs[0]
        this.durationTime = this.currentMusic.dt
        this.currentTime = 0
        
        bgAudioManager.title = this.currentMusic.name
        bgAudioManager.src = `https://music.163.com/song/media/outer/url?id=${this.currentMusic.id}.mp3`
        bgAudioManager.startTime = 0
        
        if(this.isFirstPlay) {
          this.setupBgAudioManagerListenAction()
          this.isFirstPlay = false
        }
        
        return Promise.resolve()
      }
      catch(err) {
        return Promise.reject(err)
      }
    },
    async getCurrentMusicLyricAction(id: any) {
      try {
        const res: any = await getLyric(id)
        const lyrics = res.lrc.lyric
        this.lyricInfos = parseLyric(lyrics)
        this.currentLyric = this.lyricInfos[this.currentLyricIndex].text
        return Promise.resolve()
      } catch(err: any) {
        console.log(err)
        return Promise.reject()
      }
    },
    initPlayListAndCurrentIndexAction(data: any, index: any) {
      this.playList = data
      this.currentIndex = index
    },
    setupBgAudioManagerListenAction() {
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
        if(this.playerMode === 'repeat') {
          this.playerSeek(0)
          this.isPlaying = 'pause'
          bgAudioManager.play()
          return 
        }
        this.playNextMusic(true)
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
        if(this.currentLyricIndex !== this.lyricInfos.length - 1 && this.currentTime > this.lyricInfos[this.currentLyricIndex + 1].time) {
          this.currentLyricIndex ++
          this.currentLyric = this.lyricInfos[this.currentLyricIndex].text
        }
      })
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
      const length = this.lyricInfos.length
      for(let i = 0; i < length; i ++) {
        const ele = this.lyricInfos[i]
        // m -> ms
        if(position * 1000 < ele.time) {
          this.currentLyricIndex = i - 1
          this.currentLyric = this.lyricInfos[this.currentLyricIndex].text
          break 
        }
      }
      bgAudioManager.seek(position)
    }
  }
})

export default usePlayerStore
