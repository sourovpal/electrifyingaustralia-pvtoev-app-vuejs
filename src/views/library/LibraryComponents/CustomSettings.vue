<script setup>
import { ref, onMounted } from 'vue';
import SaveableInput from '@components/forms/SaveableInput.vue';
import Formatter from '../../../helpers/Formatter';
import updateCustomSettingsActions from './composables/useCustomSettingsActions';

const formData = ref({});
const loading = ref(false);

const {
    cancelInstallationDate,
    cancelValidityDate,
    updateCustomSettings,
    getCustomSettingsDetails
} = updateCustomSettingsActions(formData, loading);

onMounted(
    getCustomSettingsDetails
);

</script>

<template>
	<div :class="loading ? 'loading-opacity pe-none' : ''">
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Installation year
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
			        <SaveableInput
			            v-model="formData.installation_year"
			            @update:modelValue="updateCustomSettings"
			        />
				</div>
				<p class="fs-12px">
					The year of installation determines how many STCs this
					project is eligible for.
				</p>
			</div>
		</div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				System efficiency
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
			        <SaveableInput 
			            :amount-formatter="(num) => Formatter.toIntlFormat(num) + '%'" 
			            v-model="formData.system_efficiency" 
			            @update:modelValue="updateCustomSettings"
			        />
				</div>
				<p class="fs-12px">
					This value should account for inverter losses, AC/DC
					cable losses, shading and dirt.
				</p>
			</div>
		</div>

		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Proposal valid until
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<input
					    type="date"
					    class="form-control w-50"
					    v-model="formData.valid_date"
					    @change="updateCustomSettings"
					/>
					<font-awesome-icon
                        @click="cancelValidityDate"
						class="text-secondary fs-14px cursor-pointer date-control-btn"
						icon="fas fa-trash"
					/>
				</div>
			</div>
		</div>

		<div class="row my-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Proposed installation date
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<input
					    type="date"
					    class="form-control w-50"
					    v-model="formData.installation_date" 
					    @change="updateCustomSettings"
					/>
					<font-awesome-icon
					    @click="cancelInstallationDate"
						class="text-secondary fs-14px cursor-pointer date-control-btn"
						icon="fas fa-trash"
					/>
				</div>
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


<style lang="scss" scoped>
.date-control-btn {
    transition: 100ms;

    &:hover {
        transform: scale(1.2);
        color: rgb(220, 76, 100) !important;
    }
}
</style>
