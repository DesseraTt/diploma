<template>
    <div>
    <h1>тут будут Альбомы</h1>
    <AlbumContainer :album ="album"/>
    </div>
</template>

<script>
   import AlbumContainer from '../../components/UI/AlbumContainer.vue'
   import {mapActions} from 'vuex'
    export default {
     components:{AlbumContainer},
     computed:{
         album(){
             return this.$store.state.store.album
         },
         user(){
             return this.$store.state.store.user
         },
     },
       mounted(){
           this.getAlbum(this.user.albums[0]);
        //    console.log(this.user)
      },
      methods:{
          ...mapActions({
            getTracks:'store/getTracks',
            getAlbum:'store/getAlbum',
            changeActivePage:'store/changeActivePage',
            }),
      }
    }
</script>

<style lang="scss" scoped>

</style>