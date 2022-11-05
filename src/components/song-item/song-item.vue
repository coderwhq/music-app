<template>
  <view class="song-item">
    <image class="image" :src="item.picUrl" mode="heightFix"></image>
    <view class="content">
      <view class="name">{{item.name}}</view>
      <view class="source">{{item.song.artists[0].name}}</view>
    </view>
    <view class="arrow">
      <image class="icon" src="../../static/icons/arrow-right.png"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    item: {
      type: Object,
      require: true
    }
  })
</script>

<style scoped lang="scss">
.song-item {
  display: flex;
  padding: 16rpx 0;
  align-items: center;
}

.image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
}

.content {
  margin-left: 16rpx;
  flex: 1;
  .name {
    font-size: 32rpx;
    color: #555;
  }
  .source {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: #999;
  }
}

.arrow .icon {
  width: 50rpx;
  height: 50rpx;
}

</style>