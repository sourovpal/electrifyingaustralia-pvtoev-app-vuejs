<script setup>
import { onMounted, ref } from 'vue';
import { useProjectStore } from '../../../stores/project';
import { useToast } from 'vue-toast-notification';
import axios from '../../../actions/api';

const loading = ref(false);
const projectStore = useProjectStore();
const toast = useToast();
const characterLimit = ref(2500)
const formData = ref({
    notes: ''
});

const updateNotes = () => {
    loading.value = true;
    axios.put(`projects/${projectStore.getProjectId}/notes`, formData.value)
        .then(res => {
            toast.success(res?.data?.message ?? 'Operation successful');
            projectStore.setCurrentProject(projectStore.getProjectId);
        })
        .catch(e => {
            toast.error(e.response.data.message ?? 'Oops, something went wrong');
            console.log(e);
        })
        .finally(() => {
            loading.value = false;
        })
}

onMounted(() => {
    formData.value.notes = projectStore.project.notes;
});

</script>

<template>
	<div :class="`position-relative ${loading ? 'loading-opacity' : ''}`">
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Notes content
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
				    <textarea
				        class="px-2 rounded border-0 mb-3 note-input"
				        v-model="formData.notes"
				        :maxlength="2500"
				        rows="6">
				    </textarea>
				</div>
				<div style="width: 95%;" class="d-flex align-items-center justify-content-between pt-1 pb-3">
				    <small class="fs-12px">{{formData.notes.length}}/{{characterLimit}}</small>
				    <button @click="updateNotes" class="btn fs-12px btn-sm btn-secondary"> 
				        Save
				    </button>
				</div>
				<p class="fs-12px">This content will appear in the <span class="fw-bold">Notes</span> section of this project's proposal</p>
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
.note-input {
    width: 95%;
    background-color: #f5f5f5;
    border-radius: .35rem !important;
}
</style>
