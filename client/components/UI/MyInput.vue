<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" :placeholder="placeholder">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue:String,
    placeholder:String,
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
  border: 1px solid #facc44;
  border-radius: 5px;
}
</style>