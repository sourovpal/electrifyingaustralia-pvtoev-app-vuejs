<script>
export default {
  components: {
  },
  data() {
    return {
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
        <div class="tbl-custom-data-table">
          <slot></slot>
          <br><br><br><br>
        </div>
</template>

<style>
.tbl-custom-data-table{
  width:100%;
  overflow: auto;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}
</style>
