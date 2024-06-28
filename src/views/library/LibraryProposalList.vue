<script setup>
import SearchBar from '../../components/SearchBar.vue'
import ActionBar from '../../components/ActionBar/ActionBar.vue'
import LeftActionBar from '../../components/ActionBar/LeftActionBar.vue'
import RightActionBar from '../../components/ActionBar/RightActionBar.vue'


</script>

<template>
	<section class="content lead-list">
		<SearchBar placeholderText="Search for a project" />
		<action-bar class="mx-3">
			<left-action-bar>
				<div>
					<p class="mb-0">
						185 Military Road , Dover Heights
						<span class="text-secondary">New South Wales</span>
					    <div class="d-inline-flex ms-2 gap-2">
                            <font-awesome-icon
						        class="text-secondary"
						        icon="fas fa-pen"
						    />
						    <font-awesome-icon
						        class="text-secondary"
						        icon="fas fa-copy"
						    />
                        </div>
					</p>
					<div>
						<small class="text-secondary">
							Dov Frazer · 0402450222 · dovman@gmail.com ·
							###-0000-0414
						</small>
					</div>
				</div>
			</left-action-bar>

			<right-action-bar class="gap-2">
				<font-awesome-icon
				    class="text-success"
				    icon="fas fa-check"
				/>
				<button class="btn btn-transparent text-info btn-link rounded-lg --shadow-none fw-bold">Link to CRM</button>
				<div class="d-flex new-design-btn cursor-pointer align-items-center p-2 gap-5 rounded">
				    <small>7.2kW·<span class="text-secondary">$5340</span></small>
				    <div class="d-flex gap-2">
				        <font-awesome-icon class="text-success" icon="fas fa-circle-check"/>
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-caret-down"
				        />
				    </div>
				</div>
                <div class="d-flex cursor-pointer align-items-center gap-2 p-2 rounded">
				    <font-awesome-icon icon="fas fa-puzzle-piece"/>
				    <font-awesome-icon
				        class="text-secondary"
				        icon="fas fa-caret-down"
				    />
				</div>
                <div class="d-flex cursor-pointer align-items-center gap-2 p-2 rounded">
				    <font-awesome-icon icon="fas fa-circle-user"/>
				    <font-awesome-icon
				        class="text-secondary"
				        icon="fas fa-caret-down"
				    />
				</div>

				<div><font-awesome-icon icon="fas fa-ellipsis-vertical"/></div>
			</right-action-bar>
		</action-bar>
	    <section class="content row border w-75">
	        <div class="first-row col-md-8">
	            system prod
	        </div>

	        <div class="first-row col-md-4 d-flex align-items-center gap-2">
	            <button class="btn btn-large btn-primary" style="flex-grow: 2;">
	                <font-awesome-icon icon="fas fa-up-right-from-square" />
	                <span class="fw-bold ms-2">PROPOSAL</span>
	            </button>

	            <button class="btn btn-secondary" style="flex-grow: 1;">
	                <font-awesome-icon class="text-secondary" icon="fas fa-share-nodes" />
	                <span class="fw-bold text-black ms-2">SHARE</span>
	            </button>

	            <button class="btn btn-secondary" style="flex-grow: 1;">
	                <font-awesome-icon class="text-secondary" icon="fas fa-clipboard-list" />
	            </button>
	        </div>
	    </section>
	</section>
</template>

<style scoped>
.new-design-btn {
    background: #f9f9f9;
    transition: 200ms;

    &:hover {
        background: #f1f1f1;
    }
}
</style>
