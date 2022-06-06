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
                <li class="btn" @click="goToPreviousTrack"><PreviousBtn/></li>
                <li class="btn" v-if="isPlaying" @click="playPause"><PlayBtn/></li>
                <li class="btn" v-else @click="playPause"><PauseBtn/></li>
                <li class="btn" @click="goToNextTrack"><NextBtn/></li>
            </div>
          
          <li class="centerControls">
              
                     <img :src="imageSrc(currentTrack.picture)" class="playerTrackPicture">
                      {{currentTrack.name}} - {{currentTrack.artist}}
            
             
            <div class="trackTimer">
                    {{this.convertSeconds(trackProgress)}}/{{this.convertSeconds(trackLength)}}
            </div>
         
           
           </li>
          
            <div class="rightControls">
                <li class="btn" @click="likeTrack"><LikeBtn/></li>
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
            } 
        },
        

    components: {PlayBtn, PauseBtn, NextBtn, PreviousBtn, LikeBtn, VolumeBtn},
    methods:{
        ...mapActions({
            playPause:'store/playPause',
            goToNextTrack:'store/goToNextTrack',
            goToPreviousTrack:'store/goToPreviousTrack',
            likeTrack:'store/likeTrack',
            changeTrackProgress:'store/changeTrackProgress',
            changeVolume:'store/changeVolume'
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
    },
}
</script>

<style >
.leftControls{
    width: 200px;
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
     width: 500px;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.player{
    margin: 0;padding: 0;
    background: #fff;
   width: 1200px;
   height: 5vh;
   margin: 0 auto;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 1vh;
    z-index: 3;
}
.playerTrackPicture{
    height: 45px;
    width: 45px;
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