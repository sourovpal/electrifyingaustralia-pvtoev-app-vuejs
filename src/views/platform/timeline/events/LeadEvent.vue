<script setup>
    import { defineComponent } from 'vue';

    const props = defineProps({
        event: {
            type: Object,
            default: {},
        },
        attributes: {
            default({ event }) {
                return event.attributes ?? {};
            }
        },
        model: {
            default({ event }) {
                return event.model ?? {};
            }
        },
    });


    const NotificationMessage = defineComponent({
        setup() {
            return { ...props };
        },
        template: `${props.event.message}`,
    });



</script>
<template>
    <div class="d-block">
        <div class="fs-16px feed-wrap mb-1">
            <notification-message></notification-message>
        </div>
    </div>
</template>