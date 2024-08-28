<script setup>
    import { computed, ref, reactive, watchEffect } from 'vue';
    import { SendEmailOtp, ChangeEmailAddress, LogoutAction } from '@actions/UserAction';
    import { useAuthStore } from '@stores/auth';
    import CustomModal from '@components/Modals/CustomModal.vue';
    import { $toast } from '@config';

    const verificationModalRef = ref(null);

    var state = reactive({
        errors: {},
        email: null,
        verification_code: null,
        password: null,
        isSubmitSendOtp: false,
        isShowGetOtpModal: false,
        isSubmitChangeEmail: false,
    });

    const authStore = useAuthStore();
    const user = computed(() => authStore.getUser);
    state.email = user.value.email ?? null;

    const isResetButtonActive = computed({
        get() {
            function isEqual(val1, val2) {
                return (val1 === val2) || (val1 === null && val2 === "") || (val1 === "" && val2 === null);
            }
            return !(isEqual(state.email, user.value.email));
        }
    });


    async function sendEmailOptHandler() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitSendOtp = true;
            if (state.email == user.value.email) {
                state.errors['email'] = ['Please change your current email to proceed.'];
                return;
            }
            var payload = {
                email: state.email,
            }
            const res = await SendEmailOtp(payload);
            const { message, success, errors } = res;
            $toast[message.type](message.text);
            if (!success && errors) {
                state.errors = errors;
            } else {
                verificationModalRef.value.modalShow();
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            state.isSubmitSendOtp = false;
        }
    }

    async function updateEmailAddress() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitChangeEmail = true;
            var payload = {
                email: state.email,
                verification_code: state.verification_code,
                password: state.password,
            };
            const res = await ChangeEmailAddress(payload);
            const { success, message, errors } = res;
            $toast[message.type](message.text);
            if (!success && errors) {
                state.errors = errors;
            } else {
                verificationModalRef.value.modalHide();
                state.verification_code = null;
                state.password = null;
                await LogoutAction();
                window.location.reload();
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            state.isSubmitChangeEmail = false;
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Account email</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Email address</label>
                <input @focus="delete state.errors.email"
                    v-model="state.email"
                    type="text"
                    class="form-control">
                <span class="form-input-commant"
                    v-if="!state.errors.email?.length">
                    When changing your account email address, you will be sent a email to validate your new email
                    address.
                </span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.email?.length">{{ state.errors?.email[0] }}</span>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <loading-button :disabled="!isResetButtonActive"
                    :isLoading="state.isSubmitSendOtp"
                    @click="sendEmailOptHandler">
                    Save Change
                </loading-button>
                <button class="btn btn-danger"
                    v-if="isResetButtonActive"
                    @click="state.email = user.email">Reset</button>
            </div>

        </div>
    </div>
    <!--  -->
    <CustomModal ref="verificationModalRef">
        <div class="text-center my-2">
            <h4 class="text-head fw-bold text-center">Confirm Verification </h4>
        </div>
        <div class="px-4">
            <div class="pb-3 pt-2">
                <label class="form-label-title">Verification Code</label>
                <input @focus="delete state.errors.verification_code"
                    type="text"
                    class="form-control"
                    v-model="state.verification_code"
                    placeholder="">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.verification_code?.length">{{ state.errors?.verification_code[0] }}</span>
            </div>
            <div class="mb-3 pb-2">
                <label class="form-label-title">Your Current Password</label>
                <input @focus="delete state.errors?.password"
                    type="text"
                    class="form-control"
                    v-model="state.password"
                    placeholder="">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.password?.length">{{ state.errors?.password[0] }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button @click="verificationModalRef.modalHide()"
                    class="btn fw-bold btn-danger">Cancle</button>
                <loading-button :isLoading="state.isSubmitChangeEmail"
                    @click="updateEmailAddress">
                    Save Change
                </loading-button>
            </div>
        </div>
    </CustomModal>
</template>