<script setup>
  import { ref, onMounted, computed, onUnmounted } from "vue";
  import SearchBar from "@components/SearchBar.vue";
  import TimelineToolsbar from './sections/TimelineToolsbar.vue';
  import PipelineStages from './sections/PipelineStages.vue';
  import TimelineHistory from "./sections/TimelineHistory.vue";
  import RightSidebarTimeline from "./sections/RightSidebarTimeline.vue";
  import { useLeadStore } from '@stores';
  import { useRoute } from 'vue-router';
  const leadStore = useLeadStore();
  const route = useRoute();
  const $leadId = route.params.id;
  const isPipelineLead = computed(() => leadStore.getIsPipelineLead);

  onMounted(() => {
    leadStore.setEditLeadId($leadId);
    leadStore.callFetchStatuses();
    leadStore.setIsFirstLoading(true);
    leadStore.callFetchNewLead($leadId, true);
    leadStore.callFetchLeadContacts($leadId);
    leadStore.callFetchProperties($leadId);
    leadStore.callFetchLeadStages($leadId);
    leadStore.callFetchLeadTasks($leadId);
  });

  onUnmounted(() => {
    leadStore.resetLeadEditTimeline();
  });


</script>
<template>
  <section class="content lead-edit">
    <search-bar></search-bar>
    <TimelineToolsbar></TimelineToolsbar>
    <PipelineStages v-show="isPipelineLead"></PipelineStages>
    <section class="h-100">
      <div class="col-area">
        <timeline-history />
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