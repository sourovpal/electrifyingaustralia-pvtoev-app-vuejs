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
        template: `<div class="fs-16px feed-wrap mb-1 timeline-log">${props.event.message}</div>`,
    });



</script>
<template>
    <div class="d-block">
        <notification-message></notification-message>
    </div>
</template>
<style scoped
    lang="scss">
    .timeline-log:deep() {
        p {
            margin: 0;
            font-size: 16px;

        }

        br {
            display: none;
        }
    }
</style>