<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import { useDeviceStore } from '@/store'
  
  const deviceStore = useDeviceStore()
  
  onLaunch(() => {
    console.log('App Launch')
    const res = uni.getSystemInfoSync()
    deviceStore.initDeviceInfo(res)
  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 26rpx;
  }
  #app {
    width: 100%;
    overflow-x: hidden;
  }
  image{
    will-change: transform
  }
  page {
    background-color: $uni-bg-color-grey;
  }
</style>
