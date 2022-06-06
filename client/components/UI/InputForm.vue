<template>
  <div class="inputContainer">
    <my-input
        name="login"
        v-model="user.login"
        type="text"
        placeholder="Логин"
        class="inp"
        @input="updateInput"
    ></my-input>
    <my-input
        name="password"
        v-model="user.password"
        type="password"
        placeholder="Пароль"
        class="inp"
        @input="updateInput"
    ></my-input>

  </div>
</template>

<script>

import MyInput from "@/components/UI/MyInput";

export default {
  components:{MyInput},
  name: "InputForm",
  data(){
    return{
      user: {
        login: '',
        password: '',
      }
    }
  },
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput() {
      this.$emit('input', this.user)
    }
  }
}
</script>

<style scoped>
.inputContainer{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inp{
  width: 300px;
}
</style>