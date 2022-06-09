<template>
    <div class="SearchPage">
        <div class="searchContent">
        <my-input type="text" class="searchInput" @input ="searchTracks(query)" v-model="query" placeholder="Пора найти что-то особенное для тебя"/>
        </div>
        <div class="" v-if="currentTrack">

             <div class="trackInfo" >
            <img :src="imageSrc(currentTrack.picture)" class="trackImage">
            <div class="trackInfoContent">
                <p class="contentItem">  Название: {{currentTrack.name}} </p>
                <p class="contentItem">  Исполнитель: {{currentTrack.artist}} </p>
                <p class="contentItem">  Прослушиваний: {{currentTrack.listens}} </p>
                <!-- <p class="contentItem">  Жанр: {{currentTrack.genre}} </p> -->
            </div>
        </div>
        <div class="trackTextWrapper" > 
            <p :class="[isTextOpened?openedText:notOpenedText]">{{currentTrack.text}} </p>
            <MyButton  @click.native ="showText" v-if="!isTextOpened">Показать текст</MyButton>
            <MyButton  @click.native ="showText" v-if="isTextOpened">Скрыть текст</MyButton>
        </div>

            <ul class="tags">
                    <li class="tag"> Теги трека</li>
                    <li class="tag" @click="setIsVisibleModal(true)"> <i class="gg-add"></i> </li>
                    <modal :isVisible="isVisibleModal" :setIsVisible="setIsVisibleModal">
                        <my-input style="width:300px" v-model="tagText" placeholder="Введите тег, который хотите добавить" @blur.native="addTag"/>
                    </modal>

                     <li v-for="tag in currentTrack.tags" class="tag" :key="tag._id">{{tag.text}}</li>
            </ul>

        <ul class="trackComments" >
            <h2>Комментарии</h2>
              <my-input type="text" class="searchInput" v-model="commentText" placeholder="Введите свой комментарий"/>
              <MyButton  @click.native ="addComment(commentText)">Опубликовать</MyButton>
            <li v-for="item in currentTrack.comments" :key='item._id' class="item">
                 <p class="usernameComment" v-if="item.username==user.email">Вы</p>
                <p class="usernameComment" v-else>{{item.username}}</p>
                <p class="textComment">{{item.text}}</p>
                </li>
        </ul>

        </div>
       

    </div>
</template>

<script>
import TrackContainerVue from '../../components/UI/TrackContainer.vue'
import {mapActions} from 'vuex'
import MyInput from '../../components/UI/MyInput.vue'
import MyButton from '../../components/UI/MyButton.vue'
import Modal from '../../components/UI/Modal.vue'
import axios from 'axios'
    export default {
        name:'SearchPage',
        components:{TrackContainerVue,MyInput,MyButton,Modal},
        computed:{
            currentTrack(){
                return this.$store.state.store.currentTrack
            },
            user(){
                return this.$store.state.store.user
            },tracks(){
                return this.$store.state.store.tracks
            },
            
        },
        mounted(){
            // console.log(this.currentTrack.tags)
        },
        
        data(){
            return{
                 query:'',
                 commentText:'',
                 isTextOpened:false,
                 openedText:'openedText',
                notOpenedText:'notOpenedText',
                isVisibleModal:false,
                tagText:'',
            }
        },
        methods:{
            ...mapActions({
                 searchTracks:'store/searchTracks',
                 addComment:'store/addComment',
                 addTag:'store/addTag',
            }),
            imageSrc(pic){
                return `http://localhost:5000/${pic}`
            },
            showText(){
                this.isTextOpened = !this.isTextOpened
            },
            
                setIsVisibleModal(value){
                    this.isVisibleModal = value
                },
            
            
            

        }
    }
</script>

<style lang="scss" scoped>
.tags{
    margin-top: 20px;
   display: flex;
   flex-wrap: wrap;
}
.tag{
    list-style: none;
    padding: 2px 10px;
    border-radius: 10px;
    background: #e8e8e8;
    cursor: pointer;
    margin-right: 5px;
}
.tag:hover{
    color:#facc44;
    // background: #fff;
    transition: .1s;
}
.notOpenedText{
  display:none;
  width: 50%;
  
}
.openedText{
    display:flex;
    justify-content: center;
    width: 50%;
}
.trackTextWrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
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
    margin: 30px 0;
}
.trackInfoContent{
    margin-left: 30px;
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: flex-end;
}
.searchInput{
    width: 90%;
    margin-bottom: 5px;
}
.SearchPage{
    // margin-bottom: 50px;
}
.SearchPage h1{
    margin: 50px 0 20px 0;
}
.trackImage{
     height: 250px;
    width:250px;
    object-fit: cover;
    border-radius: 50%;}
.item{
    list-style: none;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e8e8e8;
    padding: 5px;
}
.usernameComment{
    font-weight: bold;
    padding: 1PX;
  padding-left: 10px;
  padding-bottom: 5px;
  color: gray;
}
.textComment{
  padding-left: 40px;
}
</style>