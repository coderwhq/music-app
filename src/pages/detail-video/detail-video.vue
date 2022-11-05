<template>
  <view class="detail-video">
    <view class="mv-contain" v-if="videoUrl.url">
      <video class="video" :src="videoUrl.url" :autoplay="true" vslide-gesture-in-fullscreen></video>
      <view class="mv-info" v-if="videoData.artistName ?? videoData.creator">
        <text class="mvname">{{videoData.name ?? videoData.title}}</text>
        <text class="mvartisname">{{videoData.artistName ?? videoData.creator.nickname}}</text>
        <text class="otherinfo">{{`${formatCount(videoData.playCount ?? videoData.playTime)}次播放 - ${formatDate(videoData.publishTime)}`}}</text>
      </view>
    </view>
    <view class="recommend-mv" v-if="relatedVideo.length">
      <view class="recommend-title">推荐视频</view>
      <view class="recommend-contain">
        <view class="recommend-item" v-for="item in relatedVideo" :key="item.vid" @click="handleRecommendItemClick(item)">
          <view class="item-image-wrapper">
            <image class="item-image" :src="item.coverUrl" mode="heightFix"></image>
            <text class="play-count" v-if="item.coverUrl">
              <uni-icons class="icon" type="videocam" size="15" color="#fff"></uni-icons>
              <text>{{formatCount(item.playTime)}}</text>
            </text>
          </view>
          <view class="item-info">
            <text class="item-title">{{item.title}}</text>
            <text class="item-authro">{{item.creator[0].userName}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
  
  import { getVideoDetail, getVideoUrl, getRelatedVideo } from '@/service/api/index'
  
  import { formatCount, formatDate } from '@/util'
  
  const isMv = ref<boolean>(true)
  const videoId = ref<number>(0)
  const videoUrl = ref<any>({})
  const videoData = ref<any>({})
  const relatedVideo = ref<any>([])
  
  onLoad((option: any) => {
    const id = Number.parseInt(option.id)
    videoId.value = id
    uni.startPullDownRefresh({})
  })
  
  const getVideoDetailInfo = async (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    Promise.all([
      getVideoUrl(videoId.value, isMv.value),
      getVideoDetail(videoId.value, isMv.value),
      getRelatedVideo(videoId.value)
    ])
      .then((res) => {
        const [url, data, relatedVideoData]: any = res
        videoUrl.value = url.data ?? url.urls[0]
        videoData.value = data.data
        relatedVideo.value = relatedVideoData.data
        uni.stopPullDownRefresh();
      }) 
      .catch((err) => {
        console.log(err)
      })
  }
  
  onPullDownRefresh(() => {
    videoUrl.value = {}
    videoData.value = {}
    relatedVideo.value = []
    getVideoDetailInfo(false)
  })
  
  
  const handleRecommendItemClick = (item: any) => {
    isMv.value = item.vid ? false : true
    videoId.value = item.vid ?? item.id
    uni.startPullDownRefresh({})
  }
  
</script>

<style lang="scss" scoped>
  .detail-video {
    width: 100%;
  }
  .mv-contain {
    width: 100%;
  }
  .video {
    width: 100%;
  }
  .mv-info {
    width: 100%;
    padding: 20rpx 20rpx;
    display: flex;
    flex-direction: column;
    .mvname {
      font-weight: bold;
      font-size: 45rpx;
    }
    .mvartisname {
      color: $uni-color-subtitle;
      padding: 10rpx 0;
    }
    .otherinfo {
      color: $uni-color-subtitle;
      padding: 10rpx 0;
    }
  }
  .recommend-mv{
    width: 100%;
    padding: 20rpx 20rpx;
    .recommend-title{
      font-size: 35rpx;
    }
  }
  .recommend-contain {
    width: 100%;
    display: flex;
    flex-direction: column;
    .recommend-item {
      padding: 20rpx 0;
      height: 200rpx;
      display: flex;
      .item-image-wrapper {
        height: 100%;
        position: relative;
        .item-image {
          height: 100%;
          border-radius: 20rpx;
        }
        .play-count {
          position: absolute;
          bottom: 0;
          right: 10rpx;
          color: $white;
        }
      }
      .item-info {
        flex: 1;
        padding: 0 20rpx;
        display: flex;
        flex-direction: column;
        .item-title {
          font-size: 30rpx;
          font-weight: bold;
        }
        .item-authro {
          font-size: 25rpx;
          color: $uni-color-subtitle;
        }
      }
    }
  }
</style>
