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
                            Edit Lead custom properties
                            <span class="icon">
                                <svg fill="currentColor"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    width="18">
                                    <path d="M0 0h24v24H0z"
                                        fill="none"></path>
                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                </svg>
                            </span>
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