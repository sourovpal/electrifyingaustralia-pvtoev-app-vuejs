<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from '../../../../actions/api'

import { CONFIG } from '../../../../config';
import {useToast} from 'vue-toast-notification';

const props = defineProps(['workflowId']);

const $toast = useToast(CONFIG.TOAST);

onMounted(() => {
    getDurations();
    getTasks();
});

const tasks = ref([]);
const activeTaskId = ref(2);
const getTasks = () => {
    axios.get(`workflows/${props.workflowId}/tasks/`)
        .then(res => tasks.value = res.data);
}


const durations = ref([]);
const getDurations = () => {
    axios.get('workflows/durations')
        .then(res => {
            if (res?.data?.length) {
                durations.value = res.data;
                return;
            }
            return $toast.error('Something went wrong');
        }).catch(e => {
            console.log(e)
            $toast.error('Something went wrong');
        })
}

const formData = ref({
    title: '',
    description: '',
    duration_id: null,
    workflow_id: props.workflowId,
});

const handleDurationSelect = (durationObj) => {
    formData.value.duration_id = durationObj.id;
    console.log(formData.value.duration_id);

}

const selectedDurationName = computed(() => {
    if (!durations.value.length) return '';
    if (!formData.value.duration_id) return '';
    const durationObj = durations.value.find(durationObj => durationObj.id.toString() === formData.value.duration_id.toString()) 

    return durationObj?.name ?? '';
});

const handleSaveBtnClick = () => {
    axios.post(`workflows/${props.workflowId}/tasks/create`, formData.value)
        .then(res => {
            if (res?.data?.message) 
                $toast.success(res?.data?.message);

        }).catch(e => {
            console.log(e);
            $toast.error('Something went wrong');
        })
}

const handleDurationClearClick = () => {
    formData.value.duration_id = null;
}


</script>

<template>
	<div class="task-crud-wrapper row gx-0 pt-2">
		<!-- task list -->
		<div class="task-list-wrapper col-md-4 mt-3 --border">
			<p class="fw-bold fs-6 mb-0">Tasks</p>

			<ul class="task-list list-unstyled">
			    <template v-if="tasks.length">
				    <li :class="`task ${ activeTaskId.toString() === task.id.toString() ? 'active-task' : '' } ps-4 py-2`" v-for="task in tasks">
				        {{task.title}}
				    </li>
			    </template>


				<li class="task new-task-button ps-4 py-2 fs-6 text-soft">
					+ New Task
				</li>
			</ul>
		</div>

		<!-- task form -->
		<div class="task-form col-md-8 p-3 border rounded mt-4">
			<div class="task-title-input-wrapper mb-4">
				<label for="title-input" class="fs-6 fw-bold"
					>Task title</label
				>
				<input
					id="title-input"
					type="text"
				    v-model="formData.title"
					class="form-control rounded"
					placeholder="Enter title"
				/>
			</div>

			<div class="description-input-wrapper mb-4">
				<label for="task-input" class="fs-6 fw-bold">
				    Task Description
				</label>
				<textarea
					id="task-input"
					class="d-block w-100 pt-1"
					style="padding-left: 12px"
					rows="3"
				    v-model="formData.description"
					placeholder="Enter description"
				></textarea>
			</div>

			<div class="duration-input-wrapper">
				<label for="time-input" class="fs-6 fw-bold"
					>Relative due date after previous event</label
				>
				<div class="mb-3 position-relative">
					<input
						id="time-input"
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
								:class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${status?.id == item.id ? 'selected' : ''}`"
							>
								{{ item.name }}
							</li>
							<li class="dropdown-item text-danger fw-bold fs-14px d-flex py-1" @click="handleDurationClearClick">
							    Clear duration
							</li>
						</ul>
					</div>
					<!-- <span class="fs-14px text-danger py-1 w-100 d-block"> -->
					<!--     {{ errors?.lead_status[0] }} -->
					<!-- </span> -->
				</div>
			</div>

			<button class="btn btn-primary mt-5" @click="handleSaveBtnClick">Save</button>
		</div>
	</div>
</template>

<style scoped>
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
