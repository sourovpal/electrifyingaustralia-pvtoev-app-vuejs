<script setup>

    import ProgressBar from 'primevue/progressbar';
    import { ref, computed, watch, nextTick } from 'vue';
    import { formatFileSize, shortenFileName, imageExtensions, fileNameToExtension, getFileObjectUrl } from '@helpers';
    import { useDebounceFn } from '@vueuse/core';
    import { usePlatformStore } from '@stores';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import api from "@actions/api";

    import { $toast } from '@config';

    const props = defineProps({
        file: { type: Object },
        delay: { type: Number, default: 1000 }
    });


    const platformStore = usePlatformStore();

    const emits = defineEmits(['complete']);

    const upload_file = computed(() => props.file);
    const upload_delay = computed(() => props.delay);

    const editLeadId = computed(() => platformStore.getEditLeadId);

    const file_name = ref(null);
    const file_short_name = ref(null);
    const file_size = ref(null);
    const file_ext = ref(null);
    const progress = ref(0);
    const preview_file = ref(null);
    const isComplete = ref(false);
    const isError = ref(false);

    const uploadFile = useDebounceFn(() => uploadFileFast(), upload_delay.value);

    const uploadFileFast = async () => {

        isComplete.value = false;
        isError.value = false;
        progress.value = 0;

        const form_data = new FormData();

        form_data.append("attachment", upload_file.value);

        const random = (Math.round(Math.random() * 10) + 1);

        await api.post(`/platform/${editLeadId.value}/deals/attachment`, form_data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    progress.value = Math.abs((Math.round((progressEvent.loaded * 100) / progressEvent.total) - random));
                },
            }
        ).then(res => {
            platformStore.appendLeadFile(res.data);
            progress.value = 100;
            isComplete.value = true;
        }).catch(error => {
            isError.value = true;
        });

        (useDebounceFn(() => emits('complete', isComplete.value ?? false), 100))();

    };

    watch(upload_file, async (file) => {

        file_name.value = file.name;

        file_size.value = formatFileSize(file.size);

        file_short_name.value = shortenFileName(file_name.value, 20);

        file_ext.value = fileNameToExtension(file_name.value);

        if (file_ext.value && imageExtensions.includes(file_ext.value)) {

            preview_file.value = getFileObjectUrl(file);

        } else {

            preview_file.value = getMaterialFileIcon(file_name.value);
        }

        await nextTick();

        uploadFile();
    }, { deep: true, immediate: true });


</script>

<template>
    <div class="rounded-2 px-2 py-2 card mb-2 border rounded-2">
        <div class="d-flex justify-content-between align-items-center">
            <div class="col-left">

                <div class="d-flex justify-content-start align-items-center">

                    <Avatar :image="preview_file"
                        pt:image:class="object-contain"
                        class="me-3 file-icon">
                    </Avatar>

                    <div class="file-details w-100">

                        <div class="fs-14px text-head mb-2 white-space-nowrap">{{ file_short_name }}</div>

                        <div class="d-flex justify-content-between align-items-center w-100">

                            <div class="w-100">

                                <ProgressBar size="small"
                                    :show-value="false"
                                    :value="progress"
                                    :mode="`${(isComplete || isError)?'determinate':'indeterminate'}`"
                                    style="--p-progressbar-height:0.3rem;"
                                    :class="{'is-error':isError}"
                                    class="fs-14px" />
                            </div>

                            <div class="fs-14px text-soft ms-2">{{ progress }}%</div>

                        </div>

                    </div>
                </div>

            </div>

            <div class="fs-14px text-soft pe-1">

                <div v-if="isError"
                    class="d-flex justify-content-between align-items-center">
                    <span class="cursor-pointer"
                        @click="uploadFileFast">
                        <i class="pi pi-upload fs-14px text-success"></i>
                    </span>

                    <span class="cursor-pointer ms-2"
                        @click="emits('complete', true)">
                        <i class="pi pi-times fs-14px text-danger"></i>
                    </span>
                </div>

                <span v-else>{{ file_size }}</span>

            </div>

        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .card {
        box-shadow: none;

        .col-left {
            width: 75%;
        }
    }

    .file-details {
        line-height: 10px;
    }

    .file-icon {
        min-width: 2rem !important;
    }

    :deep(.is-error) {
        .p-progressbar-value {
            --p-progressbar-value-background: #ff2f74 !important;
        }
    }
</style>