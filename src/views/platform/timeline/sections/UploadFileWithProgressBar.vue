<script setup>
    import {
        getMaterialFileIcon,
        getMaterialFolderIcon,
        getVSIFileIcon,
        getVSIFolderIcon,
    } from "file-extension-icon-js";
    import { defineProps, onMounted, ref, defineEmits } from 'vue';
    import api from "@actions/api";
    import { shortenFileName } from '@helpers';
    import { useLeadStore } from '@stores';

    const leadStore = useLeadStore();

    const props = defineProps({
        index: {
            type: Number,
            default: 1,
        },
        file: {
            type: Object,
            default: null,
        },
        fileName: {
            default({ file }) {
                return file.name;
            }
        },
        shortFileName: {
            default({ file }) {
                return shortenFileName(file.name, 30);
            }
        },
        fileIcon: {
            default({ file }) {

            }
        },
    });

    const emits = defineEmits(['fetchTimelineLogs']);

    const progressColor = ref('rgb(59 130 246)');
    const progress = ref(0);
    const isUploadComplete = ref(false);

    const uploadFile = async (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("lead_id", leadStore.getEditLeadId);
        formData.append("files[]", file);
        await api.post('/leads/upload/files', formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                },
            }
        ).then(async res => {
            const { success, message } = res.data;
            if (success) {
                progressColor.value = 'rgb(34 197 94)';
                await setTimeout(() => {
                    isUploadComplete.value = true;
                    emits('fetchTimelineLogs', file)
                }, 2000);
                return;
            } else {
                progressColor.value = 'rgb(225 29 72)';
            }
        }).catch(error => {
            progress.value = 99;
            progressColor.value = 'rgb(225 29 72)';
        });

    };

    onMounted(async () => {
        await setTimeout(() => {
            uploadFile(props.file);
        }, 300 * Number(props.index));
    });

</script>

<template>
    <div v-if="!isUploadComplete"
        class="file-details d-flex justify-content-start align-items-center flex-row mb-3">
        <div class="file-icons">
            <img width="30"
                :src="getMaterialFileIcon(fileName)"
                :alt="fileName">
        </div>
        <div class="d-flex flex-column ms-2 me-3 w-100">
            <span class="file-name fs-14px text-soft d-block mb-1">{{ shortFileName }}</span>
            <div class="progress-container"
                :style="`--progress-value:${progress}%;--progress-bg:${progressColor};`">
                <div class="progress"></div>
                <div class="percentage">{{ progress }}%</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .file-name {
        line-height: 16px;
        margin-top: -2px;
    }

    .progress-container {
        box-shadow: 0 4px 5px rgb(0, 0, 0, 0.1)
    }

    .progress-container,
    .progress {
        background-color: #eee;
        border-radius: 5px;
        position: relative;
        height: 7px;
        width: 100%;
    }

    .progress {
        background-color: var(--progress-bg);
        width: var(--progress-value);
        transition: width 0.4s linear;
    }

    .percentage {
        background-color: var(--progress-bg);
        border-radius: 5px;
        box-shadow: 0 4px 5px rgb(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        padding: 4px;
        position: absolute;
        top: -35px;
        left: var(--progress-value);
        transform: translateX(-50%);
        width: 40px;
        text-align: center;
        transition: left 0.4s linear;
    }

    .percentage::after {
        background-color: var(--progress-bg);
        content: '';
        position: absolute;
        top: 22px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        height: 10px;
        width: 10px;
        z-index: -1;
    }
</style>