<template>
    <div class="player" > 
        <audio id="player"></audio>
        <input class="trackProgress" 
        type="range" 
        :value="trackProgress" 
        @input="changeTrackProgress($event.target.value)" 
        :max="trackLength"
        :style="{'background':`-webkit-linear-gradient(left,#facc44 0%,#facc44 ${trackProgress/trackLength*100}%,#e8e8e8 ${trackProgress/trackLength*100}%,#e8e8e8 100%)`}"
       v-if="currentTrack"
        >
        <div class="trackControls" v-if="currentTrack">
            <div  class="leftControls">
                <!-- <li class="btn" @click="goToPreviousTrack"><PreviousBtn/></li> -->
                <li class="btn" v-if="isPlaying" @click="playPause" ><PlayBtn/></li>
                <li class="btn" v-else @click="playPause"><PauseBtn/></li>
                <!-- <li class="btn" @click="goToNextTrack"><NextBtn/></li> -->
            </div>
          
          <li class="centerControls">
              
                     <img :src="imageSrc(currentTrack.picture)" class="playerTrackPicture">
                      <p class="trackname"> {{currentTrack.name}} - {{currentTrack.artist}}</p>
            
             
            <div class="trackTimer">
                    {{this.convertSeconds(trackProgress)}}/{{this.convertSeconds(trackLength)}}
            </div>
         
           
           </li>
          
            <div class="rightControls">
                <i class="gg-trash" @click.stop="dislikeTrack" v-if="isInFavourites"></i>
                <i class="gg-heart" @click.stop="likeTrack" v-else></i>
                <li class="btn"><VolumeBtn/></li>
            </div>
           
        </div>
        
    </div>
</template>

<script>
import { mapState,mapGetters,mapActions } from 'vuex'
import PlayBtn from '@/components/UI/PlayBtn.vue'
import PauseBtn from '@/components/UI/PauseBtn.vue'
import NextBtn from '@/components/UI/NextBtn.vue'
import PreviousBtn from '@/components/UI/PreviousBtn.vue'
import LikeBtn from '@/components/UI/LikeBtn.vue'
import VolumeBtn from '@/components/UI/VolumeBtn.vue'

    export default {
        computed:{
            isPlaying(){
                return this.$store.state.store.isPlaying
            },
             trackProgress(){
                return this.$store.state.store.trackProgress
            },
             trackLength(){
                return this.$store.state.store.trackLength
            },
            currentTrack(){
                return this.$store.state.store.currentTrack
            } ,
             albums(){
                return this.$store.state.store.albums
            },
             isInFavourites(){
               let a = this.albums[0].tracks.filter(item=>item ===this.currentTrack._id)
               if (a.length>0){
                   return true
               }
               return false
            },
        },
        
        mounted(){
            // window.addEventListener('keyup',this.handleKeyUp)
            // document.addEventListener('keydown',(e)=>{
            //     if (e.code=='Space'){
            //        e.preventDefault();
            //     }
               
            // })
        },
    components: {PlayBtn, PauseBtn, NextBtn, PreviousBtn, LikeBtn, VolumeBtn},
    methods:{
        ...mapActions({
            playPause:'store/playPause',
            goToNextTrack:'store/goToNextTrack',
            goToPreviousTrack:'store/goToPreviousTrack',
            likeTrack:'store/likeTrack',
            changeTrackProgress:'store/changeTrackProgress',
            changeVolume:'store/changeVolume',
            addTrackToAlbum:'store/addTrackToAlbum',
            dislikeTracks:'store/dislikeTrack',
        }),
        convertSeconds(secs){
            let hrs = 0; let mins = 0;
            while(secs >=60){
                mins+=1;
                secs-=60;
            }
            while (mins>=60){
                hrs+=1;
                mins-=60;
            }
            if (secs<10)
            secs=`0${secs}`

            if (mins<10)
            mins=`0${mins}`

            if(hrs ==0)
            return `${mins}:${secs}`
            else
            return `${hrs}:${mins}:${secs}`
        },
          imageSrc(pic){
                return `http://localhost:5000/${pic}`
            },
            handleKeyUp(e){
                if(e.code == 'Space'){
                    this.playPause()
                }
            },
             likeTrack(){
                 console.log(this.albums[0])
                 let obj={
                        album:this.albums[0],
                        track:this.currentTrack
                 }
                 console.log(obj)
                this.addTrackToAlbum(obj)
            },
             dislikeTrack(){
                this.dislikeTracks(this.currentTrack._id)
                console.log('remove from likes')
            },
    },
}
</script>

<style >
.gg-trash:hover,.gg-heart:hover{
    cursor:pointer;
    color: #facc44;
}
.trackname{
    text-overflow:ellipsis;white-space:nowrap;
    margin-right: 5px;
}
.leftControls{
    width: 100px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.rightControls{
    width: 100px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.centerControls{
     width: 550px;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.player{
    position: fixed;
    bottom: 0;
    left: 18.5%;
    margin: 0 auto;padding: 0;
    background: #fff;
   width: 1200px;
   height: 55px;
   margin: 0 auto;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 1vh;
    z-index: 3;
        color:rgb(61, 61, 61);
}
.playerTrackPicture{
    height: 50px;
    width: 50px;
    object-fit: contain;
}
.trackProgress[type='range'] {
    -webkit-appearance: none !important;
    height:7px;
}
.trackProgress::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background:#facc44;
    border-radius: 50%;
    height:9px;
    width:9px;

}
.trackProgress{
    width: 100%;
    
    /* margin-bottom: 5px; */
}
.trackControls{
     width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;;
    padding-top: 2px;
}
.btn{
    list-style: none;
    opacity: 0.7;
}
.trackTimer{
    list-style: none;
    opacity: 0.7;
}
.btn:hover{
    cursor: pointer;
    opacity: 1;
    color:#facc44;
}
@media (max-width:1200px) {
    .player{width:100%;}
}
@media (max-width:400px) {
    .trackControls{  display: flex;
    align-items: center;
    justify-content: center;
    }
    .btn{
        padding: 10px;
    }
}

</style>