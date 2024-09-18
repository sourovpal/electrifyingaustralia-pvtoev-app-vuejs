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
        }
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ log.message }} &nbsp;
            <span>${{ attributes.estimated_value }}</span>
        </div>
    </div>
</template>