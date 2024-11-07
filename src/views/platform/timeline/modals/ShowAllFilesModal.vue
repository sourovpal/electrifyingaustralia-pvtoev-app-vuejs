<script setup>
    import ImagePreviewModal from './ImagePreviewModal.vue';
    import { fileNameToExtension, imageExtensions, shortenFileName } from '@helpers';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import { ref, onMounted, computed } from 'vue';
    import { useApiRequest } from '@actions/api';
    import { $toast } from '@config';
    import { usePlatformStore } from '@stores';
    import { useIntersectionObserver } from '@vueuse/core';
    import AllFilesSkeletor from '../components/Skeletor/AllFilesSkeletor.vue';

    const props = defineProps({
        files: { type: Array, default: [] },
        url: { type: String, default: null }
    });

    const platformStore = usePlatformStore();
    const tabs = ['all', 'images', 'pdf', 'others'];
    const emits = defineEmits(['close']);
    const activeTab = ref('all');
    const originalFiles = ref([]);
    const showFiles = ref([]);
    const isLoading = ref(false);
    const $leadId = computed(() => platformStore.getEditLeadId);
    const $nextPage = ref(1);
    const $limit = ref(50);
    const infiniteOvserverRef = ref(null);
    const infiniteLoading = ref(false);
    const paginate = ref({ from: 0, to: 0, total: 0 });
    const isComplete = ref(false);
    const imagePreview = ref(null);

    function hideModalHandler() {
        emits('close', {});
    }

    async function fetchLeadFiles(extension = null, stopObserver) {

        if (extension) {
            $nextPage.value = 1;
            activeTab.value = extension;
            isComplete.value = false;
            isLoading.value = true;
        } else if (!$nextPage.value) { return; }
        else { infiniteLoading.value = true; }

        let url = props.url;
        if (!url) url = `/platform/${$leadId.value}/attachments`;

        await useApiRequest({
            url,
            payload: {
                page: $nextPage.value,
                limit: $limit.value,
                extension: activeTab.value,
            }
        }).then(res => {
            const { pagination, attachments } = res;

            $nextPage.value = pagination.next_page ?? null;

            if (pagination && Object.keys(pagination).length) paginate.value = pagination;

            if (!$nextPage.value) isComplete.value = true;

            if (stopObserver && !$nextPage.value) stopObserver();

            if (extension) originalFiles.value = attachments;
            else originalFiles.value = originalFiles.value.concat(attachments);

            showFiles.value = originalFiles.value;

            infiniteLoading.value = false;

            isLoading.value = false;

        }).catch(error => {

            infiniteLoading.value = false;

            isLoading.value = false;

            $toast.error(error.message);
        });
    }

    function handlePreviewFile(file) {
        imagePreview.value.preview(file, showFiles.value);
    }

    onMounted(() => {
        isLoading.value = true;
        fetchLeadFiles();
        const { stop: stopObserver } = useIntersectionObserver(
            infiniteOvserverRef,
            ([{ isIntersecting }], observerElement) => {
                if (!isLoading.value && !infiniteLoading.value && !isComplete.value && isIntersecting) {
                    fetchLeadFiles(null, stopObserver);
                }
            },
        )
    });

</script>

<template>
    <modal-dialog modal
        :visible="true"
        v-bind="$attrs"
        pt:root:class="rounded-2"
        pt:mask:class="backdrop-blur-sm"
        :style="{ width: `47.2vw` }"
        :breakpoints="{ '1199px': '50vw', '575px': '60vw' }">
        >
        <template #container>
            <Tabs value="all">
                <TabList class="">

                    <Tab class="py-2 text-capitalize ms-2"
                        v-for="(tab, index) in tabs"
                        :key="tab"
                        :class="`${index != 0?'d-none':''} d-lg-block`"
                        @click="fetchLeadFiles(tab)"
                        :value="tab">{{ tab }}</Tab>

                    <Tab class="py-2 ms-auto border-0 d-flex justify-content-start align-items-center"
                        @click="emits('close', false)"
                        value="close">
                        <span class="me-3">
                            {{ paginate?.from ? 1: 0 }} - {{ paginate?.to??0 }} of {{ paginate?.total??0}}</span>
                        <font-awesome-icon icon="fas fa-close"
                            class="text-soft fs-18px"></font-awesome-icon>
                    </Tab>

                </TabList>
                <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
                    style="width:100%;height:77vh;"
                    class="pb-3 overflow-hidden">

                    <TabPanels v-if="isLoading || infiniteLoading || showFiles.length"
                        class="tab-panels">

                        <TabPanel value="all"
                            class="d-block">

                            <div class="file-box">

                                <template v-if="isLoading">
                                    <all-files-skeletor v-for="(item, index) in 40"
                                        :key="index"></all-files-skeletor>
                                </template>

                                <template v-else-if="!isLoading">

                                    <div class="file-item"
                                        v-for="(file, index) in showFiles"
                                        :key="file.file_id">

                                        <div @click="handlePreviewFile(file)"
                                            class="file">
                                            <FetchImage :src="file.filepath"
                                                :alt="file.filename" />
                                        </div>

                                        <span class="file-title fs-12px text-head text-center">
                                            {{ shortenFileName(file?.filename, 20) }}
                                        </span>

                                    </div>

                                </template>

                                <template v-if="infiniteLoading">
                                    <all-files-skeletor v-for="(item, index) in 16"
                                        :key="index"></all-files-skeletor>
                                </template>

                            </div>

                            <div class="w-100 py-5"
                                ref="infiniteOvserverRef">
                            </div>

                        </TabPanel>

                    </TabPanels>

                    <div v-else
                        class="w-100 h-100 d-flex justify-content-center align-items-center">
                        No files available.
                    </div>

                </scroll-panel>

            </Tabs>

        </template>
    </modal-dialog>


    <ImagePreviewModal ref="imagePreview"></ImagePreviewModal>
</template>

<style lang="scss"
    scoped>
    .nav-link {
        font-weight: bold !important;
    }

    .file-box {
        display: flex;
        flex-wrap: wrap;

        .file-item {
            margin: 0px 6px 25px;
            overflow: hidden;
            width: 6rem;
            display: flex;
            flex-direction: column;

            :deep(.file) {
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
</style>