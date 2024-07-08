<script>
    import { Modal } from "mdb-ui-kit";
    import { icons } from '../../../../../asset/svgicon';

    export default {
        components: {
        },
        props: ['files'],
        data() {
            return {
                modalInstance: null,
                icons: {},
                preview_img: null,
                preview_status: false,
                prev_img: null,
                next_img: null,
            }
        },
        methods: {
            showModalHandler(img = null) {
                this.errors = {};
                this.modalInstance.show();
                this.imagePreviewHandler(img)
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            imagePreviewHandler(img) {
                if (!img) { return; }
                this.preview_status = false;
                try {
                    var ext = img?.extension?.toLocaleLowerCase();
                    var imgExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
                    if (imgExt.includes(ext)) {
                        this.preview_status = true;
                    }
                    this.preview_img = img;

                    var index = this.files?.findIndex(item => item.id == img.id);
                    if (index > -1) {
                        var prev = this.files[index - 1];
                        if (prev) {
                            this.prev_img = prev;
                        } else {
                            prev = this.files[this.files?.length - 1];
                            this.prev_img = prev;
                        }
                        var next = this.files[index + 1];
                        if (next) {
                            this.next_img = next;
                        } else {
                            next = this.files[0];
                            this.next_img = next;
                        }
                    }
                } catch (error) { }
            }
        },
        mounted() {
            this.modalInstance = new Modal(this.$refs.imagePreviewModalRef);
            this.icons = icons;
        },
    }
</script>

<template>

    <div @keyup.left="imagePreviewHandler(prev_img)"
        @keyup.right="imagePreviewHandler(next_img)"
        @keyup.esc="imagePreviewHandler(next_img)"
        class="modal fade"
        id="imagePreviewModalRef"
        ref="imagePreviewModalRef"
        aria-hidden="true"
        aria-labelledby="imagePreviewModalRef"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-xl position-relative">
            <div class="modal-content">
                <div class="modal-left">
                    <div>
                        <button :disabled="!prev_img"
                            @click="imagePreviewHandler(prev_img)"
                            class="btn btn-white btn-lg btn-floating">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="28px"
                                viewBox="0 -960 960 960"
                                width="28px"
                                fill="#5f6368">
                                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="modal-body px-0 py-0">
                    <img v-if="preview_status"
                        :src="preview_img?.file_path"
                        alt="">
                    <div v-else
                        class="">
                        <div class="fs-18px text-head text-center">
                            Sorry, you cannot preview this file at the moment.
                            <br>
                            Please <a href="">click here</a> to download.
                        </div>
                    </div>
                </div>
                <div class="modal-right">
                    <div>
                        <button @click="hideModalHandler()"
                            class="btn btn-white btn-lg btn-floating">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="#5f6368">
                                <path
                                    d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button :disabled="!next_img"
                            @click="imagePreviewHandler(next_img)"
                            class="btn btn-white btn-lg btn-floating">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="28px"
                                viewBox="0 -960 960 960"
                                width="28px"
                                fill="#5f6368">
                                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                            </svg>
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <button class="btn btn-white btn-lg btn-floating mb-3">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#5f6368">
                                <path
                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg>
                        </button>
                        <button class="btn btn-white btn-lg btn-floating">
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
                        </button>
                    </div>
                </div>
                <span class="preview-img-name">{{ preview_img?.name }}</span>
            </div>
        </div>
    </div>

</template>

<style scoped
    lang="scss">
    .modal-dialog {
        @media (min-width: 1200px) {
            &.modal-xl {
                --mdb-modal-width: 1200px !important;
            }
        }
    }

    .modal-content {
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: row;
        background: transparent !important;

        .preview-img-name {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            line-height: 22px;
            color: #000000;
            white-space: nowrap;
            max-width: 350px;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        button {
            box-shadow: none !important;
            background-color: #ffffff;
        }

        .modal-left,
        .modal-right {
            /* width:4rem; */
        }

        .modal-left {
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .modal-right {
            margin-left: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
        }

        .modal-body {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 8px;
            background-position: 0px 0px, 10px 10px;
            background-size: 20px 20px;
            background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

            img {
                width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }
    }
</style>