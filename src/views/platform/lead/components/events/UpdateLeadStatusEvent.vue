<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        log: {
            type: Object,
            default: {},
        },
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ log.message }} &nbsp;
            <a v-if="log.event_data?.previous_status"
                class="feed-badge mx-0"
                href="">{{ log.event_data?.previous_status }}</a>

            <span v-if="log.event_data?.current_status && log.event_data?.previous_status">&nbsp; to &nbsp;</span>

            <a v-if="log.event_data?.current_status"
                class="feed-badge mx-0"
                href="">{{ log.event_data?.current_status }}</a>

        </div>
    </div>
</template>