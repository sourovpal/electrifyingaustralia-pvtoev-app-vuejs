<script setup>
    import { reactive, computed } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const attributes = reactive({
        errors: {},
        fetchUser: {},
        current_password: '',
        new_password: '',
        confirm_password: '',
        isSubmitPasswordChange: false
    });

    const isResetButtonActive = computed(() => {
        return (
            attributes.current_password?.length &&
            attributes.new_password?.length &&
            attributes.confirm_password.length
        );
    });

    const changePasswordHandler = async () => {

        $toast.clear();

        attributes.errors = {};

        attributes.isSubmitPasswordChange = true;

        const payload = {
            current_password: attributes.current_password,
            new_password: attributes.new_password,
            confirm_password: attributes.confirm_password,
        };

        const res = await useApiRequest({
            url: '/settings/account/password',
            method: 'post',
            payload
        }).then(res => {
            const { message, success, errors: _errors } = res;

            if (_errors) return attributes.errors = _errors;

            $toast[message.type](message.text);
            attributes.current_password = null;
            attributes.new_password = null;
            attributes.confirm_password = null;

        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            attributes.isSubmitPasswordChange = false;

        });
    };
</script>

<template>
    <div class="row">

        <div class="col-lg-3 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Change password</h2>
            </div>
        </div>

        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Current password</label>
                <input @focus="delete attributes.errors?.current_password"
                    v-model="attributes.current_password"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="attributes.errors?.current_password?.length">{{ attributes.errors?.current_password[0]
                    }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">New password</label>
                <input @focus="delete attributes.errors?.new_password"
                    v-model="attributes.new_password"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!attributes.errors?.new_password?.length">Please use at least 8 characters</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="attributes.errors?.new_password?.length">{{ attributes.errors?.new_password[0] }}</span>
            </div>
            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Confirm new password</label>
                <input @focus="delete attributes.errors?.confirm_password"
                    v-model="attributes.confirm_password"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="attributes.errors?.confirm_password?.length">{{ attributes.errors?.confirm_password[0]
                    }}</span>
            </div>

            <div class="d-flex justify-content-start align-items-center">
                <loading-button :disabled="!isResetButtonActive"
                    :isLoading="attributes.isSubmitPasswordChange"
                    @submit="changePasswordHandler">
                    Change Password
                </loading-button>
                <a class="fw-bold ms-4"
                    href="">I forgot my password</a>
            </div>
        </div>
    </div>
</template>