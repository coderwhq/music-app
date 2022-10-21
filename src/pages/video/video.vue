<template>
  <view class="video">
    <view v-for="item in topMvList" class="item" >
      <video-item :item="item" :key="item.id" />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  
  import VideoItem from '@/components/video-item/video-item'
  
  import { getTopMv } from '@/service/api'
  
  const topMvList = ref<any>([])
  const offset = ref(0)
  const limit = ref(20)
  const getTopMvList = async (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    const res: any = await getTopMv({
      data: {
        offset: offset.value,
        limit: limit.value
      }
    })
    topMvList.value.push.apply(topMvList.value, res.data)
    isPullDown && uni.stopPullDownRefresh();
  }
  getTopMvList(true)
  
  onReachBottom(() => {
    offset.value += 20
    getTopMvList(false)
  })
  
  onPullDownRefresh(() => {
    offset.value = 0
    topMvList.value = []
    getTopMvList(true)
  })
  
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
