<script setup>
    import { ref } from 'vue';
    const options = ref({
        series: [
            {
                name: "Leads",
                data: [45, 52, 38, 45, 19, 23, 29, 48, 39, 38, 51, 44],
            },
        ],
        chartOptions: {
            chart: {
                type: "bar",
                toolbar: {
                    show: false,
                },
            },
            colors: ["#16a085", "#6a67ce", "#5ab1ef", "#ffb74d", "#90caf9", "#9ccc65", "#ef9a9a", "#ba68c8", "#81d4fa", "#4db6ac", "#a1887f", "#ffd54f"],
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
                categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ],
            },
            yaxis: {
                title: {
                    text: "MONTHLY LEADS REPORT",
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
            <apexchart type="bar"
                :options="options.chartOptions"
                :series="options.series"
                width="100%"
                height="350" />
        </div>
    </div>
</template>
