<script setup>
    import { ref, onMounted, useAttrs } from 'vue';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import { imageExtensions, fileNameToExtension, fetchFile } from '@helpers';
    import { useIntersectionObserver } from '@vueuse/core';


    const props = defineProps({
        src: { type: String, default: null, },
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
        image_src.value = getMaterialFileIcon(props.src);

        if (!imageExtensions.includes(fileNameToExtension(props.src))) return;

        await fetchFile(props.src, (url) => {
            if (url) {
                image_src.value = url;
            }
            isLoading.value = false;
        });

    }

</script>

<template>
    <img ref="target_image"
        v-bind="attrs"
        :src="image_src">
</template>