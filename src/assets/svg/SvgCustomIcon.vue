<script>
import LoaderIcon from './LoaderIcon.vue';
import TrashIcon from './TrashIcon.vue';
import DownArrow from './DownArrow.vue';
import LostIocn from './LostIocn.vue';
import SpinnerIcon from './SpinnerIcon.vue';
import {} from 'vue';
export default {
    props:['icon'],
    components:{
        LoaderIcon,
        TrashIcon,
        DownArrow,
        LostIocn,
        SpinnerIcon,
    }
}
</script>
<template>
    <component :is="icon" />
</template>