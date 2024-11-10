<script setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import { shortenFileName, imageExtensions } from '@helpers';
    import { Skeletor } from "vue-skeletor";
    import { useApiRequest } from '@actions';
    import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
    import ShowAllFilesModal from '../modals/ShowAllFilesModal.vue';

    const props = defineProps({
        event: {
            type: Object,
            default: {},
        },
        load: { type: String, default: null }
    });

    const toggleShowAllFiles = ref(false);
    const imagePreview = ref(null);
    const attachments = ref([]);
    const pagination = ref({ total: 0 });
    const isLoading = ref(false);

    const load_new = computed(() => props.load);

    watch(load_new, () => fetchAttachments(), { deep: true });

    async function fetchAttachments() {
        await useApiRequest({
            url: `/platform/timeline/files/${props.event.timeline_id}/all`,
            payload: {
                page: 1,
                limit: 4,
            }
        }).then(res => {
            const { pagination: paginate, attachments: files } = res;
            attachments.value = files;
            pagination.value = paginate;
            isLoading.value = false;
        }).catch(error => {
            isLoading.value = false;
        });
    }

    function handlePreviewImage(file, index) {
        if (index == 3) return toggleShowAllFiles.value = true;
        imagePreview.value?.preview(file);
    }

    onMounted(() => {
        isLoading.value = true;
        fetchAttachments();
    });

</script>
<template>
    <div class="d-block">
        <div class="fs-14px fw-bold feed-wrap mb-1">
            <div class="d-flex flex-wrap mt-1"
                style="max-width: 224px;">
                <template v-if="!attachments.length">
                    <div v-for="(file, index) in 4"
                        :key="index"
                        class="d-flex flex-column px-1 py-1">
                        <div class="grid-item">
                            <Skeletor style="width:100%;height:100%;border-radius:5px;"></Skeletor>
                        </div>
                        <span class="text-center d-block fs-12px text-head">
                            <Skeletor style="width:70%;height:0.3rem;border-radius:5px;"></Skeletor>
                        </span>
                    </div>
                </template>

                <template v-else>

                    <template v-for="(file, index) in attachments"
                        :key="index">

                        <div @click="handlePreviewImage(file, index)"
                            class="d-flex flex-column px-1 py-1">

                            <div class="grid-item"
                                :data-other-files="index === 3 ? (pagination.total  - 3 )+'+' : ''"
                                :class="{overlay:(pagination.total > 4 && index == 3), 'w-100':((index == 0 && pagination.total == 1) || (index == 2 && pagination.total == 3)), 'h-100':((index == 0 && pagination.total == 1) || (index == 2 && pagination.total == 3))}">

                                <fetch-image :key="file.filepath"
                                    :src="file.filepath"
                                    :filename="file.filename"
                                    :alt="file.filename">
                                </fetch-image>

                            </div>

                            <span class="text-center d-block fs-12px text-head">
                                {{ shortenFileName(
                                file.filename,
                                ((index == 0 && pagination.total == 1) ||
                                (index == 2 && pagination.total== 3))?25:12
                                ) }}
                            </span>

                        </div>

                    </template>

                </template>

            </div>
        </div>
    </div>

    <ImagePreviewModal ref="imagePreview"></ImagePreviewModal>

    <show-all-files-modal :url="`/platform/timeline/files/${event.timeline_id}/all`"
        v-if="toggleShowAllFiles"
        @close="toggleShowAllFiles=false"></show-all-files-modal>

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
            object-fit: contain;
        }
    }
</style>