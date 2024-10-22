<script setup>
    import { Modal } from "mdb-ui-kit";
    import {     ref,   onMounted } from 'vue';
    import { leadImageTypes, handleDownloadFile, fetchImage } from '@helpers';
    import { useApiRequest } from '@actions';
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";

    const props = defineProps({
        files: {
            type: Array,
            default: [],
        },
        preview: {
            type: Object,
            default: {},
        },
        filesLength: {
            default({ files }) {
                return files?.length;
            }
        }
    });

    const emits = defineEmits(['toggle', 'deleteRefresh']);

    const imagePreviewModalRef = ref(null);
    const toggleDeleteFileModalRef = ref(false);
    const currentPreviewFile = ref(null);
    const prevPreviewImage = ref(null);
    const nextPreviewImage = ref(null);
    const currentFileType = ref('image');
    const deleteIsLoading = ref(false);
    let modalInstance = null;

    onMounted(() => {
        modalInstance = new Modal(imagePreviewModalRef.value, {
            keyboard: false,
            backdrop: 'static',
        });
        modalInstance.show();
        handlePreviewFile(props.preview);
    });


    function showModal() {
        modalInstance.show();
    }

    function hideModal() {
        modalInstance.hide();
        emits('toggle', null);
    }

    async function handlePreviewFile(file = null) {
        if (!file) return;
        var findIndex = props.files.findIndex(item => item.file_id == file.file_id);
        if (findIndex <= -1) {
            emits('toggle', null);
            return;
        }
        currentFileType.value = null;
        var fileExt = file.filename.split('.').pop().toLowerCase();
        currentPreviewFile.value = {};
        currentPreviewFile.value = file;
        if (leadImageTypes.includes(fileExt)) {
            currentFileType.value = 'image';
        } else if (fileExt == 'pdf') {
            currentFileType.value = 'pdf';
            fetchImage(file.filepath, (url) => {
                if (url) {
                    currentPreviewFile.value.pdf_filepath = url;
                } else {
                    currentPreviewFile.value.pdf_filepath = getMaterialFileIcon('pdf');
                }
            })
        } else {
            currentFileType.value = 'other';
        }

        if (props.filesLength == 1) {
            prevPreviewImage.value = null;
            nextPreviewImage.value = null;
            return;
        }

        if (props.files[findIndex + 1] != 'undefined') {
            nextPreviewImage.value = props.files[findIndex + 1];
        } else {
            nextPreviewImage.value = null;
        }

        if (props.files[findIndex - 1] != 'undefined') {
            prevPreviewImage.value = props.files[findIndex - 1];
        } else {
            prevPreviewImage.value = null;
        }
    }


    async function handleDelegeFile() {
        if (!currentPreviewFile.value) return;
        deleteIsLoading.value = true;
        await useApiRequest({
            url: `/platform/delete/${currentPreviewFile.value.file_id}/files/${currentPreviewFile.value.filename}`
        }).then(res => {
            const { success } = res;
            deleteIsLoading.value = false;
            if (success) {
                emits('deleteRefresh', currentPreviewFile.value);
                toggleDeleteFileModalRef.value = false;
                var file = nextPreviewImage.value ?? prevPreviewImage.value ?? null;
                if (file) {
                    handlePreviewFile(file);
                    modalInstance.show();
                } else {
                    currentPreviewFile.value = null;
                    hideModal();
                }
            }
        }).catch(error => {
            deleteIsLoading.value = false;
            modalInstance.show();
            toggleDeleteFileModalRef.value = false;
        });
    }

    function handleDeleteConfirmation() {
        modalInstance.hide();
        toggleDeleteFileModalRef.value = true;
    }

    function handleCancelConfirmation() {
        modalInstance.show();
        toggleDeleteFileModalRef.value = false;
    }

    defineExpose({
        showModal,
        hideModal
    })

</script>

