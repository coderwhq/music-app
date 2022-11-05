<template>
  <view class="search-block">
    <uni-icons class="search-icon" type="search" size="20"></uni-icons>
    <input 
          class="input" 
          confirm-type="search" 
          type="text" 
          placeholder="搜索你喜欢的歌曲" 
          :disabled="disabled" 
          v-model="value" 
          @confirm="hanldeConfirm"
          @input="handleInput"
    />
  </view>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  defineProps({
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['confirm', 'input'])
  
  const value = ref('')
  
  const hanldeConfirm = (event: any) => {
    emit('confirm', event)
  }
  const handleInput = (event: any) => {
    emit('input', event)
  }
</script>

<style scoped lang="scss">
  .search-block {
    position: relative;
    // background-color: red;
  }
  .input {
    background-color: #fff;
    height: 90rpx;
    text-indent: 50rpx;
    border-radius: 50rpx;
    font-size: 40rpx;
  }
  .search-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 10rpx;
  }
</style>