<script setup>
import { ref } from 'vue';
import SaveableInput from '../components/SaveableInput.vue';
import Formatter from '../../../helpers/Formatter';

const billSeason = ref('winter');

const seasonList = [
    {id: 'winter', label: 'Winter'},
    {id: 'summer', label: 'Summer'},
    {id: 'autumn', label: 'Autumn'},
    {id: 'spring', label: 'Spring'},
]

const totalAmount = ref(27990);
const dailySupplyCharge = ref(1.00);
const electricityRate = ref(0.34);
const tariffFeed = ref(0.10);

</script>

<template>
	<div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Total amount
			</p>
			<div class="col-md-8">
			    <SaveableInput 
			        :amount-formatter="(num) => '$' + Formatter.toIntlFormat(num)" 
			        v-model="totalAmount" 
			    />
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
			        <SaveableInput 
			            v-model="billSeason" 
			            :input-type="'select'"
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
			        <SaveableInput 
			            :amount-formatter="(num) => '$' + Formatter.toIntlFormat(num)" 
			            v-model="dailySupplyCharge" 
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
			        <SaveableInput 
			            :amount-formatter="(num) => '$' + Formatter.toIntlFormat(num) + ' per kWh'" 
			            v-model="electricityRate" 
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
			        <SaveableInput 
			            :amount-formatter="(num) => '$' + Formatter.toIntlFormat(num) + ' per kWh'" 
			            v-model="tariffFeed" 
			        />
				</div>
				<p class="fs-12px">This is used when self consumption is not 100%.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
