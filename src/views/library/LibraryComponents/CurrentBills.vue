<script setup>
import { ref } from 'vue';
import SaveableInput from '../components/SaveableInput.vue';

const totalAmount = ref('$27,990');

</script>

<template>
	<div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Total amount
			</p>
			<div class="col-md-8">
			    <SaveableInput v-model="totalAmount" />
				<p class="fs-12px">
				    This is used to calculate the customer's energy usage and provides the baseline for the <span class="text-info">financial outcomes</span> charts. 
				</p>
			</div>
		</div>

        <div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Bill season
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">Winter</p>
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-pen"
					/>
				</div>
				<p class="fs-12px"> For which season was the bill amount above? </p>
			</div>
		</div>
		<hr />
        <div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Daily supply charge
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$1.00 per day</p>
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-pen"
					/>
				</div>
				<p class="fs-12px"> The daily charge is inclusive in the customer's bill. </p>
			</div>
		</div>

        <div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Electricity rate
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$0.34 per kWh</p>
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-pen"
					/>
				</div>
				<p class="fs-12px"> The electricity rate is used when calculating the savings from not consuming utility power. </p>
			</div>
		</div>

        <div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Feed in tariff 
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$0.07 per kWh</p>
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-pen"
					/>
				</div>
				<p class="fs-12px">This is used when self consumption is not 100%.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
