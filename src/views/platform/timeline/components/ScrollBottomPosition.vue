<script setup>
    import { useIntersectionObserver } from '@vueuse/core';
    import {
        ref,
        nextTick,
        onMounted,
        onBeforeUnmount,
        useAttrs,
        watchEffect,
        watch,
    } from "vue";

    const props = defineProps({
        distance: { type: Number, default: 0 },
    });

    const emits = defineEmits(['infinite']);
    const is_loading = ref(true);
    const is_complete = ref(false);

    const scrollpanel = ref(null)

    const targetScrollPanel = ref(null);

    const targetLoader = ref(null);

    const prevHeight = ref(0);

    const { stop: stopObserver } = useIntersectionObserver(
        targetLoader,
        ([{ isIntersecting }], observerElement) => {
            if (isIntersecting && !is_loading.value && !is_complete.value) {
                is_loading.value = true;
                callInfiniteLoad();
            }
        },
    )

    async function complete() {
        is_complete.value = true;
        is_loading.value = false;
        stopObserver();
    }

    async function loading() {
        is_loading.value = true;
    }

    function loadLatest() {
        // loading();
        callInfiniteLoad({ latest: true });
    }

    async function scrollBottom() {
        await nextTick();

        let height = scrollpanel.value.scrollHeight;

        targetScrollPanel.value?.scrollTop(height)

        prevHeight.value = height;

        is_loading.value = false;
    }

    async function scrollPosition() {

        if (prevHeight.value == 0) return await scrollBottom();

        await nextTick();

        let height = (scrollpanel.value.scrollHeight - prevHeight.value);

        targetScrollPanel.value?.scrollTop(height);

        await nextTick(() => {
            prevHeight.value = scrollpanel.value.scrollHeight;
        });

        is_loading.value = false;
    }

    async function callInfiniteLoad(payload = {}) {
        emits('infinite', { scrollBottom, scrollPosition, complete, loading, ...payload });
    }

    onMounted(() => {
        is_loading.value = true;
        scrollpanel.value = targetScrollPanel.value?.$el.querySelector('.p-scrollpanel-content');
        callInfiniteLoad();
    });

    onBeforeUnmount(() => {
        stopObserver();
    });

    defineExpose({
        loadLatest,
    });

</script>

<template>

    <scroll-panel ref="targetScrollPanel"
        class="history-logs"
        :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}">

        <div class="text-center">
            &nbsp;

            <div ref="targetLoader"
                class="text-center">
                <span v-if="is_loading && !is_complete"
                    class="text-soft py-5 d-flex justify-content-center align-items-center">
                    <circle-spinner :loading="is_loading" />
                    Loading...
                </span>
            </div>

            <span v-if="is_complete && !is_loading"
                class="text-soft py-5 d-block">
                There are no old activities to display.
            </span>

            <slot></slot>
        </div>

    </scroll-panel>

</template>

<style scoped>
</style>