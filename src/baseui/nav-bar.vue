<template>
  <view class="nav">
    <view :style="{ 'height': statusBarHeight + 'px' }"></view>
    <view class="nav-bar" :style="{ 'height': navBarHeight + 'px' }">
      <view class="left" @click="handleLeftClick">
        <slot name="left">
          <image class="icon" mode="widthFix" src="/static/icons/arrow-left.png"></image>
        </slot>
      </view>
      <view class="center">
        <slot name="title">
          {{title}}
        </slot>
      </view>
      <view class="right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  defineProps({
    statusBarHeight: {
      type: Number,
      require: true
    },
    navBarHeight: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      default: '默认标题'
    }
  })
  const emit = defineEmits(['leftClick'])
  
  const handleLeftClick = () => {
    emit('leftClick')
  }
  
</script>

<style lang="scss" scoped>
/* baseui/nav-bar/index.wxss */
.nav-bar {
  display: flex;
  text-align: center;
}

.left, .right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120rpx;
}

.left .icon {
  width: 44rpx;
  display: block;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

</style>