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
        }
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ message.message }} &nbsp;
            <span>${{ attributes.estimated_value }}</span>
        </div>
    </div>
</template>