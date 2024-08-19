<script setup>
    import ChangePassword from './components/ChangePassword.vue';
    import EmailAddress from './components/EmailAddress.vue';
    import ActiveSessions from './components/ActiveSessions.vue';
</script>

<template>

    <div id="account-index"
        class="content content-y-100vh">
        <div class="content-header">
            <h1>Account</h1>
        </div>

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