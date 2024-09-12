<script setup>
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { defineProps, onMounted, ref, defineEmits } from 'vue';
    import api from "@actions/api";
    import { shortenFileName, leadImageTypes, fileNameToExtension } from '@helpers';
    import { useLeadStore } from '@stores/lead';
    const leadStore = useLeadStore();
    const props = defineProps({
        file: {
            type: Object,
            default: null,
        },
        fileName: {
            default({ file }) {
                return file.filename;
            }
        },
        shortFileName: {
            default({ file }) {
                return shortenFileName(file.filename, 35);
            }
        },

    });

    function getFileIcon(file, fileName) {
        if (leadImageTypes.includes(fileNameToExtension(fileName))) {
            return file.filepath;
        }
        return getMaterialFileIcon(fileName);
    }

    const emits = defineEmits(['click']);

</script>

<template>
    <div @click="emits('click', {})"
        class="file-details d-flex justify-content-start align-items-center flex-row py-1 border-bottom">
        <div class="file-item">
            <img width="30"
                :src="getFileIcon(file, fileName)"
                :alt="fileName">
        </div>
        <div class="d-flex flex-row ms-2 w-100">
            <span class="file-name fs-14px text-soft mb-1">{{ shortFileName }}</span>
            <span class="ms-auto">450KB</span>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .file-name {
        line-height: 16px;
        margin-top: -2px;
    }

    .file-item {
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