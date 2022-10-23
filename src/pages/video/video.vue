<template>
  <view class="video" v-if="topMvList.length">
    <view v-for="item in topMvList" class="item" @click="handleMvItemClick(item)">
      <video-item :item="item" :key="item.id" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  
  import VideoItem from '@/components/video-item/video-item'
  
  import { getTopMv } from '@/service/api'
  
  const topMvList = ref<any>([])
  const offset = ref(0)
  const limit = ref(20)
  
  onLoad(() => {
    uni.startPullDownRefresh({})
  })
  
  const getTopMvList = async (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    const res: any = await getTopMv(offset.value, limit.value)
    topMvList.value.push.apply(topMvList.value, res.data)
    uni.stopPullDownRefresh();
  }
  
  onReachBottom(() => {
    offset.value += 20
    getTopMvList(false)
  })
  
  onPullDownRefresh(() => {
    offset.value = 0
    topMvList.value = []
    getTopMvList(false)
  })
  
  const handleMvItemClick = (item: any) => {
    uni.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`
    })
  } 
  
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .item {
    width: 48%;
    padding: 10rpx 0;
  }
}
</style>
