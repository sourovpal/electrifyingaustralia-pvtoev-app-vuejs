<script setup>
    import { ref } from 'vue';
    const options = ref({
        series: [
            {
                name: "Leads",
                data: [
                    12, 15, 14, 20, 18, 10, 17, 22, 15, 19,
                    23, 25, 18, 14, 16, 12, 20, 19, 14, 21,
                    22, 16, 18, 19, 23, 15, 17, 14, 18, 20,
                ],
            },
        ],
        chartOptions: {
            chart: {
                type: "bar",
                toolbar: {
                    show: false,
                },
            },
            colors: [
                "#f5b041", "#ffeb3b", "#5ab1ef", "#ffb74d", "#90caf9", "#9ccc65",
                "#ef9a9a", "#ba68c8", "#81d4fa", "#4db6ac", "#a1887f", "#ffd54f",
                "#e57373", "#ce93d8", "#64b5f6", "#4fc3f7", "#81c784", "#dce775",
                "#ffb300", "#f06292", "#9575cd", "#4db6ac", "#ff8a65", "#e0e0e0",
                "#90a4ae", "#f48fb1", "#7986cb", "#00acc1", "#8d6e63", "#ffd54f",
            ],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                    columnWidth: "50%",
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            },
            yaxis: {
                title: {
                    text: "DAILY LEADS REPORT",
                },
            },
            fill: {
                opacity: 1,
            },
            grid: {
                borderColor: "#f1f1f1",
            },
        },
    });
</script>

<template>

    <!-- <div class="py-2 fs-14px fw-bold text-head">DELAY LEADS REPORT</div> -->

    <div class="card mb-3 d-none d-lg-block">
        <div class="card-body pt-0 pb-0 px-0">
            <apexchart type="area"
                :options="options.chartOptions"
                :series="options.series"
                width="100%"
                height="350" />
        </div>
    </div>
</template>
<script>

</script>