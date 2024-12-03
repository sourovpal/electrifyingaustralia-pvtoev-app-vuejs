<script setup>
    import { ref } from 'vue';


    const options = ref({

        series: [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        plotOptions: { bar: { columnWidth: "20%" } },
        xaxis: { crosshairs: { width: 1 } },
        chartOptions: {
            chart: {
                type: "bar", height: 40, sparkline: { enabled: !0 }
            },
            plotOptions: {
                bar: {
                    borderRadius: 2,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },

            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                //         crosshairs: {
                //             fill: {
                //                 type: 'gradient',
                //                 gradient: {
                //                     colorFrom: '#D8E3F0',
                //                     colorTo: '#BED1E6',
                //                     stops: [0, 100],
                //                     opacityFrom: 0.4,
                //                     opacityTo: 0.5,
                //                 }
                //             }
                //         },
                //         tooltip: {
                //             enabled: true,
                //         }
                //     },
                //     yaxis: {
                //         axisBorder: {
                //             show: false
                //         },
                //         axisTicks: {
                //             show: false,
                //         },
                //         labels: {
                //             show: false,
                //             formatter: function (val) {
                //                 return val + "%";
                //             }
                //         }

                //     },
                //     title: {
                //         text: 'Monthly Inflation in Argentina, 2002',
                //         floating: true,
                //         offsetY: 330,
                //         align: 'center',
                //         style: {
                //             color: '#444'
                //         }
            }
        },

    },)
</script>

<template>
    <div class="row">

        <div class=" col-xxl-2 col-xl-3 col-md-4 col-sm-6 col-12 mb-3"
            v-for="(item, index) in 6"
            :key="index">

            <div class="card">
                <div class="card-body py-2 px-3">
                    <div class="header d-flex justify-content-between align-items-center">
                        <div class="title fs-16px fw-bold">
                            New Leads
                        </div>
                        <Avatar icon="pi pi-user"
                            size="large" />
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="total-number fs-25px fw-bold text-soft">
                            25
                        </div>
                        <div class="w-75">
                            <!-- <apexchart width="100%"
                                type="bar"
                                :options="options.chartOptions"
                                :series="options.series"></apexchart> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped
    lang="scss">
</style>