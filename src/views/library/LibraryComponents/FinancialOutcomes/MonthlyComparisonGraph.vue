<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue';

const data = [
	{ x_points:  1,  y_points: 2000 },
	{ x_points:  2,  y_points: 3000 },
	{ x_points:  3,  y_points: 4000 },
	{ x_points:  4,  y_points: 5000 },
	{ x_points:  5,  y_points: 6000 },
	{ x_points:  6,  y_points: 7000 },
	{ x_points:  7,  y_points: 8000 },
	{ x_points:  8,  y_points: 9000 },
	{ x_points:  9,  y_points: 10000 },
	{ x_points: 10,  y_points: 11000 },
	{ x_points: 11,  y_points: 12000 },
	{ x_points: 12,  y_points: 13000 },
	{ x_points: 13,  y_points: 14000 },
	{ x_points: 14,  y_points: 15000 },
	{ x_points: 15,  y_points: 16000 },
	{ x_points: 16,  y_points: 17000 },
	{ x_points: 17,  y_points: 18000 },
	{ x_points: 18,  y_points: 19000 },
	{ x_points: 19,  y_points: 20000 },
	{ x_points: 20,  y_points: 21000 },
	{ x_points: 21,  y_points: 22000 },
	{ x_points: 22,  y_points: 23000 },
	{ x_points: 23,  y_points: 24000 },
	{ x_points: 24,  y_points: 25000 },
]

const monthlyComparisonGraph = ref(null)

const initChart = () => {
	new Chart(monthlyComparisonGraph.value, {
		type: 'bar',
		data: {
			labels: data.map((row) => row.x_points),
			datasets: [
				{
					label: 'Acquisitions by year',
					data: data.map((row) => row.y_points),
				},
			],
		},
	})
}


const isLoading = ref(false)

const simulateApiCall = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
		initChart()
	}, 1500)
}

onMounted(simulateApiCall)

</script>

<template>
    <div class="position-relative">
        <div v-if="isLoading" class="card-loader">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </div>
	    <canvas
		    id="monthly-comparison-chart"
		    ref="monthlyComparisonGraph"
	    ></canvas>
    </div>
</template>


<style lang="scss" scoped>

</style>
