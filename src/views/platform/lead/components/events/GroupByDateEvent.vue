<script setup>
import Message from './Message.vue';
import {defineProps} from 'vue';
const props = defineProps({
    group:{
        type:Array,
        default:[],
    },
});
</script>

<template>
    <div>
        <div class="text-center mb-1 mt-2 feed-updated-date">
            <span class="text-head updated-date">{{ group.created_at }}</span>
        </div>
        <pre>
            {{ group }}
        </pre>
        <message />
    </div>
</template>