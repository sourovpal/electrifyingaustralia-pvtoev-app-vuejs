<script setup>
import {ref, onMounted} from 'vue';
import SaveableInput from '@components/forms/SaveableInput.vue';
import { useProjectStore } from '../../../stores/project';
import axios from '../../../actions/api';
import { useToast } from 'vue-toast-notification';

const projectStore = useProjectStore();
const formData = ref({});
const toast = useToast();

const updateTermSettings = () => {
    projectStore.setRecalculationLoadingState(true);
    axios.put(`projects/${projectStore.getProjectId}/term_settings/${formData.value.id}`, formData.value)
        .then((res) => {
            toast.success(res?.data?.message ?? 'Success');
            projectStore.setCurrentProject(projectStore.getProjectId);
        })
        .catch(e => {
            toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
            console.log(e);
        })
        .finally(() => {
            projectStore.setRecalculationLoadingState(false) 
        });
}

onMounted(() => {
    formData.value = projectStore.getTermSettings;
});
</script>

<template>
	<div class="pb-2">
		<div class="row mb-3 align-items-start">
			<p class="text-end fs-14px pt-1 col-md-4 text-secondary mb-0"> Term: </p>
			<div class="col-md-8">
		        <SaveableInput  
		            v-model="formData.term_in_years" 
		            @update:modelValue="updateTermSettings"
                    :amount-formatter="(num) => num + ' Years'"
		        />
			    <p class="fs-12px mb-0 text-secondary">The period of time assigned as the lifespan of the purchased system or investment. This is typically between 20 to 30 years as per manufacturers warranty.</p>
                <p class="fs-12px mb-0 text-danger">Do not modify this if you are not sure.</p>
			</div>
		</div>

		<hr/>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">Inflation rate:</p>
			<div class="col-md-8">{{ formData.inflation_rate }}% p.a. </div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">Electricity price increase:</p>
			<div class="col-md-8">
		        <SaveableInput  
		            v-model.number="formData.electricity_price_increase" 
		            @update:modelValue="updateTermSettings"
                    :amount-formatter="(num) => num + '%'"
		        />
                <p class="fs-12px mb-0 text-danger">Do not modify this if you are not sure.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
