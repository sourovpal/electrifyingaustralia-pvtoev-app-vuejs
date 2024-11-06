<script setup>
    import { ref, onMounted } from 'vue';
    import { imageExtensions, handleDownloadFile, fetchFile } from '@helpers';
    import { useApiRequest } from '@actions';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import FetchImage from '@components/FetchImage.vue';

    const emits = defineEmits(['close']);

    const attachments = ref([]);

    const toggleModal = ref(false);

    const preview_file = ref(null);
    const next_file = ref(null);
    const prev_file = ref(null);
    const current_index = ref(0);
    const file_type = ref('image'); // image, pdf, others
    const preview_pdf = ref(null);

    function preview(file = null, files = null) {

        preview_pdf.value = null;

        if (files) attachments.value = files;
        
        if (!file) return;

        toggleModal.value = !!file;

        preview_file.value = file;

        if (imageExtensions.includes(file.extension)) {
            file_type.value = 'image';
        } else if (file.extension == 'pdf') {
            file_type.value = 'pdf';
            handlePreviewPdf(file.filepath);
        } else {
            file_type.value = 'other';
        }

        if (!attachments.value.length) return next_file.value = prev_file.value = null;

        current_index.value = attachments.value.findIndex(item => item.file_id == file.file_id);

        let next = attachments.value[current_index.value + 1];
        let prev = attachments.value[current_index.value - 1];

        if (next) next_file.value = next;
        else next_file.value = null;

        if (prev) prev_file.value = prev;
        else prev_file.value = null;
    }

    async function handlePreviewPdf(pdf) {
        preview_pdf.value = await fetchFile(pdf);
    }



    function handleCloseModal() {
        toggleModal.value = false;
        emits('close', false);
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
            $toast.clear();
            $toast.error(error.message);
        });
    }

    defineExpose({
        preview,
    });


</script>

<template>

    <modal-dialog modal
        v-if="toggleModal"
        :visible="toggleModal"
        pt:root:class="rounded-2 border-0"
        :style="{ width: `60vw`, height:'95vh' }"
        :breakpoints="{ '1199px': '50vw', '575px': '60vw' }">
        <template #container>

            <div class="preview-contact">

                <div class="modal-left">
                    <div class="col-12">
                        <Button icon="pi pi-arrow-left"
                            rounded
                            @click="preview(prev_file)"
                            :disabled="!prev_file"
                            severity="secondary" />
                    </div>
                </div>

                <div class="modal-body px-0 py-0">

                    <FetchImage v-if="preview_file && file_type == 'image'"
                        :key="preview_file.file_id"
                        :src="preview_file.filepath" />

                    <div v-else-if="preview_file && file_type == 'pdf'"
                        :key="preview_file.file_id"
                        class="w-100 h-100">

                        <div v-if="!preview_pdf"
                            class="not-found fs-16px">Sorry, This PDF file is currently unavailable.</div>

                        <iframe v-else
                            width="100%"
                            height="100%"
                            :src="preview_pdf"
                            frameborder="0"></iframe>
                    </div>

                    <div v-else
                        class="not-found fs-16px text-center flex-column">
                        <div class="d-flex flex-column">
                            <img :src="getMaterialFileIcon(preview_file.extension)">
                        </div>
                        <div class="d-flex flex-column">
                            <span>This file is not available for preview at the moment.</span>
                            <span>
                                Please <span class="text-primary cursor-pointer">click here</span> to download.
                            </span>
                        </div>

                    </div>


                </div>

                <div class="modal-right">
                    <div class="col-4">
                        <Button icon="pi pi-times"
                            rounded
                            @click="handleCloseModal"
                            severity="secondary" />
                    </div>
                    <div class="col-4 mt-4">
                        <Button icon="pi pi-arrow-right"
                            rounded
                            :disabled="!next_file"
                            @click="preview(next_file)"
                            class="mt-4"
                            severity="secondary" />
                    </div>
                    <div class="col-4 d-flex flex-column">
                        <Button icon="pi pi-trash"
                            rounded
                            :disabled="!preview_file"
                            class="mb-3"
                            severity="secondary" />
                        <Button icon="pi pi-download"
                            rounded
                            :disabled="!preview_file"
                            severity="secondary" />
                    </div>
                </div>
                <div class="preview-footer">
                    <span class="me-2">
                        {{ current_index + 1 }} / {{ attachments.length??1 }}
                    </span>
                    {{ preview_file.filename }}
                </div>
            </div>
        </template>
    </modal-dialog>
</template>

<style scoped
    lang="scss">
    .not-found {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background: #ffffff;
        border-radius: 5px;
    }

    .preview-contact {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        background: transparent !important;
        box-shadow: none !important;

        .preview-footer {
            position: fixed;
            bottom: -2rem;
            left: 0;
            right: 0;
            text-align: center;
            color: #ffffff;
        }

        .modal-left {
            display: flex;
            justify-content: center;
            flex-direction: column;
            position: fixed;
            left: -4rem;
            height: 100%;
        }

        .modal-right {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            position: fixed;
            right: -4rem;
            height: 100%;
        }

        .modal-body {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 8px;
            background-position: 0px 0px, 10px 10px;
            background-size: 20px 20px;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

            :deep(img) {
                width: 100%;
                height: inherit !important;
                max-height: 100%;
                object-fit: contain;
            }
        }
    }
</style>