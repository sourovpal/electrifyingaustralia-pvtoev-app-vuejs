<script>

import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  components: {
    vueCustomScrollbar,
},
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      }
    }
  },
  methods: {
    scrollHanle(evt) {
      // console.log(evt)
    }
  }
}
</script>

<template>

    <vue-custom-scrollbar class="tbl"  :settings="settings" @ps-scroll-y="scrollHanle">

      <slot></slot>
      
    </vue-custom-scrollbar>
  
</template>

<style>
.checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.checkbox__input {
    position: absolute;
    width: 1.375em;
    height: 1.375em;
    opacity: 0;
    cursor: pointer;
}
.checkbox__input:checked + .checkbox__icon .tick {
  stroke-dashoffset: 0;
}
.checkbox__icon {
  width: 1.375em;
  height: 1.375em;
  flex-shrink: 0;
  overflow: visible;
}
.checkbox__icon .tick {
  stroke-dasharray: 20px;
  stroke-dashoffset: 20px;
  transition: stroke-dashoffset 0.2s ease-out;
}
.checkbox__label {
  margin-left: 0.5em;
}
.tbl{
  width:100%;
  overflow: hidden;
  overflow-x: auto;
  height: calc(100vh - 115px);
}
</style>
