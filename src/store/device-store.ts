import { defineStore } from 'pinia'

const useDeviceStore = defineStore("deviceStore", {
  state(): any{
    return {
      
      // 设备信息
      screenHeight: 0,
      screenWidth: 0,
      statusBarHeight: 0,
      navBarHeight: 44
      
    }
  },
  actions: {
    initDeviceInfo(res: any) {
      this.screenHeight = res.screenHeight
      this.screenWidth = res.screenWidth
      this.statusBarHeight = res.statusBarHeight
    }
  }
})

export default useDeviceStore
