<script setup>
    import { defineProps, computed } from 'vue';
    import moment from 'moment';
    import {useAuthStore} from '@stores/auth';
    const authStore = useAuthStore()
    const props = defineProps({
        user: {
            type: Object,
            default:{},
        },
        eventDateTime:{
            type:String,
            default: new Date(),
        }
    });
    const userName = computed(()=>{
        if(authStore.getUser?.email === props.user.email){
            return "You";
        }
        return props.user?.name;
    });

</script>
<template>
    <div class="lead-feed-row d-flex justify-content-between py-1">
        <div class="left-feed-col d-flex">
            <div class="me-2">
                <div class="circle-avatar">
                    <img :src="user.profile_avatar"
                        alt="">
                </div>
            </div>
            <div class="">
                <div>
                    <span class="fs-14px fw-bold text-head d-inline-flex">{{ userName }}</span>
                    <span class="feed-time fs-12px text-head ms-3">{{ moment(eventDateTime).format('hh:mm A') }}</span>
                </div>
                <slot></slot>
            </div>
        </div>
        <div class="right-feed-col">
        </div>
    </div>
</template>