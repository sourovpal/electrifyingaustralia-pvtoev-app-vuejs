<script setup>
import SearchBar from '../../components/SearchBar.vue'
import LibraryProposalActionBar from './LibraryProposalActionBar.vue'
import ProjectStatus from './ProjectStatus.vue'
import ProposalDetails from './ProposalDetails.vue'
import LinkToCrmModal from './LinkToCrmModal/LinkToCrmModal.vue'
import CustomerDetailsSidebar from './CustomerDetailsSidebar/CustomerDetailsSidebar.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { useRoute } from 'vue-router';
import { useProjectStore } from '../../stores/project'


// For the initial project api call
const route = useRoute();
const projectId = route?.params?.project_id;

const crmLinkModalClose = ref(false);
const openCrmModal = () => crmLinkModalClose.value = true;
const handleCrmLinkModalClose = () => crmLinkModalClose.value = false;


const projectStore = useProjectStore();
const projectLoaded = ref(false);
onMounted(() => {
    window.addEventListener('resize', () => {
        const threshold = 768;
        if (innerWidth <= threshold) {
            crmLinkModalClose.value = false 
            projectStore.setToggleCustomerDetailsSidebar(false);
        };
    })

    projectStore.setCurrentProject(projectId)
        .then(() => projectLoaded.value = true)
});

const { toggleCustomerDetailsSidebar } = storeToRefs(projectStore);
const handleCustomerDetailsSidebarOpen = () => projectStore.setToggleCustomerDetailsSidebar(true);


const sidebar = ref(null);
onClickOutside(sidebar, () => {
    if (!toggleCustomerDetailsSidebar) return;
    projectStore.setToggleCustomerDetailsSidebar(false);
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
            v-if="projectLoaded"
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
