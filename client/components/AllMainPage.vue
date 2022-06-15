<template>
    <div>
        <AlbumPage/>
        <PopularTracks/>
    </div>
</template>

<script>
import AgendaMainPage from '../components/AgendaMainPage.vue'
import ChartsMainPage from '../components/ChartsMainPage.vue'
import MoodsMainPage from '../components/MoodsMainPage.vue'
import AlbumPage from '../pages/pages/AlbumPage.vue'
import PopularTracks from '../components/UI/PopularTracks.vue'
    export default {
        components:{ChartsMainPage,AgendaMainPage,MoodsMainPage,AlbumPage,PopularTracks}
    }
</script>

<style lang="scss" scoped>

</style>