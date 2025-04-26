<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { FetchComapny } from '@actions/CompanyAction';
    import CompanyLogo from './components/CompanyLogo.vue';
    import ContactInformation from './components/ContactInformation.vue';
    import SocialMediaDetails from './components/SocialMediaDetails.vue';
    import TimeLocation from './components/TimeLocation.vue';

    import { $toast } from '@config';

    const state = reactive({
        company: {},
        isLoading: false,
    });

    async function getCompanyDetailsHandler() {
        try {
            state.isLoading = true;
            const company = await FetchComapny();
            state.company = company;
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            state.isLoading = false;
        }
    }

    onMounted(() => {
        getCompanyDetailsHandler();
    });

</script>

<template>
    <div id="account-index"
        class="content content-y-100vh">

        <div class="content-header">
            <h1>Company</h1>
        </div>

        <div class="content-body">
            <section class="">
                <CompanyLogo :company="state.company"
                    :is-loading="state.isLoading"></CompanyLogo>
                <hr class="mt-4 mb-5">

                <ContactInformation @getCompanyDetailsHandler="getCompanyDetailsHandler"
                    :company="state.company"
                    :is-loading="state.isLoading"></ContactInformation>
                <hr class="mt-4 mb-5">

                <TimeLocation @getCompanyDetailsHandler="getCompanyDetailsHandler"
                    :company="state.company"
                    :is-loading="state.isLoading"></TimeLocation>
                <hr class="mt-4 mb-5">

                <SocialMediaDetails @getCompanyDetailsHandler="getCompanyDetailsHandler"
                    :company="state.company"
                    :is-loading="state.isLoading"></SocialMediaDetails>
                <br><br><br>
            </section>
        </div>

    </div>
</template>