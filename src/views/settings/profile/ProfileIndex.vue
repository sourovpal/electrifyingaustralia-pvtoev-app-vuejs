<script setup>
    import BasicDetailsSection from './components/BasicDetailsSection.vue';
    import ContactSection from './components/ContactSection.vue';
    import ProfileAvatarSection from './components/ProfileAvatarSection.vue';
    import PreferencesSection from './components/PreferencesSection.vue';
</script>

<template>
    <div class="content content-y-100vh">

        <div class="content-header">
            <h1>Profile</h1>
        </div>

        <div class="content-body">
            <section class="">
                <BasicDetailsSection />
                <hr class="mt-4 mb-5">
                <ContactSection />
                <hr class="mt-4 mb-5">
                <PreferencesSection />
                <hr class="mt-4 mb-5">
                <ProfileAvatarSection />
                <br><br><br>
            </section>
        </div>
    </div>
</template>