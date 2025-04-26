<script setup>
    import {  } from 'vue';
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
            <a v-if="message.event_attributes?.prev_owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ message.event_attributes?.prev_owner?.name }}</a>

            <span v-if="message.event_attributes?.prev_owner && message.event_attributes?.new_owner">&nbsp; to &nbsp;</span>

            <a v-if="message.event_attributes?.new_owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ message.event_attributes?.new_owner?.name }}</a>

        </div>
    </div>
</template>