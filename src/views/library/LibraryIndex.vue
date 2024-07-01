<script setup>
import MobileHeader from '../../components/MobileHeader.vue';
import LibraryMenu from './LibraryMenu.vue'
 
</script>

<template>
    <MobileHeader/>
    <section class="d-flex flex-row">
        <LibraryMenu />
        <router-view></router-view>
    </section>
</template>
