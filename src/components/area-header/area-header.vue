<template>
  <view class="area-header">
    <view class="left">
        <text class="title">{{title}}</text>
    </view>
    <view class="right" v-if="showRight">
      <slot name="right">
        <text>更多</text>
        <image class="icon" src="../../static/icons/arrow-right.png" mode=""></image>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    showRight: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '查看更多'
    }
  })
</script>

<style lang="scss" scoped>
  .area-header {
    width: 100%;
    height: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    text {
      font-size: 30rpx;
    }
    .left {
      .title {
        font-weight: bold;
        font-size: 40rpx;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .icon {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
</style>