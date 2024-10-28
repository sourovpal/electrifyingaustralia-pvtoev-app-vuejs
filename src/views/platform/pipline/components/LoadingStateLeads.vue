<script setup>
    import { Skeletor } from 'vue-skeletor';
    import NumberAnimation from "vue-number-animation";
    import { AvatarIcon } from "@assets/icons";

    const props = defineProps({
        size: { type: Number, default: 10 }
    });


</script>

<template>

    <div class="pip-item"
        v-for="(item, index) in size"
        :key="index">

        <div class="d-flex jsutify-content-between align-items-center">
            <h5 class="pip-title mb-0">
                <Skeleton height="0.8rem"
                    width="75%"></Skeleton>
            </h5>

            <div class="px-1 py-1 popover-icon">
                <Skeleton height="1rem"
                    width="1rem"></Skeleton>
            </div>

        </div>

        <p class="pip-sub-title mb-0">
            <Skeleton class="mb-1"
                height="0.5rem"
                width="75%"></Skeleton>
            <Skeleton height="0.5rem"
                width="95%"></Skeleton>
        </p>

        <div class="d-flex justify-content-between align-items-center py-1 mb-2">
            <Skeleton height="0.5rem"
                width="75%"></Skeleton>
            <NumberAnimation ref="number1"
                :from="0"
                :to="99"
                :format="(num) => `${Math.round(num)}%`"
                :duration="5"
                autoplay
                easing="linear" />
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <div class="pip-value">
                <NumberAnimation ref="number1"
                    :from="0"
                    :to="1000"
                    :format="(num) => `$${Math.round(num).toLocaleString()}.00`"
                    :duration="5"
                    autoplay
                    easing="linear" />
            </div>
            <div class="pip-source text-soft">
                <Skeleton height="0.5rem"
                    width="5rem"></Skeleton>
            </div>
        </div>

        <div class="pip-user d-flex justify-content-between align-items-center mt-1">
            <div>
                <Skeleton height="1.5rem"
                    width="1.5rem" shape="circle"></Skeleton>
            </div>

            <div class="text-warning  d-flex justify-content-center align-items-center">
                <span class="me-1 fs-16px">0</span>
                <i class="fs-16px pi pi-folder-open"></i>
            </div>

            <div class="text-info d-flex justify-content-center align-items-center">
                <span class="me-1 fs-16px">0</span>
                <i class="fs-16px pi pi-users"></i>
            </div>

            <div class="text-parimary d-flex justify-content-center align-items-center">
                <span class="me-1 fs-16px">0</span>
                <i class="pi pi-list-check fs-16px"></i>
            </div>

            <div class="text-warning d-flex justify-content-center align-items-center">
                <span class="me-1 fs-16px">0</span>
                <i class="fs-14px pi pi-star-fill"></i>
            </div>

        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .pip-item {
        background-color: #ffffff;
        border-radius: 8px;
        margin: 15px 0px;
        padding: 13px;
        height: 10rem;
        overflow: hidden;
        border: 1px solid var(--layout-border-color);

        .pip-title {
            font-size: 16px;
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
            margin-bottom: 5px;
        }

        .pip-sub-title {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .pip-user {
            line-height: 18px;

            .pip-user-avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #f1f1f1;
                object-fit: cover;
            }

            .pip-value {
                color: #1f2933;
                font-size: 0.875rem;
                font-weight: 700;
                line-height: 1.5rem;
                margin-left: 0.5rem;
            }
        }

        .pip-source {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-left: 5rem;
        }
    }
</style>