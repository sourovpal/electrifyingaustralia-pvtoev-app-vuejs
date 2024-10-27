<script setup>
import { ref, onMounted, computed, watch } from "vue";
import CustomScrollbar from "custom-vue-scrollbar";
import LoadingStateLeads from "./LoadingStateLeads.vue";
import ColumnDeal from "./ColumnDeal.vue";
import { usePipelineStore } from "@stores";
import { useApiRequest } from "@actions";
import { generateSlug } from "@helpers";
import { useIntersectionObserver, useDebounceFn } from "@vueuse/core";

const props = defineProps({
  stage: { type: Object, default: {} },
});

const pipelineStore = usePipelineStore();
const pipelineStage = computed(() => props.stage);
const searchQuery = computed(() => pipelineStore.getSearchQuery);
const pipelineId = computed(() => pipelineStore.getPipelineId);
const orderBy = computed(() => pipelineStore.getOrderBy);
const orderColumn = computed(() => pipelineStore.getOrderColumn);
const filterQuerys = computed(() => pipelineStore.getFilterQuerys);

const isFirstLoadingLeads = ref(true);
const isLoadingLeads = ref(false);
const stageLeads = ref([]);
const infiniteLoadedLeadRef = ref(null);
const page = ref(1);
let observer = null;

function handleObserver($callback = () => {}, isReset = false) {
  observer = useIntersectionObserver(
    infiniteLoadedLeadRef,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && !isLoadingLeads.value && page.value) {
        $callback({ isReset: false });
      }
    }
  );
  $callback({ isReset });
}

async function fetchStageLeads({ isReset }) {
  if (!pipelineStage.value.leads_count) {
    isFirstLoadingLeads.value = false;
    return true;
  }

  isLoadingLeads.value = true;

  let payload = {
    page: page.value,
    order: orderBy.value,
    column: orderColumn.value,
  };

  if (searchQuery.value) {
    payload["search"] = searchQuery.value;
  }

  if (Object.keys(filterQuerys.value).length) {
    payload["filters"] = JSON.stringify(filterQuerys.value);
  }

  await useApiRequest({
    url: `/leads/${pipelineId.value}/stage/${
      pipelineStage.value?.stage_id
    }/${generateSlug(pipelineStage.value.name)}`,
    payload,
  })
    .then((res) => {
      const { success, leads, pagination } = res;
      if (success) {
        if (isReset) {
          stageLeads.value = leads;
        } else {
          stageLeads.value = stageLeads.value.concat(leads);
        }
        page.value = pagination.next_page;
        if (!pagination.next_page) {
          if (observer) observer.stop();
        }
      }

      isLoadingLeads.value = false;

      isFirstLoadingLeads.value = false;
    })
    .catch((err) => {
      isFirstLoadingLeads.value = false;

      isLoadingLeads.value = false;
    });
}

const handlefetchStageLeads = useDebounceFn(() => {
  page.value = 1;
  handleObserver(fetchStageLeads, true);
}, 2000);

watch(searchQuery, (search) => {
  page.value = 1;
  handleObserver(fetchStageLeads, true);
});

watch(filterQuerys.value, (search) => {
  handlefetchStageLeads();
});

watch(
  () => [orderBy, orderColumn],
  (search) => {
    page.value = 1;
    handleObserver(fetchStageLeads, true);
  },
  { deep: true }
);

onMounted(() => {
  isFirstLoadingLeads.value = true;
  handleObserver(fetchStageLeads, true);
});
</script>
<template>
  <div
    class="piplien-state"
    :class="{
      won: pipelineStage?.status == 'success',
      lost: pipelineStage?.status == 'lost',
    }"
  >
    <!-- <div class="pip-header ps-3 pe-2 py-2 d-flex flex-column">
            <h3 class="fs-18px text-head fw-bold mb-0 fw-bold text-overflow-ellipsis">{{ pipelineStage.name }}
            </h3>
            <span class="fs-12px text-head fw-bold">{{ pipelineStage?.leads_count }} Deals</span>
            <div class="pip-header-arrow">
                <svg xmlns="http://www.w3.org/2000/svg"
                    height="64"
                    viewBox="0 0 8 56"
                    width="8">
                    <path d="M0 0h16v64H0z"
                        fill="none"></path>
                    <path d="M0,0 1,0 8,28 1,56 0,56 7,28z"></path>
                </svg>
            </div>
        </div> -->
    <!-- <div class="py-1 value-bar">
            <div class="px-3 d-flex justify-content-between align-items-center">
                <span class="text-head fw-bold fs-12px">Value</span>
                <span class="text-head fw-bold fs-12px">${{ pipelineStage?.total_estimated_value??0.00 }}</span>
            </div>
        </div> -->

    <div class="stage-header ps-3 pe-2 pt-2">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="mb-0 fs-18px text-head fw-bold">
          {{ pipelineStage.name }}
          <span class="ms-2 text-primary"
            >( {{ pipelineStage?.leads_count }} )</span
          >
        </h5>
        <div class="ms-auto">
          <button
            class="btn btn-sm btn-light btn-floating d-flex justify-content-center align-items-center"
          >
            <font-awesome-icon
              icon="fas fa-ellipsis-vertical"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
      <div
        class="d-flex justify-content-between align-items-center pe-2 fs-14px"
      >
        <span>Total</span>
        <span>${{ pipelineStage?.total_estimated_value ?? 0.0 }}</span>
        <!-- <span class="me-1">$12,70158.00</span> -->
      </div>
    </div>

    <!-- <div v-if="isFirstLoadingLeads"
            class="pip-body px-2">
            <loading-state-leads :col-size="6" />
        </div> -->

    <!-- <CustomScrollbar v-else -->
    <CustomScrollbar thumbWidth="3.5" direction="vertical">
      <div class="pip-body px-3 pb-5">
        <column-deal
          v-for="lead in stageLeads"
          :key="lead.lead_id"
          :lead="lead"
        ></column-deal>
        <div ref="infiniteLoadedLeadRef">
          <!-- <loading-state-leads v-if="isLoadingLeads"
                        :col-size="2"></loading-state-leads> -->
        </div>
      </div>
    </CustomScrollbar>
  </div>
</template>
<style scoped
    lang="scss">
.piplien-state:deep() {
  min-width: 18.5rem;
  max-width: 18.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  margin-right: 1rem;
  overflow: hidden;

  .scrollbar__scroller {
    height: 100% !important;
  }

  .scroll .scrollbar__scroller {
    scroll-behavior: auto !important;
    width: 100%;
  }

  .scrollbar__wrapper {
    height: calc(79vh - 5px) !important;
  }
}
</style>