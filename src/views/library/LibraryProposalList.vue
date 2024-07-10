<script setup>
import SearchBar from '../../components/SearchBar.vue'
import LibraryProposalActionBar from './LibraryProposalActionBar.vue'
import ProjectStatus from './ProjectStatus.vue'
import ProposalDetails from './ProposalDetails.vue'

</script>

<template>
	<section class="content lead-list --content-y-100vh">
		<SearchBar placeholder-text="Search for a project" />
        <LibraryProposalActionBar class="d-none d-md-block" />

	    <section class="row mx-auto mx-md-0 w-100 w-md-75 mt-3">
	        <ProposalDetails class="d-none d-md-block" />
	        <ProjectStatus />
	    </section>
	</section>
</template>

<style lang="scss">
.new-design-btn {
    background: #f9f9f9;
    transition: 200ms;

    &:hover {
        background: #f1f1f1;
    }
}

</style>
