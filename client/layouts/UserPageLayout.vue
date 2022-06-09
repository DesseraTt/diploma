<template>
<div class="">
    <div class="wrapper">
           <Nuxt/>
    </div>
</div>
</template>

<script>
import TrackHolder from "../components/TrackHolder.vue";
   export default {
       components: { TrackHolder },
        data(){
         return{
            }
      },
      }
     
</script>
<style scoped>

.wrapper{
    margin: 0;padding: 0 30px;
    background: #fff;
    width: 1200px;
    margin: 0 auto;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   overflow-y: hidden;
}
.page{
    display: flex;

}
@media (max-width:1200px) {
    .wrapper{width:100%;}
}
@media (max-width:950px) {
    .page{display: block;}
}
</style>