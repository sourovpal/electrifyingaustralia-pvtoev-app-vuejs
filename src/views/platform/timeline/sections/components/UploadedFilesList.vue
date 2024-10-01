<script setup>
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { defineProps, onMounted, ref, defineEmits, computed } from 'vue';
    import api from "@actions/api";
    import { shortenFileName, leadImageTypes, fileNameToExtension, handleDownloadFile, fetchImage } from '@helpers';
    import { usePlatformStore } from '@stores';
    const platformStore = usePlatformStore();
    const $leadId = computed(() => platformStore.getEditLeadId);
    const toggleDownloadBtn = ref(false);
    const props = defineProps({
        file: { type: Object, default: null },
        fileName: { default({ file }) { return file.filename; } },
        shortFileName: { default({ file }) { return shortenFileName(file.filename, 35); } }
    });

    const emits = defineEmits(['click']);
</script>

<template>
    <div class="file-details d-flex justify-content-start align-items-center flex-row py-1 cursor-pointer">
        <div @click="emits('click', {})"
            class="file-item">
            <FetchImage :src="file.filepath"
                :filename="fileName"
                :alt="fileName"
                loader />
        </div>
        <div class="d-flex flex-row ms-2 w-100">
            <span @click="emits('click', {})"
                class="file-name fs-14px text-soft mb-1">{{ shortFileName }}</span>
            <span class="ms-auto">
                <button class="bg-transparent border-0 shadow-none"
                    @click="handleDownloadFile(`/platform/download/${file.file_id}/files/${file.filename}`, file.filename)"
                    v-if="toggleDownloadBtn"
                    href="">
                    <font-awesome-icon icon="fas fa-download"
                        class="text-soft fs-16px"></font-awesome-icon>
                </button>
                <template v-else>
                    {{ file?.size?? '0 KB' }}
                </template>
            </span>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .file-details:first-child {
        border-top: none !important;
    }

    .file-name {
        line-height: 16px;
        margin-top: -2px;
    }

    :deep(.file-item) {
        width: 30px;
        overflow: hidden;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 3px;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        border: 1px solid #b9c1c7;
        position: relative;
        cursor: pointer;

        img {
            width: 100%;
            object-fit: cover;
        }

    }
</style>