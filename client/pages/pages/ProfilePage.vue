<template>
<div class="profilePage" >
 <div class="profileContent" v-if="user.email">
     <div class="leftsideProfile" v-if="user.picture">
            <img :src="user.picture" alt="">
            <div class="file">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <div class="example-1">
                <div class="form-group">
                    <label class="label">
                    <i class="material-icons">attach_file</i>
                    <span class="title">Сменить изображение профиля</span>
                    <input type="file" id="picturefile" @input="addProfilePicture" accept=".png,.jpeg,.jpg">
                    </label>
                </div>
                </div>
            </div>
     </div>
     <div v-else>
         <div class="file">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <div class="example-1">
                <div class="form-group">
                    <label class="label">
                    <i class="material-icons">attach_file</i>
                    <span class="title">Добавить изображение профиля</span>
                    <input type="file" id="picturefile" @input="addProfilePicture" accept=".png,.jpeg,.jpg">
                    </label>
                </div>
                </div>
            </div>
     </div>
            
        <div class="profileSideArea">
                <p class="profileLogin item">Почта: {{user.email}}</p>
                <p class="profileName item">Имя: {{user.name}}</p>
                <!-- <p class="profileNumofTracks item">Число треков: 0</p> -->
                <!-- <p class="profileNumofTracks item">Самый популярный жанр: смех</p> -->
                <p class="profileNumofTracks item">Дата регистрации: {{user.date}}</p>
                 <my-button style="width:80%;align-self:center;margin-top:20px" @click.native="logout">Выйти из профиля</my-button>
                 
        </div>
    </div>
    <div class="notLogged" v-else>
            <my-button @click.native="$router.push('/UserPage')">Перейти на страницу авторизации</my-button>
    </div>
    <!-- <AlbumPage/> -->
</div>
   
</template>

<script>
import AlbumPage from '../pages/AlbumPage.vue'
import MyButton from '../../components/UI/MyButton.vue'
import InputForm from '../../components/UI/InputForm.vue'
import  {mapActions} from 'vuex'
import axios from 'axios'
    export default {
        components:{AlbumPage,MyButton,InputForm},
        data(){
            return{
                userParams:{
                    login:'',
                    password:'',
      },
            }
        },
        computed:{
            user(){
                return this.$store.state.store.user
            }
        },
        methods:{
            logout(){
                this.logoutS()
                this.$router.push('/UserPage')
            },
            ...mapActions({
                logoutS:"store/logout",
                 authorization: "store/authorization",
                registration: "store/registration"
            }),
             authorize(){
            this.authorization(this.userParams)
              
        },
                register(){
                this.registration(this.userParams)
                },
               async addProfilePicture(e){
                    // console.log(1)
                    // console.log(e.target.files)
                    // console.log(this.user)
                    let newFormData = new FormData()
                    newFormData.append('picture',e.target.files[0])
                    newFormData.append('_id',this.user._id)
                   await  axios.post('http://localhost:5000/users/addPicture',newFormData)
                   let temp = {
                        email:this.user.email,
                          password:this.user.password,
                   }
                     this.authorization(temp)
                      
                 },
              
    }}
</script>

<style lang="scss" scoped>
.notLogged{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:50vh;
}
.item{
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    padding: 5px;
}
.profileContent{
     margin-top: 150px;
     display: flex;
     justify-content: space-around;
    //  align-items: center;
}
.profileSideArea{
    height: 200px;
    display: flex;
    flex-direction: column;
     justify-content: space-between;
    //  align-items: center;
}
.leftsideProfile img{
   
    height: 250px;
    width:250px;
    object-fit: cover;
    border-radius: 50%;

}
.file{
    display: flex;
    justify-content: center;
}
.example-1 .form-group{padding:1em;margin:1em}
.example-1 input[type=file]{outline:0;opacity:0;pointer-events:none;user-select:none}
.example-1 .label{width:150px;border:2px dashed grey;border-radius:5px;display:block;padding:1.2em;transition:border 300ms ease;cursor:pointer;text-align:center}
.example-1 .label i{display:block;font-size:42px;padding-bottom:16px}
.example-1 .label i,.example-1 .label .title{color:grey;transition:200ms color}
.example-1 .label:hover{border:2px solid #000}
.example-1 .label:hover i,.example-1 .label:hover .title{color:#000}
</style>