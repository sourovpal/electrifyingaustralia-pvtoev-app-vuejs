<script setup>
import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import {title, menus} from './menu';
 
</script>

<template>
    <MobileHeader/>
    <section class="d-flex flex-row">
        <Menu :menus="menus" :title="title" />
        <router-view></router-view>
    </section>
</template>
