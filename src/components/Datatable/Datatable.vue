<script>
import CustomScrollbar from 'custom-vue-scrollbar';
export default {
  components: {
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
      <CustomScrollbar thumbWidth="8" :simulateScroll="true">
        <slot></slot>
        <br><br><br><br>
      </CustomScrollbar>
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
