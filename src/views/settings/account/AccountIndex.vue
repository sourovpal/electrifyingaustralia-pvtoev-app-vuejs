<script setup>
    import ChangePassword from './components/ChangePassword.vue';
    import EmailAddress from './components/EmailAddress.vue';
    import ActiveSessions from './components/ActiveSessions.vue';
    import SettingsTopNavbar from "@components/SettingsTopNavbar.vue";
</script>

<template>

    <div class="content content-y-100vh">

        <settings-top-navbar title="Account"></settings-top-navbar>

        <div class="content-body">
            <section class="">

                <email-address />

                <hr class="mt-4 mb-5">

                <change-password />

                <hr class="mt-4 mb-5">

                <active-sessions />

                <br><br><br>
            </section>
        </div>
    </div>

</template>