<style scoped
    lang="scss">
    .user-details {
        line-height: 16px;
    }

    .descrption {
        line-height: 18px;
    }
</style>
<template>
    <Toast position="bottom-right"
        group="bc"
        pt:message-content:class="ms-auto"
        @close="onClose">
        <template #message="slotProps">
            <div class="flex flex-col items-start flex-auto flex-grow-1">
                <div class="d-flex justify-content-start align-items-center">
                    <Avatar :image="sender?.profile_avatar"
                        shape="circle"
                        size="small" />
                    <div class="user-details ms-3">
                        <span class="fw-bold fs-14px">{{ sender?.name }}</span>
                        <span class="d-block fs-14px">{{ sender?.email }}</span>
                    </div>
                </div>
                <div class="ms-1">
                    <div class="mt-2 mb-1 fs-14px descrption">
                        {{ sender?.name || sender?.email }},
                        <NotificationMessage></NotificationMessage>
                    </div>
                    <div class="fs-12px text-soft">{{ 'just now' }}</div>
                </div>
            </div>
            <audio v-if="is_muted" :src="alert_sound"
                autoplay></audio>
        </template>
    </Toast>
</template>

<script setup>
    import Toast from "primevue/toast";
    import { useToast } from "primevue/usetoast";
    import { ref, onMounted, defineComponent, computed } from 'vue';
    import { useWebNotification } from '@vueuse/core';
    import { useAppStore, useNotificationStore } from '@stores';

    const props = defineProps({
        notification: { type: Object, default: null },
        message: { default: ({ notification }) => notification.message },
        sender: { default: ({ notification }) => notification.message?.user },
        unseen: { default: ({ notification }) => notification.message?.unseen },
    });

    const emits = defineEmits(['close']);

    const appStore = useAppStore();

    const toast = useToast();
    const visible = ref(false);
    const alert_sound = computed(() => appStore.findSettings('notification_sound'));
    const is_muted = computed(() => appStore.findSettings('notification_muted'));

    const showToast = () => {

        if (!visible.value && props.notification && props.notification?.message && Object.keys(props.notification?.message).length) {
            toast.add({ severity: 'secondary', group: 'bc' });
            visible.value = true;
        }
    };

    const onClose = () => {
        visible.value = false;
        emits('close', true);
    }

    onMounted(() => {
        showToast()
        if (props.unseen) useNotificationStore().setTotalUnseen(props.unseen);
    });


    const NotificationMessage = defineComponent({
        setup() {
            return props.message;
        },
        template: `${props.message.message}`,
    });

</script>