<template>
  <view class="song-menu-item">
    <view class="item">
      <view class="top">
        <image class="image" mode="widthFix" :src="item.coverImgUrl || item.picUrl"></image>
        <view class="play-counter">{{formatCount(item.playCount)}}</view>
      </view>
      <view class="bottom">
        {{item.name}}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { formatCount } from '@/util'
  defineProps({
    item: {
      type: Object,
      require: true
    }
  })
</script>

<style lang="scss">
  
  .item {
    display: inline-block;
    width: 100%;
  }
  
  
  .top {
    position: relative;
  }
  
  .top .image {
    width: 100%;
    border-radius: 12rpx;
    background-size: cover;
  }
  
  .top .play-counter {
    position: absolute;
    right: 0;
    bottom: 10rpx;
    color: #fff;
    font-size: 22rpx;
    border-radius: 12rpx;
    padding: 6rpx 10rpx;
    background: rgba(0,0,0, .5);
  }
  
  .item .bottom {
    width: 100%;
    font-size: 26rpx;
  
    /* 显示两行 */
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    overflow: hidden;
  }
  
</style>