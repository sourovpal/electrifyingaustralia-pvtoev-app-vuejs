<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        message: {
            type: Object,
            default: {},
        },
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ message.message }} &nbsp;
            <a v-if="message.event_attributes?.prev_status"
                class="feed-badge mx-0"
                href="">{{ message.event_attributes?.prev_status?.name }}</a>

            <span v-if="message.event_attributes?.prev_status && message.event_attributes?.new_status">&nbsp; to &nbsp;</span>

            <a v-if="message.event_attributes?.new_status"
                class="feed-badge mx-0"
                href="">{{ message.event_attributes?.new_status?.name }}</a>

        </div>
    </div>
</template>