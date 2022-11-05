<template>
  <area-header :title="title" :show-right="false"></area-header>
  <scroll-view scroll-x class="menu-list">
    <template v-for="item in songMenu" :key="item.id">
      <song-menu-item :item="item" class="menu-item" @click="handleMenuItemClick(item)"></song-menu-item>
    </template>
  </scroll-view>
</template>

<script lang="ts" setup>
  import SongMenuItem from '@/components/song-menu-item/song-menu-item'
  defineProps({
    songMenu: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      default: ''
    }
  })
  
  const handleMenuItemClick = (item: any) => {
    // 歌单跳转
    uni.navigateTo({
      url: `/pages/detail-songs/detail-songs?type=menu&id=${item.id}`
    })
  }
</script>

<style lang="scss" scoped>
  .menu-list {
    width: 100vw;
    white-space: nowrap;
    position: relative;
    left: -20rpx;
  }
  
  .menu-item {
    display: inline-block;
    vertical-align: top;
    width: 220rpx;
    margin-left: 20rpx;
  }
  
  .menu-item:last-of-type {
    margin-right: 20rpx;
  }
</style>