<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from '@actions/api'

import { CONFIG } from '@config';
import {useToast} from 'vue-toast-notification';
import ConfirmationModal from '@components/Modals/ConfirmationModal.vue';

const props = defineProps(['workflowId']);

const $toast = useToast(CONFIG.TOAST);

onMounted(() => {
    getDurations();
    getTasks();
});

const tasks = ref([]);
const taskNextPageNumber = ref(1);
const currentPageNumber = ref(1);
const lastPageNumber = ref(null);
const isCurrentlyOnLastPage = computed(() => currentPageNumber.value?.toString() === lastPageNumber.value?.toString());

const getTasks = (afterTaskGet) => {
    axios.get(`workflows/${props.workflowId}/tasks?page=${taskNextPageNumber.value}`)
        .then(res => {
            console.log(res.data.data)
            tasks.value = [...tasks.value, ...res?.data?.data]

            currentPageNumber.value = res.data.current_page
            taskNextPageNumber.value = res.data.current_page + 1
            lastPageNumber.value = res.data.last_page;

            afterTaskGet?.();
        })
        .catch(e => {
            $toast.error('Something went wrong')
            console.log(e);
        });
}

const getTaskById = (taskId) => {
    isLoading.value = true;
    axios.get(`workflows/${props.workflowId}/tasks/${taskId}`)
        .then(res => {
            formData.value = res.data;
        }).catch(e => {
            $toast.error('Something went wrong')
            console.log(e);
        }).finally(() => {
            isLoading.value = false;
        })
}

const activeTaskId = ref(null); // being set to the first task id from the mounting api call for tasks

const handleTaskClick = (taskId) => {
    activeTaskId.value = taskId;
    getTaskById(taskId);
}
 
const handleNewTaskClick = () => {
    activeTaskId.value = null;
    formData.value = JSON.parse(JSON.stringify(initialFormData));
    errorMessages.value = [];
}

const durations = ref([]);
const getDurations = () => {
    axios.get('/settings/workflows/durations')
        .then(res => {
            if (!res?.data?.length)
                return $toast.error('Something went wrong'); 
             
            durations.value = res.data;
        }).catch(e => {
            $toast.error('Something went wrong');
            console.log(e)
        })
}

const initialFormData = {
    title: '',
    description: '',
    duration_id: null,
    workflow_id: props.workflowId,
}

const formData = ref(JSON.parse(JSON.stringify(initialFormData)));
const errorMessages = ref([]);

const handleDurationSelect = (durationObj) => {
    formData.value.duration_id = durationObj.id;
}

const selectedDurationName = computed(() => {
    if (!durations.value.length) return '';
    if (!formData.value.duration_id) return '';
    const durationObj = durations.value.find(durationObj => durationObj.id.toString() === formData.value.duration_id.toString()) 

    return durationObj?.name ?? '';
});

const isLoading = ref(false);
const handleSubmit = () => {
    const apiEndpoint = !formData.value.id ? 
        `workflows/${props.workflowId}/tasks/create` :
        `workflows/${props.workflowId}/tasks/update/${activeTaskId.value}`;

    isLoading.value = true;
    axios[formData.value.id ? 'put' : 'post'](apiEndpoint, formData.value)
        .then(res => {
            if (res?.data?.message) 
                $toast.success(res?.data?.message);

            errorMessages.value = [];

            (() => {
                tasks.value = [];
                taskNextPageNumber.value = 1
                currentPageNumber.value = 1;
                lastPageNumber.value = null;
            })();

            getTasks(() => {
                if (!res?.data?.task?.id) return;
                getTaskById(res.data.task.id)
                activeTaskId.value = res.data.task.id;
            });
        }).catch(e => {
            if (!e?.response?.data?.errors) {
                $toast.error('Something went wrong'); 
                return console.log(e);
            }

            errorMessages.value = e.response.data.errors;
        })
        .finally(() => {
            isLoading.value = false;
        })
}

const handleDurationClearClick = () => {
    formData.value.duration_id = null;
}

const openTaskDeleteConfirmationModal = ref(false);

const handleTaskDeleteBtnClick = () => {
    openTaskDeleteConfirmationModal.value = true;
}

const handleTaskDeleteCancel = () => {
    openTaskDeleteConfirmationModal.value = false;
}

const handleTaskDeleteConfirm = () => {
    isLoading.value = true;  
    axios.delete(`workflows/${props.workflowId}/tasks/delete/${activeTaskId.value}`, formData.value)
        .then(res => {
            if (res?.data?.message) 
                $toast.success(res?.data?.message);
            else return;

            activeTaskId.value = null;
            formData.value = JSON.parse(JSON.stringify(initialFormData));
            errorMessages.value = [];
            getTasks();
        })
        .catch(e => {
            console.log(e)
            $toast.error('Something went wrong');
        }).finally(() => {
            openTaskDeleteConfirmationModal.value = false;
            isLoading.value = false;
        })
}

