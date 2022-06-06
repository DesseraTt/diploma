<template>
    <div class="SearchPage">
        <h1> поиск треков</h1>
        <div class="searchContent">
        <h2>Пора найти что-то особенное для тебя</h2>
        <my-input type="text" class="searchInput" @input ="searchTracks(query)" v-model="query" />
        </div>
        <div class="trackInfo">
            <img :src="imageSrc(currentTrack.picture)" class="trackImage">
            <div class="trackInfoContent">
                <p class="contentItem">  Название: {{currentTrack.name}} </p>
                <p class="contentItem">  Исполнитель: {{currentTrack.artist}} </p>
                <p class="contentItem">  Прослушиваний: {{currentTrack.listens}} </p>
                <p class="contentItem">  Жанр: {{currentTrack.genre}} </p>
            </div>
        </div>
    
        <ul class="trackComments">
            <h1>comments</h1>
            <li v-for="item in currentTrack.comments" :key='item'>{{item}}</li>
        </ul>

    </div>
</template>

<script>
import TrackContainerVue from '../../components/UI/TrackContainer.vue'
import {mapActions} from 'vuex'
import MyInput from '../../components/UI/MyInput.vue'
import axios from 'axios'
    export default {
        name:'SearchPage',
        components:{TrackContainerVue,MyInput},
        computed:{
            currentTrack(){
                return this.$store.state.store.currentTrack
            } 
        },
        mounted(){
        },
        
        data(){
            return{
                 query:''
            }
        },
        methods:{
            ...mapActions({
                 searchTracks:'store/searchTracks'
            }),
            imageSrc(pic){
                return `http://localhost:5000/${pic}`
            },
        }
    }
</script>

<style lang="scss" scoped>
.contentItem{
     width: 100%;
    border-bottom: 1px solid #e8e8e8;
    padding: 5px;
}
.trackInfo{
    display:flex;
    // flex-direction: column;
    justify-content:space-around;
    align-items: center;
}
.trackInfoContent{
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: flex-end;
}
.searchInput{
    width: 80%;
    margin-bottom: 10px;
}
.SearchPage{
    padding-bottom: 20px;
}
.SearchPage h1{
    margin: 50px 0 20px 0;
}
.trackImage{
    height: 400px;
    width: 400px;
    object-fit: contain;
}
</style>