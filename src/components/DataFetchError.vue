<script setup>
    import { FetchErrorIcon } from '../assets/icons';
</script>

<template>
    <div class="tbl-tr active">

        <div style="width:100%;height:calc(89vh + 3px);"
            class="tbl-td">
            <div class="empty-folder">
                <div>
                    <img :src="FetchErrorIcon"
                        alt="">
                </div>
                <div class="text-center mt-5">
                    <a class="btn btn-sm btn-primary fw-bold text-white"
                        href="">
                        <svg class="me-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">
                            </path>
                            <path d="M0 0h24v24H0z"
                                fill="none"></path>
                        </svg>
                        Reload
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped
    lang="scss">
    .tbl-tr {
        position: absolute;
    }

    .empty-folder {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;

        img {
            width: 100%;
            object-fit: cover;
            opacity: 0.4;
        }
    }
</style>