<script setup>
  import { computed, ref, reactive, watch } from "vue";
  import { useApiRequest } from "@actions";
  import { useAppStore } from "@stores";
  import { $toast } from "@config";

  const toggleVerificationModal = ref(false);

  const state = reactive({
    errors: {},
    email: null,
    verification_code: null,
    password: null,
    isSubmitSendOtp: false,
    isShowGetOtpModal: false,
    isSubmitChangeEmail: false,
  });

  const appStore = useAppStore();
  const authUser = computed(() => appStore.getUser);

  watch(() => authUser, () => {
    state.email = authUser.value.email ?? null;
  }, { immediate: true, deep: true });

  const isResetButtonActive = computed(() => {
    const isEqual = (val1, val2) => {
      return (
        val1 === val2 ||
        (val1 === null && val2 === "") ||
        (val1 === "" && val2 === null)
      );
    };
    return !isEqual(state.email, authUser.value.email);
  });

  // Method to send OTP
  const sendEmailOptHandler = async () => {
    $toast.clear();
    state.errors = {};
    state.isSubmitSendOtp = true;
    if (state.email === authUser.value.email) {
      state.errors.email = ["Please change your current email to proceed."];
      return;
    }
    const payload = { email: state.email };
    await useApiRequest({
      url: '/users/send/email-otp',
      method: 'post',
      payload,
    }).then(res => {
      const { message, success, errors } = res;
      if (!success && errors) {
        state.errors = errors;
        return;
      }
      toggleVerificationModal.value = true;
    }).catch(error => {
      $toast.error("Oops, something went wrong");
    }).finally(() => {
      state.isSubmitSendOtp = false;
    });
  };

  const updateEmailAddress = async () => {
    $toast.clear();
    state.errors = {};
    state.isSubmitChangeEmail = true;
    const payload = {
      email: state.email,
      verification_code: state.verification_code,
      password: state.password,
    };
    await useApiRequest({
      url: '/users/change/email-address',
      method: 'post',
      payload,
    }).then(res => {
      const { success, message, errors } = res;
      if (!success && errors) {
        state.errors = errors;
        return;
      } else {
        $toast[message.type](message.text);
        toggleVerificationModal.value = false;
        state.verification_code = null;
        state.password = null;
        appStore.callFetchAppData();
      }
    }).catch(error => {
      $toast.error("Oops, something went wrong");
    }).finally(() => {
      state.isSubmitChangeEmail = false;
    });
  };
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
          class="form-control" />
        <span class="form-input-commant"
          v-if="!state.errors.email?.length">
          When changing your account email address, you will be sent a email to
          validate your new email address.
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
          @click="state.email = authUser.email">
          Reset
        </button>
      </div>
    </div>
  </div>
  <!--  -->
  <bootstrap-modal v-if="toggleVerificationModal"
    @close="() => (toggleVerificationModal = false)">
    <div class="text-center my-2">
      <h4 class="text-head fw-bold text-center">Confirm Verification</h4>
    </div>
    <div class="">
      <div class="pb-3 pt-2">
        <label class="form-label-title">Verification Code</label>
        <input @focus="delete state.errors.verification_code"
          type="text"
          class="form-control"
          v-model="state.verification_code"
          placeholder="" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="state.errors?.verification_code?.length">{{ state.errors?.verification_code[0] }}</span>
      </div>
      <div class="mb-3 pb-2">
        <label class="form-label-title">Your Current Password</label>
        <input @focus="delete state.errors?.password"
          type="text"
          class="form-control"
          v-model="state.password"
          placeholder="" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="state.errors?.password?.length">{{ state.errors?.password[0] }}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button @click="toggleVerificationModal = false"
          class="btn fw-bold btn-danger">
          Cancle
        </button>
        <loading-button :disabled="!(state.password && state.verification_code)"
          :isLoading="state.isSubmitChangeEmail"
          @click="updateEmailAddress">
          Save Change
        </loading-button>
      </div>
    </div>
  </bootstrap-modal>
</template>