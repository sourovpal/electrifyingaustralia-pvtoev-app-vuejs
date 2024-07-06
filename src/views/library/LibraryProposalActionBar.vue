<script setup>
import ActionBar from '../../components/ActionBar/ActionBar.vue'
import LeftActionBar from '../../components/ActionBar/LeftActionBar.vue'
import RightActionBar from '../../components/ActionBar/RightActionBar.vue'
import LibraryDesignDropdownList from './LibraryDesignDropdownList.vue'

</script>

<template>
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
                <LibraryDesignDropdownList />

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
</template>

<style lang="scss" scoped>

</style>
