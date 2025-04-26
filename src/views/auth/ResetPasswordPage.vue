<script setup>
    import { useApiRequest } from "@actions";
    import Http from "@http";
    import { reactive, onMounted, ref } from "vue";
    import { useAppStore, useAuthStore } from "@stores";
    import { isAuthorized } from "@stores/auth";
    import { $toast } from "@config";
    import { useRouter, useRoute } from "vue-router";
    import FormInput from './components/FormInput.vue';
    import Wrapper from './components/Wrapper.vue';

    const authStore = useAuthStore();
    const appStore = useAppStore();

    const router = useRouter();
    const route = useRoute();

    const attributes = reactive({
        password: '',
        confirm_password: '',
        is_submit: false,
        is_disabled: false,
    });

    const errors = reactive({});
    const error_message = ref(null);

    async function submitResetForm(e) {

        error_message.value = null;
        attributes.is_submit = true;

        const query = new URLSearchParams(route.query).toString();

        Http
            .auth
            .reset({
                password: attributes.password,
                confirm_password: attributes.confirm_password
            }, query)
            .then(({ data: { message } }) => {

                if (message && message.vidible) return error_message.value = message;

                $toast.success(message.text);
                
                setTimeout(() => router.push({ name: 'login' }), 2000);

            }).catch(error => {

                const { errors: _errors, message } = Http.error(error);

                if (_errors) return Object.assign(errors, _errors);

                if (message && message.visible) return error_message.value = message;

                $toast.error(message.text);

            }).finally(_ => attributes.is_submit = false);

    }

    async function fetchInvitedUser(query) {

        attributes.is_disabled = true;

        Http
            .auth
            .validate(query)
            .then(({ data: { message } }) => {

                if (message && message.visible) return error_message.value = message;

            })
            .catch(error => {

                const { message } = Http.error(error);

                if (message && message.visible) return error_message.value = message;

                $toast.error(message.text);

            }).finally(_ => attributes.is_disabled = false);
    }

    onMounted(() => {
        fetchInvitedUser(route.query);
    });

</script>

<template>

    <Wrapper title="Reset Password"
        :error-message="error_message">

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
            :disabled="attributes.is_disabled || !!error_message"
            :loading="attributes.is_submit"
            @click="submitResetForm"
            label="Reset">
        </Button>

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