<template>
    <div @keyup.left="handlePreviewFile(prevPreviewImage)"
        @keyup.right="handlePreviewFile(nextPreviewImage)"
        class="modal fade"
        id="imagePreviewModalRef"
        ref="imagePreviewModalRef">
        <div class="modal-dialog modal-dialog-centered modal-xl position-relative">
            <div class="modal-content preview-contact">
                <div class="modal-left">
                    <div>
                        <button :disabled="!prevPreviewImage"
                            @click="handlePreviewFile(prevPreviewImage)"
                            class="btn btn-white btn-lg btn-floating">
                            <font-awesome-icon icon="fas fa-chevron-left"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                    </div>
                </div>
                <div class="modal-body px-0 py-0"
                    :class="{'image-preview':currentFileType=='image' || currentFileType == 'other'}">
                    <FetchImage v-if="currentPreviewFile && currentFileType == 'image' "
                        :src="currentPreviewFile?.filepath"
                        :filename="currentPreviewFile?.filename"
                        :alt="currentPreviewFile?.filename"
                        :key="currentPreviewFile?.filename"
                        loader />
                    <div v-else-if="currentPreviewFile && currentFileType == 'pdf'"
                        class="w-100 h-100">
                        <iframe class="w-100 h-100"
                            :src="currentPreviewFile?.pdf_filepath"
                            frameborder="0"></iframe>
                    </div>
                    <div v-else-if="currentPreviewFile && (currentFileType != 'pdf' || currentFileType != 'image')">
                        <div class="text-center">
                            <img width="200"
                                :src="getMaterialFileIcon(currentPreviewFile?.filepath)"
                                :alt="currentPreviewFile?.filename">
                        </div>
                        <div class="fs-18px text-head text-center">
                            Sorry, you cannot preview this file at the moment.
                            <br>
                            Please <a
                                @click.prevent="handleDownloadFile(`/platform/download/${currentPreviewFile?.file_id}/files/${currentPreviewFile?.filename}`, currentPreviewFile?.filename)"
                                :href="currentPreviewFile?.filename">click here</a> to download.
                        </div>
                    </div>
                </div>
                <div class="modal-right">
                    <div>
                        <button @click="hideModal()"
                            class="btn btn-white btn-lg btn-floating">
                            <font-awesome-icon icon="fas fa-close"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                    </div>
                    <div>
                        <button :disabled="!nextPreviewImage"
                            @click="handlePreviewFile(nextPreviewImage)"
                            class="btn btn-white btn-lg btn-floating">
                            <font-awesome-icon icon="fas fa-chevron-right"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <button @click="handleDeleteConfirmation"
                            class="btn btn-white btn-lg btn-floating mb-3">
                            <font-awesome-icon icon="fas fa-trash"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                        <button
                            @click="handleDownloadFile(`/platform/download/${currentPreviewFile?.file_id}/files/${currentPreviewFile?.filename}`, currentPreviewFile?.filename)"
                            class="btn btn-white btn-lg btn-floating">
                            <font-awesome-icon icon="fas fa-download"
                                class="text-soft fs-18px mt-1"></font-awesome-icon>
                        </button>
                    </div>
                </div>
                <span class="preview-img-name">{{ currentPreviewFile?.filename }}</span>
            </div>
        </div>
    </div>

    <bootstrap-modal v-if="toggleDeleteFileModalRef"
        @close="handleCancelConfirmation"
        size="sm">
        <h5 class="text-head text-center fw-bold">Delete this file?</h5>
        <p class="fs-12px text-center text-danger">
            This action cannot be undone! To confirm your intent, please click
            delete button.
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <button @click="handleCancelConfirmation"
                class="btn btn-primary btn-sm"
                data-mdb-dismiss="modal">
                Cancel
            </button>
            <loading-button class="btn btn-danger btn-sm"
                :is-loading="deleteIsLoading"
                @click="handleDelegeFile">
                Delete
            </loading-button>
        </div>
    </bootstrap-modal>
</template>

<style scoped
    lang="scss">
    .modal-dialog {
        @media (min-width: 1200px) {
            &.modal-xl {
                --mdb-modal-width: 1200px !important;
            }
        }
    }

    .modal-content.preview-contact {
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: row;
        background: transparent !important;
        box-shadow: none !important;

        .preview-img-name {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            line-height: 22px;
            color: #000000;
            white-space: nowrap;
            max-width: 350px;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        button {
            box-shadow: none !important;
            background-color: #ffffff;
        }

        .modal-left {
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .modal-right {
            margin-left: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
        }

        :deep(.modal-body) {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 8px;
            background-position: 0px 0px, 10px 10px;
            background-size: 20px 20px;

            &.image-preview {
                background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

                img {
                    width: 100%;
                    height: inherit !important;
                    max-height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
</style>