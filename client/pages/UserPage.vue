<template>
  <form
      @submit.prevent
      class="form"
      ref="input"
  >
   <div class="inputs">
    <my-input v-model="email" placeholder="email"/>
    <my-input v-model="password" type="password" placeholder="Пароль"/>
  </div>
  
    <div class="buttons">
      <my-button @click.native="authorize">Войти</my-button>
      <my-button @click.native="register" style="width:180px">Зарегистрироваться</my-button>
    </div>

  </form>

</template>
<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import InputForm from "../components/UI/InputForm.vue";
import {mapState,mapActions} from "vuex";
export  default{
    components:{MyButton,MyInput,InputForm},
    layout:"UserPageLayout",
     data(){
    return{
        email:'',
        password:'',
    }
     },
     computed:{
      user(){
                return this.$store.state.store.user
            }
     },
    methods:{
      ...mapActions({
        authorization: "store/authorization",
        registration: "store/registration"
      }),

        async authorize(){
          let user={
            email:this.email,
            password:this.password
          }
          if(user.email && user.password){
            console.log("Вход выполнен")
           await  this.authorization(user)
         
            }
           
             if(this.user.name)
                this.$router.push("/")
            // console.log("Вход не выполнен")
        },
        register(){
          this.$router.push("/RegisterPage")
        },
    },

}
</script>
<style>
.buttons{
  display:flex;
  justify-content:space-between;
  margin-top:20px;
}
</style>