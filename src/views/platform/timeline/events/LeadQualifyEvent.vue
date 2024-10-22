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
            Confirm qualified this lead's {{ message.message }} &nbsp;
            <strong class="fw-bold" v-if="message.event_attributes?.pipeline">{{ message.event_attributes?.pipeline?.title }}</strong>
            <b> > </b>
            <strong v-if="message.event_attributes?.stage">{{ message.event_attributes?.stage?.name }}</strong>
            Assign By  &nbsp;
            <a v-if="message.event_attributes?.owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ message.event_attributes?.owner?.name }}</a>
        </div>
    </div>
</template>