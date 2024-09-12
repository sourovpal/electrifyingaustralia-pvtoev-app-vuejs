<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        log: {
            type: Object,
            default: {},
        },
        user: {
            type: Object,
            default: {},
        },
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ log.message }} :
            <span class="text-soft mx-1">{{ log.event_attributes?.attributes?.value }}</span>
        </div>
    </div>
</template>