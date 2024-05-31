<script setup>
import {onMounted, ref} from 'vue'
import axios from '../../../../actions/api';
import { CONFIG } from '../../../../config';
import {useToast} from 'vue-toast-notification';
import { useRouter, useRoute } from 'vue-router';

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
const workflowIdExists = ref(false);

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

		    <div class="task-crud-wrapper row gx-0 pt-2" v-if="workflowIdExists">
                <!-- task list -->
		        <div class="task-list-wrapper col-md-4 mt-3 --border">
		            <p class="fw-bold fs-6 mb-0">Tasks</p>

		            <ul class="task-list list-unstyled">
		                <li class="task active-task ps-4 py-2">Bean task</li>
		                <li class="task ps-4 py-2">Bean task</li>
		                <li class="task new-task-button ps-4 py-2 fs-6 text-soft">+ New Task</li>
		            </ul>
		        </div>

                <!-- task form -->
		        <div class="task-form col-md-8 p-3 border rounded mt-4">
                    <div class="task-title-input-wrapper mb-4">
		                <label for="title-input" class="fs-6 fw-bold">Task title</label>
                        <input id="title-input" type="text" class="form-control rounded" placeholder="Enter title" />
		            </div>

                    <div class="description-input-wrapper mb-4">
		                <label for="task-input" class="fs-6 fw-bold">Task Description</label>
                        <textarea id="task-input" class="d-block w-100 pt-1" style="padding-left: 12px;" rows="3" placeholder="Enter description"></textarea>
		            </div>

                    <div class="duration-input-wrapper">
		                <label for="time-input" class="fs-6 fw-bold">Relative due date after previous event</label>
                        <div class="mb-3 position-relative">
                            <input id="time-input" class="form-control cursor-pointer" type="text" data-mdb-toggle="dropdown" readonly value="Select a duration ">
                            <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-" style="max-height:125px;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                        v-for="(item, index) in leadStatus" 
                                        :key="index"
                                        @click="selectleadStatus(item)"
                                        :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${status?.id == item.id?'selected':''}`">
                                        {{ item.name }}
                                        <svg v-if="item.is_lost" class="svg-5 ms-auto" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                                    </li>
                                </ul>
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
                        </div>
		            </div>

                    <button class="btn btn-primary mt-5">Save</button>
		        </div>

                <!-- danger zone -->
		        <div class="danger-zone offset-md-4 col-md-8 mt-5 mb-5">
		            <p class="text-danger mb-0">Danger zone</p>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="danger-zone-content-wrapper">
		                    <p class="text-danger mb-0 text-danger fw-bold">Delete this workflow</p>
		                    <small class="d-inline-block" style="width: 95%;">
		                        Deleting workflows will not affect any existing Opportunities that have used this workflow. Once you delete this workflow, it cannot be recovered. Please be careful. 
		                    </small>
                        </div>
		                <button class="btn btn-outline-danger d-flex align-items-center justify-content-between" style="white-space: nowrap;">
                            <svg fill="#dc4c64" height="16" weight="16" data-v-7acf274e="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-v-7acf274e="" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
		                    <span>Delete workflow</span>
		                </button>
                    </div>
		        </div>
		    </div>

		</div>
	</div>
</template>

<style lang="scss" scoped>

.content-body {
    width: 60%;
}

.task-list {
    width: 90%;

}

.task {
    &:hover {
        background-color: #e5f4ff;

        &.new-task-button {
            background-color: #e4e7eb;
        }
    }

    &.active-task {
        border-left: 3px solid #007ee5;
        background-color: #e5f4ff;
        font-style: italic;

        &::after {
            content: '*'
        }
    }
}
</style>
