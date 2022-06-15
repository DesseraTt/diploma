<template>

  <div>
    <keep-alive>
 <component :is="pages.filter(item=>item.id ==activePageID)[0].component" class="component"></component>
    </keep-alive>
  </div>
  
</template>


<script>
import  'css.gg/icons/all.css'
import Tabs from '../components/Tabs.vue'
import MainPage from '../pages/pages/MainPage.vue'
import AlbumPage from '../pages/pages/AlbumPage.vue'
import TrackPage from '../pages/pages/TrackPage.vue'
import ProfilePage from '../pages/pages/ProfilePage.vue'
import SearchPage from '../pages/pages/SearchPage.vue'
import {mapActions} from 'vuex'
export default {
    name: "IndexPage",
    components: { Tabs, MainPage,AlbumPage,TrackPage,ProfilePage,SearchPage},
    mounted(){
       this.checkLocalStorageUser();

           this.getUserAlbums(this.user._id)

    },
    computed:{ activePageID(){
                return this.$store.state.store.activePageID
            },
            pages(){
                return this.$store.state.store.pages
            },
            user(){
                return this.$store.state.store.user
            },
            },
    data(){
      return{
       
    }
      },
      methods:{
        ...mapActions({
            checkLocalStorageUser:"store/checkLocalStorageUser",
            getUserAlbums:"store/getUserAlbums",
        }),
      }
      
}
</script>

<style>
.component{
  /* padding: 0 0 0  20px; */
  width: 700px;
  margin-top: 50px;
  margin-bottom: 20px;
  height: inherit;
}
@media (max-width:1100px) {
  .component{width:600px}
}
@media (max-width:650px) {
  .component{width:100%}
}
</style>