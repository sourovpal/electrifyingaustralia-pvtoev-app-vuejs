<script setup>
  import { headers } from "./headers";
  import { ref, computed } from 'vue';
  import { useLeadsStore, usePlatformStore } from '@stores';



  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();
  const headerAttributes = computed(() => leadsStore.getHeaders);
  const leadProperties = computed(() => platformStore.getLeadProperties);

  async function handleHeader(uniqueId) {
    var index = headerAttributes.value?.indexOf(uniqueId);
    if (index > -1) {
      headerAttributes.value.splice(index, 1);
    } else {
      headerAttributes.value.push(uniqueId);
    }
    leadsStore.setHeaders(headerAttributes.value);
  }


</script>

<template>
  <div class="dropdown-menu"
    id="table_header_properties"
    @click="(e) => e.stopPropagation()">
    <div class="row pb-2">
      <div class="col-6 pe-0">
        <div class="pb-2 pt-2 ps-3 pe-3">
          <h6 class="fs-16px fw-bold mb-0 border-bottom pb-2 text-center">
            Lead properties
          </h6>
        </div>
        <div class="properties-list slim-scrollbar">
          <div class="d-flex justify-content-start align-items-center ps-2 pe-3 py-2 check-label-propertis"
            v-for="(header, index) in headers"
            :key="index">
            <custom-checkbox @click="handleHeader(header.unique_id)"
              :checked="!headerAttributes.includes(header.unique_id)"></custom-checkbox>
            <span class="fs-14px fw-bold">{{ header.title }}</span>
          </div>
        </div>
      </div>
      <div class="col-6 ps-0">
        <div class="pb-2 pt-2 ps-2 pe-3">
          <h6 class="fs-16px fw-bold mb-0 border-bottom pb-2 text-center">
            Custom properties
          </h6>
        </div>
        <div class="properties-list slim-scrollbar">
          <div v-for="(header, index) in leadProperties"
            :key="index"
            class="d-flex justify-content-start align-items-center ps-2 pe-3 py-2 check-label-propertis">
            <custom-checkbox @click="handleHeader(header.unique_id)"
              :checked="!headerAttributes.includes(header.unique_id)"></custom-checkbox>
            <span class="fs-14px fw-bold">{{ header.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #table_header_properties {
    width: 408px;
    min-height: 300px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 3px !important;

    &::before {
      content: "";
      position: absolute;
      top: -6px;
      right: 20px;
      border: 7px solid rgb(203 209 215);
      transform: rotate(45deg);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }

    &::after {
      content: "";
      position: absolute;
      top: -6px;
      right: 20px;
      border: 7px solid white;
      transform: rotate(45deg);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }

    .check-label-propertis {
      cursor: pointer;

      &:hover {
        background-color: #f1f3f9;
      }

      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .properties-list {
      height: 450px;
      overflow: auto;
    }
  }
</style>