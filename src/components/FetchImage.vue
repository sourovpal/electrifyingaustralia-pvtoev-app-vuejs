<script setup>
    import { defineProps, defineEmits, ref, onMounted, useAttrs } from 'vue';
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { leadImageTypes, fileNameToExtension, fetchImage } from '@helpers';
    const props = defineProps({
        src: {
            type: String,
            default: null,
        },
        filename: {
            type: String,
            default: null,
        },
        loader: {
            type: Boolean,
            default: false,
        },
    });
    const imageRef = ref(null);
    const imageSrc = ref(null);
    const attrs = useAttrs();
    const isLoading = ref(false);

    function loadImage() {
        if (!props.loader) {
            imageSrc.value = getMaterialFileIcon('img.png');
        }
        if (leadImageTypes.includes(fileNameToExtension(props.filename))) {
            fetchImage(props.src, (url) => {
                if (url) {
                    imageSrc.value = url;
                } else {
                    imageSrc.value = getMaterialFileIcon(props.filename);
                }
                isLoading.value = false;
            });
        } else {
            isLoading.value = false;
            imageSrc.value = getMaterialFileIcon(props.filename);
        }
    }


    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                isLoading.value = true;
                loadImage();
                observer.unobserve(imageRef.value);
            }
        }, {
            root: null,
            threshold: 0.1,
        });
        observer.observe(imageRef.value);
    });

</script>

<template>
    <svg-custom-icon v-if="isLoading && loader"
        icon="SpinnerIcon" />
    <img v-show="!isLoading"
        ref="imageRef"
        v-bind="attrs"
        :src="imageSrc">
</template>