<script setup>
	import Chart from 'chart.js/auto'
	import { onMounted, ref, computed } from 'vue'
	import { Skeletor } from 'vue-skeletor'

	import TabbedDisplay from './components/TabbedDisplay.vue'
	import PricingDisplay from './LibraryComponents/Pricing/PricingDisplay.vue'
	// import Financing from './LibraryComponents/Financing.vue'
	// import RebateDisplay from './LibraryComponents/Rebates/RebateDisplay.vue'
	import PaymentSettings from './LibraryComponents/PaymentSettings.vue'

	import InverterDisplay from './LibraryComponents/Inverters/InverterDisplay.vue'
	// import EVChargers from './LibraryComponents/EVChargers.vue'
	// import HeatPumps from './LibraryComponents/HeatPumps.vue'

	import LoadProfile from './LibraryComponents/LoadProfile/LoadProfile.vue'
	import BatteryStorage from './LibraryComponents/BatteryStorage.vue'
	// import IntervalAnalysis from './LibraryComponents/IntervalAnalysis.vue'
	import ExportLimit from './LibraryComponents/ExportLimit.vue'

	import CurrentBills from './LibraryComponents/CurrentBills.vue'
	import FinancialOutcomes from './LibraryComponents/FinancialOutcomes/FinancialOutcomes.vue'
	import TermSettings from './LibraryComponents/TermSettings.vue'

	// import Mounting from './LibraryComponents/Mounting.vue'

	import CustomSettings from './LibraryComponents/CustomSettings.vue'
	import Notes from './LibraryComponents/Notes.vue'
	// import Wholesaler from './LibraryComponents/Wholesaler.vue'
	import { useProjectStore } from '../../stores/project'

	const projectStore = useProjectStore();

	const data = [
		{ year: 'Jan', count: 13.10 },
		{ year: 'Feb', count: 11.08 },
		{ year: 'Mar', count: 9.06 },
		{ year: 'Apr', count: 7.04 },
		{ year: 'May', count: 5.02 },
		{ year: 'Jun', count: 3 },
		{ year: 'Jul', count: 5.02 },
		{ year: 'Aug', count: 7.04 },
		{ year: 'Sep', count: 9.06 },
		{ year: 'Oct', count: 11.07 },
		{ year: 'Nov', count: 13.08 },
		{ year: 'Dec', count: 15.09 },
	]

	const systemProductionChart = ref(null)

	const initChart = () => {
		new Chart(systemProductionChart.value, {
			type: 'bar',
			data: {
				labels: data.map((row) => row.year),
				datasets: [
					{
						label: 'Acquisitions by year',
						data: data.map((row) => row.count),
					},
				],
			},
		})
	}

	const isLoading = computed(
		() => projectStore.getProjectLoadingState
	);

	onMounted(
		initChart
	);

</script>

<template>
	<div class="proposal-details col-md-8 --px-lg-4">
		<Skeletor v-if="isLoading"
			height="15px"
			width="10rem"
			style="border-radius: 1rem" />
		<small v-else
			class="text-info fw-bold">System production</small>
		<div class="card mt-3">
			<div class="tabs">
				<Skeletor width="7rem"
					height="1.5rem"
					v-if="isLoading" />

				<template v-else>
					<button class="btn btn-sm fs-12px text-info fw-bold btn-transparent shadow me-2">
						1 year
					</button>

					<div class="btn-group"
						role="group"
						aria-label="Button group with nested dropdown">
						<button class="btn btn-sm fs-12px text-info fw-bold btn-transparent">
							Daily average
						</button>
						<button class="btn btn-sm fs-12px text-muted fw-bold btn-transparent">
							Monthly Total
						</button>
					</div>
				</template>
			</div>
			<!-- Pretend graph -->
			<canvas id="bar-chart"
				ref="systemProductionChart"></canvas>
		</div>
		<div style="padding-bottom: 20rem;"
			class="card d-flex mt-4"
			v-if="isLoading">
			<Skeletor width="7rem"
				class="mb-4"
				height="1.5rem" />


			<Skeletor width="75%"
				height="1rem"
				class="mb-4" />

			<Skeletor width="80%"
				height="1rem" />
		</div>
		<div class="mt-3 w-100">
			<TabbedDisplay component-class="w-100 mt-3 card shadow"
				:tabs="[
					{label: 'Pricing', component: 'PricingDisplay'},
					{label: 'Financing', component: 'Financing'},
					{label: 'Rebates', component: 'RebateDisplay'},
					{
						label: 'Payment settings',
						component: 'PaymentSettings',
						icon: {name: 'fa-gear', toRight: true},
						toRight: true,
					},
				]"
				:components="{
					Financing,
					PricingDisplay,
					RebateDisplay,
					PaymentSettings,
				}" />

			<TabbedDisplay class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-3"
				:tabs="[
					{label: 'Inverters', component: 'InverterDisplay'},
					// {label: 'EVChargers', component: 'EVChargers'},
					// {label: 'HeatPumps', component: 'HeatPumps'},
				]"
				:components="{InverterDisplay, /* EVChargers, HeatPumps */}" />

			<TabbedDisplay class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-4"
				:tabs="[
					{label: 'Load profile', component: 'LoadProfile'},
					// {
					// 	label: 'Battery storage',
					// 	component: 'BatteryStorage',
					// 	icon: {name: 'fa-lock'},
					// },
					// {
					// 	label: 'Interval analysis',
					// 	component: 'IntervalAnalysis',
					// 	icon: {name: 'fa-lock'},
					// },
					{label: 'Export limit', component: 'ExportLimit'},
				]"
				:components="{
					LoadProfile,
					BatteryStorage,
					// IntervalAnalysis,
					ExportLimit,
				}" />

			<TabbedDisplay class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-4"
				:tabs="[
					{label: 'Current bills', component: 'CurrentBills'},
					{
						label: 'Financial Outcomes',
						component: 'FinancialOutcomes',
					},
					{
						label: 'Term Settings',
						component: 'TermSettings',
						icon: {name: 'fa-gear', toRight: true},
						toRight: true,
					},
				]"
				:components="{CurrentBills, FinancialOutcomes, TermSettings}" />

			<!-- <TabbedDisplay -->
			<!-- 	class="w-100 mt-5" -->
			<!-- 	component-class="w-100 mt-2 card shadow pb-4" -->
			<!-- 	:tabs="[{label: 'Mounting', component: 'Mounting'}]" -->
			<!-- 	:components="{Mounting}" -->
			<!-- /> -->
			<TabbedDisplay class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow"
				:tabs="[
					{
						label: 'Custom settings',
						component: 'CustomSettings',
					},
					{label: 'Notes', component: 'Notes'},
					// {label: 'Wholesaler', component: 'Wholesaler'},
				]"
				:components="{CustomSettings, Notes, /* Wholesaler */}" />
			<p style="margin-top: 50rem">DELETE THIS TAG</p>
		</div>
	</div>
</template>

<style scoped>
	.proposal-details {
		height: 87vh;
		overflow-y: scroll;
	}
</style>