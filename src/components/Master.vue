<script setup>
    import { onMounted } from 'vue';
    import SidebarNav from '../components/SidebarNav.vue';
    import { useAppStore } from '@stores';
    import { useAuthStore, isAuthorized } from '@stores/auth';
    import MobileToolsBar from '@components/MobileToolsBar.vue';
    import OfflineModal from './OfflineModal.vue';
    import ConfirmDialog from 'primevue/confirmdialog';

    const appStore = useAppStore();
    const authStore = useAuthStore();

    onMounted(() => {
        appStore.callFetchAppData();
        authStore.setUser();
        authStore.setAccessToken();
        if (!isAuthorized()) {
            window.location.replace('/login');
        }
    });

</script>

<template>
    <offline-modal></offline-modal>
    <sidebar-nav></sidebar-nav>
    <router-view></router-view>
    <mobile-tools-bar class="d-md-none"></mobile-tools-bar>


    <confirm-dialog pt:content:class="pb-2"
        pt:header:class="py-2"
        class="rounded-3"
        style="--p-confirmpopup-arrow-offset:0.8rem;">
        <template #message="slotProps">
            <div class="d-flex justify-content-start align-items-center py-2">
                <i :class="slotProps.message.icon"
                    class="me-2"></i>
                <p class="text-head mb-0">{{ slotProps.message.message }}</p>
            </div>
        </template>
    </confirm-dialog>

</template>