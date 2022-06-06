<template>
    <div class="charts">
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
      <AlbumContainer/>
    </div>
</template>

<script>
import AlbumContainer from './UI/AlbumContainer.vue'
    export default {
        components:{
          AlbumContainer
        },
    }
</script>

<style lang="scss" scoped>
.charts{
  display: flex;
  flex-wrap: wrap;
}
</style>