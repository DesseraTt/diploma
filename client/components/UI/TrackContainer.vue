<template>
    <div class="trackItem" @mouseenter="mouseEnterEvent"  @mouseleave="mouseLeaveEvent" > 
        <div class="indexWrapper">
            <i class="gg-play-button-o"  v-if="mouseIsOver" @click.prevent.self="goTotrack(track)"></i> 
            <div class="trackIndex " v-else>{{index}}</div>
             <img class="trackImage" :src="imageSrc(track.picture)" >
        </div>
      
       
        <p class="trackTitle">{{track.name}} - {{track.artist}}</p>
      <div class="btns">
        <i class="gg-trash" @click.stop="dislikeTrack" v-if="isInFavourites"></i>
          <i class="gg-heart" @click.stop="likeTrack" v-else></i>
      
      </div>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        data(){
            return{
               mouseIsOver:false,
            //    isInFavourites:false,     
            }
        },
        computed:{
            album(){
                return this.$store.state.store.album
            },
            albums(){
                return this.$store.state.store.albums
            },
            //is in favourites
            isInFavourites(){
                // console.log(this.albums)
                if(this.albums.length>0){
               let a = this.albums[0].tracks.filter(item=>item ==this.track._id)
            //    console.log(2)
               if (a.length>0){
                   return true
               }
               return false}
            },
            },
        props:{track:Object,index:Number},
        methods:{
            ...mapActions({
                playTrack:'store/playTrack',
                goTotrack:'store/goTotrack',
                addTrackToAlbum:'store/addTrackToAlbum',
                dislikeTracks:'store/dislikeTrack',
            }),
            imageSrc(pic){
                return `http://localhost:5000/${pic}`
            },
            mouseEnterEvent(){
                this.mouseIsOver=true;
            },
            mouseLeaveEvent(){
                this.mouseIsOver=false;
            },
            likeTrack(){
                  let obj={
                        album:this.albums[0],
                        track:this.track
                 }
                this.addTrackToAlbum(obj)
            },
            dislikeTrack(){
                this.dislikeTracks(this.track._id)
                console.log('remove from likes')
            },
            // checkIfInFavourites(){
            //    let a = this.albums[0].tracks.filter(item=>item ===track._id)
            //    if (a.length>0){
            //        isInFavourites= false
            //    }
            //    isInFavourites= true
            // }
            
        }     
    }

</script>

<style scoped>
.indexWrapper{
width: 75px;
height: inherit;
display: flex;
justify-content: space-between;
align-items: center;
}
.gg-play-button-o{
    transform: translateX(-5px);
}
.trackTitle{
  white-space: nowrap;     
     overflow: hidden;
     text-overflow: ellipsis;
     width: 80%;
        font-size: 14px;
}
.gg-play-button-o:hover,.gg-heart:hover,.gg-trash:hover{
    cursor: pointer;
    color: #facc44;
    /* background: #facc44; */
}
.trackImage{
    height: 30px;
    width: 30px;
    object-fit: cover;
    margin: 0 5px; 
}
.trackItem{
    display: flex;
    align-items: center;
    justify-content: space-between  ;
    width: 100%;
    margin-bottom: 10px;
}
.btns{
    margin-left: 5px;
}
</style>