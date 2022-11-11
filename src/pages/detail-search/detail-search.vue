<template>
  <view class="detail-search">
    <search-block @input="handleInput" @confirm="handleConfirm" ref="refSearchBlock"/>
    <view class="hots-wrapper" v-if="hots.length && !suggestStr.length && !songs.length">
      <area-header :show-right="false" title="热门搜索" />
      <view class="list" v-if="hots">
        <template v-for="(item, index) in hots" :key="index">
          <view class="tag" :class="{'first': index === 0}" v-if="item && item.first" @click="handleKeywordItemClick(item.first)">{{item.first}}</view>
        </template>
      </view>
    </view>
    <!-- 搜索建议 -->
    <view class="search-suggest" v-else-if="suggest.length && !songs.length">
      <area-header class="title" :show-right="false" :title="`搜索“${suggestStr}”`" />
      <template v-for="(item, index) in suggest" :key="index">
        <view class="item" @click="handleKeywordItemClick(item.keyword)">
          <uni-icons class="icon" type="search" size="20"></uni-icons>
          <text class="text">{{item.keyword}}</text>
        </view>
      </template>
    </view>
    <!-- 搜索结果 -->
    <view class="search-result" v-else-if="songs.length">
      <area-header class="area-header" :show-right="false" title="最佳匹配" />
      <template v-for="(item, index) in songs">
        <song-item-brief :item="item" :index="index + 1" @click="handleSongItemClick(item, index)" />
      </template>
    </view>
    <!-- 未匹配到内容 -->
    <view class="nothing" v-show="showNothing">
      未匹配到相关内容
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app';
  
  import SearchBlock from '@/components/search-block/search-block'
  import AreaHeader from '@/components/area-header/area-header'
  import SongItemBrief from '@/components/song-item-brief/song-item-brief'
  
  import { getSearchHot, getSearchResult, getSearchSuggest } from '@/service/api'
  
  import { usePlayerStore } from '@/store'
  import { debounce } from '@/util'
  
  const playerStore = usePlayerStore()
  
  const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)
  
  const hots = ref<any>([])
  const songs = ref<any>([])
  const suggest = ref<any>([])
  const suggestStr = ref<any>('')
  const showNothing = ref<boolean>(false)
  
  const refSearchBlock = ref<any>()
  
  onLoad(() => {
    getSearchInit()
  })
  
  const getSearchInit = () => {
    getSearchHot()
      .then((res: any) => {
        const data = res.result
        hots.value = data.hots
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  // 模糊搜索
  const handleInput = (event: any) => {
    const value: string = event.detail.value
    suggestStr.value = value
    if(!value.length) {
      suggest.value = []
      songs.value = []     
      debounceGetSearchSuggest.cancel()
      return
    }
    debounceGetSearchSuggest(value)
      .then((res: any) => {
        if(!res.result.allMatch) {
          suggest.value = []
          showNothing.value = true
          return 
        }
        showNothing.value = false
        suggest.value = res.result.allMatch
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  // 确认搜索
  const handleConfirm = (event: any) => {
    // 确认搜索
    const value: any = event.detail.value
    getSearchResult(value)
      .then((res: any) => {
        if(res.result.songCount === 0) {
          songs.value = []
          showNothing.value = true
          return 
        }
        showNothing.value = false
        songs.value = res.result.songs
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  // 关键字点击
  const handleKeywordItemClick = (item: any) => {
    // 关键字点击    
    refSearchBlock.value.contain = item
    getSearchResult(item)
      .then((res: any) => {
        songs.value = res.result.songs
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  
  const handleSongItemClick = (item: any, index: number) => {
    // 播放跳转
    // console.log(item)    
    const data: any = songs.value.map((ele: any) => {
      return ele.id
    })
    // console.log(data)
    // console.log(index)
    playerStore.initPlayListAndCurrentIndexAction(data, index)
    uni.navigateTo({
      url: `/pages/music-player/music-player?id=${item.id}`
    })
  }
  
</script>

<style lang="scss" scoped>
  .detail-search {
    padding: 0 20rpx;
  }
  .hots-wrapper {
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    .list {
      display: flex;
      flex-wrap: wrap;
      .first {
        color: $theme-color;
      }
      .tag {
        padding: 10rpx 12rpx;
        border-radius: 16rpx;
        margin-right: 20rpx;
        margin-top: 20rpx;
        background-color: #fff;
      }
    }
  }
  .search-result {
    .area-header {
      color: $theme-color;
    }
  }
  
  .search-suggest {
    padding: 10rpx;
  }
  
  .search-suggest .title {
    color: #26ce8a;
    font-size: 34rpx;
    font-weight: 700;
  }
  
  .search-suggest .item {
    display: flex;
    align-items: center;
    margin-top: 40rpx;
  }
  
  .search-suggest .item .icon {
    width: 66rpx;
    margin-left: -20rpx;
  }
  
  .search-suggest .item .text {
    font-size: 28rpx;
  }
  
  .nothing {
    padding: 20rpx 0;
    font-size: 30rpx;
    text-align: center;
  }
</style>
