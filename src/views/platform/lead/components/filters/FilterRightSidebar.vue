<script setup>
import SlideUpDown from "vue-slide-up-down";
import SelectLeadSource from "../modals/fields/SelectLeadSource.vue";
import FilterCustomProperties from "./FilterCustomProperties.vue";
import SelectMultipleOwner from "./SelectMultipleOwner.vue";
import MakeDropdown from "./MakeDropdown.vue";
import SelectDateRenge from "./SelectDateRenge.vue";
const props = defineProps({
  leadProperties:{
    type:Array,
    default:[],
  },
  owners:{
    type:Array,
    default:[],
  },
  leadSources:{
    type:Array,
    default:[],
  },
  toggleFilterSidebarHandler:{},
  customFormData:{
    type:Object,
    default:{},
  },
});

function removeCustomFormDate(uniqueId, value) {
  if (
    !value ||
    (Array.isArray(value) && value.length <= 0) ||
    (typeof value === "object" && Object.keys(value).length <= 0)
  ) {
    delete props.customFormData[uniqueId];
  }
}
</script>

<template>
  <div id="right-filter-bar">
    <div class="header d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-start align-items-center">
        <font-awesome-icon
          style="width: 20px; height: 20px"
          class="text-head me-3"
          icon="fas fa-filter"
        />
        <h1 class="title fw-bold text-hard">Filter</h1>
      </div>
      <div class="close" @click="toggleFilterSidebarHandler()">
        <font-awesome-icon class="text-head" icon="fas fa-angle-right" />
      </div>
    </div>
    <div class="filter slim-scrollbar">
      <div class="filter-options">
        <!-- Owner -->

        <select-multiple-owner
          :owners="owners"
          v-model="customFormData['owners']"
          @change="(e) => removeCustomFormDate('owners', e)"
        />

        <make-dropdown title="Source" icon="fas fa-handshake">
          <select-lead-source
            :options="leadSources"
            :small="true"
            v-model="customFormData['source']"
            @change="(e) => removeCustomFormDate('source', e)"
          />
        </make-dropdown>

        <select-date-renge
          title="Create Date Range"
          v-model="customFormData['created_range']"
          @change="(e) => removeCustomFormDate('created_range', e)"
        />

        <select-date-renge
          title="Update Date Range"
          v-model="customFormData['updated_range']"
          @change="(e) => removeCustomFormDate('updated_range', e)"
        />

        <div>
          <h6 class="fs-14px mb-0 py-3 px-3 text-head bg-light fw-bold">
            Custom Properties
          </h6>
        </div>

        <filter-custom-properties
          :lead-properties="leadProperties"
          :custom-form-data="customFormData"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  &::v-deep {
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

    .filter {
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
}
</style>