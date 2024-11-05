<script setup>
    import ImagePreviewModal from './ImagePreviewModal.vue';
    import { fileNameToExtension, imageExtensions, shortenFileName } from '@helpers';
    import { getMaterialFileIcon } from "file-extension-icon-js";
    import { ref, onMounted, computed } from 'vue';
    import { useApiRequest } from '@actions/api';
    import { $toast } from '@config';
    import { usePlatformStore } from '@stores';
    import { useIntersectionObserver } from '@vueuse/core';
    import AllFilesSkeletor from './AllFilesSkeletor.vue'

    import Tabs from 'primevue/tabs';
    import Tab from 'primevue/tab';
    import TabList from 'primevue/tablist';
    import TabPanel from 'primevue/tabpanel';
    import TabPanels from 'primevue/tabpanels';


    const props = defineProps({
        files: { type: Array, default: [] }
    });

    const platformStore = usePlatformStore();
    const tabs = ['all', 'images', 'pdf', 'others'];
    const emits = defineEmits(['close']);
    const activeTab = ref('all');
    const originalFiles = ref([]);
    const showFiles = ref([]);
    const previewFile = ref(null);
    const isLoading = ref(false);
    const $leadId = computed(() => platformStore.getEditLeadId);
    const $nextPage = ref(1);
    const $limit = ref(50);
    const infiniteOvserverRef = ref(null);
    const infiniteLoading = ref(false);
    const hideDeletedFiles = ref([]);
    const paginate = ref({});

    function hideModalHandler() {
        emits('close', {});
    }

    async function fetchLeadFiles(extension = null, stopObserver) {

        if (extension) {
            $nextPage.value = 1;
            activeTab.value = extension;
            isLoading.value = true;
        } else if (!$nextPage.value) {
            return;
        } else {
            infiniteLoading.value = true;
        }


        await useApiRequest({
            url: `/platform/${$leadId.value}/attachments`,
            payload: {
                page: $nextPage.value,
                limit: $limit.value,
                extension: activeTab.value,
            }
        }).then(res => {
            const { pagination, attachments } = res;

            if (!attachments) return;

            if (pagination && pagination.next_page) {
                paginate.value = pagination;
                $nextPage.value = pagination.next_page;
            } else {
                paginate.value = {};
                $nextPage.value = null;
                if (stopObserver) stopObserver();
            }

            if (extension) {
                originalFiles.value = attachments;
            } else {
                originalFiles.value = originalFiles.value.concat(attachments);
            }

            showFiles.value = originalFiles.value;

            infiniteLoading.value = false;

            isLoading.value = false;

        }).catch(error => {

            infiniteLoading.value = false;

            isLoading.value = false;

            $toast.error(error.message);
        });
    }

    function getFileIcon(file, fileName) {

        if (imageExtensions.includes(fileNameToExtension(fileName))) return file.filepath;

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

    function removePreviewFile(file) {
        hideDeletedFiles.value.push(file.file_id);
    }

    onMounted(() => {
        isLoading.value = true;
        fetchLeadFiles();
        const { stop: stopObserver } = useIntersectionObserver(
            infiniteOvserverRef,
            ([{ isIntersecting }], observerElement) => {
                if (!isLoading.value && !infiniteLoading.value && $nextPage.value && isIntersecting) fetchLeadFiles(null, stopObserver);
            },
        )
    });

</script>

<template>
    <modal-dialog modal
        :visible="true"
        pt:root:class="rounded-2"
        pt:mask:class="backdrop-blur-sm"
        :style="{ width: `47.2vw` }"
        :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">
        >
        <template #container>
            <Tabs value="all">
                <TabList class="">

                    <Tab class="py-2 text-capitalize ms-2"
                        v-for="(tab, index) in tabs"
                        :key="tab"
                        @click="fetchLeadFiles(tab)"
                        :value="tab">{{ tab }}</Tab>

                    <Tab class="py-2 ms-auto border-0 d-flex justify-content-start align-items-center"
                        @click="emits('close', false)"
                        value="close">
                        <span class="me-3">{{ paginate?.from??0 }} - {{ paginate?.to??0 }} of {{ paginate?.total??0 }}</span>
                        <font-awesome-icon icon="fas fa-close"
                            class="text-soft fs-18px"></font-awesome-icon>
                    </Tab>

                </TabList>
                <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
                    style="width:100%;height:81vh;">

                    <TabPanels class="tab-panels">

                        <TabPanel value="all"
                            class="d-block">

                            <div class="file-box">

                                <template v-if="isLoading">
                                    <all-files-skeletor v-for="(item, index) in 40"
                                        :key="index"></all-files-skeletor>
                                </template>

                                <template v-else-if="!isLoading">

                                    <div class="file-item"
                                        v-for="(item, index) in showFiles"
                                        :key="item.file_id">

                                        <div class="file">
                                            <FetchImage :src="item.filepath"
                                                :alt="item.filename" />
                                        </div>

                                        <span class="file-title fs-12px text-head text-center">
                                            {{ shortenFileName(item?.filename, 20) }}
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

                </scroll-panel>

            </Tabs>
            <!-- <div class="modal-body px-3 py-3">

                <div v-if="isLoading"
                    class="d-flex justify-content-center align-items-center">

                    <div>
                        <svg-custom-icon icon="SpinnerIcon" /> Loading...
                    </div>

                </div> -->


            <!-- <div v-else-if="activeTab == 'pdf'"
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

                <div ref="infiniteOvserverRef"
                    class="d-flex justify-content-center align-items-center">
                    <div class="py-5"
                        v-if="infiniteLoading && $nextPage"><svg-custom-icon icon="SpinnerIcon" /> Loading...</div>
                </div> -->

            <!-- </div> -->

        </template>
    </modal-dialog>


    <ImagePreviewModal v-if="previewFile"
        :files="showFiles"
        :preview="previewFile"
        @toggle="toggleImagePreview"
        @deleteRefresh="removePreviewFile"></ImagePreviewModal>
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