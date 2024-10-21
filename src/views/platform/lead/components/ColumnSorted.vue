<script>
export default {
    props:['field', 'column', 'order']
}
</script>
<template>
    <span class="fw-bold fs-18px column-order-sorted ms-1" v-if="column == field">{{ order == 'desc'?'↓':'↑' }}</span>
</template>
<style scoped>
.column-order-sorted{
    line-height:15px;
}
</style>