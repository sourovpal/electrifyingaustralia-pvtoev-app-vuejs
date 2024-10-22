<script setup>
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import {   ref, nextTick } from 'vue';
    import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
    import ShowAllFilesModal from '../modals/ShowAllFilesModal.vue';
    import { shortenFileName, leadImageTypes } from '@helpers';

    const previewFile = ref(null);
    const showAllFilesModalRef = ref(null);
    const toggleAllFileShowModal = ref(false);

    const props = defineProps({
        message: {
            type: Object,
            default: {},
        },
        files: {
            default({ message }) {
                return message.files ? message.files.reverse() : [];
            }
        },
        totalFiles: {
            default({ files }) {
                if (files) {
                    return files.length;
                }
                return 0;
            }
        },
        otherTotalFiles: {
            default({ totalFiles }) {
                if (totalFiles > 4) {
                    return totalFiles - 4;
                }
                return 0;
            }
        }
    });

    function getFileIcons(file) {
        var ext = file.filename.split('.').pop();
        if (leadImageTypes.includes(ext)) {
            return file.filepath;
        }
        return getMaterialFileIcon(ext);
    }

    function handlePreviewFile(file, index) {
        if (index === 3) {
            toggleAllFileShowModal.value = true;
            nextTick(() => {
                showAllFilesModalRef.value.showModalHandler();
            });
            return;
        }
        previewFile.value = file;
    }
</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            <div class="d-flex flex-wrap mt-1"
                style="max-width: 224px;">
                <div v-for="(file, index) in files.slice(0, 4)"
                    :key="index"
                    @click="handlePreviewFile(file, index)"
                    class="d-flex flex-column px-1 py-1">
                    <div class="grid-item"
                        :data-other-files="index === 3 ? otherTotalFiles+'+' : ''"
                        :class="{overlay:(totalFiles > 4 && index == 3), 'w-100':((index == 0 && totalFiles == 1) || (index == 2 && totalFiles == 3)), 'h-100':((index == 0 && totalFiles == 1) || (index == 2 && totalFiles == 3))}">
                        <FetchImage :src="file.filepath"
                            :filename="file.filename"
                            :alt="file.filename"
                            loader />
                    </div>
                    <span class="text-center d-block fs-12px text-head">{{ shortenFileName(file.filename, ((index == 0
                        && totalFiles == 1) || (index == 2 && totalFiles == 3))?25:12) }}</span>
                </div>
            </div>
        </div>
    </div>

    <ImagePreviewModal :files="files"
        :preview="previewFile"
        v-if="previewFile"
        @toggle="(state)=>previewFile=state"></ImagePreviewModal>

    <ShowAllFilesModal v-if="toggleAllFileShowModal"
        :files="files"
        @close="toggleAllFileShowModal=false"
        ref="showAllFilesModalRef"></ShowAllFilesModal>

</template>

<style scoped
    lang="scss">
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    :deep(.grid-item) {
        width: 100px;
        overflow: hidden;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 8px;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        border: 1px solid #b9c1c7;
        position: relative;
        cursor: pointer;

        &.overlay::before {
            content: attr(data-other-files);
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(31, 41, 59, 0.41);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 45px;
            color: #ffffff;
            font-weight: bold;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .grid-item img {
        width: 100%;
        height: auto;
    }
</style>