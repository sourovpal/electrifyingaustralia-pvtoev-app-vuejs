<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        events: {
            type: Object,
            default: {},
        },
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            Confirm qualified this lead's {{ events.message }} &nbsp;
            <strong class="fw-bold" v-if="events.event_attributes?.pipeline">{{ events.event_attributes?.pipeline?.title }}</strong>
            <b> > </b>
            <strong v-if="events.event_attributes?.stage">{{ events.event_attributes?.stage?.name }}</strong>
            Assign By  &nbsp;
            <a v-if="events.event_attributes?.owner"
                class="feed-badge mx-0"
                href=""><b>@</b>{{ events.event_attributes?.owner?.name }}</a>
        </div>
    </div>
</template>