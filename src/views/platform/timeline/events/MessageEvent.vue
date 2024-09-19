<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        message: {
            type: Object,
            default: {},
        },
        attributes: {
            default({ message }) {
                return message.event_attributes;
            }
        },
        message: {
            default() {
                return `<h1>Hello</h1>`;
            }
        }
    });
</script>
<template>
    <div class="d-block editor-message">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            <div class="message"
                v-html="message.message"></div>
        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .editor-message:deep(.message) {
        &>* {
            margin: 0 !important;
        }

        br {
            display: none;
        }
    }
</style>