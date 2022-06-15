<template>
    <div class="main">
        <!-- <h1></h1> -->
        <Slider/>
        <keep-alive>
          <component :is="MainTabs.filter(item=>item.id ==activeMainPageTabID)[0].component" class="component"></component>
        </keep-alive>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import Slider from '@/components/UI/Slider.vue'
import { mapActions } from 'vuex'
    export default {
            components: { Tabs,Slider},
         data(){
      return{
         
    }
      },
      computed:{
       activeMainPageTabID(){
                return this.$store.state.store.activeMainPageTabID
            },
       MainTabs(){
                return this.$store.state.store.MainTabs
            },     
            },
      methods:{
         ...mapActions({
              changeActiveMainPageTab:'store/changeActiveMainPageTab'
          })
      }
    }
</script>

<style >
.main{
  width: 100%;
}
.main h1{
margin-top: 55px;
  margin-bottom: 25px;
}

</style>