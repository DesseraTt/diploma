<template>
    <div class="album" @mouseenter="mouseIsOver=true" @mouseleave="mouseIsOver=false">
        <div class="albumImage" :style="getAlbumImage(album.picture)" @click="getAlbumTracks">
        <!-- <div class="albumImage" style="'background-image:'';background-size: cover;'"> -->
             <div class="controls" >
                 <i class="gg-play-button-o"  ></i> 
            <i class="gg-heart"></i>
            </div>
           
        </div>
            <!-- <div class="controls">
                <i class="gg-play-button-o"  ></i> 
                <i class="gg-heart"></i>
            </div> -->
        <p class="albumTitle">{{album.name}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            album:{
                name:String,
                picture:String,
            },
        },
        data(){
            return{
                mouseIsOver:false,     
            }
        },
        methods:{
            getAlbumImage(pic){
                return `background-image:url('http://localhost:5000/${pic}');background-size: cover;`
            },
            getAlbumTracks(){
             console.log(this.album)
                // this.changeActivePage(5)
            },
        }
        
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
    margin-bottom: 10px;
}
.albumArtist{
    font-size: 12px;
}
</style>