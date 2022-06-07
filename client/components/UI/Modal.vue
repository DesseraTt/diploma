<template>
    <div class="modalContainer" v-if="isVisible" @click="setIsVisible(false)">
        <div class="modal" @click.stop="">
            <div class="modalContent">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            isVisible:Boolean,
            setIsVisible:Function,
        },
    }
</script>

<style lang="scss" scoped>
.modalContainer{
    z-index: 10000;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    cursor: pointer;
}
.modal{
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    overflow: hidden;
     cursor: auto;
}
</style>