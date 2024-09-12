<script setup>
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { defineProps, ref, nextTick } from 'vue';
    import ImagePreviewModal from '../../components/modals/ImagePreviewModal.vue';
    import ShowAllFilesModal from '../../components/modals/ShowAllFilesModal.vue';

    import { shortenFileName } from '@helpers';
    const previewFile = ref(null);
    const showAllFilesModalRef = ref(null);
    const toggleAllFileShowModal = ref(false);

    const props = defineProps({
        log: {
            type: Object,
            default: {},
        },
        files: {
            default({ log }) {
                return log.files ? log.files.reverse() : [];
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
        var extensions = ['jpg', 'png', 'jpeg', 'gif', 'webp'];
        var ext = file.filename.split('.').pop();
        if (extensions.includes(ext)) {
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
                        <img :src="getFileIcons(file)"
                            :alt="file.filename">
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