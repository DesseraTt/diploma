<template>
  <form
      @submit.prevent
      class="form"
      ref="input"
  >
  <div class="inputs">
    <my-input v-model="name" placeholder="Имя"/>
    <my-input v-model="email" placeholder="email"/>
    <my-input v-model="password" type="password" placeholder="Пароль"/>
    <my-input v-model="password2" type="password" placeholder="Повторите пароль"/>
  </div>
    

    <div class="agreement">
        <div class="">
            <input type="checkbox" v-model="cookies"/>
            <span>Мы используем файлы cookie, чтобы вам было удобно пользоваться нашим сайтом</span>
        </div>
        <div class="">
            <input type="checkbox" v-model="agreement"/>
            <span>Я принимаю условия <a href="#" @click="setIsVisibleModal(true)">пользовательского соглашения</a></span>
        </div>
    </div>

    <div class="buttons">
      <my-button @click.native="register">Зарегистрироваться</my-button>
    </div>
    
    <Modal :isVisible="isVisibleModal" :setIsVisible="setIsVisibleModal">
        <div class="modalContent">
            <h2>Пользовательское соглашение</h2>
            <div class="agreementText">
            Это пользовательское соглашение об использовании нашего сайта.
            Использование на данном сайте музыки и изображений <b>НЕ</b> согласовано с правообладателями.
            Все аудиофайлы и изображния взяты из интернета в учебных целях!!!
            </div>
        </div>
    </Modal>

    
  </form>

</template>
<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import InputForm from "../components/UI/InputForm.vue";
import {mapState,mapActions} from "vuex";
import Modal from "@/components/UI/Modal.vue";
import axios from 'axios';
export  default{
    components:{MyButton,MyInput,InputForm,Modal},
    layout:"UserPageLayout",
    
     data(){
    return{
        password:'',
         password2:'',
        email:'',
        name:'',
        agreement:false,
        cookies:false,
        isVisibleModal:false,

    }
     },
     computed:{
      user(){
                return this.$store.state.store.user
            },albums(){
                return this.$store.state.store.albums
            },
     },
     
    methods:{
      ...mapActions({
        authorization: "store/authorization",
        registration: "store/registration",
        addTrackToAlbum: "store/addTrackToAlbum",
        changeActivePage: "store/changeActivePage",
      }),
        validateEmail(text){
            return text.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)
        },

       async  register(){
            if(this.password!=this.password2){
                alert("Пароли не совпадают");
                return;
            }
            if(!this.agreement){
                alert("Вы не приняли условия пользовательского соглашения");
                return;
            }
            if(!this.cookies){
                alert("Вы не приняли условия пользовательского соглашения");
                return;
            }
            if(!this.validateEmail(this.email)){
                alert("Не верный email");
                return;
            }
            if(this.name&&this.validateEmail(this.email)&&this.password&&this.password===this.password2&&this.agreement&&this.cookies){
                let reqUser={
                    name:this.name,
                    email:this.email,
                    password:this.password
                }
               await this.registration(reqUser)
                // this.isVisibleTags=true
                this.changeActivePage(1)
                  this.$router.push("/")
            }else{
               alert("Некорректные данные)")
               return
            }
        },
      


         setIsVisibleModal(value){
                    this.isVisibleModal = value
                   
        },
       
  },
    

}
</script>
<style >
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