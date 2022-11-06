<template>
  <view class="home">
    <!-- 搜索框，不可用 -->
    <view class="search-wrapper">
      <search-block :disabled="true" @click="handleSearchBlockClick"></search-block>
    </view>
    <!-- 轮播图 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <template v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <image class="banner-image" :src="item.pic" mode="heightFix"></image>
        </swiper-item>
      </template>
    </swiper>
    <!-- 发现音乐 -->
    <!-- /personalized/newsong -->
    <view class="find-song" v-if="personalizedNewsong">
      <area-header title="发现音乐" :show-right="false" @click="handleMoreClick"/>
      <view class="song-list">
        <template v-for="item in personalizedNewsong" :key="item.id" >
          <song-item :item="item" @click="handleMucisClick"/>
        </template>
      </view>
    </view>
    <!-- 热门歌单 -->
    <!-- /top/playlist -->
    <song-menu-area title="热门歌单" :song-menu="topPlaylist" />
    <!-- 推荐歌单 -->
    <!-- /personalized -->
    <song-menu-area title="热门歌单" :song-menu="recommendPlaylist" />
    <!-- 巅峰榜 -->
    <!-- /playlist/hot -->
    <view class="ranking">
      <area-header title="巅峰榜" :show-right="false" />
      <view class="ranking-list" v-if="rankingStore.getRankSongMenu">
        <template v-for="item in rankingStore.getRankSongMenu" :key="item.id">
          <ranking-area-item :item="item" v-if="item.tracks && item.tracks.length" @click="handleRankingItemClick(item.id)" />
        </template>
      </view> 
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
  
  import SearchBlock from '@/components/search-block/search-block'
  import AreaHeader from '@/components/area-header/area-header'
  import SongItem from '@/components/song-item/song-item'
  import SongMenuArea from '@/components/song-menu-area/song-menu-area'
  import RankingAreaItem from '@/components/ranking-area-item/ranking-area-item'
  
  import { useRankingStore } from '@/store/index'
  import { 
            getBanner,
            getPersonalizedNewsong, 
            getTopPlaylist, 
            getRecommendPlaylist, 
            getPlaylistRank,
          } from '@/service/api/index'
  
  const rankingStore = useRankingStore()
  
  const banner = ref<any>()
  const personalizedNewsong = ref<any>()
  const topPlaylist = ref<any>()
  const recommendPlaylist = ref<any>()
  const playlistRankIdArr = ref<any>()
  
  onLoad(() => {
    uni.startPullDownRefresh({})
  })
  
  const getHomeData = async (isPullDown: boolean) => {
    isPullDown && uni.startPullDownRefresh({})
    Promise.all([
      getBanner(),
      getPersonalizedNewsong(),
      getTopPlaylist(),
      getRecommendPlaylist(),
      getPlaylistRank()
    ])
      .then(async (res) => {
        const [ 
                bannerData, 
                personalizedNewsongData,
                topPlaylistData,
                recommendPlaylistData,
                playlistRankData
              ]: any = res
        banner.value = bannerData.banners
        personalizedNewsong.value = personalizedNewsongData.result.slice(0, 6)
        topPlaylist.value = topPlaylistData.playlists.slice(0, 6)
        recommendPlaylist.value = recommendPlaylistData.result.slice(0, 6)
        playlistRankIdArr.value = playlistRankData.list.slice(0, 4).map((item: any) => {
          return item.id;
        })
        await rankingStore.getRankSongMenuAction(playlistRankIdArr.value)
        uni.stopPullDownRefresh()
      })
      .catch((err) => {
        console.log(err)
        uni.stopPullDownRefresh()
      })
  }
  
  
  onPullDownRefresh(() => {
    banner.value = []
    personalizedNewsong.value = []
    topPlaylist.value = []
    recommendPlaylist.value = []
    playlistRankIdArr.value = []
    getHomeData(false)
  })
  
  
  const handleSearchBlockClick = () => {
    // 搜索跳转
    uni.navigateTo({
      url: '/pages/detail-search/detail-search'
    })
  }
  
  const handleMoreClick = () => {
    // 更多跳转
  }
  
  const handleMucisClick = () => {
    // 音乐跳转
  }
  
  const handleRankingItemClick = (id: any) => {
    // 巅峰榜跳转
    uni.navigateTo({
      url: `/pages/detail-songs/detail-songs?type=rank&id=${id}`
    })
  }
  
</script>

<style lang="scss" scoped>
  .home {
    padding: 0 20rpx;
  }
  .search-wrapper{
    padding: 20rpx 0;
  }
  .swiper {
    border-radius: 40rpx;
    overflow: hidden;
  }
  .banner-image {
    height: 100%;
  }
  .find-song {
    .song-list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
