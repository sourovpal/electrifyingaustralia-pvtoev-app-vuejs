<script setup>
    import { ref, onMounted, useAttrs } from 'vue';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import { imageExtensions, fileNameToExtension, fetchImage } from '@helpers';
    import { useIntersectionObserver } from '@vueuse/core';


    const props = defineProps({
        src: { type: String, default: null, },
        loader: { type: Boolean, default: false, },
    });

    const target_image = ref(null);
    const image_src = ref(null);
    const attrs = useAttrs();
    const isLoading = ref(false);


    onMounted(() => {
        const { stop: stopObserver } = useIntersectionObserver(
            target_image,
            ([{ isIntersecting }], observerElement) => {
                if (!image_src.value && isIntersecting) loadImage(stopObserver);
            },
        )
    });

    async function loadImage(stopObserver) {
        stopObserver();

        isLoading.value = true;

        if (!props.loader) {
            image_src.value = getMaterialFileIcon(props.src);
        }

        await fetchImage(props.src, (url) => {
            if (url) {
                image_src.value = url;
            } else {
                image_src.value = getMaterialFileIcon(props.src);
            }
            isLoading.value = false;
        });
    }



</script>

<template>

    <svg-custom-icon v-if="loader && isLoading"
        icon="SpinnerIcon" />

    <img v-show="!isLoading || !loader"
        ref="target_image"
        v-bind="attrs"
        :src="image_src">

</template>