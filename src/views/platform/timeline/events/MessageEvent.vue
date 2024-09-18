<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        log: {
            type: Object,
            default: {},
        },
        attributes: {
            default({ log }) {
                return log.event_attributes;
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
                v-html="log.message"></div>
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