<script>
    import { UpdateBasicDetails } from '../../../../actions/UserAction';
    import { inject } from 'vue';
    import Storage from '../../../../helpers/Storage';
    import { CONFIG, $toast } from '../../../../config';

    export default {
        props: {
            profileData: Object,
            company: Object,
        },
        data() {
            return {
                errors: {},
                name: null,
                display_name: null,
                job_title: null,
                username: null,
                isSubmitBasicDetails: false,
            }
        },
        watch: {
            'profileData'(n) {
                this.setData();
            }
        },
        methods: {
            setData() {
                this.$toast.clear()
                this.errors = {};
                this.name = this.profileData.name;
                this.display_name = this.profileData.display_name;
                this.job_title = this.profileData.job_title;
                this.username = this.profileData.username;
            },
            async formSubmitHandler(payload = null) {
                this.$toast.clear();
                this.errors = {};
                this.isSubmitBasicDetails = true;
                var data = {
                    name: this.name,
                    username: this.profileData.username,
                    job_title: this.job_title,
                    display_name: this.display_name,
                };
                try {
                    const res = await UpdateBasicDetails(data);
                    const { success, message, errors } = res;
                    $toast[message.type](message.text);
                    if (success) {
                        this.$emit('fetch-profile');
                    } else {
                        this.errors = errors;
                    }
                } catch (error) {
                    $toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitBasicDetails = false;
                }
            },
        },
        computed: {
            isResetButtonActive() {
                return !(this.name == this.profileData.name
                    && this.display_name == this.profileData.display_name
                    && this.job_title == this.profileData.job_title
                    && this.username == this.profileData.username);
            }
        },
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Basic details</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Full Name</label>
                <input @focus="delete errors?.name"
                    v-model="name"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!errors?.name?.length">Your full name will appear on your customer facing proposals.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Job title at {{ company?.company_name }}</label>
                <input @focus="delete errors?.job_title"
                    v-model="job_title"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!errors?.job_title?.length">Your job title may be used in proposals, email templates,
                    etc.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.job_title?.length">{{ errors?.job_title[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Display name</label>
                <input @focus="delete errors?.display_name"
                    v-model="display_name"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!errors?.display_name?.length">Only visible to other users on your Pylon Observer team.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.display_name?.length">{{ errors?.display_name[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Forum username</label>
                <input @focus="delete errors?.username"
                    type="text"
                    v-model="username"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!errors?.username?.length">Visible to other Pylon Observer users, including those outside your
                    team, in the Feedback forum.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.username?.length">{{ errors?.username[0] }}</span>
            </div>
            <div class="d-flex">
                <div>
                    <loading-button :disabled="!isResetButtonActive"
                        :isLoading="isSubmitBasicDetails"
                        @click="formSubmitHandler()">
                        Save Settings
                    </loading-button>
                </div>
                <div class="ms-auto">
                    <button v-if="isResetButtonActive"
                        @click="setData()"
                        class="btn btn-danger fw-bold ms-auto">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>