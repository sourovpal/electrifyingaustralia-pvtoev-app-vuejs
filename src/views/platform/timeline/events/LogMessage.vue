<script setup>
    import EventByUser from './EventByUser.vue';
    import Events from './Events.vue';

    import {   computed } from 'vue';
    const props = defineProps({
        message: {
            type: Object,
            default: Object,
        },
    });

    const user = computed(() => {
        if (props.message) {
            return props.message.user ?? {};
        }
        return null;
    });
    
    const createdAt = computed(() => {
        if (props.message) {
            return props.message.created_at;
        }
        return new Date();
    });
</script>

<template>
    <event-by-user :user="user"
        :event-date-time="createdAt">
        <Events :message="message"
            :user="user"></Events>
    </event-by-user>
</template>
