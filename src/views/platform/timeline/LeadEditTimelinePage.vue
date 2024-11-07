<script setup>
  import {
    ref,
    onMounted,
    computed,
    onUnmounted,
    onBeforeMount,
    watch,
  } from "vue";
  import SearchBar from "@components/SearchBar.vue";
  import TimelineToolsbar from "./components/TimelineToolsbar.vue";
  import PipelineStages from "./components/PipelineStages.vue";
  import TimelineHistory from "./components/TimelineHistory.vue";
  import RightSidebarTimeline from "./components/RightSidebarTimeline.vue";
  import { usePlatformStore } from "@stores";
  import { useRoute } from "vue-router";
  import LeadCertifyModal from "./modals/LeadCertifyModal.vue";
  import EditLeadModal from "./modals/EditLeadModal.vue";

  const route = useRoute();
  const platformStore = usePlatformStore();

  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
  const pipelineStages = computed(() => platformStore.getPipelineStages);
  const certifyModalAction = computed(() => platformStore.getCertifyModalAction);
  const toggleEditLeadModal = computed(() => platformStore.getLeadEditModal);

  let $leadId = route.params.id;

  const fetchResources = () => {

    let isPipelineCheck = !!(window.location.href.indexOf("deals") > -1);

    platformStore.callFetchUsers();
    platformStore.setIsPipelineLead(isPipelineCheck);
    platformStore.setEditLeadId($leadId);
    platformStore.callFetchStatuses();
    platformStore.setIsFirstLoading(true);
    platformStore.callFetchNewLead($leadId, true);
    platformStore.callFetchLeadContacts($leadId);
    platformStore.callFetchProperties($leadId);
    platformStore.callFetchLeadTasks($leadId);
    if (isPipelineCheck) platformStore.callFetchLeadStages($leadId);

  }

  watch(route, () => {
    $leadId = route.params.id;
    fetchResources();
  }, { immediate: true });

  onUnmounted(() => {
    platformStore.setIsPipelineLead(false);
    platformStore.resetLeadEditTimeline();
  });

</script>
<template>

  <section class="d-flex flex-column content-width">

    <section class="d-block w-100">

      <search-bar></search-bar>

      <timeline-toolsbar></timeline-toolsbar>

      <PipelineStages class="border-bottom"
        v-if="isPipelineLead"></PipelineStages>

    </section>

    <section class="d-flex flex-row">

      <timeline-history :key="`timeline_${$leadId}`"></timeline-history>

      <right-sidebar-timeline :isFirstLoading="false"></right-sidebar-timeline>

    </section>

    <lead-certify-modal :action="certifyModalAction"
      v-if="certifyModalAction"></lead-certify-modal>

    <edit-lead-modal v-if="toggleEditLeadModal"></edit-lead-modal>

  </section>

</template>

<style scoped
  lang="scss">
  .content-width {
    width: var(--container-width) !important;
  }
</style>