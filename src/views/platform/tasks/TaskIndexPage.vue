<script setup>
import SearchBar from '../../../components/SearchBar.vue';
import ActionBar from '../../../components/ActionBar/ActionBar.vue';
import DropdownUsersList from './DropdownUsersList.vue';
import { onMounted, ref } from 'vue';
import { Tooltip } from 'bootstrap';
import axios from '../../../actions/api.js';
  import {useToast} from 'vue-toast-notification';
import { CONFIG } from '../../../config.js';


onMounted(() => {
    getWorkFlows();
    getUsers();
})

const $toast = useToast(CONFIG.TOAST);

const workflows = ref([]);
async function getWorkFlows() {
    axios.get('workflows').then(res => {
        workflows.value = res.data.map(workflow => ({...workflow, tasks: workflow.tasks.map(task => ({...task, is_complete: false}))}));
    }).catch(() => {
        $toast.error('Something went wrong');
    })
    .finally(() => {
        [].slice
            .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            .map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
    });
}

const handleTaskClick = (workflowId, taskId) => {
    const workflow = workflows.value.find(workflow => workflow.id === workflowId);
    if (!workflow) return;
    const task = workflow.tasks.find(task => task.id === taskId);
    task.is_complete = !task.is_complete;
}


const users = ref([]);
async function getUsers() {
    axios.get('users')
        .then(res => {
            const usersData = res?.data?.users;
            if (!usersData) return;
            const valuesExtracted = usersData.map(
                ({name, email, profile_avatar, id}) => ({name, email, profile_avatar, id})
            );
            users.value = valuesExtracted;
        })
        .catch(e => {
            console.log(e);
        });
}


const handleUserSelected = (data) => {
    console.log(data);
}

// also temporary, duh
const leadStatus = [
    {name: 'fahim'},
    {name: 'emroz'},
]

</script>

<template>
    <section class="content">
        <!-- Showing the wrong text at the moment -->
        <SearchBar /> 
        <action-bar>
            <div 
                v-if="true"         
                class="settings-group-item owner-list-dropdown ms-3 ps-2 d-none d-xl-block">
                <button 
                    class="user-dropdown-toggler bg-transparent border-0" 
                    data-mdb-toggle="dropdown" 
                    aria-expanded="false" 
                    v-tippy='{ content:"Change Owner", placement : "top" }'
                >
                    <div class="icon d-flex py-2 align-items-center gap-2">
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-bars"
				        />
                        <span class="font-bold">All users</span>
                    </div>
                </button>
                <DropdownUsersList
                    :users="users"
                    @user-selected="handleUserSelected"
                />
            </div>
        </action-bar>

        <div class="tasks-list w-50 mx-auto mt-5 rounded">

            <div class="overdue-tasks-wrapper">
                <p class="fw-bold lead">Overdue</p>
                <div class="tasks-wrapper">
                    <div class="task-bar shadow border" v-for="workflow in workflows">
                        <div class="row-1 d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex gap-2 align-items-center">
                                <!-- <input type="checkbox" /> -->
                                <label 
                                    data-bs-toggle="tooltip" 
                                    data-bs-placement="top" 
                                    title="beans" 
                                    @click="handleTaskClick(null, null)" 
                                    type="checkbox" 
                                    class="custom-form-checkbox"
                                >
                                    <svg
                                        v-if="true"
                                        class="unchecked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        height="24"
                                        viewBox="0 -960 960 960" 
                                        width="24">
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                </label>
                                <p class="fw-bold mb-0">{{ workflow.title }}</p>
                                <small class="status border fw-bold rounded px-2 py-1">Status</small>
                            </div>
                            <p class="address text-secondary align-self-end mb-0">Lorem ipsum dolor sit amet, qui minim labore </p>
                        </div>

                        <div class="row-2 d-flex justify-content-between align-items-end">
                            <div class="checkboxes-wrapper d-flex flex-wrap --gap-2">
                                <label 
                                    v-for="task in workflow.tasks" 
                                    data-bs-toggle="tooltip" 
                                    data-bs-placement="top" 
                                    :title="task.title" 
                                    type="checkbox" 
                                    @click="handleTaskClick(workflow.id, task.id)" 
                                    class="custom-form-checkbox"
                                >
                                    <svg
                                        v-if="!task.is_complete"
                                        class="unchecked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        height="18"
                                        viewBox="0 -960 960 960" 
                                        width="18">
                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                    <svg
                                        v-else
                                        class="checked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24">
                                            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                </label>
                            </div>

                            <div class="task-actions d-flex align-items-center">
                                <button 
                                    class="border-0 bg-transparent" 
                                    type="button" 
                                    data-mdb-toggle="dropdown" 
                                    aria-expanded="false"
                                >
				                    <font-awesome-icon
				                        class="text-secondary"
				                        icon="fas fa-stopwatch"
				                    />
                                </button>
                                <div 
                                    v-if="true" 
                                    v-tippy='{ content:"Change Lead Status", placement : "top" }'
                                    class="dropdown ms-2 d-none d-xl-block">
                                    <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <span
                                            style="width:170px;"
                                            v-for="(status, index) in leadStatus" 
                                            :key="index" 
                                            @click="updateLeadStatusHandler(selectedRows, status)"
                                            class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1">
                                            <span class="text-overflow-ellipsis text-head">{{ status?.name }}</span>
                                            <span class="text-overflow-ellipsis text-secondary text-head">{{ 'beans wjkx' }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div v-if="true" class="settings-group-item owner-list-dropdown relative d-none d-xl-block">
                                    <button 
                                        class="user-dropdown-toggler bg-transparent border-0" 
                                        data-mdb-toggle="dropdown" 
                                        aria-expanded="false" 
                                        v-tippy='{ content:"Change Owner", placement : "bottom" }'
                                    >
                                        <div class="temp-filter d-flex align-items-center gap-2" style="margin-left: 20px;">
				                            <font-awesome-icon
				                                class="text-secondary"
				                                icon="fas fa-bars"
				                            />
				                            <font-awesome-icon
				                                class="text-secondary"
				                                icon="fas fa-caret-down"
				                            />
                                        </div>
                                    </button>
                                    <DropdownUsersList
                                        :users="users"
                                        @user-selected="handleUserSelected"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Temporary -->
                    <!-- This will only be shown to the user if no more pages exist -->
                    <p class="text-center text-secondary mt-5">No more tasks to show</p>
                </div>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
.task-bar {
    border-radius: 0.65rem;
    padding: 1rem;
    padding-top: 0.55rem;

    .checkboxes-wrapper {
        width: 65%;
        margin-top: 0.75rem;
    }
}

</style>
