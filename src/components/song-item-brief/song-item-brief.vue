<template>
  <view class="song-menu-detail-item" v-if="item">
   <view class="item-idx">{{index}}</view>
    <view class="item-info" v-if="item.name && (item.ar || item.artists)">
      <view class="name">{{item.name}}</view>
      <view class="source">
        <image class="icon" src="../../static/icons/sq_icon.png" mode=""></image>
        <text v-if="item.ar">{{ item.ar[0].name }}</text>
        <text v-else-if="item.artists">{{ item.artists[0].name }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    index: {
      type: Number,
      require: true
    },
    item: {
      type: Object,
      require: true
    }
  })
</script>

<style lang="scss" scoped>
/* components/song-item-v2/index.wxss */
.song-menu-detail-item {
  display: flex;
  align-items: center;
  margin: 36rpx 0 10rpx;
}

.item-idx {
  font-size: 30rpx;
  padding: 0 20rpx;
  text-align: right;
}

.item-info {
  flex: 1;
  margin-left: 16rpx;
}

.item-info .name {
  font-size: 30rpx;
}

.item-info .source {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}

.source .icon {
  width: 38rpx;
  height: 22rpx;
  margin-right: 10rpx;
}

.source .dots {
  margin: 0 6rpx;
}

</style>