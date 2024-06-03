<script setup>
import {onMounted, ref} from 'vue'
import axios from '../../../../actions/api';
import { CONFIG } from '../../../../config';
import {useToast} from 'vue-toast-notification';
import { useRouter, useRoute } from 'vue-router';
import TaskForm from './TaskForm.vue'

const leadStatus = [
    {id: 1, name: 'beans', is_lost: 1},
]

const router = useRouter();
const currentRoute = useRoute();
const workflowId = currentRoute.params.workflow_id;

const formData = ref({ title: '' }); // starting with just a title as CREATE is the default action of this form so no IDs initially
const errorMessage = ref('');
const isLoading = ref(false);

onMounted(() => {
    if (workflowId) getWorkflowById(workflowId);
});

const $toast = useToast(CONFIG.TOAST);

// temporary

const getWorkflowById = () => {
    axios.get(`/workflows/${workflowId}`)
        .then(res => {
            formData.value = {
                title: res?.data?.title,
                id: res?.data?.id
            };
        })
        .catch(e => $toast.error(e.response.data.message));
}

// Store handler method
const handleWorkflowCreate = () => {
    if (!formData.value.title)
        return $toast.error('Title missing');

    isLoading.value = true;
    axios.post('/workflows/create', formData.value)
        .then(res => {
            $toast.success(res?.data?.message ?? 'Workflow created');
            router.push('/settings/crm/workflows');
        })
        .catch(e => {
            errorMessage.value = e.response.data.message;
        }).finally(() => {
            isLoading.value = false;
        });
}

// Update handler method
const handleWorkflowUpdate = () => {
    if (!formData.value.title)
        return $toast.error('Title missing');


    isLoading.value = true;
    axios.put(`/workflows/update/${formData.value?.id}`, formData.value)
        .then(res => {
            $toast.success(res?.data?.message ?? 'Workflow updated');
            router.push('/settings/crm/workflows');
        })
        .catch(e => {
            errorMessage.value = e.response.data.message;
        }).finally(() => {
            isLoading.value = false;
        });
}

</script>

<template>
	<div class="content content-y-100vh">
		<div
			class="content-header d-flex justify-content-start align-items-center mb-4 border-bottom pb-4"
		>
			<router-link to="/settings/crm/workflows">
				<h1 class="mb-0  text-soft">Task workflows</h1>
			</router-link>
			<div class="mx-2">
				<svg
					class="svg-5"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
					></path>
					<path fill="none" d="M0 0h24v24H0V0z"></path>
				</svg>
			</div>
			<h1 class="mb-0 text-base">{{ !workflowId ? 'Create' : 'Update' }} workflow</h1>
		</div>

		<div class="content-body">
		    <div class="title-input-wrapper">
                <div class="mb-4">
		            <label for="worflow-title-input" class="fs-6 fw-bold">Title</label>
                    <input @keydown.enter="() => workflowId ? handleWorkflowUpdate() : handleWorkflowCreate()" v-model="formData.title" id="worflow-title-input" type="text" class="form-control rounded" placeholder="Enter title" />
                    <small class="text-danger" v-if="errorMessage">{{errorMessage}}</small>
                </div>

                <!-- This will be conditional -->
                <button 
                    :class="`btn ${isLoading ? 'animate-pulse btn-secondary' : 'btn-primary'}`" 
                    v-if="!workflowId" @click="handleWorkflowCreate"
                >
                    {{ !isLoading ? 'Create' : 'Loading' }}
                </button>

                <button 
                    :class="`btn ${isLoading ? 'animate-pulse btn-secondary' : 'btn-primary'}`" 
                    v-else="!workflowId" @click="handleWorkflowUpdate"
                >
                    {{ !isLoading ? 'Update' : 'Loading' }}
                </button>
		    </div>

            <TaskForm 
                :workflow-id="workflowId" 
                v-if="workflowId" 
            />
		</div>
	</div>
</template>

<style lang="scss" scoped>

.content-body {
    width: 60%;
}

</style>
