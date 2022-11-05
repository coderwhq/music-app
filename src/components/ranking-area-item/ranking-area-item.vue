<template>
  <view class="item">
    <view class="content">
      <view class="content-title" v-if="item.name">{{item.name}}</view>
      <view class="content-list" v-if="item.tracks && item.tracks.length">
        <template v-for="index in [0, 1, 2]" :key="index">
          <view class="content-list-item" v-if="item.tracks[index]">
            <text v-if="item.tracks[index].name">{{index+1}}. {{item.tracks[index].name}}</text>
            <text class="singer" v-if="item.tracks[index].ar && item.tracks[index].ar[0].name"> - {{item.tracks[index].ar[0].name}}</text>
          </view>
        </template>
      </view>
    </view>
    <view class="album" v-if="item.coverImgUrl">
      <image class="image" :src="item.coverImgUrl" mode="aspectFill"></image>
      <view class="play-counter">{{item.playCount}}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    item: {
      default: Object,
      require: true
    }
  })
  // console.log(props.item)
</script>

<style lang="scss" scoped>
  
.item {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  width: 100%;
}

.content {
  padding: 24rpx;
  flex: 1;
  /* min-width: 0; */
  overflow: hidden;
}

.content-title {
  font-size: 34rpx;
}

.content-list {
  font-size: 24rpx;
  width: 100%;
  margin-top: 6rpx;
}

.content-list-item {
  color: #333;
  margin-top: 6rpx;
  width: 100%;

  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-emphasis: none;
}

.content-list-item .singer {
  color: #999;
}

.album {
  position: relative;
  width: 220rpx;
  display: flex;
}

.album .image {
  width: 100%;
  height: 100%;
  display: block;
}

.album .play-counter {
  position: absolute;
  right: 0;
  bottom: 0rpx;
  color: #fff;
  font-size: 22rpx;
  border-radius: 12rpx;
  padding: 6rpx 10rpx;
  background: rgba(0,0,0,.5);
}


  
</style>