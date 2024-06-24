<script setup>
import SearchBar from '../../../components/SearchBar.vue';
import ActionBar from '../../../components/ActionBar/ActionBar.vue';
import DropdownUsersList from './DropdownUsersList.vue';
import { onMounted, ref } from 'vue';
import { Tooltip } from 'bootstrap';
import axios from '../../../actions/api.js';

onMounted(() => {
    getWorkFlows();
    getUsers();
})

const workflows = ref([]);
async function getWorkFlows() {
    axios.get('workflows').then(res => {
        workflows.value = res.data
    }).catch(() => {
        $toast.error('Something went wrong');
    })
    .finally(() => {
        [].slice
            .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            .map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
    });
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

</script>

<template>
    <section class="content">
        <!-- Showing the wrong text at the moment -->
        <SearchBar /> 
        <action-bar>
            <div 
                v-if="true"         
                class="settings-group-item owner-list-dropdown ms-3 ps-2 position-relative d-none d-xl-block">
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

        <!-- <div class="tasks-list w-50 mx-auto mt-5 rounded" style="border: 2px dotted maroon;"> -->
        <div class="tasks-list w-50 mx-auto mt-5 rounded">

            <div class="overdue-tasks-wrapper">
                <p class="fw-bold lead">Overdue</p>
                <div class="tasks-wrapper">
                    <div class="task-bar shadow border" v-for="workflow in workflows">
                        <div class="row-1 d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex gap-2 align-items-center">
                                <input type="checkbox" />
                                <p class="fw-bold mb-0">{{ workflow.title }}</p>
                                <small class="status border fw-bold rounded px-2 py-1">Status</small>
                            </div>
                            <p class="address text-secondary align-self-end mb-0">Lorem ipsum dolor sit amet, qui minim labore </p>
                        </div>

                        <div class="row-2 d-flex justify-content-between align-items-end">
                            <div class="checkboxes-wrapper d-flex flex-wrap gap-2">
                                <input v-for="task in workflow.tasks" data-bs-toggle="tooltip" data-bs-placement="top" :title="task.title" type="checkbox"  />
                                <!-- <input data-bs-toggle="tooltip" data-bs-placement="top" title="beans bitch 2!" type="checkbox"  /> -->
                                <!-- <input checked data-bs-toggle="tooltip" data-bs-placement="top" title="beans bitch!" type="checkbox" /> -->
                            </div>

                            <div class="task-actions d-flex align-items-center">
                                <button 
                                    class="border-0 bg-transparent" 
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"
                                >
				                    <font-awesome-icon
				                        class="text-secondary"
				                        icon="fas fa-stopwatch"
				                    />
                                </button>
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
