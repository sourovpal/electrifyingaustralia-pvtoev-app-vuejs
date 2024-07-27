<script setup>
import {ref} from 'vue';
import SaveableInput from '../components/SaveableInput.vue';

// temporary
const termInYears = ref(25);
const electricityPriceIncrease = ref(3.792);
</script>

<template>
	<div class="pb-2">
		<div class="row mb-3 align-items-start">
			<p class="text-end fs-14px pt-1 col-md-4 text-secondary mb-0"> Term: </p>
			<div class="col-md-8">
		        <SaveableInput  
		            v-model="termInYears" 
                    :amount-formatter="(num) => num + ' Years'"
		        />
			    <p class="fs-12px mb-0 text-secondary">The period of time assigned as the lifespan of the purchased system or investment. This is typically between 20 to 30 years as per manufacturers warranty.</p>
                <p class="fs-12px mb-0 text-danger">Do not modify this if you are not sure.</p>
			</div>
		</div>

		<hr/>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">Inflation rate:</p>
			<div class="col-md-8"> 2.10% p.a. </div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">Electricity price increase:</p>
			<div class="col-md-8">
		        <SaveableInput  
		            v-model="electricityPriceIncrease" 
                    :amount-formatter="(num) => num + '%'"
		        />
                <p class="fs-12px mb-0 text-danger">Do not modify this if you are not sure.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
