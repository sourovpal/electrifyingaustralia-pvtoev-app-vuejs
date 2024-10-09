<script setup>
    import StarRating from "vue-star-rating";
    import {  } from 'vue';
    const props = defineProps({
        message: {
            type: Object,
            default: {},
        },
        starRating: {
            default({ message }) {
                return message.event_attributes?.attributes?.new_rating ?? 0
            }
        },
        attributes: {
            default({ message }) {
                return message.event_attributes ?? {}
            }
        },
        user: {
            type: Object,
            default: {},
        },
    });
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            {{ message.message }}
            <star-rating style="line-height: 20px"
                :star-size="12"
                :rounded-corners="true"
                :border-width="2"
                inactive-color="#F8F9F9"
                active-color="#FF9529"
                border-color="#AEB6BF"
                active-border-color="#FF9529"
                :increment="0.5"
                read-only
                v-model:rating="props.starRating"
                :show-rating="false" />
        </div>
    </div>
</template>