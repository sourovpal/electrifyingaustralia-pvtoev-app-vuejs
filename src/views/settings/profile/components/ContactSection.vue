<script setup>
    import { ref, watch, computed, reactive } from 'vue';
    import { useApiRequest } from '@actions';
    import { useAppStore } from '@stores';
    import { $toast } from '@config';

    const appStore = useAppStore();
    const authUser = computed(() => appStore.getUser);

    const attributes = reactive({
        errors: {},
        phone_office: null,
        phone_mobile: null,
        isSubmitContactInfo: false
    });

    watch(() => authUser, () => {
        Object.assign(attributes, authUser.value);
    }, { deep: true, immediate: true });
    
    function resetFormDate() {
        Object.assign(attributes, authUser.value);
    }

    const formSubmitHandler = async () => {
        $toast.clear();
        attributes.errors = {};

        const payload = {
            phone_office: attributes.phone_office,
            phone_mobile: attributes.phone_mobile,
        };

        attributes.isSubmitContactInfo = true;

        await useApiRequest({
            url: "/users/contact-info",
            method: 'post',
            payload
        }).then(res => {

            const { success, errors: responseErrors, message } = res;

            if (!success && responseErrors) {
                attributes.errors = responseErrors;
                return;
            }

            $toast[message.type](message.text);

        }).catch(error => {

            $toast.error('Oops, something went wrong');

        }).finally(() => {

            attributes.isSubmitContactInfo = false;

        });
    };

    const isResetButtonActive = computed(() => {
        return !(
            attributes.phone_office === authUser.value.phone_office &&
            attributes.phone_mobile === authUser.value.phone_mobile
        );
    });
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Contact information</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Contact number (office)</label>
                <input @focus="delete attributes.errors?.phone_office"
                    v-model="attributes.phone_office"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="attributes.errors?.phone_office?.length">{{ attributes.errors?.phone_office[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Contact number (mobile)</label>
                <input @focus="delete attributes.errors?.phone_mobile"
                    v-model="attributes.phone_mobile"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="attributes.errors?.phone_mobile?.length">{{ attributes.errors?.phone_mobile[0] }}</span>
            </div>

            <div class="d-flex">
                <div>
                    <loading-button :disabled="!isResetButtonActive"
                        :isLoading="attributes.isSubmitContactInfo"
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