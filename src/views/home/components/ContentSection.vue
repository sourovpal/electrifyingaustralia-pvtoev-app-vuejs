<script setup>

    import CardReports from './CardReports.vue';
    import RecentLeads from './RecentLeads.vue';
    import RecentDeals from './RecentDeals.vue';
    import TodoTasks from './TodoTasks.vue';
    import MonthlyLeadReportChart from './MonthlyLeadReportChart.vue';
    import DelayLeadReportChart from './DelayLeadReportChart.vue';

</script>

<template>
    <div class="content-section px-4 py-3">

        <div class="pb-3">
            <h4 class="fs-22px fw-bold text-head">CRM Dashboard</h4>
        </div>

        <card-reports></card-reports>

        <div class="row mt-3">
            <div class="col-xxl-8 col-md-8 col-12">
                <delay-lead-report-chart></delay-lead-report-chart>
            </div>
            <div class="col-xxl-4 col-md-4 col-12">
                <monthly-lead-report-chart></monthly-lead-report-chart>
            </div>
        </div>

        <div class="row mt-3">

            <div class="col-xxl-4 col-md-6 col-12">
                <recent-leads></recent-leads>
            </div>

            <div class="col-xxl-4 col-md-6 col-12">
                <recent-deals></recent-deals>
            </div>

            <div class="col-xxl-4 col-md-6 col-12">
                <todo-tasks></todo-tasks>
            </div>

        </div>

    </div>
</template>

<style scoped
    lang="scss">
    .content-section {
        min-height: auto;
        background-color: #f8f9f9;
        /* background-color: #fafbfe; */
    }
</style>