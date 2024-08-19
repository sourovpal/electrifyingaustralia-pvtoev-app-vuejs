<script>
    import { ChangePassword } from '../../../../actions/UserAction';
    export default {
        data() {
            return {
                errors: {},
                fetchUser: {},
                current_password: '',
                new_password: '',
                confirm_password: '',
                isSubmitPasswordChange: false,
            }
        },
        methods: {
            async changePasswordHandler() {
                try {
                    this.$toast.clear();
                    this.isSubmitPasswordChange = true;
                    const res = await ChangePassword({
                        current_password: this.current_password,
                        new_password: this.new_password,
                        confirm_password: this.confirm_password,
                    });
                    const { message, success, errors } = res;
                    this.$toast[message.type](message.text);
                    if (!success && errors) {
                        this.errors = errors;
                    } else {
                        this.new_password = this.confirm_password = this.current_password = null;
                    }
                } catch (error) {
                    this.$toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitPasswordChange = false;
                }
            },
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Change password</h2>
            </div>
        </div>
        <div class="col-lg-6 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Current password</label>
                <input @focus="delete errors?.current_password"
                    v-model="current_password"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.current_password?.length">{{ errors?.current_password[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">New password</label>
                <input @focus="delete errors?.new_password"
                    v-model="new_password"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!errors?.new_password?.length">Please use at least 8 characters</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.new_password?.length">{{ errors?.new_password[0] }}</span>
            </div>
            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Confirm new password</label>
                <input @focus="delete errors?.confirm_password"
                    v-model="confirm_password"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.confirm_password?.length">{{ errors?.confirm_password[0] }}</span>
            </div>

            <div class="d-flex justify-content-start align-items-center">
                <loading-button class="btn-sm"
                    :isLoading="isSubmitPasswordChange"
                    @submit="changePasswordHandler">
                    Change Password
                </loading-button>
                <a class="fw-bold ms-4"
                    href="">I forgot my password</a>
            </div>
        </div>
    </div>
</template>