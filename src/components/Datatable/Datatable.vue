<script>

import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue';

import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';

export default {
  components: {
    vueCustomScrollbar,
    CustomScrollbar
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

    <!-- <vue-custom-scrollbar class="tbl"  :settings="settings" @ps-scroll-y="scrollHanle"> -->
      <CustomScrollbar>
        <slot></slot>
        <br><br><br><br>
      </CustomScrollbar>
      
    <!-- </vue-custom-scrollbar> -->
  
</template>

<style>
.tbl{
  width:100%;
  overflow: hidden;
  overflow-x: auto;
  height: calc(100vh - 105px);
  display: flex;
  flex-direction: column;
}
/* .scrollbar__wrapper,
.scrollbar__scroller{
  height: 100%;
} */
</style>
