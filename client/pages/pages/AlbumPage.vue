<template>
    <div>
    <h1>Ваши альбомы</h1>
    <div class="albums">
        <div class="refresh">
            <MyButton style="height:150px" @click.native="setIsVisibleTags(true)">Обновить рекомендации</MyButton>
        </div>
           <AlbumContainer v-for="item in albums" :key="item._id" :album="item" @click.native="getAlbum(item._id)"/>
    </div>



<!-- //modal -->
    <Modal :isVisible="isVisibleTags" :setIsVisible="setIsVisibleTags">
        <div class="modalContent">
            <h2>Здесь вы видите самые популярные теги пользователей</h2>
            <ul class="tags">
                     <li v-for="tag in tags" class="tag" :key="tag._id">
                         <label :for="tag._id">
                              {{tag.text}}
                        <input type="checkbox" v-model="selectedTags" :id="tag._id" :name="tag.text" :value="tag._id"/>
                        </label>
                    </li>
                       
            </ul>
          
            <!-- <my-button @click.native="submitTags">Подобрать музыку</my-button> -->
        </div>
    </Modal>
    </div>
</template>

<script>
   import AlbumContainer from '../../components/UI/AlbumContainer.vue'
   import Modal     from '../../components/UI/Modal.vue'
   import MyButton from '../../components/UI/MyButton.vue'
   import {mapActions} from 'vuex'
   import axios from 'axios'
    export default {
     components:{AlbumContainer,Modal,MyButton},
     data(){
        return{
                    isVisibleTags:false,
                    
        tags:[],
        selectedTags:[],
        }
     },
     computed:{
         album(){
             return this.$store.state.store.album
         },
         albums(){
             return this.$store.state.store.albums
         },
         user(){
             return this.$store.state.store.user
         },
     },

      methods:{
          ...mapActions({
            getTracks:'store/getTracks',
            getAlbum:'store/getAlbum',
            getUserAlbums:'store/getUserAlbums',
            changeActivePage:'store/changeActivePage',
            addTrackToAlbum:'store/addTrackToAlbum',
            }),
             async submitTags(){
        try{
            this.isVisibleTags=false
            let reqBody={
                tags:this.selectedTags
            }
            await axios.post('http://localhost:5000/tracks/recommend',reqBody)
            .then(res=>{
                // console.log(res.data)
                res.data.forEach(track=>{
                // console.log(track)
                // console.log(track)
                let reqTrack={
                    track:track,
                    album:this.albums[1]
                }
                this.addTrackToAlbum(reqTrack)
            })
                          
            })
            .catch(err=>{
                console.log(err)
            })
            // console.log(tracks)
           

            }catch(err){
                console.log(err)
            }
            
        }, async setIsVisibleTags(value){
                // console.log(value)
                    this.isVisibleTags = value
                     if(value==true){
                        await this.getTags()
                    }
                    else{
                        this.submitTags()
                    }
        },
         async  getTags(){
                let response= await axios.post("http://localhost:5000/tracks/popular")
                let tags= await response.data
                this.tags=tags
            }
      },
      mounted(){
         this.getTags();
        },
    }
</script>

<style lang="scss" scoped>
.albums{
    display: flex;
    flex-wrap: wrap;

    margin: 20px;
}
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
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
}
.inputs{
    width: 500px;
}
.buttons{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:5px;
}
.agreement{
    margin-top:20px ;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 70px;
}
.agreement span{
    width: 100%;
    /* word-wrap: wrap; */
    /* color: bisque; */
}
.agreementText{
    text-indent: 20px;
    margin-top: 30px;
}
.modalContent{
    width: 600px;
    height: 300px;
}
</style>