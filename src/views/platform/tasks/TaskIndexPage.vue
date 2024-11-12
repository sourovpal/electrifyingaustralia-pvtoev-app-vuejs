<script setup>
    import { ref, watch, onMounted } from 'vue';
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import moment from 'moment';
    import CRMToolsBar from '@components/CRMToolsBar.vue';
    import TaskToolsBar from './components/TaskToolsBar.vue';
    import DataTableSkeletor from './components/DataTableSkeletor.vue';
    import Datatable from '@components/Datatable/Datatable.vue';
    import DatatableHeader from '@components/Datatable/DatatableHeader.vue';
    import DatatableBody from '@components/Datatable/DatatableBody.vue';
    import { useApiRequest } from '@actions';
    import { useRoute } from 'vue-router';
    import { $toast } from '@config';
    import { useDebounceFn } from '@vueuse/core';
    import EmptyPage from '@errors/EmptyPage.vue';
    import ErrorPage from '@errors/ErrorPage.vue';

    const route = useRoute();
    const isFirstLoading = ref(false);
    const isLoading = ref(false);
    const tableHeaders = ref(['Task', 'Lead\'s', 'Deadline', 'Remaining time', 'Owner']);
    const stages = ref(['upcoming', 'overdue', 'unassigned', 'unscheduled', 'complete', 'in-complete']);
    const pagination = ref({
        prev_page: null,
        next_prev: null,
        total: 0,
        from: 0,
        to: 0,
        current_page: 1,
    });
    const leadTasks = ref([]);
    const searchTasks = ref();
    const isError = ref(false);

    watch(route, () => {
        handleFetchTasks({ page: 1 });
    }, { deep: true });

    onMounted(() => {
        isFirstLoading.value = true;
        handleFetchTasks();
    });

    function getTotalHours(datetime) {
        const start = moment(new Date());
        const end = moment(new Date(datetime));
        var diff = end.diff(start, 'miliseconds');
        if (diff > 0) {
            return diff;
        }
        return 0;
    }

    const handleSearchTasks = useDebounceFn((search) => {
        var payload = { search, page: 1 };
        if (pagination.value?.current_page && pagination.value?.current_page > 1) {
            payload['page'] = pagination.value.current_page;
        }
        handleFetchTasks(payload);
    }, 2000);

    async function handleFetchTasks(payload = {}) {
        $toast.clear();
        isError.value = false;
        const stage = route.query?.stage;
        if (!stages.value.includes(stage) && stage) return;
        payload['stage'] = stage;
        if (typeof payload['page'] === 'undefined') {
            payload['page'] = pagination.value?.current_page ?? 1;
        }
        isLoading.value = true;
        await useApiRequest({
            url: '/platform/tasks',
            payload,
        }).then(res => {
            if (res.lead_tasks) {
                leadTasks.value = res.lead_tasks;
                pagination.value = res.pagination;
                return;
            }
            $toast.error(message.text);
        }).catch(error => {
            isError.value = true;
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isLoading.value = false;
            isFirstLoading.value = false;
        });
    }

    async function updateTaskStage(task) {
        task.is_complete = !task.is_complete;
        await useApiRequest({
            url: `/platform/tasks/${task.lead?.lead_id}/${task.task_id}/stage`,
            method: 'put',
            payload: {
                is_complete: task.is_complete,
            },
        }).then(res => {
            const { success, message, completed_at } = res;
            if (success) {
                if (completed_at) {
                    task.completed_at = completed_at;
                }
                return;
            }
            $toast.error(message.text);
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isLoading.value = false;
        });
    }
</script>

<template>
    <section class="content">

        <CRMToolsBar></CRMToolsBar>

        <task-tools-bar :pagination="pagination"
            :is-loading="isLoading"
            @pagination:fetch="handleFetchTasks"
            @search:update="handleSearchTasks"></task-tools-bar>

        <error-page v-if="isError"
            :css="{icon:{width:'30%'}}"></error-page>

        <empty-page v-else-if="!isLoading && !leadTasks.length"
            :css="{icon:{width:'30%'}}"></empty-page>

        <Datatable v-else>

            <DatatableHeader>

                <div class="tbl-th"
                    style="width: 3.5rem;">
                    &nbsp;
                </div>

                <div v-for="(tblTh, index) in tableHeaders"
                    :key="index"
                    class="tbl-th"
                    style="width: 10rem; flex-grow: 1">

                    {{ tblTh }}

                </div>

            </DatatableHeader>

            <datatable-body>

                <DataTableSkeletor v-if="isFirstLoading"></DataTableSkeletor>

                <div v-else
                    v-for="(task, index) in leadTasks"
                    :key="index"
                    class="tbl-tr full-width">
                    <div style="width: 4rem; margin-left: -7px;"
                        class="tbl-td full-width">
                        <custom-checkbox @click="updateTaskStage(task)"
                            :checked="!!task.is_complete" />
                    </div>
                    <div class="tbl-td"
                        style="width: 10rem; flex-grow: 1">
                        <span class="overflow-ellipsis">{{ task.title }}</span>
                    </div>
                    <div class="tbl-td"
                        style="width: 10rem; flex-grow: 1">
                        <router-link class="overflow-ellipsis"
                            :to="`/platform/leads/${task.lead?.lead_id}`">
                            {{ task.lead?.lead_title??'Untitled lead\'s' }}
                        </router-link>
                    </div>
                    <div class="tbl-td"
                        style="width: 10rem; flex-grow: 1">
                        <span v-if="task.duration">
                            {{ task.duration }}
                        </span>
                        <span v-else
                            class="badge bg-warning">Unscheduled Task</span>
                    </div>
                    <div class="tbl-td"
                        style="width: 10rem; flex-grow: 1">
                        <span v-tippy="task.completed_at"
                            v-if="task.is_complete"
                            class="badge bg-success cursor-pointer">Complete</span>
                        <vue-countdown v-else
                            :time="getTotalHours(task.duration)"
                            :interval="100"
                            v-slot="{ days, hours, minutes, seconds, milliseconds }">
                            <span class="badge"
                                :class="`${milliseconds ? 'bg-success' : 'bg-danger'}`">
                                {{ days }} Days - {{ hours }}:{{ minutes }}:{{ seconds }}
                            </span>
                        </vue-countdown>
                    </div>
                    <div class="tbl-td"
                        style="width: 10rem; flex-grow: 1">
                        <span class="owner-avatar">
                            <img :src="task.owner?.profile_avatar"
                                alt="">
                        </span>
                    </div>
                </div>
            </datatable-body>
        </Datatable>
    </section>
</template>

<style lang="scss"
    scoped>
    .owner-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;

        img {
            width: 100%;
            object-fit: cover;
        }
    }

    .overflow-ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>