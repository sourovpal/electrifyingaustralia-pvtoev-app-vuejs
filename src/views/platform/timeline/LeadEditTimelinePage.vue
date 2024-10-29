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
  import TimelineToolsbar from "./sections/TimelineToolsbar.vue";
  import PipelineStages from "./sections/PipelineStages.vue";
  import TimelineHistory from "./sections/TimelineHistory.vue";
  import RightSidebarTimeline from "./sections/RightSidebarTimeline.vue";
  import { usePlatformStore } from "@stores";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const platformStore = usePlatformStore();

  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
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
  <section class="content lead-edit">
    <search-bar></search-bar>
    <TimelineToolsbar></TimelineToolsbar>
    <PipelineStages v-if="isPipelineLead"></PipelineStages>
    <section class="h-100">
      <div class="col-area">
        <timeline-history :key="`timeline_${$leadId}`"></timeline-history>
        <right-sidebar-timeline :isFirstLoading="false" />
      </div>
    </section>
  </section>
</template>

<style scoped
  lang="scss">
  .left-hover-action {
    .hover-effice {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      cursor: pointer;
    }

    &:hover {
      .hover-effice {
        opacity: 1;
      }
    }
  }

  .lead-title-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    max-width: 100px;

    @media only screen and (min-width: 992px) {
      max-width: 150px;
    }

    @media only screen and (min-width: 1400px) {
      max-width: 350px;
    }
  }

  .col-area {
    display: flex;
    height: 100%;
    position: relative;
  }
</style>
<style>
  .lead-edit .col-left .scrollbar__wrapper {
    height: calc(100vh - 18rem);
  }

  .lead-edit .col-left .scrollbar__scroller {
    height: 100%;
  }

  .lead-edit .col-left .scrollbar__thumbPlaceholder {
    width: 6px !important;
  }

  .lead-edit .col-right .scrollbar__wrapper {
    height: 100vh;
  }

  .lead-edit .col-right .scrollbar__scroller {
    height: 100%;
  }

  .lead-edit .col-right .scrollbar__thumbPlaceholder {
    width: 6px !important;
  }
</style>