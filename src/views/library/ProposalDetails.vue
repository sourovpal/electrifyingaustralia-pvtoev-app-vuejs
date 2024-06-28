<script setup>
import TabbedDisplay from './components/TabbedDisplay.vue'
import Pricing from './LibraryComponents/Pricing.vue'
import Financing from './LibraryComponents/Financing.vue'
import Rebates from './LibraryComponents/Rebates.vue'
</script>

<template>
	<div class="col-md-8 px-4">
		<small class="text-info fw-bold">System production</small>
		<div class="card mt-3">
			<div class="tabs">
				<button
					class="btn btn-sm fs-12px text-info fw-bold btn-transparent shadow me-2"
				>
					1 year
				</button>

				<div
					class="btn-group"
					role="group"
					aria-label="Button group with nested dropdown"
				>
					<button
						class="btn btn-sm fs-12px text-info fw-bold btn-transparent"
					>
						Daily average
					</button>
					<button
						class="btn btn-sm fs-12px text-muted fw-bold btn-transparent"
					>
						Monthly Total
					</button>
				</div>
			</div>
			<!-- Pretend graph -->
			<p class="mt-2">
				Lorem ipsum dolor sit amet, officia excepteur ex fugiat
				reprehenderit enim labore culpa sint ad nisi Lorem pariatur
				mollit ex esse exercitation amet. Nisi anim cupidatat
				excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
				est aliquip amet voluptate voluptate dolor minim nulla est
				proident. Nostrud officia pariatur ut officia. Sit irure
				elit esse ea nulla sunt ex occaecat reprehenderit commodo
				officia dolor Lorem duis laboris cupidatat officia
				voluptate. Culpa proident adipisicing id nulla nisi laboris
				ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
				commodo ex non excepteur duis sunt velit enim. Voluptate
				laboris sint cupidatat ullamco ut ea consectetur et est
				culpa et culpa duis.
			</p>
		</div>
		<div class="card mt-3 w-100">
			<TabbedDisplay
				class="w-100"
				:tabs="[
					{label: 'Pricing', component: 'Pricing'},
					{label: 'Financing', component: 'Financing'},
					{label: 'Rebates', component: 'Rebates'},
				]"
				:components="{
					Financing,
					Pricing,
					Rebates,
				}"
			/>
		</div>
	</div>
</template>

<style scoped></style>
