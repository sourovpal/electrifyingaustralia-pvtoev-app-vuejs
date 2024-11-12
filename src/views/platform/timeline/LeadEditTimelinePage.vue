<script setup>
import {
  ref,
  onMounted,
  computed,
  onUnmounted,
  onBeforeMount,
  watch,
} from "vue";
import CRMToolsBar from "@components/CRMToolsBar.vue";
import TimelineToolsbar from "./components/TimelineToolsbar.vue";
import PipelineStages from "./components/PipelineStages.vue";
import TimelineHistory from "./components/TimelineHistory.vue";
import RightSidebarTimeline from "./components/RightSidebarTimeline.vue";
import { usePlatformStore } from "@stores";
import { useRoute } from "vue-router";
import LeadCertifyModal from "./modals/LeadCertifyModal.vue";
import EditLeadModal from "./modals/EditLeadModal.vue";
import BlockUI from "primevue/blockui";

const route = useRoute();
const platformStore = usePlatformStore();

const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
const pipelineStages = computed(() => platformStore.getPipelineStages);
const certifyModalAction = computed(() => platformStore.getCertifyModalAction);
const toggleEditLeadModal = computed(() => platformStore.getLeadEditModal);

let $lead_id = ref(route.params.id);

watch(route, () => {
  $lead_id.value = route.params.id;
  fetchResources();
}, { immediate: true, deep: true });

function fetchResources() {
  let isPipelineCheck = !!(window.location.href.indexOf("deals") > -1);
  platformStore.callFetchUsers();
  platformStore.setIsPipelineLead(isPipelineCheck);
  platformStore.setEditLeadId($lead_id.value);
  platformStore.callFetchStatuses();
  platformStore.setIsFirstLoading(true);
  platformStore.callFetchNewLead($lead_id.value, true);
  platformStore.callFetchLeadContacts($lead_id.value);
  platformStore.callFetchProperties($lead_id.value);
  platformStore.callFetchLeadTasks($lead_id.value);
  if (isPipelineCheck) platformStore.callFetchLeadStages($lead_id.value);
}

onUnmounted(() => {
  // platformStore.setIsPipelineLead(false);
  platformStore.resetLeadEditTimeline();
});

</script>
<template>
  <BlockUI class="content-width d-flex rounded-0" :blocked="false">
    <section class="d-flex flex-column content-width">

      <section class="d-block w-100">

        <CRMToolsBar></CRMToolsBar>

        <timeline-toolsbar></timeline-toolsbar>

        <PipelineStages class="border-bottom" v-if="isPipelineLead"></PipelineStages>

      </section>

      <section class="d-flex flex-row">

        <timeline-history :key="`timeline_${$lead_id}`"></timeline-history>

        <right-sidebar-timeline :isFirstLoading="false"></right-sidebar-timeline>

      </section>

      <lead-certify-modal :action="certifyModalAction" v-if="certifyModalAction"></lead-certify-modal>

      <edit-lead-modal v-if="toggleEditLeadModal"></edit-lead-modal>

    </section>
  </BlockUI>

</template>

<style scoped lang="scss">
.content-width {
  width: var(--container-width) !important;
  flex-grow: 1;
}
</style>