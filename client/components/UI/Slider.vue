<template>
    <div id="app">
        
<span
    class="prev"
    @click="move(-1)"
  >
    <!-- <i class="fa fa-chevron-left" aria-hidden="false"></i> -->
  </span>
 

  <div class="slides">
    <transition-group 
      name="slide"
      mode="out-in"
      enter-class="slide-in"
      leave-class="slide-out"
      enter-active-class="animated slide-in-active"
      leave-active-class="animated slide-out-active"
    >
      <div
        v-for="slide in slides"
        v-if="slide.id == active"
        :key="slide.id"
      >
       {{slide.text}}
      </div>
    </transition-group>
  </div>
   <span
    class="next"
    @click="move(1)"
  >
    <!-- <i class="fa fa-chevron-right" aria-hidden="false"></i> -->
  </span>
  
</div>
</template>

<script>
    export default {
         data(){
             return{
            slides: [{id:1,text:"Привет, посмотри советы!"},
            {id:2,text:"Альбом рекомендаций уже ждет!"},
            {id:3,text:"Нажми обновить,чтобы подобрать музыку!"},
            // {id:4,text:"Посмотри его на вкладке альбомов"},
            {id:4,text:"Не забудь загрузить изображение профиля"},
            {id:5,text:"На странице трека можно оставить комментарий"},
            {id:6,text:"Добавление тегов улучшает подбор"},
            ],
            active: 1
             }
    
  },
  methods: {
    move(amount) {
      let newActive
      const newIndex = this.active + amount
      if (newIndex > this.slides.length) newActive = 1
      if (newIndex === 0) newActive = this.slides.length
      this.active = newActive || newIndex
    },
    jump(index) {
      this.active = index
    },
  }
    }
</script>

<style lang="scss" scoped>
#app{
  margin: 25px;
}
.prev,
.next {
//   position: absolute;
//   top: 50%;
color: #c0c0c0;
  width: 24px;
  height: 24px;
  border: 2px solid #c0c0c0;
  border-radius: 20px;

  margin: 0;
  cursor: pointer;
  line-height: 48px;
  text-align: center;

  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  .fa.fa-chevron-left{
  height:20px;
}

  &:hover {
    background: inherit;
    color: #fff;
    transform: scale(1.2);
  }
  
  &:active {
    transform: translate(0, 3px) scale(1.2);
  }
}



.slides {
//   font-size: 40px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 80%;
  background: #c0c0c0;
  border-radius: 10px;
//   font-weight: bold;
  
//   @media (min-width: 600px) {
//     font-size: 80px;
//   }
  
//   @media (min-width: 900px) {
//     font-size: 140px;
//   }
  
  .animated {
    transition: all 400ms;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  
  .slide-in {
    opacity: 0;
    transform: translate(-40%, -50%);
  }
  
  .slide-in-active {
    transition-delay: 150ms;
  }
  
  .slide-out {
    opacity: 1;
  }
  
  .slide-out-active {
    opacity: 0;
    transform: translate(-60%, -50%);
  }
}

.buttons {
//   position: absolute;

}

button {
  padding: 10px;
  outline: none;
  border: none;
  -webkit-appearance: none;
  background: inherit;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.2;
    cursor: no-drop;
  }
}
#app{
    height: 100px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>