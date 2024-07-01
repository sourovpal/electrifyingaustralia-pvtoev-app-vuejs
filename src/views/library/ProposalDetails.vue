<script setup>
import Chart from 'chart.js/auto';
import {onMounted, ref} from 'vue';

import TabbedDisplay from './components/TabbedDisplay.vue'
import Pricing from './LibraryComponents/Pricing.vue'
import Financing from './LibraryComponents/Financing.vue'
import Rebates from './LibraryComponents/Rebates.vue'

import Inverters from './LibraryComponents/Inverters.vue'
import EVChargers from './LibraryComponents/EVChargers.vue'
import HeatPumps from './LibraryComponents/HeatPumps.vue'

import LoadProfile from './LibraryComponents/LoadProfile.vue';
import BatteryStorage from './LibraryComponents/BatteryStorage.vue';
import IntervalAnalysis from './LibraryComponents/IntervalAnalysis.vue';
import ExportLimit from './LibraryComponents/ExportLimit.vue';

import CurrentBills from './LibraryComponents/CurrentBills.vue';
import FinancialOutcomes from './LibraryComponents/FinancialOutcomes.vue';

import Mounting from './LibraryComponents/Mounting.vue';

import CustomSettings from './LibraryComponents/CustomSettings.vue';
import Notes from './LibraryComponents/Notes.vue';
import Wholesaler from './LibraryComponents/Wholesaler.vue';

const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];

const barChart = ref(null);
onMounted(() => {
    const myChart = new Chart(
        barChart.value,
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    )

});

</script>

<template>
	<div class="proposal-details col-md-8 px-4">
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
			<canvas id="bar-chart" ref="barChart"></canvas>
		</div>
		<div class="mt-3 w-100">
			<TabbedDisplay
				component-class="w-100 mt-3 card shadow"
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

			<TabbedDisplay
				class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-3"
				:tabs="[
					{label: 'Inverters', component: 'Inverters'},
					{label: 'EVChargers', component: 'EVChargers'},
					{label: 'HeatPumps', component: 'HeatPumps'},
				]"
				:components="{ Inverters, EVChargers, HeatPumps }"
			/>

			<TabbedDisplay
				class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-4"
				:tabs="[
					{label: 'Load profile', component: 'LoadProfile'},
					{label: 'Battery storage', component: 'BatteryStorage', icon: 'fa-lock'},
					{label: 'Interval analysis', component: 'IntervalAnalysis', icon: 'fa-lock'},
					{label: 'Export limit', component: 'ExportLimit' },
				]"
				:components="{ LoadProfile, BatteryStorage, IntervalAnalysis, ExportLimit }"
			/>

			<TabbedDisplay
				class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-4"
				:tabs="[
					{label: 'Current bills', component: 'CurrentBills'},
					{label: 'Financial Outcomes', component: 'FinancialOutcomes'},
				]"
				:components="{ CurrentBills, FinancialOutcomes }"
			/>

			<TabbedDisplay
				class="w-100 mt-5"
				component-class="w-100 mt-2 card shadow pb-4"
				:tabs="[
					{label: 'Mounting', component: 'Mounting'},
				]"
				:components="{ Mounting }"
			/>
            <TabbedDisplay
			    class="w-100 mt-5"
			    component-class="w-100 mt-2 card shadow"
			    :tabs="[
				    {label: 'Custom settings', component: 'CustomSettings'},
				    {label: 'Notes', component: 'Notes'},
				    {label: 'Wholesaler', component: 'Wholesaler'},
			    ]"
			    :components="{ CustomSettings, Notes, Wholesaler }"
			/>
			<p style="margin-top: 50rem;">DELETE THIS TAG</p>
		</div>
	</div>
</template>

<style scoped>
.proposal-details {
    height: 87vh;
    overflow-y: scroll;
}
</style>
