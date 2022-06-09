<template>
    <div>
    <h1>тут будут Альбомы</h1>
    <div class="albums">
           <AlbumContainer v-for="item in albums" :key="item._id" :album="item" @click.native="getAlbum(item._id)"/>
    </div>
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
         albums(){
             return this.$store.state.store.albums
         },
         user(){
             return this.$store.state.store.user
         },
     },
       mounted(){
    
           this.getUserAlbums(this.user._id)
           console.log(this.user)
           console.log(this.albums)
      },
      methods:{
          ...mapActions({
            getTracks:'store/getTracks',
            getAlbum:'store/getAlbum',
            getUserAlbums:'store/getUserAlbums',
            changeActivePage:'store/changeActivePage',
            }),
      }
    }
</script>

<style lang="scss" scoped>
.albums{
    display: flex;
    flex-wrap: wrap;

    margin: 20px;
}
</style>