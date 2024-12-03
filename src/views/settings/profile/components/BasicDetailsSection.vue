<script setup>
    import { ref, watch, computed, reactive } from 'vue';
    import { useAppStore, useAuthStore } from '@stores';
    import { $toast } from '@config';
    import { useApiRequest } from '@actions';

    const emit = defineEmits(['fetch-profile']);
    const appStore = useAppStore();
    const errors = ref({});

    let attributes = reactive({
        name: null,
        display_name: null,
        job_title: null,
        username: null,
    });

    const isSubmitBasicDetails = ref(false);
    const authUser = computed(() => appStore.getUser);
    const company = computed(() => appStore.getCompany);

    watch(() => authUser, () => {
        Object.assign(attributes, authUser.value);
    }, { immediate: true, deep: true });

    function resetFormDate() {
        Object.assign(attributes, authUser.value);
    }

    const formSubmitHandler = async () => {

        $toast.clear();

        errors.value = {};

        isSubmitBasicDetails.value = true;

        const payload = {
            name: attributes.name,
            username: attributes.username,
            job_title: attributes.job_title,
            display_name: attributes.display_name,
        };

        const res = useApiRequest({
            url: '/settings/profile/basic-details',
            method: 'post',
            payload
        }).then(res => {

            const { success, message, errors: _errors } = res;

            if (_errors) return errors.value = _errors;

            $toast[message.type](message.text);

            appStore.callFetchAppData();

        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            isSubmitBasicDetails.value = false;

        });

    };

    const isResetButtonActive = computed(() => {
        return !(
            attributes.name === authUser.value.name &&
            attributes.display_name === authUser.value.display_name &&
            attributes.job_title === authUser.value.job_title &&
            attributes.username === authUser.value.username
        );
    });

</script>


<template>
    <div class="row">

        <div class="col-lg-3 col-12 mb-3 mb-lg-0">

            <div class="settings-group-header">
                <h2>Basic details</h2>
            </div>

        </div>

        <div class="col-lg-5 col-12">

            <div class="settings-group-item">

                <label class="form-label-title">Full Name</label>

                <input-text @focus="delete errors?.name"
                    v-model="attributes.name"
                    type="text"
                    class="form-control"
                    size="small" />

                <span class="form-input-commant"
                    v-if="!errors?.name?.length">Your full name will appear on your customer facing proposals.</span>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.name?.length">
                    {{ errors?.name[0] }}
                </span>

            </div>

            <div class="settings-group-item">

                <label class="form-label-title">Job title at {{ company?.company_name }}</label>

                <input-text @focus="delete errors?.job_title"
                    v-model="attributes.job_title"
                    type="text"
                    class="form-control"
                    size="small" />

                <span class="form-input-commant"
                    v-if="!errors?.job_title?.length">
                    Your job title may be used in proposals, email templates, etc.
                </span>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.job_title?.length">
                    {{ errors?.job_title[0] }}
                </span>
            </div>

            <div class="settings-group-item">

                <label class="form-label-title">Display name</label>

                <input-text @focus="delete errors?.display_name"
                    v-model="attributes.display_name"
                    type="text"
                    class="form-control"
                    size="small" />

                <span class="form-input-commant"
                    v-if="!errors?.display_name?.length">
                    Only visible to other users on your pvtoev Observer team.
                </span>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.display_name?.length">
                    {{ errors?.display_name[0] }}
                </span>

            </div>

            <div class="settings-group-item">

                <label class="form-label-title">Forum username</label>

                <input-text @focus="delete errors?.username"
                    type="text"
                    v-model="attributes.username"
                    class="form-control"
                    size="small" />

                <span class="form-input-commant"
                    v-if="!errors?.username?.length">
                    Visible to other pvtoev Observer users, including those outside your team, in the Feedback forum.
                </span>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.username?.length">
                    {{ errors?.username[0] }}
                </span>

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
                        @click="resetFormDate()"
                        class="btn btn-danger fw-bold ms-auto">
                        Reset
                    </button>

                </div>

            </div>

        </div>

    </div>
</template>