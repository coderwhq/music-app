<template>
  <view>
    hhhhh
  </view>
</template>

<script setup lang="ts">
  import { test } from '@/service/music/index'
  test().then((res: any) => {
    console.log(res)
  }).catch((err: any) => {
    console.log(err)
  })
</script>

<style lang="scss">

</style>
