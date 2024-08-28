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
            {{ log.message }}
            <span class="text-primary" v-if="log.event_type == 'update-lead-propertie'">{{ log.event_data?.current_data }}</span>
            <span class="text-danger" v-else>{{ log.event_data?.current_data }}</span>
        </div>
    </div>
</template>