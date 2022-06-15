<template>
    <div>
        <h1>Популярно сейчас</h1>
        <div class="" v-if="tracks.length==0"></div>
         <div v-for="item in tracks" :key="item._id" v-else>
                <TrackContainer :track ="item" :index="tracks.findIndex(el=>el ==item)+1" />  
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import TrackContainer from './TrackContainer.vue'
import axios from 'axios'
    export default {
        components:{TrackContainer},
        data(){
            return{
                tracks:[],
            }
           
        },
        methods:{
            async getTracks(){
                console.log(this.tracks)
              await axios.get('http://localhost:5000/tracks/').then(resp=>this.tracks=resp.data)
            //    console.log(resp.data)
               console.log(this.tracks)
            }
        },
        mounted(){
            this.getTracks()
        },
    }
</script>

<style lang="scss" scoped>

</style>