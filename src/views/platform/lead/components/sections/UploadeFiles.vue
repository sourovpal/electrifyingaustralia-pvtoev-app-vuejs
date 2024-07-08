<script>
    import { icons } from '../../../../../asset/svgicon';
    import api from '../../../../../actions/api';
    import SlideUpDown from 'vue-slide-up-down';
    import ImagePreviewModal from '../modals/ImagePreviewModal.vue';
    import ShowAllFilesModal from './ShowAllFilesModal.vue';

    export default {
        components: {
            ImagePreviewModal,
            ShowAllFilesModal,
            SlideUpDown,
        },
        data() {
            return {
                progress: 0,
                files: [],
                leadFiles: [],
                deletedLeadFiles: [],
                toggleDropdownBox: true,
                dragStart: false,
                upload_title: 'Uploaded Files',
                toggleUploadHistoryDropdown: 0,
            }
        },
        watch: {
            "$store.state.lead.findLead"({ lead_files }) {
                this.leadFiles = lead_files;
            }
        },
        methods: {
            getFileIconHandler(extension) {
                var ext = extension?.toLocaleLowerCase();
                var imgExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
                var icon = '';
                if (imgExt.includes(ext)) {
                    icon = icons['file_img'];
                } else if (ext == 'pdf') {
                    icon = icons['file_pdf'];
                } else {
                    icon = icons['file_document'];
                }
                return icon;
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
            dragDropFilesHandler(e) {
                e.preventDefault();
                this.dragStart = false;
                try {
                    var files = e.dataTransfer?.files ?? [];
                    for (let i = 0; i < files.length; i++) {
                        this.files.push({
                            name: files[i].name,
                            extension: files[i].name?.split('.').pop(),
                            progress: 0,
                            status: 1
                        });
                        this.leadFileUploadHandler(files[i], (this.files.length - 1));
                    }
                } catch (error) {
                }
            },
            browseFilesHandler() {
                try {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('multiple', true);
                    input.setAttribute('accept', ".docx, .xlsx, .pdf, .xls, .csv, .gif, .txt, .png, .jpg, .jpeg, .webp, .bmp, .tiff, .svg");
                    input.click();
                    input.addEventListener('change', (e) => {
                        try {
                            var files = input?.files;
                            for (let i = 0; i < input?.files.length; i++) {
                                this.files.push({
                                    name: files[i].name,
                                    extension: files[i].name?.split('.').pop(),
                                    progress: 0,
                                    status: 1
                                });
                                this.leadFileUploadHandler(files[i], (this.files.length - 1));
                            }
                        } catch (error) { }
                    });
                } catch (error) { }

            },
            async leadFileUploadHandler(file, i) {
                try {
                    this.toggleUploadHistoryDropdown = this.toggleUploadHistoryDropdown == 2 ? 2 : 1;
                    this.getFileUploadTitle();
                    var leadId = this.$route.params?.id ?? null;
                    const formData = new FormData();
                    formData.append('lead_file', file);
                    formData.append('lead_id', leadId);

                    try {

                        const response = await api.post('/leads/file-upload', formData, {
                            onUploadProgress: progressEvent => {
                                try {
                                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                    this.fileUploadprogressUpdateHandler(i, progress);
                                } catch (error) { }
                            }
                        });
                        try {
                            const { deleted_lead_files, lead_files, message } = response?.data;
                            this.deletedLeadFiles = deleted_lead_files;
                            this.leadFiles = lead_files;
                            this.fileUploadStatusUpdateHandler(i, 2, 1000);
                        } catch (err) { }

                    } catch (error) {
                        this.fileUploadStatusUpdateHandler(i, 0);
                    }
                } catch (error) { }
            },
            getFileUploadTitle() {
                var uploading = this.files.filter(item => item.status == 1);
                var complete = this.files.filter(item => item.status == 2);
                var uploadLength = uploading.length;
                var completeLength = complete.length;
                var title = 'Uploaded Files';

                if (uploadLength > 0) {

                    title = `Uploading ${uploadLength} item${uploadLength > 1 ? 's' : ''}`;
                } else if (completeLength > 0) {
                    title = `${completeLength} file${completeLength > 1 ? 's' : ''} upload complete`;
                }
                this.upload_title = title;
            },
            fileUploadprogressUpdateHandler(i, progress) {
                try {
                    this.files[i].progress = progress;
                } catch (error) { }
            },
            async fileUploadStatusUpdateHandler(i, status, timeout = 0) {
                try {
                    await setTimeout(() => {
                        this.files[i].status = status;
                        this.getFileUploadTitle();
                    }, timeout);
                } catch (error) { }
            },
            toggleUploadHistoryHandler(status) {
                if (status == 1) {
                    this.toggleUploadHistoryDropdown = 2;
                } else if (status == 2) {
                    this.toggleUploadHistoryDropdown = 1;
                } else {
                    this.toggleUploadHistoryDropdown = status;
                    this.files = [];
                }
            }
        },
        mounted() {
            this.icons = icons;
            try {
                const { lead_files } = this.$store.state.lead.getLeadFiles ?? [];
                this.leadFiles = lead_files;
            } catch (error) { }
        },
    }
</script>

<template>
    <div>
        <div class="dropdown-box border-bottom">
            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
                :class="{show:toggleDropdownBox}">
                <span class="fw-bold fs-14px text-uppercase text-head d-block">Uploaded files</span>
                <div class="">

                    <button
                        class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent me-1 all-files-toggler"
                        @click="$refs['ShowAllFilesModalRef'].showModalHandler()">
                        <svg class="svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 0 24 24"
                            width="18px"
                            fill="#000000">
                            <path d="M0 0h24v24H0z"
                                fill="none"></path>
                            <path
                                d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z">
                            </path>
                        </svg>
                    </button>

                    <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent toggler"
                        @click="toggleDropdownBox=!toggleDropdownBox">
                        <svg class="svg-3"
                            height="18px"
                            viewBox="0 0 24 24"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <slide-up-down :active="toggleDropdownBox"
                :duration="500">
                <div class="dropdown-body"
                    style="height:100%;">
                    <div class=" px-3 py-1 pb-2 fs-12px">
                        <div class="lead-files">
                            <div class="empty-state"
                                :class="{drag:dragStart}"
                                @dragover.prevent="dragStart=true"
                                @dragleave.prevent="dragStart=false"
                                @drop="dragDropFilesHandler">
                                <div class="icon icon--36">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        height="36px"
                                        viewBox="0 0 24 24"
                                        width="36px"
                                        fill="currentColor">
                                        <path d="M0 0h24v24H0z"
                                            fill="none"></path>
                                        <path
                                            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="empty-state__body">
                                    Attach files to store power bills,
                                    <br>
                                    site photos, and other information.
                                    <button @click="browseFilesHandler()"
                                        class="btn-text">Browse files</button>
                                </div>
                            </div>
                            <div class="">
                                <br>
                                <div class="files-progress-list">
                                    <div class="item mb-2"
                                        v-for="(file, index) in files"
                                        :key="index"
                                        v-show="file?.status != 2">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <div class="fs-14px text-head">{{shortenFileNameHandler(file?.name) }}</div>
                                            <div class="fs-14px text-soft">{{ file?.progress }}%</div>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar"
                                                :class="`${file?.status == 0 ?'bg-danger':'bg-success'}`"
                                                :style="`width:${file?.progress}%;border-radius: 5px;`"></div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-unstyled file-list">
                                    <li class="file-list-item cursor-pointer pt-1 border-bottom pb-1 d-flex justify-content-between align-items-center text-head"
                                        v-for="(item, index) in leadFiles?.slice(0, 10)"
                                        :key="index">
                                        <div @click="$refs['imagePreviewModalRef'].showModalHandler(item)">
                                            <img class="me-2"
                                                width="24"
                                                :src="getFileIconHandler(item?.extension)"
                                                alt="">
                                            <span class="fs-12px">{{shortenFileNameHandler(item?.name) }}</span>
                                        </div>
                                        <span class="file-size fs-12px">{{ item?.size }}</span>
                                        <span class="download-file fs-14px">
                                            <svg class="svg-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                width="24px"
                                                fill="currentColor">
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                            </svg>
                                        </span>
                                    </li>
                                    <li v-if="leadFiles?.length > 5"
                                        class="text-center py-2"><a
                                            @click="$refs['ShowAllFilesModalRef'].showModalHandler()"
                                            class="fs-14px cursor-pointer text-primary">Show All Files</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </slide-up-down>
        </div>


        <div class="file-upload-history"
            v-if="toggleUploadHistoryDropdown != 0"
            :class="{show:(toggleUploadHistoryDropdown==2)}">
            <div class="history-header"
                @click="toggleUploadHistoryHandler(toggleUploadHistoryDropdown)">
                <div class="title text-white fs-14px">{{ upload_title }}</div>
                <div class="toggler">
                    <button @click="toggleUploadHistoryHandler(0)"
                        class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent toggle-btn">
                        <svg fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            height="14"
                            viewBox="0 -960 960 960"
                            width="14">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="history-body px-2 pt-2">
                <div class="files-progress-list">
                    <div class="item mb-2"
                        v-for="(file, index) in files"
                        :key="index">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="fs-14px text-head">
                                <img class="me-2"
                                    width="24"
                                    :src="getFileIconHandler(file?.extension)"
                                    alt="">
                                {{shortenFileNameHandler(file?.name, 12) }}
                            </div>
                            <div class="fs-14px text-soft"
                                v-if="file.status != 2">{{ file?.progress }}%</div>
                            <div class="fs-14px text-soft"
                                v-else-if="file.status == 2">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    fill="#239B56">
                                    <path d="M0 0h24v24H0z"
                                        fill="none"></path>
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="progress mt-1"
                            v-if="file?.status != 2">
                            <div class="progress-bar"
                                :class="`${file?.status == 0 ?'bg-danger':'bg-success'}`"
                                :style="`width:${file?.progress}%;border-radius: 5px;`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ImagePreviewModal :files="leadFiles"
            ref="imagePreviewModalRef" />

        <show-all-files-modal :files="leadFiles"
            :imagePreview="(item)=>$refs['imagePreviewModalRef'].showModalHandler(item)"
            ref="ShowAllFilesModalRef" />

    </div>

</template>

<style scoped
    lang="scss">
    .file-list {
        .file-list-item {
            position: relative;

            .file-size,
            .download-file {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }

            .file-size {
                opacity: 1;
                z-index: 9;
                transition: opacity 0.5s linear;
            }

            .download-file {
                opacity: 0;
                z-index: -9;
                transition: opacity 0.5s linear;
            }

            &:hover {
                .file-size {
                    opacity: 0;
                    z-index: -9;
                }

                .download-file {
                    opacity: 1;
                    z-index: 9;
                }
            }
        }
    }

    .lead-files {
        .empty-state {
            -webkit-box-align: center;
            align-items: center;
            background-color: #e5f4ff;
            border: 2px solid #b3ddff;
            -webkit-border-radius: .25rem;
            border-radius: .25rem;
            color: #0062b3;
            display: flex;
            flex-direction: column;
            font-size: .875rem;
            gap: .25rem;
            justify-content: center;
            line-height: 1.25;
            min-height: 9.25rem;
            padding: 1rem;
            text-align: center;
            user-select: none;
            width: 100%;

            &.drag {
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

        &.show {
            bottom: 1px;
        }

        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 8px;
            background-color: #2E4053;
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