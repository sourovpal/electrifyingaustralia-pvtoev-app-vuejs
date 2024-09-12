<script setup>
  // import ActionBar from "@components/ActionBar/ActionBar.vue";
  // import LeftActionBar from "@components/ActionBar/LeftActionBar.vue";
  // import RightActionBar from "@components/ActionBar/RightActionBar.vue";
  // import LeadQualifyModal from "../components/modals/LeadQualifyModal.vue";
  // import LeadReCategoriseModal from "../components/modals/LeadReCategoriseModal.vue";
  // import EditLeadModal from "../components/modals/EditLeadModal.vue";
  // import DropdownOwnerList from "../components/dropdowns/DropdownOwnerList.vue";
  // import DropdownSubscriberList from "../components/dropdowns/DropdownSubscriberList.vue";
  // import TimelineHistory from "./sections/TimelineHistory.vue";
  // import RightSidebarTimeline from "./sections/RightSidebarTimeline.vue";
  // import { useLeadStore } from "@stores/lead";
  // import { useAppStore } from "@stores/app";
  // import { AvatarIcon } from "@assets/icons";
  // import LeadEditTimelineMixins from "../mixins/LeadEditTimelineMixins";
  // import CustomScrollbar from "custom-vue-scrollbar";
  // import { Skeletor } from "vue-skeletor";
  // const leadStore = useLeadStore();
  // const appStore = useAppStore();
  // const progressBar = ref([]);

  // unmounted() {
  //   this.leadStore.setCurrentLead({});
  //   this.leadStore.setPrimaryContact(null);
  //   this.leadStore.setLeadContacts([]);
  //   this.leadStore.setLeadFiles([]);
  //   this.leadStore.setIsPipelineLead(false);
  // },


  import { ref, onMounted, computed } from "vue";
  import SearchBar from "@components/SearchBar.vue";
  import TimelineToolsbar from './sections/TimelineToolsbar.vue';
  import PipelineStages from './sections/PipelineStages.vue';
  import { useLeadStore } from '@stores';
  import { useRoute } from 'vue-router';
  const leadStore = useLeadStore();
  const route = useRoute();
  const isPipelineLead = computed(() => leadStore.getIsPipelineLead);

  onMounted(() => {
    leadStore.setIsFirstLoading(true);
    leadStore.callFetchNewLead(route.params.id, true);
    leadStore.callFetchLeadStages(route.params.id);
    leadStore.callFetchLeadContacts(route.params.id);
    leadStore.callFetchStatuses();
  });


</script>
<template>
  <section class="content lead-edit">
    <search-bar></search-bar>
    <TimelineToolsbar></TimelineToolsbar>
    <PipelineStages v-show="isPipelineLead"></PipelineStages>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <!-- <section class="h-100">
      <div class="col-area">
        <timeline-history />
        <right-sidebar-timeline :isFirstLoading="false" />
      </div>
    </section> -->
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