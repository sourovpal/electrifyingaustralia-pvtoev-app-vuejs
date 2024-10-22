<script setup>
  import { ref,     watch, computed, watchEffect } from 'vue';
  import SlideUpDown from "vue-slide-up-down";
  import SelectLeadSource from "../../components/fields/SelectLeadSource.vue";
  import FilterProperties from "./filters/FilterProperties.vue";
  import SelectMultipleOwner from "./filters/SelectMultipleOwner.vue";
  import MakeDropdown from "./filters/MakeDropdown.vue";
  import SelectDateRenge from "./filters/SelectDateRenge.vue";
  import { usePlatformStore, useLeadsStore } from "@stores";
  import { useDebounceFn } from '@vueuse/core';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();
  const toggleFilter = computed(() => leadsStore.getToggleFilter);
  const filterQuerys = computed(() => leadsStore.getFilterQuerys);
  const leadSources = computed(() => platformStore.getSources);

  function handleToggleHandle() {
    leadsStore.setToggleFilter(!toggleFilter.value);
  }

  const handleFetchLeads = useDebounceFn(() => {
    if (toggleFilter.value) {
      leadsStore.setFetchQuery(false);
      leadsStore.setFetchQuery({ ...route.query, page: 1 }, true);
    }
  }, 1000);

  watch(filterQuerys.value, () => {
    handleFetchLeads();
  }, { deep: true });


</script>

<template>
  <div id="right-filter-bar"
    :class="{ show: toggleFilter }">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-start align-items-center">
        <font-awesome-icon style="width: 20px; height: 20px"
          class="text-head me-3"
          icon="fas fa-filter" />
        <h1 class="title fw-bold text-hard">Filter</h1>
      </div>
      <div class="close"
        @click="handleToggleHandle">
        <font-awesome-icon class="text-head"
          icon="fas fa-angle-right" />
      </div>
    </div>
    <div class="filter slim-scrollbar">
      <div class="filter-options">
        <!-- Owner -->
        <select-multiple-owner @toggle="delete filterQuerys['owners']"
          @change="(val)=>val?.length?'':delete filterQuerys['owners']"
          v-model="filterQuerys['owners']" />

        <make-dropdown title="Source"
          @toggle="delete filterQuerys['source']"
          icon="fas fa-handshake">
          <select-lead-source :options="leadSources"
            :small="true"
            @change="(val)=>val?.length?'':delete filterQuerys['source']"
            v-model="filterQuerys['source']" />
        </make-dropdown>

        <select-date-renge title="Create Date Range"
          @toggle="delete filterQuerys['created_range']"
          v-model="filterQuerys['created_range']" />

        <select-date-renge title="Update Date Range"
          @toggle="delete filterQuerys['updated_range']"
          v-model="filterQuerys['updated_range']" />

        <div>
          <h6 class="fs-14px mb-0 py-3 px-3 text-head bg-light fw-bold">
            Custom Properties
          </h6>
        </div>

        <filter-properties></filter-properties>

      </div>
    </div>
  </div>
</template>

<style lang="scss"
  scoped>
  #right-filter-bar {
    position: fixed;
    width: 288px;
    height: 100%;
    background: #f5f5f5;
    right: -300px;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
    user-select: none;
    transition: all 0.3s ease-in-out;

    .close {
      cursor: pointer;
    }

    &.show {
      right: 0px !important;
    }

    .header {
      padding: 15px 12px;
      border-bottom: 2px solid #007ee5;
      background-color: #ffffff;

      .icon {
        margin-right: 10px;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 0px;
      }
    }

    :deep(.filter) {
      height: calc(100vh - 160px);
      overflow: auto;

      .filter-options {
        padding-bottom: 200px;

        .filter-option {
          .option-header {
            background: #f5f7fa;
            border-bottom: 1px solid #e4e7eb;
            padding: 15px 12px;
            cursor: pointer;

            &>div.d-flex.justify-content-start.align-items-center {
              width: 94%;
              overflow: hidden;
            }

            &:hover {
              background: #e6f0ff;
            }

            .icon {
              margin-right: 10px;

              svg {
                height: 18px;
                width: 18px;
              }
            }

            .title {
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .right-icon {
              transition: transform 0.3s;

              svg {
                height: 18px;
                width: 18px;
              }
            }

            &.active {
              .right-icon {
                transform: rotate(45deg);
              }
            }
          }

          .option-body {
            background-color: #ffffff;
            padding: 15px 12px;
          }
        }
      }
    }
  }
</style>