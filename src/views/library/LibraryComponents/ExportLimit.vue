<script setup>
import { onMounted, ref } from 'vue';
import SaveableInput from '@components/forms/SaveableInput.vue';
import axios from '../../../actions/api.js';
import { useToast } from 'vue-toast-notification';
import { useProjectStore } from '../../../stores/project.js';
import { handlePromise } from '../../../helpers';

const emit = defineEmits([
    'switch-request'
]);

const toast = useToast();
const projectStore = useProjectStore();
const projectId = projectStore.getProjectId;

const noLimit = ref(null);
const limit = ref(null);

const setValuesFromTheState = () => {
    const exportLimitDetails = projectStore.getExportLimitDetails;
    noLimit.value = exportLimitDetails.export_limit_type === 'no_limit';
    limit.value = exportLimitDetails.export_limit_in_kw;
}

onMounted(setValuesFromTheState)

const loading = ref(false);

const sendUpdatedDetails = async () => {
    loading.value = true;
    projectStore.setRecalculationLoadingState(true);

    const payload = { no_limit: noLimit.value, export_limit: limit.value }
    const { response, error } = await handlePromise(axios.post(`projects/${projectId}/export-limit-update`, payload));

    if (response) {
        toast.success(response?.data?.message ?? 'Success');
        await projectStore.setCurrentProject(projectId);
        noLimit.value = projectStore.project.export_limit_type === 'no_limit';
        limit.value = projectStore.project.export_limit_in_kw;
    }

    if (error) { 
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
        console.log(error);
    }

    projectStore.setRecalculationLoadingState(false);
    loading.value = false
}

const handleExportLimitTypeInputClick = (noLimitStatus) => {
    noLimit.value = noLimitStatus;
    sendUpdatedDetails();
}

const handleLimitUpdate = () => 
    sendUpdatedDetails();


const handleLoadProfileClick = () =>
    emit('switch-request', 'LoadProfile');

</script>

<template>
	<div class="overflow-x-hidden position-relative py-3">
		<div class="row align-items-baseline px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				Export limit type
			</p>
			<div class="col-md-8">
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <button
                        @click="handleExportLimitTypeInputClick(true)"
                        type="button"
                        :class="`btn ${noLimit ? 'btn-primary' : 'btn-secondary'}`"
                    >
                        No limit
                    </button>

                    <button
                        @click="handleExportLimitTypeInputClick(false)"
                        type="button"
                        :class="`btn ${!noLimit ? 'btn-primary' : 'btn-secondary'}`"
                    >
                        Instantaneous
                    </button>
                </div>
				<p class="fs-12px">
                    For best Export Limit results, enable to the simulated <span class="text-primary cursor-pointer" @click="handleLoadProfileClick">Load Profile</span> for a full simulation.
				</p>
			</div>
		</div>
        <div class="row align-items-baseline px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				Limit to
			</p>
			<div class="col-md-8">
			    <span v-if="noLimit">N/A</span>

                <template v-else>
			        <SaveableInput 
			            :amount-formatter="(num) => num + ' kW'" 
			            v-model="limit" 
			            @update:modelValue="handleLimitUpdate"
			        />
                </template>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
