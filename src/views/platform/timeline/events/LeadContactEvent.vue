<script setup>
    import JsonViewer from 'vue-json-viewer';
    import 'vue-json-viewer/style.css';
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
            <div class="json-data">
                <JsonViewer v-if="message.event_attributes" :value="message.event_attributes"
                    :expand-depth="0" />
            </div>
        </div>
    </div>
</template>
<style scoped
    lang="scss">
    .show-btn {
        box-shadow: none !important;
        padding: 0px 6px;
    }

    .json-data {
        &:deep(.jv-container) {
            .jv-code {
                padding: 5px 6px !important;
            }
        }
    }
</style>