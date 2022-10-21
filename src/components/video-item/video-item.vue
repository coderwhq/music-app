<template>
  <view class="video-item">
    <view class="album">
      <image class="image" :src="item.cover" mode="widthFix"></image>
      <view class="info">
        <view class="playcount">
          <uni-icons class="icon" type="videocam" size="20" color="#fff"></uni-icons>
          <text>{{item.playCount}}</text>
        </view>
        <view class="duration">{{item.mv.videos[0].duration}}</view>
      </view>
    </view>
    <view class="content">
      {{item.name}} - {{item.artistName}}
    </view>
  </view>
</template>

<script lang="ts" setup>
  
  defineProps({
    item: Object
  })
  
</script>

<style lang="scss">
  .video-item {
    width: 100%;
  }
  .album {
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
    display: flex;
    .image {
      width: 100%;
    }
    .info{
      width: 100%;
      padding: 0 10rpx;
      position: absolute;
      bottom: 8rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $white;
      .playcount {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .duration {
      }
    }
    
  }
</style>