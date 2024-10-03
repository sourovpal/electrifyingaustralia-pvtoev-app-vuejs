<script setup>
    import { ref, defineProps, onMounted, computed, watch } from 'vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import LoadingStateLeads from './LoadingStateLeads.vue';
    import ColumnStageLead from './ColumnStageLead.vue';
    import { usePipelineStore } from '@stores';
    import { useApiRequest } from '@actions';
    import { generateSlug, formatTimeAgo } from '@helpers';
    import { useIntersectionObserver, useDebounceFn } from '@vueuse/core';

    const props = defineProps({
        stage: { type: Object, default: {} },
    });

    const pipelineStore = usePipelineStore();
    const pipelineStage = computed(() => props.stage);
    const searchQuery = computed(() => pipelineStore.getSearchQuery);
    const isFirstLoadingLeads = ref(true);
    const isLoadingLeads = ref(false);
    const pipelineId = computed(() => pipelineStore.getPipelineId);
    const orderBy = computed(() => pipelineStore.getOrderBy);
    const orderColumn = computed(() => pipelineStore.getOrderColumn);
    const stageLeads = ref([]);
    const infiniteLoadedLeadRef = ref(null);
    const page = ref(1);

    async function fetchStageLeads({ isReset }) {
        if (!pipelineStage.value.leads_count) {
            isFirstLoadingLeads.value = false;
            page.value = null;
            return true;
        }
        isLoadingLeads.value = true;
        let payload = { page: page.value, order: orderBy.value, column: orderColumn.value };
        if (searchQuery.value) {
            payload['search'] = searchQuery.value;
        }
        await useApiRequest({
            url: `/leads/${pipelineId.value}/stage/${pipelineStage.value.stage_id}/${generateSlug(pipelineStage.value.name)}`,
            payload
        }).then((res) => {
            const { success, leads, pagination } = res;
            if (success) {
                if (isReset) {
                    stageLeads.value = leads;
                } else {
                    stageLeads.value = stageLeads.value.concat(leads);
                }
                page.value = pagination.next_page;
            }
            isLoadingLeads.value = false;
            isFirstLoadingLeads.value = false;
        }).catch((err) => {
            isFirstLoadingLeads.value = false;
            isLoadingLeads.value = false;
        });
    }


    function handleLoadmore() {
        fetchStageLeads({ isReset: false });
    }

    watch(searchQuery, (search) => {
        page.value = 1;
        fetchStageLeads({ isReset: true });
    });

    watch(() => [orderBy, orderColumn], (search) => {
        page.value = 1;
        fetchStageLeads({ isReset: true });
    }, { deep: true });

    onMounted(() => {
        isFirstLoadingLeads.value = true;
        fetchStageLeads({ isReset: true });
    });

</script>

<template>
    <div class="px-4 mt-4">
        <div class="row-header">
            <div class="row mb-2">
                <div class="col-6 ps-0">
                    <span class=" px-3 btn shadow-none py-1 fs-14px"
                        :class="{'btn-info':(stage.status==0), 
                        'btn-danger':(stage.status==1), 
                        'btn-success':(stage.status==2), }"
                        style="border-radius:3px;">
                        {{ stage.name }}
                    </span>
                </div>
                <div class="col-6 pe-0">
                    <div class="text-soft d-flex justify-content-end align-items-center">
                        {{ stage?.total_leads }} Deals worth ${{ stage?.total_estimated_value }}
                    </div>
                </div>
            </div>
            <div class="row border">
                <div class="col-4 text-soft fs-14px fw-bold py-2">Deal</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Value</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Last Update</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">First Create</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Owner</div>
            </div>
        </div>

        <router-link v-for="(lead, index) in stageLeads"
            :key="index"
            :to="`/platform/leads/${lead.lead_id}`"
            class="row border border-top-0">
            <div class="col-4 text-head py-1">
                <div class="fs-14px text-head text-overflow-ellipsis line-height-15px">
                    {{ lead?.lead_title??'Untitled deals' }}
                </div>
                <p class="mb-0 fs-12px text-soft text-overflow-ellipsis"></p>
            </div>
            <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">
                {{lead.estimate_value }}
            </div>
            <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">{{
                formatTimeAgo(lead.updated_at, 30, 'DD MMMM, YYYY') }}</div>
            <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">{{
                formatTimeAgo(lead.created_at, 30, 'DD MMMM, YYYY') }}</div>
            <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">
                <div class="settings-group-item owner-list-dropdown">
                    <button class="owner-dropdown-toggler"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false">
                        <div class="icon">
                            <img :src="lead?.owner?.profile_avatar">
                        </div>
                    </button>
                </div>
            </div>
        </router-link>
        <div v-if="!isFirstLoading"
            class="d-flex justify-content-center align-items-center mt-4">
            <loading-button @click="handleLoadmore"
                class="btn-sm"
                loading-text="Loading..."
                :is-loading="isLoadingLeads"
                :disabled="!page">Load more</loading-button>
        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .row-header {
        position: sticky;
        top: 0;
        background-color: #ffffff;
        z-index: 99;

        .row {
            background-color: #ffffff;
        }
    }
</style>