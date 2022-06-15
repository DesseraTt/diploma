<template>
  <button class="btn">
    <slot class="text"></slot>
  </button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  width: 160px;
  height: 42px;
  margin: 5px;
  padding: 13px 15px;
  background: #fff;
  /* color: #facc44; */
  border: 1px solid #facc44;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 3px 0px rgba(34, 60, 80, 0.2);
}
.btn:hover{
  border: 2px solid #facc44;
  color:black;
  background: #c0c0c0;
  transition: .2s;
  box-shadow: 3px 3px 4px 0px rgba(34, 60, 80, 0.2);
 }
 .text{
  display: flex;
  align-items: center;
  justify-content: center;
 }
</style>