<template>
	<Page>
	    <div class="first-row d-flex justify-content-between text-black --gap-5">
            <div class="first-column gx-0 pt-4 custom-top-border">
			    <font-awesome-icon
				    class="text-primary fs-25px"
				    icon="fas fa-sun"
			    />

			    <p class="fs-20px"> Daily production per month </p>
			    <p class="mb-0 fs-11px"> How much electricity will my system generate per day, on average? </p>
            </div>

            <div class="second-column custom-top-border">
			    <canvas
				    id="bar-chart"
				    ref="systemProductionChart"
			    ></canvas>
            </div>
	    </div>

        <div class="second-row d-flex justify-content-between text-black gap-5">
            <div class="first-column gx-0 pt-4 custom-top-border">
			    <font-awesome-icon
				    class="text-primary fs-25px"
				    icon="fas fa-screwdriver-wrench"
			    />

			    <p class="fs-20px">System details</p>
			    <p class="mb-0 fs-11px">Your custom design</p>
            </div>

            <div class="second-column custom-top-border pt-4">
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">System size <sub>2</sub></p>
                    <span class="fs-12px">{{ projectStore.getSystemSize }} kWDC (STC) </span>
                </div>
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">Estimated annual production <sub>2</sub></p>
                    <span class="fs-12px">{{ Formatter.toIntlFormat(projectStore.getAnnualProduction) }} kWh </span>
                </div>
                <div class="lh-sm" v-if="selectedPanel">
                    <p class="fw-bold mb-0 text-black">Solar panel</p>
                    <span class="fs-12px"> {{ selectedPanel.manufacturer }} · {{selectedPanel.model}} · {{selectedPanel.name}} </span>
                </div>
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">Inverter </p>
                    <template v-for="inverter in inverterSales">
                        <span class="fs-12px">{{inverter.pivot.quantity}} × {{inverter.manufacturer}} - {{ inverter.model }}</span> <br>
                        <!-- <span class="fs-11px">Single phase · 97.4% max. efficiency · <span class="text-info">Datasheet</span> · <span class="text-info">Manual</span> · <span class="text-info">Warranty</span></span> <br> -->
                    </template>
                </div>
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">System efficiency <sub>2</sub></p>
                    <span class="fs-12px">{{ systemEfficiency }}</span>
                </div>
            </div>
	    </div>

        <div class="second-row d-flex justify-content-between text-black gap-5">
            <div class="first-column gx-0 pt-4 custom-top-border">
			    <font-awesome-icon
				    class="text-primary fs-25px"
				    icon="fas fa-circle-radiation"
			    />
			    <p class="fs-20px">Included services</p>
            </div>

            <div class="second-column custom-top-border pt-4">
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">Warranty & Repair Services</p>
                    <p class="fs-12px lh-sm mb-0">
                        A 5 year workmanship warranty applies to this solar system installation.
                        For other warranty information refer to the Warranty section below.
                    </p>
                </div>
            </div>
	    </div>
	</Page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Page from './Page.vue'
import Chart from 'chart.js/auto'
import { useProjectStore } from '../../../stores/project';
import Formatter from '../../../helpers/Formatter';

const projectStore = useProjectStore();

const inverterSales = computed(() => projectStore.getInverterSales);
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

const systemEfficiency = computed(() => projectStore.getCustomSettings?.system_efficiency ? projectStore.getCustomSettings?.system_efficiency + '%' : '-')
const systemProductionChart = ref(null)
const selectedPanel = computed(
    () => projectStore.getSelectedPanel
);

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

onMounted(() => {
    initChart();
})

</script>

<style lang="scss" scoped>
.custom-top-border {
    border-top: 1px solid #000000;
}

.first-row {
    margin-bottom: 5rem;
}

.first-column { width: 35%; }
.second-column {
    width: 70%; 

    & > div {
        margin-bottom: 1rem;
    }
}
</style>
