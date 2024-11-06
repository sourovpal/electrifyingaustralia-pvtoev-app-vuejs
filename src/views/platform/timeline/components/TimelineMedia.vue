<script setup>

    import { ref, computed, nextTick } from 'vue';
    import BlockUI from 'primevue/blockui';
    import MediaUpload from './MediaUpload.vue';
    import MediaAttachment from './MediaAttachment.vue';
    import MediaAttachmentSkeletor from './Skeletor/MediaAttachmentSkeletor.vue';
    import { usePlatformStore } from '@stores';
    import ShowAllFilesModal from '../modals/ShowAllFilesModal.vue';
    import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
    import { useIntersectionObserver } from '@vueuse/core';

    const props = defineProps({
        loading: { type: Boolean, default: false }
    });

    const platformStore = usePlatformStore();

    const uploadedFiles = computed(() => platformStore.getLeadFiles);
    const pagination = computed(() => platformStore.getLeadFilesPagination);

    const inputFiles = ref(null);
    const isDragOver = ref(false);
    const files = ref([]);
    const isDisabled = ref(false);
    const uploadCompleteFiles = ref([]);
    const uploadInCompleteFiles = ref([]);
    const toggleShowAllFiles = ref(false);
    const isLoading = ref(false);
    const infiniteOvserverRef = ref(null);
    const imagePreview = ref(null);
    const togglePreviewImage = ref(false);

    async function handlePreviewImage(file) {
        togglePreviewImage.value = true;

        await nextTick();

        imagePreview.value.preview(file, uploadedFiles.value);
    }

    function handleDragOver() {
        isDragOver.value = true;
    }

    function handleDragLeave() {
        isDragOver.value = false;
    }

    function onInputFilesHandler() {
        inputFiles.value.click();
    }

    function handleDropFiles(event) {

        if (!event.dataTransfer.files || !event.dataTransfer.files?.length || isDisabled.value) return;
        files.value = event.dataTransfer.files;
        isDisabled.value = true;
    }

    function onSelectedFilesHandler(event) {

        isDragOver.value = false;

        if (!event.target.files || !event.target.files?.length || isDisabled.value) return;

        files.value = event.target.files;

        isDisabled.value = true;
    }


    function handleUploadComplete(index, status) {
        if (status) {

            uploadInCompleteFiles.value.filter(item => item != index);

            uploadCompleteFiles.value.push(index);

        } else {
            uploadInCompleteFiles.value.push(index);
        }

        if (uploadCompleteFiles.value.length === files.value.length) {
            reset();
        }

    }

    function reset() {
        inputFiles.value.value = '';

        isDragOver.value = false;

        files.value = [];

        isDisabled.value = false;

        uploadCompleteFiles.value = [];

        uploadInCompleteFiles.value = [];
    }

    function fetchLeadFiles(stopObserver) {

        if (!pagination.value.next_page) {
            if (stopObserver) return stopObserver();
            return;
        }

        isLoading.value = true;
        platformStore.callFetchFiles({
            lead_id: platformStore.getEditLeadId,
            page: pagination.value.next_page,
        }, ({ loading, files }) => {
            isLoading.value = loading;
        });
    }


    const { stop: stopObserver } = useIntersectionObserver(
        infiniteOvserverRef,
        ([{ isIntersecting }], observerElement) => {
            if (!isLoading.value && !props.loading && pagination.value.next_page && isIntersecting) fetchLeadFiles(stopObserver);
        },
    );



</script>

<template>


    <div @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDropFiles"
        class="w-100 p-3 rounded-2 position-relative drop-box"
        :class="{'border-dashed':isDragOver, 'cursor-no-drop no-drop':isDisabled}">

        <div class="d-flex justify-content-center align-items-center mt-3">
            <i class="pi pi-upload fs-25px text-soft"></i>
        </div>

        <div class="py-2">

            <p class="text-head fs-16px mb-0 text-center">
                Drag & Drop files to upload <br> or
                <span class="text-success cursor-pointer"
                    @click="onInputFilesHandler">
                    Click here
                </span>

            </p>

        </div>

        <input ref="inputFiles"
            class="w-100 h-100 input-files"
            multiple="true"
            type="file"
            :disabled="isDisabled"
            @change="onSelectedFilesHandler" />
    </div>

    <div v-if="files.length"
        class="mt-3">

        <div class="pb-2 d-flex justify-content-between align-items-center">

            <span>
                {{ uploadCompleteFiles.length }} / {{ files.length }} Upload Complete
            </span>

            <span @click="reset"
                class="cursor-pointer text-danger">Reset</span>
        </div>

        <template v-for="(file, index) in files"
            :key="file.name || file.size">

            <Transition>

                <media-upload :file="file"
                    :delay="((index + 1) * 700)"
                    @complete="(status)=>handleUploadComplete(index, status)">

                </media-upload>

            </Transition>

        </template>
    </div>

    <div class="mt-3">

        <div v-if="!files.length"
            class="pb-2 d-flex justify-content-between align-items-center sticky-pagination">
            <span class="">{{ pagination.from?1:0 }} - {{ pagination.to }} of {{ pagination.total }}</span>
            <span class="cursor-pointer text-primary"
                @click="toggleShowAllFiles = true">See all</span>
        </div>

        <template v-for="(file, index) in uploadedFiles"
            :key="file.filepath">

            <Transition>

                <media-attachment @click="handlePreviewImage(file)"
                    :file="file"></media-attachment>

            </Transition>

        </template>

        <template v-if="isLoading || loading">

            <Transition v-for="(item, index) in (isLoading?1:10)"
                :key="index">

                <media-attachment-skeletor></media-attachment-skeletor>

            </Transition>

        </template>

        <div ref="infiniteOvserverRef"
            class="py-3">
            <!-- Load More -->
        </div>

    </div>

    <ImagePreviewModal ref="imagePreview"></ImagePreviewModal>

    <show-all-files-modal v-if="toggleShowAllFiles"
        @close="toggleShowAllFiles=false"></show-all-files-modal>


</template>

<style scoped
    lang="scss">
    .v-enter-active,
    .v-leave-active {
        transition: opacity 1s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .sticky-pagination {
        top: 0;
        position: sticky;
        background: #ffffff;
        z-index: 99;
    }

    .input-files {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
    }

    .drop-box {
        border-style: solid;
        border-width: 2px !important;
        border-color: #10b981;

        &.no-drop {
            border-color: #ff0f5b;
        }
    }

    .border-dashed {
        border-style: dashed !important;
        border-color: #10b981;
    }
</style>