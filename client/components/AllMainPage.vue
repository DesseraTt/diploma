<template>
    <div>
        <AgendaMainPage/>
        <ChartsMainPage/>
        <MoodsMainPage/>
    </div>
</template>

<script>
import AgendaMainPage from '../components/AgendaMainPage.vue'
import ChartsMainPage from '../components/ChartsMainPage.vue'
import MoodsMainPage from '../components/MoodsMainPage.vue'
    export default {
        components:{ChartsMainPage,AgendaMainPage,MoodsMainPage}
    }
</script>

<style lang="scss" scoped>

</style>