<script setup>
  import Http from "@http";
  import FormInput from './components/FormInput.vue';
  import Wrapper from './components/Wrapper.vue';
  import { reactive, onMounted, ref } from "vue";
  import { useAppStore, useAuthStore } from "@stores";
  import { isAuthorized } from "@stores/auth";
  import { $toast } from "@config";
  import { useRouter, useRoute } from "vue-router";

  const authStore = useAuthStore();
  const appStore = useAppStore();

  const router = useRouter();
  const route = useRoute();

  const attributes = reactive({
    company_name: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    invite_token: '',
    is_submit: false,
    is_disabled: false,
  });

  const errors = reactive({});
  const error_message = ref(null);

  async function submitRegisterForm(e) {

    attributes.is_submit = true;
    error_message.value = null;
    Http
      .auth
      .register({
        company_name: attributes.company_name,
        name: attributes.name,
        email: attributes.email,
        password: attributes.password,
        confirm_password: attributes.confirm_password,
        invite_token: attributes.invite_token,
      })
      .then(({ data: { access_token, user } }) => {

        authStore.setAccessToken(access_token?.token);

        authStore.setUser(user);

        window.location.reload();

      })
      .catch(error => {

        const { errors: _errors, message } = Http.error(error);

        if (_errors) return Object.assign(errors, _errors);

        if (message && message.visible) return error_message.value = message;

        $toast.error(message.text);

      }).finally(_ => attributes.is_submit = false);

  }

  async function fetchInvitedUser(token) {

    attributes.invite_token = token;

    attributes.is_disabled = true;

    Http
      .auth
      .invited({ token })
      .then(({ data: { email, company_name } }) => {

        attributes.email = email;

        attributes.company_name = company_name;

      })
      .catch(error => {

        const { message } = Http.error(error);

        if (message && message.visible) return error_message.value = message;

        $toast.error(message.text);

      }).finally(_ => attributes.is_disabled = false);
  }

  onMounted(() => {
    const { token } = route.query;
    if (token) fetchInvitedUser(token);
  });

</script>

<template>
  <Wrapper title="Register"
    :error-message="error_message">
    <form-input label="Company Name"
      v-model="attributes.company_name"
      :errors="errors"
      :readonly="!!attributes.invite_token"
      error-label="company_name">
    </form-input>

    <form-input label="Full Name"
      v-model="attributes.name"
      :errors="errors"
      error-label="name">
    </form-input>

    <form-input label="Email Address"
      v-model="attributes.email"
      :errors="errors"
      :readonly="!!attributes.invite_token"
      error-label="email">
    </form-input>

    <form-input label="Password"
      v-model="attributes.password"
      :errors="errors"
      error-label="password">
    </form-input>

    <form-input label="Confirm Password"
      v-model="attributes.confirm_password"
      :errors="errors"
      error-label="confirm_password">
    </form-input>

    <Button size="small"
      type="button"
      class="w-100"
      :disabled="attributes.is_disabled || error_message"
      :loading="attributes.is_submit"
      @click="submitRegisterForm"
      label="Sign In"></Button>

    <div class="py-3 text-center">
      <router-link to="/login">
        Already have an account?
        <span class="fw-bold">
          Login here.
        </span>
      </router-link>
    </div>

  </Wrapper>

</template>