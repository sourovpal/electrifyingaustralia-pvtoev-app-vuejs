<script setup>
    import { watch, ref, computed, nextTick } from 'vue';
    import { useOnline } from '@vueuse/core';
    import { $toast } from '@config';

    const online = useOnline();
    const toggleOfflineModal = ref(false);
    const offlineModalRef = ref(null);

    watch(online, (status) => {
        if (status) {
            if (toggleOfflineModal.value) $toast.success("You're currently online.");
            offlineModalRef.value?.hide();
            nextTick(() => {
                toggleOfflineModal.value = false;
            });
        } else {
            toggleOfflineModal.value = true;
        }
    }, { immediate: true, deep: true });

</script>

<template>
    <bootstrap-modal ref="offlineModalRef"
        v-if="toggleOfflineModal"
        :backdrop="true"
        size="sm">
        <template #body>
            <div class="d-flex justify-content-center align-items-center">
                <span class="me-2">
                    <font-awesome-icon icon="fas fa-wifi"
                        class="fs-16px text-danger"></font-awesome-icon>
                </span>
                <h6 class="text-danger mb-0 fw-bold">You're currently offline.</h6>
            </div>
            <div class="text-center fs-14px px-5 pb-2 sub-title mt-2 text-soft">
                Please check your connection and try again.
            </div>
        </template>
    </bootstrap-modal>
</template>

<style scoped
    lang="scss">
    .sub-title {
        line-height: 16px;
    }
</style>