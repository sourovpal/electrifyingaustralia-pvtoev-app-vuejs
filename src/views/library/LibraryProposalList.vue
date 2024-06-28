<script setup>
import SearchBar from '../../components/SearchBar.vue'
import LibraryProposalActionBar from './LibraryProposalActionBar.vue'
import ProjectStatus from './ProjectStatus.vue'
import ProposalDetails from './ProposalDetails.vue'

</script>

<template>
	<section class="content lead-list">
		<SearchBar placeholderText="Search for a project" />
        <LibraryProposalActionBar />

	    <section class="content row w-75 mt-3">
	        <ProposalDetails />

            <!-- Proposal details  -->
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
