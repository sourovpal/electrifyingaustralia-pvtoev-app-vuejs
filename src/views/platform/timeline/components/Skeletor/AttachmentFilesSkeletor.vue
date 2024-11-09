<script setup>
 import { Skeletor } from "vue-skeletor";

</script>

<template>
    <div class="rounded-2 px-2 py-2 card mb-2 border rounded-2">
        <div class="d-flex justify-content-between align-items-center">
            <div class="col-left">

                <div class="d-flex justify-content-start align-items-center">

                    <div class="me-3 file-icon">
                        <Skeletor style="width:2rem;height:2rem;border-radius:0.2rem;"></Skeletor>
                    </div>

                    <div class="file-details w-100">

                        <div class="fs-14px text-head mb-2 white-space-nowrap">
                            <Skeletor style="width:65%;height:0.8rem;"></Skeletor>
                        </div>

                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="w-100 fs-12px text-soft">
                                <Skeletor style="width:50%;height:0.5rem;"></Skeletor>
                                <span class="px-1">•</span>
                                <Skeletor style="width:15%;height:0.5rem;"></Skeletor>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="fs-14px text-soft pe-1">

                <div class="d-flex justify-content-between align-items-center">
                    <span class="cursor-pointer">
                        <Skeletor style="width:1rem;height:1rem;"></Skeletor>
                    </span>

                    <span class="cursor-pointer ms-3">
                        <Skeletor style="width:1rem;height:1rem;"></Skeletor>
                    </span>
                </div>

            </div>

        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .card {
        box-shadow: none;

        .col-left {
            width: 75%;
        }
    }

    .file-details {
        line-height: 10px;
    }

    .file-icon {
        min-width: 2rem !important;
    }
</style>