<script setup>

    const props = defineProps({
        name: { type: String, default: null },
        type: { type: String, default: null },
        size: { type: [String, Number], default: 22, },
        icon_type: { default({ type }) { return type ? `material-icons-${type}` : 'material-icons' } },
        height: { type: [String, Number], default({ size }) { return size } },
        width: { type: [String, Number], default({ size }) { return size } },
    });

</script>
<template>

    <i :class="icon_type"
        :style="{height:`${height}px`, width:`${width}px`, 'font-size':`${height}px`}">
        {{ name }}
    </i>

</template>

<style scoped
    lang="scss">
    i {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>