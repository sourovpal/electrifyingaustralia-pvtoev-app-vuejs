<script setup>

    const props = defineProps({
        loading: { type: [Number, Boolean], default: false },
        iconCss: { type: Object, default: {} }
    });

    const emits = defineEmits(['click']);

</script>

<template>

    <Button rounded
        class="border-0"
        severity="secondary"
        size="small"
        variant="outlined"
        :disabled="loading"
        @click="emits('click', true)">

        <material-icon name="refresh"
            :class="{'spinner':loading, ...iconCss}"></material-icon>

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