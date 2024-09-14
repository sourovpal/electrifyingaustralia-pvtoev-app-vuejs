<script setup>
    import { Modal } from "mdb-ui-kit";
    import ImagePreviewModal from './ImagePreviewModal.vue';
    import { fileNameToExtension, leadImageTypes, shortenFileName } from '@helpers';
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { ref, defineProps, defineExpose, onMounted, defineEmits } from 'vue';
    import { useApiRequest } from '@actions/api';
    import { $toast } from '@config';
    import { useRoute } from 'vue-router';
    const props = defineProps({
        files: { type: Array, default: [] }
    });
    const route = useRoute();
    const emits = defineEmits(['close']);
    const allFilesShowRef = ref(null);
    const activeTab = ref('all');
    const originalFiles = ref([]);
    const showFiles = ref([]);
    const previewFile = ref(null);
    const isLoading = ref(false);
    var modalInstance = null;

    onMounted(() => {
        modalInstance = new Modal(allFilesShowRef.value, {
            keyboard: false,
            backdrop: 'static',
        });
    });

    async function showModalHandler(load = false) {
        modalInstance.show();
        if (load) {
            isLoading.value = true;
            await useApiRequest({
                url: '/leads/dependencies',
                method: 'get',
                payload: {
                    lead_id: route.params.id,
                    files: true,
                    take_files: 'all',
                }
            }).then(res => {
                const { success, message, files } = res;
                if (success) {
                    showFiles.value = originalFiles.value = files;
                }
                isLoading.value = false;
            }).catch(error => {
                isLoading.value = false;
                $toast.error("Oops, something went wrong");
            });
        } else {
            activeTab.value = 'all';
            showFiles.value = originalFiles.value = props.files;
        }
    }

    function hideModalHandler() {
        modalInstance.hide();
        emits('close', {});
    }

    function selectFileTypeHandler(fileType) {
        activeTab.value = fileType;
        showFiles.value = originalFiles.value.reduce((carry, item) => {
            var fileExt = fileNameToExtension(item.filename);
            if (fileType == 'images' && leadImageTypes.includes(fileExt)) {
                carry.push(item);
            } else if (fileType == 'pdf' && fileExt == 'pdf') {
                carry.push(item);
            } else if (fileType == 'others' && !leadImageTypes.includes(fileExt) && fileExt != 'pdf') {
                carry.push(item);
            } else if (fileType == 'all') {
                carry.push(item);
            }
            return carry;
        }, []);
    }

    function getFileIcon(file, fileName) {
        if (leadImageTypes.includes(fileNameToExtension(fileName))) {
            return file.filepath;
        }
        return getMaterialFileIcon(fileName);
    }

    function handlePreviewFile(file) {
        previewFile.value = file;
        modalInstance.hide();
    }

    function toggleImagePreview() {
        previewFile.value = null;
        modalInstance.show();
    }

    defineExpose({
        showModalHandler,
        hideModalHandler
    })
</script>

<template>
    <div class="modal fade"
        ref="allFilesShowRef">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header py-0">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <ul class="nav nav-tabs"
                            id="ex-with-icons">
                            <li v-for="(item, index) in ['all', 'images', 'pdf', 'others']"
                                :key="index"
                                @click="selectFileTypeHandler(item)"
                                :class="{active:(activeTab == item)}"
                                class="nav-link cursor-pointer fs-14px text-head">{{ item }}</li>
                        </ul>
                    </div>
                    <div>
                        <button class="btn btn-light btn-sm btn-floating"
                            @click="hideModalHandler()">
                            <font-awesome-icon icon="fas fa-close"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div v-if="isLoading"
                        class="d-flex justify-content-center align-items-center w-100 h-100">
                        <div>
                            <svg-custom-icon icon="SpinnerIcon" /> Loading...
                        </div>
                    </div>
                    <div v-else-if="!isLoading && showFiles.length"
                        class="file-box">
                        <div class="file-item"
                            v-for="(item, index) in showFiles"
                            :key="index"
                            @click="handlePreviewFile(item)">
                            <div class="file">
                                <img v-lazy="getFileIcon(item, item?.filepath)">
                            </div>
                            <span class="file-title fs-12px text-head text-center">
                                {{ shortenFileName(item?.filename, 20) }}
                            </span>
                        </div>
                    </div>
                    <div v-else-if="activeTab == 'pdf'"
                        class="d-flex justify-content-center align-items-center w-100 h-100">
                        <img width="35"
                            :src="getMaterialFileIcon('pdf')"
                            alt="">
                        <span class="fs-16px text-soft">Pdf not found.</span>
                    </div>
                    <div v-else-if="activeTab == 'others'"
                        class="d-flex justify-content-center align-items-center w-100 h-100">
                        <img width="35"
                            :src="getMaterialFileIcon('docx')"
                            alt="">
                        <span class="fs-16px text-soft">Document file not found.</span>
                    </div>
                    <div v-else
                        class="d-flex justify-content-center align-items-center w-100 h-100">
                        <img width="50"
                            :src="getMaterialFileIcon('png')"
                            alt="">
                        <span class="fs-16px text-soft">File not found.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ImagePreviewModal v-if="previewFile"
        :files="showFiles"
        :preview="previewFile"
        @toggle="toggleImagePreview"></ImagePreviewModal>
</template>

<style lang="scss"
    scoped>
    .nav-link {
        font-weight: bold !important;
    }

    .modal-body {
        height: 80vh;
        overflow-y: auto;

        .file-box {
            display: flex;
            flex-wrap: wrap;

            .file-item {
                margin: 0px 6px 25px;
                overflow: hidden;
                width: 6rem;
                display: flex;
                flex-direction: column;

                .file {
                    width: 6rem;
                    height: 8rem;
                    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
                    background-position: 0px 0px, 10px 10px;
                    background-size: 20px 20px;
                    background-color: #ffffff;
                    border-radius: 3px;
                    transition: background-color 0.3s ease-in-out;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 5px;
                    border: 1px solid #dddddd;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #364a63;

                    img {
                        width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        font-size: 12px;
                        text-align: center;
                    }

                    .pdf {
                        color: rgb(255, 36, 106);
                    }

                    .others {
                        color: #48C9B0;
                    }
                }

                &:hover {
                    .file {
                        background-color: #F8F9F9;
                    }
                }

                .file-title {
                    line-height: 15px;
                }
            }
        }
    }
</style>