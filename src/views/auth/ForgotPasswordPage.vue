<script setup>
    import { useApiRequest } from "@actions";
    import { reactive, onMounted, ref } from "vue";
    import Storage from "@helpers/Storage";
    import { useAppStore, useAuthStore } from "@stores";
    import { isAuthorized } from "@stores/auth";
    import { $toast } from "@config";
    import { useRouter } from "vue-router";
    import FormInput from './components/FormInput.vue';
    import Wrapper from './components/Wrapper.vue';

    const authStore = useAuthStore();
    const appStore = useAppStore();

    const router = useRouter();

    const attributes = reactive({
        username: "",
        is_submit: false,
    });

    const errors = reactive({});
    const error_message = ref(null);

    async function submitLoginForm(e) {

        attributes.is_submit = true;

        await useApiRequest({
            url: "/forgot",
            method: "post",
            payload: {
                username: attributes.username,
            }
        }).then(({ message }) => {

            if (message && message.visible) return error_message.value = message;

        }).catch(({ errors: _errors, message }) => {

            if (_errors) return Object.assign(errors, _errors);

            if (message && message.visible) return error_message.value = message;

            $toast.error(message.text);

        }).finally(_ => {
            attributes.is_submit = false;
        });
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
            @click="submitLoginForm"
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