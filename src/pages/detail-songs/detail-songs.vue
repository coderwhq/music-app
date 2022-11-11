<template>
  <view class="detail-songs">
    <template v-if="type === 'rank'">
      <view class="area-header-wrapper">
        <area-header :title="songinfo.name" :show-right="false" />
      </view>
    </template>
    <template v-else-if="type === 'menu'">
      <song-menu-header v-if="songinfo" :info="songinfo"/>
    </template>
    
   <template v-if="songs && songs.tracks && songs.tracks.length">
      <template v-for="(item, index) in songs.tracks" :key="item.id">
        <song-item-brief :item="item" :index="index + 1" @click="handleSongItemClick(item, index)"/>
      </template>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
  
  import AreaHeader from '@/components/area-header/area-header'
  import SongItemBrief from '@/components/song-item-brief/song-item-brief'
  import SongMenuHeader from '@/components/song-menu-header/song-menu-header'
  
  import { useRankingStore, usePlayerStore } from '@/store'
  
  import { getPlaylistDetail } from '@/service/api'
  
  const rankingStore = useRankingStore()
  const playerStore = usePlayerStore()
  
  const type = ref<string>()
  const id = ref<number>()
  const songinfo = ref<any>()
  const songs = ref<any>()
  
  onLoad((option: any) => {
    type.value = option.type
    id.value = parseInt(option.id)
    if(option.type === 'rank') {
      songs.value = rankingStore.getMenuById(id.value)
      songinfo.value = {
        name: songs.value.name
      }
    } else {
      uni.startPullDownRefresh({})
    }
  })
  
  const getDetailSongsData = (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    getPlaylistDetail(id.value)
      .then((res: any) => {
        const data  = res.playlist
        songs.value = data
        songinfo.value = {
          name: data.name,
          coverImgUrl: data.coverImgUrl,
          nickname: data.creator.nickname,
          description: data.description,
          avatarUrl: data.creator.avatarUrl,
          playCount: data.playCount
        }
        uni.stopPullDownRefresh()
      })
      .catch((err: any) => {
        console.log(err)
        uni.stopPullDownRefresh()
      })
  }
  
  onPullDownRefresh(() => {
    songs.value = {}
    getDetailSongsData(false)
  })
  
  const handleSongItemClick = (item: any, index: number) => {
    // 播放跳转
    // console.log(item)
    const data: any = songs.value.tracks.map((ele: any) => {
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
  .area-header-wrapper{
    padding: 0 20rpx;
  }
</style>