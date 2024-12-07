<script setup>

    const props = defineProps({
        loading: { type: [Number, Boolean], default: false },
    });

    const emits = defineEmits(['click']);

</script>

<template>
    <div class="mx-3">

        <Button rounded
            severity="secondary"
            size="small"
            variant="outlined"
            :disabled="loading"
            @click="emits('click', true)">

            <material-icon name="refresh"
                :class="{'spinner':loading}"></material-icon>

        </Button>

    </div>
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