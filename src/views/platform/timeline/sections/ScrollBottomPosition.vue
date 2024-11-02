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
    const isLoading = ref(false);
    const isComplete = ref(false);

    const scrollpanel = ref(null)

    const targetScrollPanel = ref(null);

    const targetLoader = ref(null);

    const prevHeight = ref(0);

    const { stop: stopObserver } = useIntersectionObserver(
        targetLoader,
        ([{ isIntersecting }], observerElement) => {
            if (isIntersecting && !isLoading.value && !isComplete.value) {
                isLoading.value = true;
                callInfiniteLoad();
            }
        },
    )

    async function complete() {
        console.log('complete')
        isComplete.value = true;
        isLoading.value = false;
        stopObserver();
    }

    async function loading() {
        isLoading.value = true;
    }

    function loadLatest() {
        loading();
        callInfiniteLoad({ latest: true });
    }

    async function scrollBottom() {
        await nextTick();

        let height = scrollpanel.value.scrollHeight;

        targetScrollPanel.value?.scrollTop(height)

        prevHeight.value = height;

        isLoading.value = false;
    }

    async function scrollPosition() {

        if (prevHeight.value == 0) return await scrollBottom();

        await nextTick();

        let height = (scrollpanel.value.scrollHeight - prevHeight.value);

        targetScrollPanel.value?.scrollTop(height);

        await nextTick(() => {
            prevHeight.value = scrollpanel.value.scrollHeight;
        });

        isLoading.value = false;
    }

    async function callInfiniteLoad(payload = {}) {
        emits('infinite', { scrollBottom, scrollPosition, complete, loading, ...payload });
    }

    onMounted(() => {
        isLoading.value = true;
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

            <div ref="targetLoader">
                <span v-if="isLoading && !isComplete"
                    class="text-soft py-5 d-block">
                    <svg-custom-icon icon="SpinnerIcon"></svg-custom-icon>
                    Loading...
                </span>
            </div>

            <span v-if="isComplete && !isLoading"
                class="text-soft py-5 d-block">
                No older activity to display.
            </span>

            <slot></slot>
        </div>

    </scroll-panel>

</template>

<style scoped>
</style>