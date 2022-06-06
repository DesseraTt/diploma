<template>
    <div class="album" @mouseenter="mouseIsOver=true" @mouseleave="mouseIsOver=false">
        <!-- <div class="albumImage" :style="{`background:${album.image}`}"></div> -->
        <div class="albumImage" style="background-image:url('https://i.pinimg.com/originals/42/60/64/426064e6c6f404d2663afa4c9808cee7.gif';background-size: cover;">
             <div class="controls" v-if="mouseIsOver">
                 <i class="gg-play-button-o"  ></i> 
            <i class="gg-heart"></i>
            </div>
           
        </div>
        <!-- <div class="controls">
                 <i class="gg-play-button-o"  ></i> 
            <i class="gg-heart"></i>
            </div> -->
        <p class="albumTitle">9 krutoy</p>
        <p class="albumArtist">gargamel</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                mouseIsOver:false,     
            }
        },
        
    }
</script>

<style lang="scss" scoped>
.controls{
    height: inherit;
    width: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.album{
    height: 200px;
    width: 150px;
    padding: 5px;
    margin-right: 20px;
    // display: flex;
}
.album:hover{
    cursor: pointer;
    .albumImage{background-image:none;background: rgba(0,0,0,0.6);background-image: none;};
    .gg-play-button-o,.gg-heart{opacity: 2;color:#facc44}
    // border: 1px solid #000;
}
.albumImage{
    width: 150px;
    height: 150px;
    // object-fit: cover;
}
.albumArtist{
    font-size: 12px;
}
</style>