const handleScroll = (e) => {
    const objDiv = e.target;
    const hasScrolledToBottom = objDiv.scrollTop + objDiv.clientHeight >= objDiv.scrollHeight;

    if (!hasScrolledToBottom) return;
    if (isCurrentlyOnLastPage.value) return;

    getTasks();
}

</script>

<template>
	<div class="task-crud-wrapper row gx-0 pt-2">
		<!-- task list -->
		<div class="task-list-wrapper col-md-4 mt-3 overflow-scroll" style="height: 75vh;" @scroll="handleScroll">
			<p class="fw-bold fs-6 mb-0">Tasks</p>

			<ul class="task-list list-unstyled">
				<li class="task new-task-button ps-4 py-2 fs-6 text-soft cursor-pointer" @click="handleNewTaskClick">
					+ New Task
				</li>
			    <template v-if="tasks.length">
				    <li 
				        @click="handleTaskClick(task.task_id)" 
				        :class="`task cursor-pointer ${ activeTaskId?.toString() === task.task_id.toString() ? 'active-task' : '' } ps-4 py-2`" 
				        v-for="task in tasks"
				    >
				        {{task.title}}
				    </li>
			    </template>
                <li class="ps-4 pt-4 fs-6 text-soft text-center" v-if="!isCurrentlyOnLastPage">
                    <font-awesome-icon class="animate-spin" icon="fa-solid fa-circle-notch" />
				</li>
			</ul>
		</div>

		<!-- task form -->
		<div class="task-form col-md-8 p-3 border rounded mt-4">
            <div :class="`${ isLoading ? 'loading-opacity' : '' }`">
			    <div class="task-title-input-wrapper mb-4">
				    <label for="title-input" class="fs-6 fw-bold">
				        Task title
				    </label>
				    <input
					    id="title-input"
					    type="text"
				        v-model="formData.title"
					    class="form-control rounded"
					    placeholder="Enter title"
				    />

				    <small class="text-danger" v-for="errorMessage in errorMessages['title']">
				        {{ errorMessage }}
				    </small>
			    </div>

			    <div class="description-input-wrapper mb-4">
				    <label for="task-description-input" class="fs-6 fw-bold">
				        Task Description
				    </label>
				    <textarea
					    id="task-description-input"
					    class="d-block w-100 pt-1"
					    style="padding-left: 12px"
					    rows="3"
				        v-model="formData.description"
					    placeholder="Enter description"
				    ></textarea>

                    <!-- server errors for description -->
				    <small class="text-danger" v-for="errorMessage in errorMessages['description']">
				        {{ errorMessage }}
				    </small>
			    </div>

			    <div class="duration-input-wrapper">
				    <label for="duration-input" class="fs-6 fw-bold">
				        Relative due date after previous event</label
				    >
				    <div class="mb-3 position-relative">
					    <input
						    id="duration-input"
						    class="form-control cursor-pointer"
						    type="text"
						    data-mdb-toggle="dropdown"
						    readonly
						    :value="selectedDurationName ? selectedDurationName : 'Specify duration'"
					    />
					    <div
						    class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
						    style="max-height: 125px"
					        >
						    <ul class="list-unstyled mb-0">
							    <li
								    v-for="(item, index) in durations"
								    :key="index"
								    @click="handleDurationSelect(item)"
								    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1`"
							        >
                                    <!-- ${status?.id == item.id ? 'selected' : ''} -->
								    {{ item.name }}
							    </li>
							    <li class="dropdown-item text-danger fw-bold fs-14px d-flex py-1" @click="handleDurationClearClick">
							        Clear duration
							    </li>
						    </ul>
					    </div>

                        <!-- server errors for duration -->
                        <small class="text-danger" v-for="errorMessage in errorMessages['duration_id']">
				            {{ errorMessage }}
				        </small>
				    </div>
			    </div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-5">
			    <button 
			        class="btn btn-primary"
                    v-if="!isLoading"
			        @click="handleSubmit"> 
			        {{ formData.id ? 'Update' : 'Save'}} task
			    </button>
			    <div v-else class="btn btn-primary">
                    <font-awesome-icon class="animate-spin" icon="fa-solid fa-circle-notch" />
			    </div>
                <div v-if="formData.id" class="task-delete-btn text-danger" @click="handleTaskDeleteBtnClick">
                    <font-awesome-icon icon="fa-solid fa-trash" />
                </div>
            </div>
		</div>
	</div>

    <!-- to get confirmation from the user before deleting a task -->
	<ConfirmationModal 
	    v-if="openTaskDeleteConfirmationModal"
	    heading="Are you sure you want to delete this task?"
	    subtext="This task will be permanently deleted"
	    confirmBtnText="Delete"
        cancelBtnText="Keep"
        :is-loading="isLoading"
	    @cancel="handleTaskDeleteCancel"
        @confirm="handleTaskDeleteConfirm"
	/>
</template>

<style scoped>
.task-list { width: 90%; }

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

    &.new-task-button:hover {
        color: rgb(56, 107, 192) !important;
    }
}

.task-delete-btn {
    opacity: 50%;
    transition: 100ms;
    cursor: pointer;

    &:hover {
        opacity: 100%;
    }
}
</style>
