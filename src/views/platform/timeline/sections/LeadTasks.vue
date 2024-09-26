<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue';
    import SlideUpDown from "vue-slide-up-down";
    import Task from './components/Task.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useLeadStore } from '@stores';
    import { useRoute } from 'vue-router';
    import { $toast } from '@config';
    import { useApiRequest } from '@actions';
    import WorkflowModal from '../modals/WorkflowModal.vue';

    const leadStore = useLeadStore();
    const router = useRoute();
    const workflowModalRef = ref(null);
    const toggleDropdownBox = ref(true);
    const isCreateNew = ref(false);
    const editLeadId = computed(() => leadStore.getEditLeadId);
    const leadTasks = computed(() => leadStore.getLeadTasks);

    async function handleTaskPositionUpdate() {
        $toast.clear();
        var $tasks = leadTasks.value?.map(obj => obj.task_id);
        await useApiRequest({
            url: `/platform/${editLeadId.value}/tasks/position`,
            method: 'post',
            payload: {
                tasks: $tasks,
            }
        }).then(res => {
            const { success, message } = res;
            if (!success) {
                $toast.error(message.text);
            }
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        }).finally(() => { });
    }


</script>

<template>
    <div class="dropdown-box border-bottom">
        <div :class="{show:toggleDropdownBox}"
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Tasks</span>
            <div class="">
                <button @click="toggleDropdownBox=!toggleDropdownBox"
                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                    <font-awesome-icon icon="fas fa-chevron-up"
                        class="text-soft fs-14px"></font-awesome-icon>
                </button>
            </div>
        </div>
        <slide-up-down :active="toggleDropdownBox"
            :duration="500">
            <div class="dropdown-body">
                <div class="px-3 py-1 pb-2">
                    <vue-draggable-next tag="div"
                        :list="leadTasks"
                        @change="handleTaskPositionUpdate"
                        handle=".task-item">
                        <Task v-for="(task, index) in leadTasks"
                            :key="Math.random()"
                            :task="task"></Task>
                    </vue-draggable-next>

                    <Task v-if="isCreateNew"
                        :is-new="isCreateNew"
                        :task="{}"
                        :key="Math.random()"
                        @toggle-new-task="(_status)=>isCreateNew=_status"></Task>
                    <div v-else
                        class="ms-n2">
                        <button @click="isCreateNew=!isCreateNew"
                            class="task-action-btn add-new">
                            <font-awesome-icon icon="fas fa-plus"
                                class="text-primary fs-16px btn-icon"></font-awesome-icon>
                            <span class="ms-2 fw-bold text-primary fs-14px">New task</span>
                        </button>
                    </div>
                    <div class="ms-n2">
                        <button @click="workflowModalRef.showModalHandler()"
                            class="task-action-btn add-new">
                            <font-awesome-icon icon="fas fa-list-check"
                                class="text-primary fs-16px btn-icon"></font-awesome-icon>
                            <span class="ms-2 fw-bold text-primary fs-14px">Begin a workflow</span>
                        </button>
                    </div>

                </div>
            </div>
        </slide-up-down>
    </div>
    <workflow-modal ref="workflowModalRef"></workflow-modal>
</template>

<style lang="scss"
    scoped>
    .dropdown-box {
        .dropdown-header {
            &.show {
                button {
                    transform: rotate(180deg);
                }
            }

            button {
                transition: transform 0.3s ease-in-out;
            }
        }

        .dropdown-body {
            transition: height 0.3s ease-in-out;
            position: relative;
            .task-action-btn {
                border: none;
                outline: none;
                background-color: transparent;
                padding: 4px 6px 4px 12px;
                width: 100%;
                text-align: left;
                transition: all 0.3s ease-in-out;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-radius: 3px;

                &:hover {
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                }
            }
        }
    }
</style>