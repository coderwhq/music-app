<template>
  <view class="music-player" v-if="playerStore.currentMusic">
    <image v-if="playerStore.currentMusic.al" class="backimg" :src="playerStore.currentMusic.al.picUrl" mode="aspectFill"></image>
    <view class="backcover"></view>
    <view class="tab">
      <view :class="currentPage === 0 ? 'active' : ''">歌曲</view>
      <view class="divider">|</view>
      <view :class="currentPage === 1 ? 'active' : ''">歌词</view>
    </view>
    <swiper @change="handleSwiperChange" class="swiper-wrapper">
      <swiper-item class="swiper-item">
        <view class="swiper-item music">
          <image v-if="playerStore.currentMusic.al" class="music-pic" :src="playerStore.currentMusic.al.picUrl" mode="widthFix"></image>
          <view class="music-info">
            <view v-if="playerStore.currentMusic.name" class="name">{{playerStore.currentMusic.name}}</view>
            <view v-if="playerStore.currentMusic.ar" class="author">{{playerStore.currentMusic.ar[0].name}}</view>
            <view v-if="playerStore.currentMusic.al" class="album">{{playerStore.currentMusic.al.name}}</view>
          </view>
          <view class="part-lyric">我是歌词</view>
          <view class="music-control">
            <view class="slider-wrapper">
              <slider class="slider" :value="sliderValue" @change="handleSliderChange" :block-size="12" activeColor="#1dcf9f"/>
              <view class="time">
                <view class="current-time">{{formatDuration(playerStore.currentTime)}}</view>
                <view class="final-time">{{formatDuration(playerStore.durationTime)}}</view>
              </view>
            </view>
            <view class="player-control">
              <image class="btn btn-mode" :src="`/static/player/play_${playerStore.playerMode}.png`" @click="handleModeBtnClick"></image>
              <image class="btn btn-prev" src="/static/player/play_prev.png" @click="handlePrevBtnClick"></image>
              <image class="btn btn-pause" :src="`/static/player/play_${playerStore.isPlaying}.png`" @click="handlePlayBtnClick"></image>
              <image class="btn btn-next" src="/static/player/play_next.png" @click="handleNextBtnClick"></image>
              <image class="btn btn-music" src="/static/player/play_music.png"></image>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <view class="swiper-item lyrics">歌词</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
  
  import { formatDuration } from '@/util'
  
  import { usePlayerStore } from '@/store'

  const playerStore = usePlayerStore()
  
  const currentPage = ref<number>(0)
  
  const sliderValue = computed(() => {
    return playerStore.currentTime * 100 / playerStore.durationTime
  })
  const id = computed(() => {
    return playerStore.playList[playerStore.currentIndex]
  })
  
  watch(() => id.value, () => {
    uni.startPullDownRefresh({})
  })
  
  onLoad(() => {
    uni.startPullDownRefresh({})
  })
  
  const getMusicData = async (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    await playerStore.getCurrentMusicDataAction(id.value)
    uni.stopPullDownRefresh()
  }  
  
  onPullDownRefresh(() => {
    getMusicData(false);
  })
  
  const handleSwiperChange = (e: any) => {
    currentPage.value = e.detail.current
  }
  
  const handleSliderChange = (e: any) => {
    // 拖动slider后触发的事件
    const value = e.detail.value
    // 这个一定要有，否则切歌 sliderValue.value = 0 时，会不生效
    // sliderValue.value = value
    const currentTime = playerStore.durationTime * value / 100
    // ms -> s
    playerStore.playerSeek(currentTime / 1000)
  }

  // control
  const handleModeBtnClick = () => {
    // 切换播放模式
    playerStore.changePlayerModeAction()
  }
  
  const handlePrevBtnClick = () => {
    // 上一首
    playerStore.playPrevMusic()
  }
  
  const handlePlayBtnClick = () => {
    // 播放/暂停
    playerStore.changeIsPlayingAction()
  }
  
  const handleNextBtnClick = () => {
    // 下一首
    playerStore.playNextMusic()
  }
  
</script>

<style lang="scss">
.music-player {
  position: relative;
  height: 100vh;
}
.backimg, .backcover{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.backcover {
  background-color: rgba(0,0,0,.5);
  backdrop-filter: blur(30px);
}
.tab {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 40rpx;
  .divider {
    margin: 0 10rpx;
  }
  .active {
    color: #fff;
  }
}
// swiper
.swiper-wrapper {
  width: 100%;
  height: calc(100% - 100rpx);
  color: #fff;
  .swiper-item {
    width: 100%;
    height: 100%;
  }
}
.music {
  padding: 0 70rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ccc;
  .music-pic {
    width: 100%;
    margin-bottom: 40rpx;
    border-radius: 30rpx;
  }
  .music-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    .name {
      margin: 20rpx 0 10rpx;
      font-size: 50rpx;
      font-weight: bold;
      color: #fff;
    }
    .author {
      margin: 10rpx 0;
    }
    .album {
      margin: 10rpx 0;
    }
  }
  .part-lyric {
    width: 100%;
    text-align: center;
    padding: 30rpx 0;
  }
  .music-control {
    width: 100%;
    display: flex;
    flex-direction: column;
    .slider-wrapper {
      .slider {
        margin: 0 0 18rpx 20rpx;
      }
      .time {
        display: flex;
        justify-content: space-between;
      }
    }
    .player-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 60rpx 0;
      .btn {
        display: inline-block;
        width: 60rpx;
        height: 60rpx;
        padding: 0;
      }
      .btn-mode {
        width: 80rpx;
        height: 80rpx;
      }
      .btn-pause {
        width: 130rpx;
        height: 130rpx;
      }
    }
  }
  
}


</style>
