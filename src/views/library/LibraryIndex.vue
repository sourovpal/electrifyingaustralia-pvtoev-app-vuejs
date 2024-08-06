<script setup>
import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import LibraryMenu from './LibraryMenu.vue';
import {title, menus} from './menu';
import {useRoute} from 'vue-router';
import { useAppStore } from '../../stores/app';
import { onMounted } from 'vue';

const route = useRoute();

const appStore = useAppStore();

onMounted(() => {
    appStore.setUnits();
});
 
</script>

<template>
    <MobileHeader/>
    <section class="d-flex flex-row">
        <Menu :menus="menus" :title="title" v-if="route.name !== 'LibraryProposals'" />
        <LibraryMenu class="d-none d-xl-block" v-else/>
        <router-view></router-view>
    </section>
</template>
