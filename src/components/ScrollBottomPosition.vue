<script setup>

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
    const prevHeight = ref(0);
    const isLoading = ref(false);
    const isComplete = ref(false);
    const isReset = ref(false);
    let observer = null;
    const targetElement = ref(null);

    function startObserver() {
        observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !isLoading.value && !isComplete.value) {
                isLoading.value = true;
                callInfiniteLoad();
            }
        }, { root: targetElement.value, rootMargin: `${props.distance}px 0px 0px 0px` });

        observer.observe(targetElement.value.firstElementChild);
    }

    async function observerReset(disconnect = false) {
        if (observer) {
            if (disconnect) {
                observer.disconnect();
                return;
            }
            observer.disconnect();
            startObserver()
        }
        return null;
    }


    async function firstload() {
        isLoading.value = true;
        isComplete.value = false;
        isReset.value = false;
        prevHeight.value = 0;
        callInfiniteLoad();
        await nextTick();
        observerReset();
    }

    async function loading() {
        await nextTick();
        isLoading.value = true;
    }

    async function loaded() {
        if (isComplete.value && !isReset.value) return;
        isLoading.value = false;
        isReset.value = false;
        updateScrollPosition();
    }

    function complete() {
        observerReset(true);
        isComplete.value = true;
    }

    function reset() {
        observerReset(true);
        prevHeight.value = 0;
        isReset.value = true;
        callInfiniteLoad();
    }

    async function updateScrollPosition() {
        await nextTick();
        if (prevHeight.value === 0) {
            targetElement.value.scroll(0, targetElement.value.scrollHeight);
        } else {
            targetElement.value.scroll(0, ((targetElement.value.scrollHeight - targetElement.value.clientHeight / 2) - prevHeight.value));
        }
        prevHeight.value = targetElement.value.scrollHeight;
        startObserver();
    }

    function callInfiniteLoad(payload = {}) {
        emits('infinite', { loaded, complete, loading, isReset: isReset.value, ...payload });
    }

    onMounted(() => {
        callInfiniteLoad();
    });

    onBeforeUnmount(() => {
        if (observer) observer.disconnect();
    });

    defineExpose({
        reset,
        firstload,
        loading,
        updateScrollPosition,
    });
</script>

<template>
    <div ref="targetElement"
        id="timelineLogHistory"
        class="history-logs">
        <div id="topElement"
            class="text-center">
            &nbsp;
            <span class="text-soft py-5 d-block"
                v-if="!isLoading || isComplete">No older activity to display.</span>
            <span class="text-soft py-5 d-block"
                v-if="isLoading">
                <svg-custom-icon icon="SpinnerIcon"></svg-custom-icon>
                Loading...
            </span>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
    .history-logs {
        scroll-behavior: unset !important;
    }
</style>