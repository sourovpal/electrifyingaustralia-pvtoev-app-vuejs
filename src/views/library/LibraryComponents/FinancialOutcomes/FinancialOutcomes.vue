<script setup>
import { ref } from 'vue';
import LifetimeSummaryGraph from './LifetimeSummaryGraph.vue';
import MonthlyComparisonGraph from './MonthlyComparisonGraph.vue';

const graphToShow = ref('lifetime-summary'); // 'lifetime-summary' | 'monthly-comparison'

</script>

<template>
	<div class="mt-3 px-4">
		<div class="tabs pb-4 border-bottom">
			<div
				class="btn-group"
				role="group"
				aria-label="Button group with nested dropdown"
			>
				<button 
				    @click="graphToShow = 'lifetime-summary'" 
				    :class="`btn btn-sm fs-12px ${ graphToShow === 'lifetime-summary' ? 'text-primary' : 'text-muted' } fw-bold btn-transparent`">
					Lifetime summary
				</button>

				<button 
				    @click="graphToShow = 'monthly-comparison'" 
				    :class="`btn btn-sm fs-12px ${ graphToShow === 'monthly-comparison' ? 'text-primary' : 'text-muted' } fw-bold btn-transparent`">
					Monthly comparison
				</button>
			</div>
		</div>

		<!-- Pretend graph -->
		<LifetimeSummaryGraph v-if="graphToShow === 'lifetime-summary'" />
		<MonthlyComparisonGraph v-else />
	</div>
</template>

<style lang="scss" scoped></style>
