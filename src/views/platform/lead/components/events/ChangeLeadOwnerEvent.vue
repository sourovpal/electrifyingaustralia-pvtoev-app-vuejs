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
            <a v-if="log.event_data?.previous_owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ log.event_data?.previous_owner }}</a>

            <span v-if="log.event_data?.current_owner && log.event_data?.previous_owner">&nbsp; to &nbsp;</span>

            <a v-if="log.event_data?.current_owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ log.event_data?.current_owner }}</a>

        </div>
    </div>
</template>