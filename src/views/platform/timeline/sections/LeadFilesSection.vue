<script setup>
  import SlideUpDown from "vue-slide-up-down";
  import { useApiRequest } from "@actions";
  import UploadFileWithProgressBar from './UploadFileWithProgressBar.vue';
  import UploadedFilesList from './components/UploadedFilesList.vue';
  import ShowAllFilesModal from '../modals/ShowAllFilesModal.vue';
  import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
  import { usePlatformStore } from '@stores';
  import { ref, onMounted, computed } from "vue";

  const platformStore = usePlatformStore();
  const selectedFiles = ref([]);
  const isDragOver = ref(false);
  const isLoading = ref(false);
  const $leadId = computed(() => platformStore.getEditLeadId);

  const uploadedFiles = computed({
    get() {
      return platformStore.getLeadFiles;
    },
    set(files) {
      platformStore.setLeadFiles(files);
    }
  });

  const uploadedFilesSectionRef = ref(null);
  const loadLeadFilesObserverRef = ref(null);
  const toggleDropdownBox = ref(true);
  const debounceTimer = ref(null);
  const previewFile = ref(null);

  const handleFiles = () => {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.click();
    selectedFiles.value = [];
    input.addEventListener('change', (event) => {
      selectedFiles.value = Array.from(event.target.files);
      input.value = [];
    });
  };

  function fetchTimelineLogs() {
    clearInterval(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      platformStore.callFetchTimelineLogs();
      platformStore.callFetchFiles($leadId.value, ({ loading }) => {
        isLoading.value = loading;
      });
    }, 2000);
  }

  function handleDragStart() {
    selectedFiles.value = [];
    isDragOver.value = true;
  }

  async function handleDragAndDrop(event) {
    event.preventDefault();
    selectedFiles.value = [];
    isDragOver.value = false;
    selectedFiles.value = Array.from(event.dataTransfer.files);
    isLoading.value = true;
  }

  function handlePreviewFile(file) {
    previewFile.value = file;
  }

  function fetchLeadFiles() {
    platformStore.callFetchFiles($leadId.value, ({ loading, files }) => {
      isLoading.value = loading;
    });
  }

  function startObserver() {
    var observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading.value && !uploadedFiles.value.length) {
        fetchLeadFiles();
        observer.unobserve(loadLeadFilesObserverRef.value);
      }
    }, {
      root: null,
      threshold: 0.1,
    });
    observer.observe(loadLeadFilesObserverRef.value);
  }

  onMounted(() => {
    startObserver()
  });


</script>

<template>
  <div ref="uploadedFilesSectionRef">
    <div class="dropdown-box border-bottom">
      <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
        :class="{ show: toggleDropdownBox }">
        <span class="fw-bold fs-14px text-uppercase text-head d-block">Uploaded files</span>
        <div class="">
          <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent me-1 all-files-toggler"
            @click="$refs['imagePreviewModalRef'].showModalHandler(true)">
            <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
              class="text-soft fs-14px"></font-awesome-icon>
          </button>
          <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent toggler"
            @click="toggleDropdownBox = !toggleDropdownBox">
            <font-awesome-icon icon="fas fa-chevron-up"
              class="text-soft fs-14px"></font-awesome-icon>
          </button>
        </div>
      </div>

      <slide-up-down :active="toggleDropdownBox"
        :duration="500">
        <div class="dropdown-body"
          style="height: 100%">
          <div class="px-3 py-1 pb-2 fs-12px">
            <div class="lead-files">
              <div class="drop-zone"
                :class="{'is-drag':isDragOver}"
                @dragover.prevent="handleDragStart"
                @dragleave="isDragOver=false"
                @drop.prevent="handleDragAndDrop">
                <div class="icon"
                  v-if="isLoading">
                  <svg-custom-icon icon="SpinnerIcon" /> Processing...
                </div>
                <div class="icon"
                  v-else>
                  <font-awesome-icon icon="fas fa-file-upload"
                    class="text-primary fs-25px"></font-awesome-icon>
                </div>
                <div class="drop-zone-body">
                  Attach files to store power bills,
                  <br />
                  site photos, and other information.
                  <button @click="handleFiles()"
                    class="btn-text">
                    Browse files
                  </button>
                </div>
              </div>
              <div class="">
                <br />
                <UploadFileWithProgressBar v-for="(file, index) in selectedFiles"
                  :key="index"
                  :index="index"
                  :file="file"
                  @fetchTimelineLogs="fetchTimelineLogs">
                </UploadFileWithProgressBar>
              </div>
              <div class="">
                <UploadedFilesList v-for="(file, index) in uploadedFiles"
                  v-memo="file"
                  @click="handlePreviewFile(file)"
                  :key="file.file_id"
                  :file="file">
                </UploadedFilesList>
                <div ref="loadLeadFilesObserverRef"
                  @click="$refs['imagePreviewModalRef'].showModalHandler(true)"
                  class="fw-bold fs-14px text-soft cursor-pointer text-center py-2">
                  <span v-show="uploadedFiles?.length">Show All</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide-up-down>
    </div>

    <ImagePreviewModal :files="uploadedFiles"
      :preview="previewFile"
      v-if="previewFile"
      @toggle="(state)=>previewFile=state"
      @deleteRefresh="fetchLeadFiles">
    </ImagePreviewModal>

    <show-all-files-modal :files="uploadedFiles"
      ref="imagePreviewModalRef" />
  </div>
</template>

<style scoped
  lang="scss">
  .lead-files {
    .drop-zone {
      -webkit-box-align: center;
      align-items: center;
      background-color: #e5f4ff;
      border: 2px solid #b3ddff;
      -webkit-border-radius: 0.25rem;
      border-radius: 0.25rem;
      color: #0062b3;
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      gap: 0.25rem;
      justify-content: center;
      line-height: 1.25;
      min-height: 9.25rem;
      padding: 1rem;
      text-align: center;
      user-select: none;
      width: 100%;

      &.is-drag {
        border-style: dashed;
        border-color: #007ee5;
      }

      .btn-text {
        background: transparent;
        border: 0;
        color: #007ee5;
        padding: 0;
        text-decoration: underline;
      }
    }
  }

  .dropdown-header {
    &.show {
      button.toggler {
        transform: rotate(-180deg);
      }
    }

    button.toggler {
      transition: transform 0.3s ease-in-out;
    }

    .all-files-toggler {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>