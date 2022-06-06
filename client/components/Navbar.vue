<template>
    <header class="header">
        <Tabs  :tabs="pages" @update="changeActivePage"/>
        <div class="imgNav">
            <img src="@/assets/img/D2fC.gif" alt=""> 
        </div>
        
    </header>
</template>

<script>
import Tabs from '../components/Tabs.vue'
import { mapActions } from 'vuex'
    export default {
        name:"Navbar",
        components: { Tabs },
        data(){
         return{
    }
      },
      computed:{
       pages(){
                return this.$store.state.store.pages
            },     
            },
      methods:{
          ...mapActions({
              changeActivePage:'store/changeActivePage'
          })
      }
      
    }
</script>

<style >
.imgNav{
   width: 50px;
   height: auto;
}
.imgNav img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.header{
background: #fff;
height: 50px;
display: flex;
/*  */
justify-content: space-between;
align-items: center;
/* margin-bottom: 35px; */
/* margin-bottom: 70px; */
}




</style>