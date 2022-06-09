<template>
<div class="">
    <div class="wrapper">
        <Navbar/>
        <div class="page">
            <!-- <Nuxt style="overflow-y:scroll;overflow-x:hidden;"/>   -->
            <Nuxt/>
            <TrackHolder/>
        </div>
    </div>
      <Player/>
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
<style>

.wrapper{
    margin: 0;padding: 0 30px;
    background: #fff;
    width: 1200px;
    margin: 0 auto;
    height: 95vh;
  overflow-y:scroll ;
    flex: 1 0 auto;
    color:rgb(61, 61, 61);
}
.page{
    display: flex;

    height: 90%;
}
@media (max-width:1200px) {
    .wrapper{width:100%;}
}
@media (max-width:950px) {
    .page{display: block;}
}
</style>