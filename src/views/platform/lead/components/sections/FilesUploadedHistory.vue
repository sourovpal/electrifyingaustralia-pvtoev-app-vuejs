<script setup>
import { ref, watchEffect } from "vue";
import FilesUploadMixin from "./FilesUploadMixin";
const { getFileIconByFileExtension, resizeFileNameHandler } =
  FilesUploadMixin.methods;

const props = defineProps({
  title: {
    type: String,
    default: "Uploaded Files",
  },
  toggle: {
    type: String,
    default: "close",
  },
  files: {
    type: Array,
    default: [],
  },
});

const toggle = ref("close");

watchEffect(() => {
  if (props.files?.length) {
    toggleDropdownModal("open");
  }
});

function toggleDropdownModal(stage = null) {
  if (stage) {
    toggle.value = stage;
  } else {
    toggle.value = toggle.value == "close" ? "open" : "close";
  }
}
</script>

<template>
  <div
    class="file-upload-history"
    v-if="toggle != 'close'"
    :class="{ open: toggle == 'open' }"
  >
    <div
      class="history-header"
      @click.stop="
        toggleDropdownModal(toggle == 'open-header' ? 'open' : 'open-header')
      "
    >
      <div class="title text-white fs-14px">{{ title }}</div>
      <div class="toggler">
        <button
          @click.stop="toggleDropdownModal('close')"
          class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent toggle-btn"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            viewBox="0 -960 960 960"
            width="14"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="history-body px-2 pt-2">
      <div class="files-progress-list">
        <div class="item mb-2" v-for="(file, index) in files" :key="index">
          <div class="d-flex justify-content-between align-items-center">
            <div class="fs-14px text-head">
              <img
                class="me-2"
                width="24"
                :src="getFileIconByFileExtension(file?.extension)"
                alt=""
              />
              {{ resizeFileNameHandler(file?.name, 12) }}
            </div>
            <div class="fs-14px text-soft" v-if="file.status != 2">
              {{ file?.progress }}%
            </div>
            <div class="fs-14px text-soft" v-else-if="file.status == 2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#239B56"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="progress mt-1" v-if="file?.status != 2">
            <div
              class="progress-bar"
              :class="`${file?.status == 0 ? 'bg-danger' : 'bg-success'}`"
              :style="`width:${file?.progress}%;border-radius: 5px;`"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-upload-history {
  position: fixed;
  bottom: -20rem;
  right: 8rem;
  width: 18rem;
  height: 22rem;
  border-radius: 2px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  z-index: 9999999;
  transition: bottom 0.3s ease-in-out;

  &.open {
    bottom: 1px;
  }

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px;
    background-color: #2e4053;
    height: 2rem;
    cursor: pointer;

    .toggle-btn {
      box-shadow: none;
      height: 1.6rem;
      width: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #acacac;

      &:hover {
        color: #ffffff;
      }
    }
  }

  .history-body {
    overflow-y: auto;
    height: 100%;
    height: 20rem;
  }
}
</style>
