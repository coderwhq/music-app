<template>
  <view class="song-menu-header">
    <image class="bg-image" v-if="info.coverImgUrl" :src="info.coverImgUrl" mode="aspectFill"></image>
    <view class="bg-cover"></view>
    <view class="content">
      <view class="content-info">
        <view class="info-image">
          <image  v-if="info.coverImgUrl" :src="info.coverImgUrl" mode="widthFix"></image>
        </view>
        <view class="info-detail">
          <view class="title">{{info.name}}</view>
          <view class="author">
            <image class="avatar" v-if="info.avatarUrl" :src="info.avatarUrl" mode="aspectFill"></image>
            <text class="nickname">{{info.nickname}}</text>
          </view>
          <view class="description">简介：{{info.description}}</view>
        </view>
      </view>
      <view class="content-ctl">
        <view class="favor item">
          <image class="icon" mode="widthFix" src="../../static/icons/favor_icon.png"></image>
          <text class="text">{{formatCount(info.playCount)}}</text>
        </view>
        <view class="share item">
          <image class="icon" mode="widthFix" src="../../static/icons/share_icon.png"></image>
          <text class="text">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import {formatCount} from '@/util'
  defineProps({
    info: {
      type: Object,
      require: true
    }
  })
</script>

<style lang="scss" scoped>
  .song-menu-header {
    width: 100%;
    height: 450rpx;
    padding: 40rpx;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg-image {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }
  .bg-cover{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000;
    backdrop-filter: blur(5px);
    opacity: 0.5;
  }
  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    .content-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin: 0 0 30rpx 0;
      width: 100%;
      height: 210rpx;
      .info-image {
        display: flex;
        align-items: center;
        image {
          width: 220rpx;
          height: 220rpx;
          border-radius: 30rpx;
        }
      }
      .info-detail {
        padding: 10rpx 0rpx 10rpx 30rpx;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .title {
          font-size: 30rpx;
        }
        .author {
          display: flex;
          align-items: center;
          .avatar {
            width: 50rpx;
            height: 50rpx;
            border-radius: 25rpx;
          }
          .nickname {
            padding-left: 10rpx;
          }
        }
        .description {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .content-ctl {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .icon {
        width: 35rpx;
        height: 35rpx;
      }
      .item {
        display: flex;
        justify-content: center;
      }
    }
  }
  
  
</style>