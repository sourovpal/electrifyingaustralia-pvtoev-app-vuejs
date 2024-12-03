<script setup>
import CreateApiTokenModal from './components/CreateApiTokenModal.vue';
import AddADestinationModal from './components/AddADestinationModal.vue';
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>API settings</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="card pt-3 pb-2 px-3 d-flex flex-row justify-content-start align-items-center shadow-0 settings__item--wide">
                        <div class="mx-3">
                            <img src="https://static.getpvtoev.com/images/app/ui/onboarding_api.png" style="width:120px;height:120px;">
                        </div> 
                        <div>
                            <div class="title mb-2">
                                Build on pvtoev
                            </div>
                            <p class="sub-title mb-2">
                                Using the Observer API, you can integrate with other software to speed up your business processes. Whether you're using third-party software or your own custom apps, we can help you achieve your goals.
                            </p>
                            <div class="pb-3">
                                <a class="fw-bold d-flex justify-content-start align-items-center" href="">
                                    View developer documentation
                                    <div class="icon ms-1">
                                        <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="row mt-5">
                <div class="col-lg-8 col-12">
                    <div class="settings-group-header">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h2 class="fw-bold">API tokens</h2>
                            <router-link class="fw-bold d-flex justify-content-start align-items-center fs-14px" to="/settings/api/logs">
                                View request logs
                                <div class="icon ms-1">
                                    <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </div>
                            </router-link>
                        </div>
                        <div class="card shadow-0 border">
                            <div class="card-body">
                                <p class="text-muted fs-14px w-75 text-center mx-auto">
                                    API tokens allow your own software applications and integrations to make requests to the pvtoev API.
                                    You don't have any API tokens yet!
                                </p>
                                <div class="text-center">
                                    <button class="btn btn-primary fw-bold" data-mdb-toggle="modal" data-mdb-target="#CreateApiTokenModal">Create API token</button>
                                    <create-api-token-modal></create-api-token-modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="row mt-5">
                <div class="col-lg-8 col-12">
                    <div class="settings-group-header">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h2 class="fw-bold">Webhook destinations</h2>
                            <router-link class="fw-bold d-flex justify-content-start align-items-center fs-14px" to="/settings/api/event-logs">
                                View event logs
                                <div class="icon ms-1">
                                    <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </div>
                            </router-link>
                        </div>
                        <div class="card shadow-0 border">
                            <div class="card-body">
                                <p class="text-muted fs-14px w-75 text-center mx-auto">
                                    Webhooks can notify your external software of changes to data in your pvtoev account.
                                    You don't have any webhook destinations yet!
                                </p>
                                <div class="text-center">
                                    <button class="btn btn-primary fw-bold" data-mdb-toggle="modal" data-mdb-target="#AddADestinationModal">Add a destination</button>
                                    <add-a-destination-modal></add-a-destination-modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.settings__item--wide{
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    .title{
        font-size:1.125rem;
        font-weight: bold;
        color: #007ee5;
    }
    .sub-title{
        color: #004680;
        font-size: .875rem;
        opacity: .87;
    }
}
</style>