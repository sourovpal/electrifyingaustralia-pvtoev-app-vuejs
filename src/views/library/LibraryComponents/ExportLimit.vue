<script setup>
import { ref } from 'vue';
import SaveableInput from '../components/SaveableInput.vue';
import axios from '../../../actions/api.js';
import { useToast } from 'vue-toast-notification';
import { useProjectStore } from '../../../stores/project.js';

const emit = defineEmits([
    'switch-request'
]);

const toast = useToast();
const projectStore = useProjectStore();
const projectId = projectStore.getProjectId;

const noLimit = ref(projectStore.project.export_limit_type === "no_limit");
const limit = ref(projectStore.project.export_limit_in_kw);

const loading = ref(false);

const sendUpdatedDetails = () => {
    loading.value = true;
    projectStore.setRecalculationLoadingState(true);

    const payload = { no_limit: noLimit.value, export_limit: limit.value }
    axios.post(`projects/${projectId}/export-limit-update`, payload)
        .then(res => {
            toast.success(res?.data?.message ?? 'Success');
            projectStore.setCurrentProject(projectId);
        })
        .catch((err) => {
            toast.error(err?.res?.data?.message ?? 'Something went wrong');
            console.log(err);
        })
        .finally(() => {
            projectStore.setRecalculationLoadingState(false);
            loading.value = false
        });
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
