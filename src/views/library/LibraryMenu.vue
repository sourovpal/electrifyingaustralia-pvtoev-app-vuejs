<template>
    <section class="library-menu">
        <div class="submenu-header">
            <h1 v-if="!isLoading">beans</h1>
            <Skeletor v-else />
        </div>
        <div class="menu-control d-flex align-items-center justify-content-between border-bottom pb-3 px-4">
            <div>
                <small class="me-2 fw-bold">Active</small>
				<font-awesome-icon
				    class="text-secondary fs-10px"
				    icon="fas fa-caret-down"
				/>
            </div>
            <small class="text-info mb-0 fw-bold">View all</small>
        </div>
        <div class="border mb-5" style="height: calc(88vh + 5px); overflow-y: scroll">
            <LibraryMenuItem />
            <LibraryMenuItem />
            <LibraryMenuItem />
            <LibraryMenuItem />
            <LibraryMenuItem />
            <LibraryMenuItem />
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LibraryMenuItem from './LibraryMenuItem.vue';
import { Skeletor } from 'vue-skeletor';

onMounted(() => {
    simulateApiCall();
});
const isLoading = ref(false);

const simulateApiCall = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
}

</script>

<style lang="scss" scoped>
.library-menu{
    top:0;
    background-color: #f5f7fa;
    width: 18rem;
    max-height: 100vh;
    height: 100vh;
    margin-left: 4rem;
    overflow: hidden;
    border-right:1px solid #dddddd;
    position: relative;
    z-index: 99;

    @media (min-width: 767px){ min-width:13rem; }
    @media (min-width: 1200px){ min-width:16rem; }

    .submenu-header{
        padding: 1.5rem;
        padding-bottom: 0.25rem;

        h1{
            color: #1f2933;
            font-size: 1.5rem;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            margin-bottom: 1rem;
            font-weight: 600;
        }
    }
    .submenu-body{
        padding:0px 8px;
    }
}

</style> 
