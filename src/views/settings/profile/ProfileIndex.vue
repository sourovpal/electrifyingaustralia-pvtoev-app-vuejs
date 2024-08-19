<script setup>
    import { FetchProfile } from '../../../actions/UserAction';
    import BasicDetailsSection from './components/BasicDetailsSection.vue';
    import ContactSection from './components/ContactSection.vue';
    import ProfileAvatarSection from './components/ProfileAvatarSection.vue';
    import PreferencesSection from './components/PreferencesSection.vue';
    import { useAppStore } from '../../../stores/app';
    import { useAuthStore } from '../../../stores/auth';
    import { $toast } from '../../../config';
    import { ref, computed, provide, onMounted, watch } from 'vue';

    const isLoading = ref(false);
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const profileData = ref({});
    const company = ref({});

    async function fetchProfileData() {
        try {
            isLoading.value = true;
            const res = await FetchProfile();
            const { success, user } = res;
            if (success) {
                profileData.value = user;
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            isLoading.value = false;
        }
    }


    onMounted(() => {
        profileData.value = authStore.getUser;
        company.value = appStore.getCompany;
        fetchProfileData();
    });


</script>

<template>
    <div class="content content-y-100vh">

        <div class="content-header">
            <h1>Profile</h1>
        </div>

        <div class="content-body">
            <section class="">

                <BasicDetailsSection :company="company"
                    :profileData="profileData"
                    @fetch-profile="fetchProfileData" />
                <hr class="mt-4 mb-5">

                <ContactSection :profileData="profileData"
                    @fetch-profile="fetchProfileData" />
                <hr class="mt-4 mb-5">

                <PreferencesSection :profileData="profileData"
                    @fetch-profile="fetchProfileData" />
                <hr class="mt-4 mb-5">

                <ProfileAvatarSection @fetch-profile="fetchProfileData" :profileData="profileData" />
                <br><br><br>

            </section>
        </div>
    </div>
</template>