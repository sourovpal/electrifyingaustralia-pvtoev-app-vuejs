<script setup>
    import LeadStatuses from './components/LeadStatuses.vue';
    import DealPipelines from './components/DealPipelines.vue';
</script>

<template>
    <div class="content content-y-100vh">
        <div class="content-header">
            <h1>Pipelines & Statuses</h1>
        </div>

        <div class="content-body">
            <section class="">

                <DealPipelines />

                <hr class="mt-4 mb-5">

                <LeadStatuses />

                <hr class="mt-4 mb-5">

                <div class="row">
                    <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                        <div class="settings-group-header">
                            <h2>Lead Custom Properties</h2>
                        </div>
                    </div>
                    <div class="col-lg-8 col-xl-5 col-12">
                        <router-link class="fw-bold fs-14px btn btn-primary"
                            to="/settings/crm/properties">
                            Edit lead properties
                            <font-awesome-icon icon="fas fa-arrow-right"
                                class="fs-14px ms-2"></font-awesome-icon>
                        </router-link>
                    </div>
                </div>

                <br><br><br>
            </section>
        </div>
    </div>
</template>
<style lang="scss"
    scoped>
</style>