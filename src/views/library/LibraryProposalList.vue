<script setup>
import SearchBar from '../../components/SearchBar.vue'
import LibraryProposalActionBar from './LibraryProposalActionBar.vue'
import ProjectStatus from './ProjectStatus.vue'
import ProposalDetails from './ProposalDetails.vue'
import LinkToCrmModal from './LinkToCrmModal/LinkToCrmModal.vue'
import CustomerDetailsSidebar from './CustomerDetailsSidebar/CustomerDetailsSidebar.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { onClickOutside } from '@vueuse/core'

const crmLinkModalClose = ref(false);
const openCrmModal = () => {
    crmLinkModalClose.value = true;
}

const handleCrmLinkModalClose = () => {
    crmLinkModalClose.value = false;
}

onMounted(() => {
    window.addEventListener('resize', () => {
        const threshold = 768;
        if (innerWidth <= threshold) {
            crmLinkModalClose.value = false 
            appStore.setToggleCustomerDetailsSidebar(false);
        };
    })
});

const appStore = useAppStore();
const { toggleCustomerDetailsSidebar } = storeToRefs(appStore);

const handleCustomerDetailsSidebarOpen = () => {
    appStore.setToggleCustomerDetailsSidebar(true);
}

const sidebar = ref(null);
onClickOutside(sidebar, () => {
    if (!toggleCustomerDetailsSidebar) return;
    appStore.setToggleCustomerDetailsSidebar(false);
});

</script>

<template>
	<section class="content lead-list --content-y-100vh">
        <CustomerDetailsSidebar
            ref="sidebar"
            :class="toggleCustomerDetailsSidebar ? '' : 'hidden'" 
        />
		<SearchBar :class="toggleCustomerDetailsSidebar ? 'custom-blur' : ''" placeholder-text="Search for a project" />
        <LibraryProposalActionBar
            class="d-none d-md-flex" 
            :class="toggleCustomerDetailsSidebar ? 'custom-blur' : ''"
            @link-to-crm-click="openCrmModal"
            @open-customer-details-sidebar="handleCustomerDetailsSidebarOpen"
        />

        <section
            :class="toggleCustomerDetailsSidebar ? 'custom-blur' : ''"
            class="row no-wrap proposal-content-wrapper mx-auto mx-md-0 mt-3">
	        <ProposalDetails class="d-none d-md-block" />
	        <ProjectStatus />
	    </section>
	    <LinkToCrmModal
		    @close="handleCrmLinkModalClose"
		    v-if="crmLinkModalClose"
	    />
	</section>
</template>

<style lang="scss">
.new-design-btn {
    background: #f9f9f9;
    transition: 150ms;

    &:hover { background: #f1f1f1; }
}

.proposal-content-wrapper {
    @media only screen and (min-width: 768px) {
        width: calc(100% - 3rem);
        margin-left: 3rem !important;
    }

    @media only screen and (min-width: 992px) {
        width: calc(100% - 4rem);
        margin-left: 4.35rem !important;
    }

    @media only screen and (min-width: 1200px) {
        width: 73%;
        margin-left: 0.25rem !important;
    }
}

</style>
