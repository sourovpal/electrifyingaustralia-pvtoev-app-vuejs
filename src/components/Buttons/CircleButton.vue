<script setup>
</script>

<template>

    <Button rounded
        severity="secondary"
        size="small" class="border-0"
        variant="outlined">
        <slot></slot>
    </Button>

</template>
<style scoped
    lang="scss">
    button {
        min-width: 2rem !important;
        width: 2rem !important;
        min-height: 2rem !important;
        height: 2rem !important;
    }
</style>