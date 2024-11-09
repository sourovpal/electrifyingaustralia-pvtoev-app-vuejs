<script setup>

    import { ref, computed, watch, nextTick } from 'vue';
    import { formatFileSize, shortenFileName, imageExtensions, fileNameToExtension, formatTimeAgo, handleDownloadAttachmentFiles } from '@helpers';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import FetchImage from '@components/FetchImage.vue';
    import { useConfirm } from "primevue/useconfirm";
    import { $toast } from '@config';
    import { useApiRequest } from '@actions';
    import { usePlatformStore } from '@stores';
    import BlockUI from 'primevue/blockui';

    const props = defineProps({
        file: { type: Object },
    });

    const platformStore = usePlatformStore();

    const emits = defineEmits(['preview']);

    const confirm = useConfirm();

    const upload_file = computed(() => props.file);

    const is_deleted = ref(false);

    const file_name = ref(null);
    const file_short_name = ref(null);
    const file_size = ref(null);
    const file_ext = ref(null);
    const preview_file = ref(null);
    const isImage = ref(false);

    watch(upload_file, async (file) => {

        file_name.value = file.filename;

        file_size.value = formatFileSize(file.size);

        file_short_name.value = shortenFileName(file_name.value, 25);

        file_ext.value = fileNameToExtension(file_name.value);

        preview_file.value = getMaterialFileIcon(file_name.value);

        isImage.value = imageExtensions.includes(file_ext.value);

    }, { deep: true, immediate: true });


    const confirmDeleteAttachment = (event) => {
        confirm.require({
            header: 'Delete Attachment?',
            message: 'Are you sure you want to Delete?',
            icon: 'pi pi-trash fs-16px',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
                style: 'height:2rem'
            },
            acceptProps: {
                label: 'Delete',
                severity: 'danger',
                style: 'height:2rem'
            },
            accept: async () => {
                await useApiRequest(
                    { url: `/platform/files/${props.file.file_id}/delete/${props.file.filename}`, method: 'delete' }
                ).then(res => {
                    is_deleted.value = true;
                    $toast.success(res.message.text);
                }).catch(error => {
                    $toast.error(error.message);
                });
            },
            reject: () => { }
        });
    };



</script>

<template>

    <BlockUI :blocked="is_deleted">
        <div class="rounded-2 px-2 py-2 card mb-2 border rounded-2 cursor-pointer">
            <div class="d-flex justify-content-between align-items-center">
                <div @click="emits('preview', file)"
                    class="col-left">

                    <div class="d-flex justify-content-start align-items-center">


                        <Avatar :image="preview_file"
                            pt:image:class="object-contain"
                            class="me-3 file-icon">
                            <FetchImage class="object-contain"
                                v-if="isImage"
                                :src="file.filepath"></FetchImage>
                        </Avatar>

                        <div class="file-details w-100">

                            <div class="fs-14px text-head mb-2 white-space-nowrap">{{ file_short_name }}</div>

                            <div class="d-flex justify-content-between align-items-center w-100">
                                <div class="w-100 fs-12px text-soft">
                                    {{ formatTimeAgo(file.created_at, 15)?.replace('a few seconds ago', 'just now') }}
                                    <span class="px-1">•</span>
                                    {{ file_size }}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="fs-14px text-soft pe-1 actions-">

                    <div class="d-flex justify-content-between align-items-center">
                        <span class="cursor-pointer" @click="handleDownloadAttachmentFiles(`/platform/files/${file.file_id}/download/${file.filename}`, file.filename)">
                            <i class="pi pi-download fs-14px text-soft"></i>
                        </span>

                        <span @click="confirmDeleteAttachment()"
                            class="cursor-pointer ms-3">
                            <i class="pi pi-trash fs-14px text-danger"></i>
                        </span>
                    </div>

                </div>

            </div>
        </div>
    </BlockUI>
</template>

<style scoped
    lang="scss">
    .card {
        box-shadow: none;

        .col-left {
            width: 75%;
        }

        .actions {
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease-in-out;
        }

        &:hover {
            .actions {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    .file-details {
        line-height: 10px;
    }

    .file-icon {
        min-width: 2rem !important;
    }
</style>