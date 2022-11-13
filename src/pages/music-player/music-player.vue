<template>
  <view class="music-player" v-if="playerStore.currentMusic">
    <image v-if="playerStore.currentMusic.al" class="backimg" :src="playerStore.currentMusic.al.picUrl" mode="aspectFill"></image>
    <view class="backcover"></view>
    <nav-bar :statusBarHeight="deviceStore.statusBarHeight" :navBarHeight="deviceStore.navBarHeight" @leftClick="handleLeftClick">
      <template #title>      
        <view class="tab">
          <view :class="{ 'active': currentPage === 0 }">歌曲</view>
          <view class="divider">|</view>
          <view :class="{ 'active': currentPage === 1 }">歌词</view>
        </view>
      </template>
    </nav-bar>
    <swiper @change="handleSwiperChange" class="swiper-wrapper">
      <swiper-item class="swiper-item">
        <view class="swiper-item music">
          <image v-if="playerStore.currentMusic.al" class="music-pic" :src="playerStore.currentMusic.al.picUrl" mode="widthFix"></image>
          <view class="music-info">
            <view v-if="playerStore.currentMusic.name" class="name">{{playerStore.currentMusic.name}}</view>
            <view v-if="playerStore.currentMusic.ar" class="author">{{playerStore.currentMusic.ar[0].name}}</view>
            <view v-if="playerStore.currentMusic.al" class="album">{{playerStore.currentMusic.al.name}}</view>
          </view>
          <view class="part-lyric">{{playerStore.currentLyric}}</view>
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
        <view class="swiper-item lyrics">
          <scroll-view  v-if="playerStore.lyricInfos.length" class="lyric-list" scroll-y="true" 
                        :scroll-top="playerStore.currentLyricIndex * 35" 
                        scroll-with-animation>
            <template v-for="(item, index) in playerStore.lyricInfos">
              <view class="item" :class="{ 'active': playerStore.currentLyricIndex === index }"
                    :style="{ 'padding-top': (index === 0 ? (contentHeight/2-80) : 0) + 'px', 'padding-bottom': (index === playerStore.lyricInfos.length - 1 ? (contentHeight/2+80) : 0) + 'px' }">
                {{item.text}}
              </view>
            </template>
          </scroll-view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
  
  import NavBar from '@/baseui/nav-bar'
  
  import { formatDuration } from '@/util'
  
  import { usePlayerStore, useDeviceStore } from '@/store'

  const playerStore = usePlayerStore()
  const deviceStore = useDeviceStore()
  
  const currentPage = ref<number>(0)
  const contentHeight = ref<number>(0)
  const screenHeight = deviceStore.screenHeight
  const statusBarHeight = deviceStore.statusBarHeight
  const navBarheight = deviceStore.navBarHeight
  // 计算高度
  contentHeight.value = screenHeight - statusBarHeight - navBarheight
  
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
    const storageId: any = uni.getStorageSync('id')
    if(!storageId && storageId !== id.value) {
      uni.startPullDownRefresh({})
    }
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
  
  const handleLeftClick = () => {
    uni.setStorageSync('id', id.value)
    uni.navigateBack({
      delta: 1
    })
  }
  
</script>

<style lang="scss" scoped>
.music-player {
  position: relative;
  height: 100vh;
  overflow: hidden;
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
    height: 120rpx;
    color: $theme-color;
    text-align: center;
    padding: 30rpx 0;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
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

.lyrics {
  padding: 0 70rpx;
}

.lyric-list {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.lyric-list .item {
  height: 35px;
  line-height: 35px;
  font-size: 28rpx;
  text-align: center;
  color: #989898;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lyric-list .item.active {
  color: #26ce8a;
  font-size: 36rpx;
}
</style>
