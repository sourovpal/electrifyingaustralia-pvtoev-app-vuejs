<script setup>
import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import LibraryMenu from './LibraryMenu.vue';
import {title, menus} from './menu';
import {useRoute} from 'vue-router';
import { onMounted } from 'vue';
import { useProjectStore } from '../../stores/project';

const route = useRoute();

const projectStore = useProjectStore();

onMounted(() => {
    projectStore.setProjectSelectables();
    projectStore.setProjectList();
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
