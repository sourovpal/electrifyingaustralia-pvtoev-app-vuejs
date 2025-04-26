<script setup>
    import { onMounted, computed, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const props = defineProps({
        query: { type: Object, default: {} }
    });

    const emits = defineEmits(['navigate', 'active']);
    const route = useRoute();

    watch(route, () => {

        let query = route.query;
        let keys = Object.keys(props.query);

        const active = keys.every(key => query[key] && query[key] === props.query[key]);
        if (active) emits('active');

    }, { deep: true, immediate: true });


</script>
<template>
    <a v-bind="$attrs"
        class="d-flex justify-content-start align-items-center"
        @click="emits('navigate', $event)">
        <slot></slot>
    </a>
</template>

<style scoped
    lang="scss">

</style>