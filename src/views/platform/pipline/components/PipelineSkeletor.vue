<script setup>
    import LoadingStateLeads from './LoadingStateLeads.vue';
    import { Skeletor } from 'vue-skeletor';
    import NumberAnimation from "vue-number-animation";
</script>

<template>
    <div class="piplien-state"
        v-for="(_, index) in 8"
        :key="index">

        <div class="stage-header ps-3 pe-2 pt-1">

            <div class="d-flex justify-content-between align-items-center mb-2">

                <h5 class="mb-0 fs-18px fw-bold d-flex justify-content-start align-items-center w-75">
                    <Skeleton height="0.8rem"></Skeleton>
                    <span class="ms-2 white-space-nowrap">
                        <NumberAnimation ref="number1"
                            :from="0"
                            :to="1000"
                            :format="(num) => `( ${Math.round(num)} )`"
                            :duration="5"
                            autoplay
                            easing="linear" />
                    </span>
                </h5>

                <div class="ms-auto">

                    <button class="btn btn-sm btn-light btn-floating d-flex justify-content-center align-items-center">
                        <font-awesome-icon icon="fas fa-ellipsis-vertical"></font-awesome-icon>
                    </button>

                </div>

            </div>

            <div class="d-flex justify-content-between align-items-center pe-2 fs-14px">

                <span>Total</span>

                <span class="white-space-nowrap">
                    $
                    <NumberAnimation ref="number1"
                        :from="0"
                        :to="10000"
                        :format="(num) => Math.round(num)"
                        :duration="3"
                        autoplay
                        easing="linear" />.00
                </span>
            </div>

        </div>

        <div class="pip-body px-3 pb-5">
            <loading-state-leads :size="6" />
        </div>

    </div>
</template>
<style scoped
    lang="scss">
    .piplien-state:deep() {
        --border-top-color: white;
        border-top: 5px solid var(--border-top-color);
        min-width: 18.5rem;
        max-width: 18.5rem;
        background-color: rgb(255, 255, 255);
        border-radius: 3px;
        margin-right: 1rem;
        overflow: hidden;
    }
</style>