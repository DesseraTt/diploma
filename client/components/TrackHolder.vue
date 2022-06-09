<template>
    <div class="trackholder">
            
            <h2 v-if="activePageID!=5"> {{album.name}}</h2>
            <h2 v-else>Найдено: </h2>
            <div v-for="item in tracks" :key="item.id">
                <TrackContainer :track ="item" :index="tracks.findIndex(el=>el ==item)+1" @click.native.stop="gotoTrack"/>  
            </div>
            
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import TrackContainer from './UI/TrackContainer.vue'
   export default {
        name:"trackholder",
        components:{TrackContainer},
        
       computed:{
            tracks(){
                return this.$store.state.store.tracks
            },
             user(){
                return this.$store.state.store.user
            },
             album(){
                return this.$store.state.store.album
            },
            activePageID(){
                return this.$store.state.store.activePageID
            },
            
        },
      methods:{
            ...mapActions({
            getTracks:'store/getTracks',
            getAlbum:'store/getAlbum',
            changeActivePage:'store/changeActivePage',
            }),
            gotoTrack(){
                // this.changeActivePage(5)
                // this.getTracks(track)
            },
      },
     
      }
     
</script>

<style >
.trackholder{
    width: 450px;
    padding: 20px;
    height: 100%;
    border-left: 1px #e8e8e8 solid;
    overflow-y: auto;
}
.trackholder h2{
    margin-bottom: 10px;
}
@media (max-width:950px) {
    .trackholder{border: none;}
}
</style>