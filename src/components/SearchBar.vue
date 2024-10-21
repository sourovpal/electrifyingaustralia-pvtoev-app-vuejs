<script setup>
  import { ref, watch } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { useApiRequest } from "@actions";
  import { formatLeadAddress } from "@helpers";
  import { useDebounceFn } from "@vueuse/core";

  const searchBoxRef = ref(null);
  const searchInput = ref(null);
  const isOpen = ref(false);
  const isLoading = ref(false);
  const results = ref([]);

  onClickOutside(searchBoxRef, () => {
    if (isOpen.value) {
      isOpen.value = false;
    }
  });

  watch(searchInput, (value) => {
    searchLeadsOrDeals(value);
  });

  const searchLeadsOrDeals = useDebounceFn((query) => {
    isLoading.value = true;
    useApiRequest({
      url: `/leads/search?query=${query}&limit=8`,
    })
      .then((res) => {
        const { success, leads } = res;
        isLoading.value = false;
        if (success) results.value = leads;
      })
      .catch((error) => { });
  }, 1000);
</script>

<template>
  <section class="search-bar px-3 d-flex justify-content-between align-items-center">
    <div ref="searchBoxRef"
      class="search-box"
      :class="{ active: isOpen && searchInput?.length && results?.length }">
      <div class="position-relative">
        <input class="form-control search-input py-2"
          v-model="searchInput"
          @focus="isOpen = true"
          type="text"
          placeholder="Search for a lead's or deal's" />
        <span v-if="isLoading" class="loading-icon">
          <svg-custom-icon icon="spinner-icon" />
        </span>
      </div>
      <div class="search-output mt-1"
        v-if="results?.length && isOpen && searchInput">
        <ul class="project-list p-0 m-0">
          <li class="dropdown-item px-3 py-2"
            v-for="(project, index) in results"
            :key="index">
            <router-link :to="`/platform/${project.pipeline ? 'deals' : 'leads'}/${
                project.lead_id
              }`"
              class="item-link">
              <div class="search-result d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="w-100">
                    <div class="search-item text-head d-flex justify-content-between align-items-center">
                      <span>
                        {{
                        formatLeadAddress(
                        project,
                        project.lead_title ??
                        project.primary_contact?.full_name ??
                        `Address not added yet.`
                        )
                        }}
                      </span>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                          :class="{
                            'alert-success': project.status.is_lost == 0,
                            'alert-danger': project.status.is_lost == 1,
                          }"
                          v-if="project.status">{{ project.status.name }}</span>
                        <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                          :class="{
                            'alert-success':
                              project.pipeline_stage.status == 'success',
                            'alert-danger':
                              project.pipeline_stage.status == 'lost',
                            'alert-primary':
                              project.pipeline_stage.status == 'primary',
                          }"
                          v-if="project.pipeline && project.pipeline_stage">
                          {{ project.pipeline.title }} /
                          {{ project.pipeline_stage.name }}</span>
                      </div>
                    </div>
                    <div v-if="project.primary_contact"
                      class="search-item-details soft-text">
                      <span v-if="project.primary_contact.full_name">
                        {{ project.primary_contact.full_name }}&nbsp;•&nbsp;
                      </span>
                      <span v-if="project.primary_contact.phone_number">
                        {{ project.primary_contact.phone_number }}&nbsp;•&nbsp;
                      </span>
                      <span v-if="project.primary_contact.email">
                        {{ project.primary_contact.email }}
                      </span>
                    </div>
                  </div>
                  <div class="icon ms-4">
                    <font-awesome-icon icon="fas fa-arrow-right"
                      class="fs-16px text-soft"></font-awesome-icon>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class=""></div>
  </section>
</template>

<style lang="scss"
  scoped>
  .loading-icon {
    position: absolute;
    top: 6px;
    right: 10px;
  }

  .search-bar {
    height: 3.5rem;
    border-bottom: 1px solid var(--layout-border-color);

    .search-box {
      width: 30rem;
      overflow: hidden;

      &.active {
        position: fixed;
        top: 6px;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
          rgba(0, 0, 0, 0.24) 0px 1px 2px;
        border-radius: 3px;
        z-index: 99;

        .search-output {
          min-height: 30rem;
        }

        .search-input {
          box-shadow: none !important;
        }
      }

      .search-input {
        border: none;
        outline: none;
        background: #f4f6f6;
        width: 100%;
        border-radius: 3px;
      }
    }
  }
</style>