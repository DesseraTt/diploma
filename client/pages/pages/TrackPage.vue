<template>
    <div >
   
    <form @submit.prevent class="track Page">
    
    <my-input
        v-model="name"
        :placeholder="placeholders[0]"
    />
    <my-input
        v-model="artist"
        :placeholder="placeholders[1]"
    />
    <!-- <my-input
        v-model="genre"
        :placeholder="placeholders[2]"
    /> -->

    <div class="files">
            <div class="file">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <div class="example-1">
                <div class="form-group">
                    <label class="label">
                    <i class="material-icons">attach_file</i>
                    <span class="title" v-if="isAudioSelected"><i class="gg-check-o"></i></span>
                    <span class="title" v-else>Добавить аудио</span>
                    <input type="file" id="audiofile">
                    </label>
                </div>
                </div>
            </div>
            <div class="file">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <div class="example-1">
                <div class="form-group">
                    <label class="label">
                    <i class="material-icons">attach_file</i>
                    <span class="title" v-if="isPictureSelected"><i class="gg-check-o"></i></span>
                    <span class="title" v-else>Добавить картинку</span>
                    <input type="file" id="picturefile"  >
                    </label>
                </div>
                </div>
            </div>
 </div>
 <textarea name="" id="" cols="90" rows="10" placeholder="Текст трека" v-model="text" class="trackText"></textarea>
    <my-button @click.native="createTrack">
      Загрузить
    </my-button>
  </form>
    </div>
</template>

<script>
import axios from 'axios'
import MyInput from '../../components/UI/MyInput.vue'
import MyButton from '../../components/UI/MyButton.vue'
    export default {
        components:{MyInput,MyButton},
        data(){
            return{
                name:'',
                artist:'',
                text:'',
                genre:'',
                placeholders:["Название трека","Исполнитель","Жанр"],
                isAudioSelected:false,
                isPictureSelected:false,
            }
        },
        methods:{
             createTrack(){
                let audio = document.getElementById('audiofile')
                 let pic = document.getElementById('picturefile')
                if(this.name&&this.artist&&audio.value&&pic.value){
                    let bodyFormData=new FormData();
                        bodyFormData.append('artist',this.artist)
                        bodyFormData.append('text',this.text)
                        bodyFormData.append('picture',pic.files[0])
                        bodyFormData.append('audio',audio.files[0])
                        bodyFormData.append('name',this.name)
                        bodyFormData.append('genre',this.genre)
                        axios.post('http://localhost:5000/tracks',bodyFormData)
                        .then( resp=> {
                            console.log(resp)
                            this.name=''
                             this.artist=''
                             this.text=''
                             this.genre=''
                        audio = null
                        pic = null
                        })
                        .catch(e=>console.log(e))
                }
            },
            CheckAudioSelected(){
               let file = document.getElementById('audiofile');
                if(file.value){
                    this.isAudioSelected=true;
                }
                else{
                    this.isAudioSelected=false;
                }
            },
            CheckPictireSelected(){
               let file = document.getElementById('picturefile');
                if(file.value){
                    this.isPictureSelected=true;
                }
                else{
                    this.isPictureSelected=false;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.trackPage{
    width: inherit;
    height: inherit;
display: flex;
justify-content: center;
align-items: center;
}
.files{
    display: flex;
    align-items: center;
    justify-content: center;
}
.trackText{
width: 100%;
}
.example-1 .form-group{padding:1em;margin:1em;}
.example-1 input[type=file]{outline:0;opacity:0;pointer-events:none;user-select:none}
.example-1 .label{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:120px;border:2px dashed grey;border-radius:5px;display:block;padding:1.2em;transition:border 300ms ease;cursor:pointer;text-align:center}
.example-1 .label i{display:block;font-size:42px;padding-bottom:16px}
.example-1 .label i,.example-1 .label .title{color:grey;transition:200ms color; display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;}
.example-1 .label:hover{border:2px solid #000}
.example-1 .label:hover i,.example-1 .label:hover .title{color:#000}
</style>