<script setup>
import { onMounted, ref } from 'vue';
import SaveableInput from '@components/forms/SaveableInput.vue';
import Formatter from '../../../helpers/Formatter';
import axios from '../../../actions/api';
import { useProjectStore } from '../../../stores/project';
import { useToast } from 'vue-toast-notification';

const seasonList = [
    { id: 'winter', label: 'Winter' },
    { id: 'summer', label: 'Summer' },
    { id: 'autumn', label: 'Autumn' },
    { id: 'spring', label: 'Spring' },
]

const projectStore = useProjectStore();
const formData = ref({});

const getCurrentBillsDetails = () => {
    loading.value = true;
    axios.get(`projects/${projectStore.getProjectId}/current_bills`)
        .then(res => { 
            formData.value = res.data 
            projectStore.setCurrentBills(res.data);
        })
        .catch(err => {
            toast.error(err?.response?.data?.message ?? 'Something went wrong');
            console.log(err);
        })
        .finally(() => {
            loading.value = false;
        })
}

const loading = ref(false);
const toast = useToast();
const updateCurrentBills = () => {
    loading.value = true;
    const apiEndpoint = `projects/${projectStore.getProjectId}/current_bills/${formData.value.id}`;
    axios.put(apiEndpoint, formData.value)
        .then((res) => {
            toast.success(res?.data?.message ?? 'Current bills updated');
            getCurrentBillsDetails();
        }).catch(() => {
            toast.error(err?.response?.data?.message ?? 'Something went wrong');
            console.log(err);
        })
        .finally(() => {
            loading.value = false;
        })
}

onMounted(getCurrentBillsDetails);

</script>

<template>
	<div :class="loading ? 'loading-opacity' : ''">
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Total amount
			</p>
			<div class="col-md-8">
			    <SaveableInput 
			        :amount-formatter="(num) => '$' + Formatter.toIntlFormat(num)" 
			        v-model.number="formData.total_amount" 
			        @update:modelValue="updateCurrentBills"
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
			            v-model="formData.bill_season" 
			            :input-type="'select'"
			            :option-list="seasonList"
			            @update:modelValue="updateCurrentBills"
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
			            v-model="formData.daily_supply_charge" 
			            @update:modelValue="updateCurrentBills"
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
			            v-model="formData.electricity_charge_per_kwh" 
			            @update:modelValue="updateCurrentBills"
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
			            v-model="formData.tariff_feed_per_kwh" 
			            @update:modelValue="updateCurrentBills"
			        />
				</div>
				<p class="fs-12px">This is used when self consumption is not 100%.</p>
			</div>
		</div>

        <div v-if="loading" class="card-loader">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </div>
	</div>
</template>

<style lang="scss" scoped></style>
