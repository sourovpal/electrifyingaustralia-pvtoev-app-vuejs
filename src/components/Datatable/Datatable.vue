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
        wheelPropagation: false,
        wheelSpeed:0.4,
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
.tbl{
  width:100%;
  overflow: hidden;
  overflow-x: auto;
  height: calc(100vh - 115px);
}
</style>
