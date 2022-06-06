<template>
    <div @mouseenter="openVolume" @mouseleave="closeVolume" class="volContainer">
    <input 
    class="volume" 
    type="range" 
    :min="0" 
    :max="100" 
    v-model="value" 
    @input="changeVolume(value)"
      :style="{'background':`-webkit-linear-gradient(left,#facc44 0%,#facc44 ${value}%,#e8e8e8 ${value}%,#e8e8e8 100%)`}"
     >
    <div >
    <i class="gg-volume"  v-if="!muted" @click="muteVolume"></i>
    <i class="gg-ghost-character" v-else @click="muteVolume"> </i>
    </div>
   
    
    </div>
</template>

<script>
    export default {
        mounted(){
            if(localStorage.volume)
            this.value = localStorage.volume

            this.changeVolume(this.value);
        },
        data(){
            return{
                value:10,
                tmpValue:0.0,
                muted : false

            }
        },methods:{
            openVolume(){
                document.querySelector('.volume').style.visibility = 'visible'
            },
            closeVolume(){
                document.querySelector('.volume').style.visibility = 'hidden'
            },

            changeVolume(val){
                 document.getElementById('player').volume=val/100;
                 if(val ==0.0){
                     this.muted = true
                 }
                 else{
                     this.muted = false
                 }
                 localStorage.volume = val
            },
            muteVolume(){
                if(!this.muted){
                    this.tmpValue =  document.getElementById('player').volume
                  
                     document.getElementById('player').volume=0.0
                      this.muted = true
                      
                }else{
                     document.getElementById('player').volume=this.tmpValue
                        this.muted = false
                     
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.volContainer{
    transform: translate(-50px,-145px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    width: 100px;
    height: 150px;
}
    .volume{
        visibility: hidden;
        position: absolute;
        transform: translate(5px,-30px);
        writing-mode: bt-lr; /* IE */
        -webkit-appearance:none;
    -webkit-appearance: slider-vertical; /* Chromium */
    width: 8px;
    height: 100px;
    }
    .gg-volume{
        --ggs: 1;
    }
    .gg-ghost-character{
          transform: translate(5px,5px);
    }
    .volume::-webkit-slider-thumb {
    background:#facc44;
    border-radius: 50%;
    height:15px;
    width:15px;
}
</style>