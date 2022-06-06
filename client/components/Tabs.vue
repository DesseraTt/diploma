<template>
<nav class="nav"> 
    <ul class="navList controls">
        <li v-for="item in tabs" :key="item.id"
        @mouseenter="mouseenterChangeColor($event,item.id)"
        @mouseleave="mouseleaveChangeColor($event,item.id)"
        :class="[item.id==activeTabId ? activeTabClass : '']"
        @click="changeActiveTab(item.id)"
        >
        <div v-html="item.text">
        </div>
        </li>
    </ul>
</nav>
        
</template>

<script>
    export default {
        props:{tabs:Array},
         data() {
        return {
            activeTabId: 1,
            activeTabClass: "activeTab",
        };
    },
    methods: {
        changeActiveTab(id) {
            this.activeTabId = id;
            this.$emit('update',id);
        },
        mouseenterChangeColor(e,id){
            if (id != this.activeTabId){
                e.target.className='mouseOver'
            }
          
        },
        mouseleaveChangeColor(e,id){
            if (id != this.activeTabId){
                e.target.className='mouseLeave'
            }
        }
    },
    }
</script>

<style>
.nav{
    /* height: 100%; */
    width: 100%;
    /* margin-bottom: 30px; */
}
.navList li{
    height:  24px;
    padding: 0px 20px;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.navList{
    display: flex;
    list-style: none;
justify-content: flex-start;
align-items: flex-end; 
border-bottom: 1px solid #e8e8e8;
height: 100%;
}
.mouseOver{
    transition: .2s;
    color:#facc44;
    cursor: pointer;
}
.mouseLeave{
    transition: .2s;
    color:#000
}
.activeTab{
    position: relative;
  /* border-bottom: 3px solid #facc44; */
  cursor: default;
}
.activeTab:after{
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    display: inline-block;
    width: 100%;
    background: #facc44;
    height: 3px;
}
@media (max-width:600px) {
  .navList{display: flex;
  flex-wrap: wrap;}
}
</style>