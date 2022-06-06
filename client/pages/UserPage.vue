<template>
  <form
      @submit.prevent
      class="form"
      ref="input"
  >
    <input-form
        v-model="userParams"
    />
    <div class="buttons">
      <my-button @click.native="authorize">Войти</my-button>
      <my-button @click.native="register">Зарегистрироваться</my-button>
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

        authorize(){
            this.authorization(this.userParams)
            if(this.user.isLogged){
              this.$router.push("/")
            }
        },
        register(){
           this.registration(this.user)
        },
    },

}
</script>