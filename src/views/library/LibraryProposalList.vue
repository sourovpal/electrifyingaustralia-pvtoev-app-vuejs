<script setup>
import SearchBar from '../../components/SearchBar.vue'
import LibraryProposalActionBar from './LibraryProposalActionBar.vue'
import ProjectStatus from './ProjectStatus.vue'
import ProposalDetails from './ProposalDetails.vue'

</script>

<template>
	<section class="content lead-list --content-y-100vh">
		<SearchBar placeholder-text="Search for a project" />
        <LibraryProposalActionBar class="d-none d-md-flex" />

        <section class="row no-wrap proposal-content-wrapper mx-auto mx-md-0 mt-3">
	        <ProposalDetails class="d-none d-md-block" />
	        <ProjectStatus />
	    </section>
	</section>
</template>

<style lang="scss">
.new-design-btn {
    background: #f9f9f9;
    transition: 150ms;

    &:hover { background: #f1f1f1; }
}

// .proposal-content-wrapper {
//     width: 100%;
//
//     @media only screen and (min-width: 768px) {
//         width: calc(100% - 3rem);
//         margin-left: 3rem !important;
//     }
// }

@media only screen and (min-width: 768px) {
    .proposal-content-wrapper {
        width: calc(100% - 3rem);
        margin-left: 3rem !important;
    }
}

</style>
