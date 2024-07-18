<script setup>
import Message from './Message.vue';
import {defineProps, computed, ref} from 'vue';
import moment from 'moment';
const props = defineProps({
    logsGroup:{
        type:Object,
        default:{},
    },
    eventDate:{
        type:String,
        default:new Date,
    },
});
const makeGroup = computed(()=>{
    console.log(props.eventDate)
    var logGroup = {};
    props.logsGroup.filter((item)=>{
        if(logGroup[item.group_id]){
            const check = !!logGroup[item.group_id].find((obj)=>{
                if(obj.id !== item.id) return true;
            });
            if(check){
                logGroup[item.group_id] = logGroup[item.group_id].concat([item]);
            }
        }else{
            logGroup = {...logGroup, [item.group_id]:[item]} ;
        }
    });
    return logGroup;
});

</script>

<template>
    <div>
        <div class="text-center mb-1 mt-2 feed-updated-date">
            <span class="text-head updated-date">{{ moment(eventDate).format('DD MMM, yyyy') }}</span>
        </div>
        <message v-for="(key, index) in Object.keys(makeGroup)" :logs="makeGroup[key]" :key="index" />
    </div>
</template>