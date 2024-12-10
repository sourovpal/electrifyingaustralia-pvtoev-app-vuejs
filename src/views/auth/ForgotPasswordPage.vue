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
        is_submit: false,
    });

    const errors = reactive({});
    const error_message = ref(null);

    async function submitForgotForm(e) {

        attributes.is_submit = true;

        Http
            .auth
            .forgot({ username: attributes.username })
            .then(({ data: { message } }) => {

                if (message && message.visible) return error_message.value = message;

            }).catch(error => {

                const { errors: _errors, message } = Http.error(error);

                if (_errors) return Object.assign(errors, _errors);

                if (message && message.visible) return error_message.value = message;

                $toast.error(message.text);

            }).finally(_ => attributes.is_submit = false);
    }

</script>

<template>
    <Wrapper title="Forgot Password"
        :error-message="error_message">

        <form-input label="Email or Username"
            v-model="attributes.username"
            :errors="errors"
            error-label="username"></form-input>

        <Button size="small"
            type="button"
            class="w-100"
            :loading="attributes.is_submit"
            @click="submitForgotForm"
            label="Submit"></Button>

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