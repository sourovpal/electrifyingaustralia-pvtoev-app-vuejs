<script setup>
    import { ref } from 'vue';
    import CardBox from './Card/CardBox.vue';
    const reports = ref([
        {
            title: "New Lead's",
            icon: "leaderboard",
            total: 1256,
        },
        {
            title: "Lost Lead's",
            icon: "cancel",
            total: 4587,
        },
        {
            title: "New Deal's",
            icon: "align_vertical_bottom",
            total: 125,
        },
        {
            title: "Lost Deal's",
            icon: "wrong_location",
            total: 103,
        },
        {
            title: "Employees",
            icon: "people",
            total: 89,
        },
        {
            title: "Employees",
            icon: "person",
            total: 45,
        },
    ]);
</script>

<template>
    <div class="row">

        <div class=" col-xxl-2 col-xl-3 col-md-4 col-sm-6 col-12 mb-3"
            v-for="(item, index) in reports"
            :key="index">

            <card-box v-bind="item"></card-box>

        </div>

    </div>
</template>