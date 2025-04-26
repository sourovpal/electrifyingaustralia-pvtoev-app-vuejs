<script setup>
  const props = defineProps({
    height: { type: String, default: '100vh' }
  });
</script>

<template>

  <div :style="{ height: height }"
    class="tbl-custom-data-table">

    <slot></slot>

    <br><br><br><br>

  </div>

</template>

<style scoped
  lang="scss">
  .tbl-custom-data-table {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
</style>