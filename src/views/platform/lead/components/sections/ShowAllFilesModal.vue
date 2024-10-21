<script>
    import { Modal } from "mdb-ui-kit";
    import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
    export default {
        components: {
            ImagePreviewModal
        },
        props: ['files', 'imagePreview'],
        data() {
            return {
                modalInstance: null,
                activeTab: null,
                showFiles: [],
                imageExt: ["png", "jpg", "jpeg", "webp", "bmp", "tiff", "svg", "gif"],
            }
        },
        methods: {
            showModalHandler() {
                this.showFiles = this.files;
                this.activeTab = 'all';
                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            selectFileTypeHandler(tab = 'all') {
                this.activeTab = tab;
                if (tab == 'images') {
                    this.showFiles = this.files?.filter(item => this.imageExt.includes(item.extension));
                } else if (tab == 'pdf') {
                    this.showFiles = this.files?.filter(item => (item.extension == 'pdf'));
                } else if (tab == 'others') {
                    this.showFiles = this.files?.filter(item => (item.extension != 'pdf' && !this.imageExt.includes(item.extension)));
                } else {
                    this.showFiles = this.files;
                }
            },
            fetchFileHandler(file) {
                if (file) {
                    if (this.imageExt.includes(file.extension)) {
                        return true;
                    }
                    return false;
                }
            },
            showPreviewModalHandler(item) {
                this.hideModalHandler();
                this.imagePreview(item);
            },
            shortenFileNameHandler(fileName, length = 20) {
                if (fileName.length <= length) {
                    return fileName;
                } else {
                    const firstPart = fileName.substring(0, length);
                    const lastPart = fileName.substring(fileName.length - 10);
                    return `${firstPart} ... ${lastPart}`;
                }
            },
        },
        mounted() {
            this.modalInstance = new Modal(this.$refs.allFilesShowRef);
        },
    }
</script>

<template>

    <div class="modal fade add-new-lead-modal"
        id="allFilesShowRef"
        ref="allFilesShowRef"
        aria-hidden="true"
        aria-labelledby="allFilesShowRef"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <ul class="m-0 list-unstyled p-0 d-flex justify-content-start align-items-center tabs-list">
                            <li @click="selectFileTypeHandler('all')"
                                :class="{active:(activeTab == 'all')}"
                                class="px-1 me-1 cursor-pointer fs-14px text-head">All</li>
                            <li @click="selectFileTypeHandler('images')"
                                :class="{active:(activeTab == 'images')}"
                                class="px-1 me-1 cursor-pointer fs-14px text-head">Images</li>
                            <li @click="selectFileTypeHandler('pdf')"
                                :class="{active:(activeTab == 'pdf')}"
                                class="px-1 me-1 cursor-pointer fs-14px text-head">Pdf</li>
                            <li @click="selectFileTypeHandler('others')"
                                :class="{active:(activeTab == 'others')}"
                                class="px-1 me-1 cursor-pointer fs-14px text-head">Others</li>
                        </ul>
                    </div>
                    <div>
                        <button class="btn btn-light btn-sm btn-floating"
                            @click="hideModalHandler()">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="22"
                                viewBox="0 -960 960 960"
                                width="22">
                                <path
                                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="file-box">
                        <div class="file-item"
                            v-for="(item, index) in showFiles"
                            :key="index">
                            <div class="file"
                                @click="showPreviewModalHandler(item)">
                                <img v-if="fetchFileHandler(item)"
                                    v-lazy="item?.file_path">
                                <span :class="{pdf:(item?.extension == 'pdf'), others:(item?.extension != 'pdf')}"
                                    v-else>{{ item?.extension?.toUpperCase() }}</span>
                            </div>
                            <span class="file-title fs-12px text-head text-center">
                                {{ shortenFileNameHandler(item?.name, 15) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss"
    scoped>
    .tabs-list {
        li {
            letter-spacing: 0.2px;

            &.active {
                color: #386bc0 !important;
                font-weight: bold;
            }
        }
    }

    .modal-body {
        height: 80vh;
        overflow-y: auto;

        .file-box {
            display: flex;
            flex-wrap: wrap;

            .file-item {
                margin: 0px 6px 25px;
                overflow: hidden;
                width: 6rem;
                display: flex;
                flex-direction: column;

                .file {
                    width: 6rem;
                    height: 8rem;
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
    }
</style>