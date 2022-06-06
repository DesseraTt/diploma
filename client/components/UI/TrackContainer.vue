<template>
    <div class="trackItem" @mouseenter="mouseEnterEvent"  @mouseleave="mouseLeaveEvent" > 
        <div class="indexWrapper">
            <i class="gg-play-button-o"  v-if="mouseIsOver" @click.prevent.self="goTotrack(track)"></i> 
            <div class="trackIndex " v-else>{{index}}</div>
        </div>
      
        <img class="trackImage" :src="imageSrc(track.picture)" >
        <p class="trackTitle">{{track.name}} - {{track.artist}}</p>
        <i class="gg-heart" @click.stop="likeTrack"></i>
        <i class="gg-trash" @click.stop="dislikeTrack"></i>
      
    </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        data(){
            return{
               mouseIsOver:false,     
            }
        },
        props:{track:Object,index:Number},  
        methods:{
            ...mapActions({
                playTrack:'store/playTrack',
                goTotrack:'store/goTotrack'
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
                console.log('add to likes')
            },
            dislikeTrack(){
                  console.log('remove from likes')
            },
            
        }     
    }

</script>

<style scoped>
.indexWrapper{
width: 30px;
height: inherit;
}
.gg-play-button-o{
    transform: translateX(-5px);
}
.trackTitle{
  white-space: nowrap;     
     overflow: hidden;
     text-overflow: ellipsis;
     width: 50%;
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
</style>