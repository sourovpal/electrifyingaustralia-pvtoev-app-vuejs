<script setup>
    import { ref, nextTick, computed } from 'vue';
    import SlideUpDown from "vue-slide-up-down";
    import { usePlatformStore } from "@stores";
    import { $toast } from '@config';
    import { useApiRequest } from '@actions';
    import { Skeletor } from "vue-skeletor";

    const platformStore = usePlatformStore();

    const props = defineProps({
        workflow: { type: Object, default: {} }
    });

    const isLoading = ref(false);
    const selectAllStage = ref(false);
    const assignTasks = ref([]);
    const selectedTasks = ref([]);
    const toggleTaskList = ref(false);
    const workflowTasks = ref([]);
    const fetchComplete = ref(false);
    const $leadId = computed(() => platformStore.getEditLeadId);

    function handleSelectAllTasks() {

        var total = [...assignTasks.value, ...selectedTasks.value].length;

        if (total !== workflowTasks.value.length) {

            selectedTasks.value = workflowTasks.value?.reduce((acc, task) => {

                if (!assignTasks.value.includes(task.task_id)) {

                    acc.push(task.task_id);

                }

                return acc;

            }, []);

        } else {

            selectedTasks.value = [];
        }

        assignWorkflowTask(true);
    }

    function selectSingleTask(id) {

        var index = selectedTasks.value.findIndex((task) => task === id);

        if (index !== -1) {

            selectedTasks.value.splice(index, 1);

        } else {

            selectedTasks.value.push(id);

        }

        assignWorkflowTask();
    }

    async function fetchWorkflowTasks() {

        $toast.clear();

        toggleTaskList.value = !toggleTaskList.value;

        if ((workflowTasks.value?.length || fetchComplete.value) || !props.workflow.tasks_count) {
            return;
        };

        isLoading.value = true;

        await useApiRequest({
            url: `/platform/${$leadId.value}/workflows/${props.workflow?.workflow_id}/tasks`,
        }).then(async res => {

            const { success, tasks, assign_tasks, message } = res;

            if (success) {
                fetchComplete.value = true;
                toggleTaskList.value = true;
                await nextTick();
                workflowTasks.value = tasks;
                assignTasks.value = assign_tasks;
                return;
            }

            $toast.error(message.text);

        })
            .catch(error => {
                $toast.clear();
                $toast.error(error.message);
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    async function assignWorkflowTask(assignAll = false) {

        await useApiRequest({
            url: `/platform/${$leadId.value}/workflows/${props.workflow?.workflow_id}/tasks${assignAll ? '?assing=all' : ''}`,
            method: 'post',
            payload: {
                tasks: selectedTasks.value,
            }
        }).then(async res => {

            const { success, message } = res;

            if (success) {

                assignTasks.value = [...assignTasks.value, ...selectedTasks.value];

                selectedTasks.value = [];

                platformStore.callFetchLeadTasks($leadId.value);

                if (assignAll) fetchWorkflowTasks();

                return;
            }

            $toast.error(message.text);

        }).catch(error => {
            $toast.clear();
            $toast.error(error.message);
        });
    }

</script>
<template>
    <div class="workflow">
        <div class="workflow-header">
            <custom-checkbox
                :checked="!!([...assignTasks, ...selectedTasks].length === workflowTasks.length && workflowTasks.length) || !!(workflow.assign_tasks_count === workflow.tasks_count)"
                @click="handleSelectAllTasks"
                :disabled="!!(workflow.assign_tasks_count === workflow.tasks_count) || !!([...assignTasks, ...selectedTasks].length === workflowTasks.length && workflowTasks.length)"></custom-checkbox>
            <div @click="fetchWorkflowTasks"
                class="d-flex justify-content-start align-items-center flex-grow-1">
                {{ workflow.title }} ({{ workflow.tasks_count }})
                <div class="ms-auto">
                    <font-awesome-icon icon="fas fa-chevron-down"
                        class="text-soft fs-16px"></font-awesome-icon>
                </div>
            </div>
        </div>
        <slide-up-down :active="toggleTaskList"
            :duration="500">

            <div class="workflow-body ps-4">

                <div v-if="isLoading"
                    v-for="(_, index) in 5"
                    :key="index*Math.random()"
                    class="task py-2 px-2">
                    <Skeletor style="width:1.3rem;height:1.3rem;border-radius:3px;"
                        class="me-2"></Skeletor>
                    <Skeletor style="width:80%;height:1rem;border-radius:3px;"></Skeletor>
                </div>

                <div v-else
                    v-for="(task, index) in workflowTasks"
                    :key="index"
                    class="task">
                    <custom-checkbox @click="selectSingleTask(task.task_id)"
                        :checked="(selectedTasks.includes(task.task_id) || assignTasks.includes(task.task_id))"
                        :disabled="assignTasks.includes(task.task_id)"></custom-checkbox>
                    {{ task.title }}
                </div>

            </div>

        </slide-up-down>
    </div>
</template>
<style scoped
    lang="scss">
    .workflow {
        .workflow-header {
            width: 100%;
            padding: 2px 8px 2px 0px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 3px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 0.5rem;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
            cursor: pointer;
        }

        .workflow-body {
            .task {
                width: 100%;
                padding: 2px 8px 2px 0px;
                font-size: 16px;
                border-radius: 3px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 0.5rem;
                box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
                cursor: pointer;
            }
        }
    }
</style>