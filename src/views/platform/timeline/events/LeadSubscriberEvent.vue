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
            <a v-if="message.event_attributes?.assign_subscribers && message.event_attributes?.assign_subscribers?.length"
                v-for="(subscriber, index) in message.event_attributes?.assign_subscribers"
                :key="index+1000"
                class="feed-badge mx-1"
                href=""><b>@</b>{{ subscriber?.name }}</a>
            &nbsp;
            <a v-if="message.event_attributes?.remove_subscribers && message.event_attributes?.remove_subscribers?.length"
                v-for="(subscriber, index) in message.event_attributes?.remove_subscribers"
                :key="index"
                class="feed-badge-danger mx-1"
                href=""><b>@</b>{{ subscriber?.name }}</a> &nbsp;
        </div>
    </div>
</template>