<script setup>
  import Http from "@http";
  import FormInput from './components/FormInput.vue';
  import Wrapper from './components/Wrapper.vue';
  import { reactive, onMounted, ref } from "vue";
  import { useAppStore, useAuthStore } from "@stores";
  import { isAuthorized } from "@stores/auth";
  import { $toast } from "@config";
  import { useRouter } from "vue-router";

  const authStore = useAuthStore();
  const appStore = useAppStore();

  const router = useRouter();

  const attributes = reactive({
    username: "",
    password: "",
    is_submit: false,
  });

  const errors = reactive({});
  const error_message = ref(null);

  function submitLoginForm(e) {

    attributes.is_submit = true;

    Http
      .auth
      .login({
        username: attributes.username,
        password: attributes.password,
      }).then(({ data: { access_token, user } }) => {

        authStore.setAccessToken(access_token?.token);

        authStore.setUser(user);

        window.location.reload();

      }).catch(error => {

        const { errors: _errors, message } = Http.error(error);

        if (_errors) return Object.assign(errors, _errors);

        if (message && message.visible) return error_message.value = message;

        $toast.error(message.text);

      }).finally(_ => attributes.is_submit = false);

  }

</script>

<template>

  <Wrapper title="Login"
    :error-message="error_message">

    <form-input label="Email or Username"
      v-model="attributes.username"
      :errors="errors"
      error-label="username"></form-input>

    <form-input label="Password"
      v-model="attributes.password"
      :errors="errors"
      error-label="password"></form-input>

    <div class="py-3 mt-n3 text-end">
      <router-link class="fs-14px"
        to="/forgot">Forgot you password? <span class="fw-bold">Reset here</span>.</router-link>
    </div>

    <Button size="small"
      type="button"
      class="w-100"
      :loading="attributes.is_submit"
      @click="submitLoginForm"
      label="Sign In"></Button>

    <div class="py-3 text-center">
      <router-link to="/register">
        Create a new account
        <span class="fw-bold">
          click here.
        </span>
      </router-link>
    </div>

  </Wrapper>

</template>