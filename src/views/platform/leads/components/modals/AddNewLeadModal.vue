<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { usePlatformStore } from "@stores";
import { useApiRequest } from "@actions";
import { $toast } from "@config";
import { useAuthStore, useLeadsStore } from "@stores";

const emits = defineEmits(["refresh"]);
const platformStore = usePlatformStore();
const leadsStore = useLeadsStore();

const leadSources = computed(() => platformStore.getSources);
const leadStatuses = computed(() => platformStore.getStatuses);
const users = computed(() => platformStore.getUsers);
const authUser = computed(() => useAuthStore().getUser);

const attributes = reactive({
  name: null,
  address: null,
  phone_or_email: null,
  lead_source: null,
  lead_title: null,
  lead_status: null,
  lead_owner: null,
});

const errors = ref({});
const isLoading = ref(false);
const isLoadingUsers = ref(false);
const leadOwner = ref(null);
const filterSources = ref(["dhaka"]);

watch(
  leadStatuses,
  (statuses) => {
    if (statuses && statuses?.length) attributes.lead_status = statuses[0];
  },
  { immediate: true, deep: true }
);

function handleFilterSource({ query }) {
  if (!query) return (filterSources.value = []);

  filterSources.value = leadSources.value
    ?.filter((item) => item.title?.toLowerCase().includes(query?.toLowerCase()))
    .map((item) => item.title);
}

function hideModal() {
  leadsStore.setAddNewLeadModal(false);
}

function fetchUsers() {
  if (platformStore.getUsers.length) return;
  platformStore.callFetchUsers(({ loading }) => {
    isLoadingUsers.value = loading;
  });
}

async function handleCreateNewLead() {
  errors.value = {};
  isLoading.value = true;

  attributes["lead_owner"] = leadOwner.value?.user_id;

  await useApiRequest({
    url: "/leads",
    method: "POST",
    payload: { ...attributes, lead_status: attributes.lead_status?.status_id },
  })
    .then((res) => {
      const { success, message, errors: isErrors } = res;
      if (success) {
        $toast[message.type](message.text);
        hideModal();
        return emits("refresh", true);
      }
      errors.value = isErrors;
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  leadOwner.value = authUser.value ?? {};
});
</script>

<template>
  <modal-dialog
    modal
    v-bind="$attrs"
    pt:root:class="!border-0 !bg-transparent overflow-hidden"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '40vw' }"
  >
    <template #container="{ closeCallback }">
      <div class="row m-0">
        <div class="col-lg-7">
          <div class="modal-header py-lg-2 px-0 border-bottom">
            <div class="d-flex justify-content-center align-items-center">
              <i class="pi pi-user-plus fs-18px me-2"></i>
              <span class="text-hard fw-bold fs-16px">Add New</span>
            </div>
            <div>
              <button
                class="btn btn-light btn-sm btn-floating d-lg-none"
                @click="closeCallback"
              >
                <font-awesome-icon
                  icon="fas fa-close"
                  class="fs-14px text-soft"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
          <div class="modal-body p-0 pt-3">
            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Contact person
                <span class="text-soft fs-12px ms-1">(Required)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-user" />
                <input-text
                  class="w-100"
                  @focus="delete errors?.name"
                  v-model="attributes.name"
                  placeholder="Full name"
                />
              </icon-field>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.name?.length"
              >
                {{ errors?.name[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Address
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-home" />
                <input-text
                  class="w-100"
                  @focus="delete errors?.address"
                  v-model="attributes.address"
                  placeholder="Address"
                />
              </icon-field>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.address?.length"
              >
                {{ errors?.address[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Phone or email
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-address-book" />
                <input-text
                  class="w-100"
                  @focus="delete errors?.phone_or_email"
                  v-model="attributes.phone_or_email"
                  placeholder="Phone or email address"
                />
              </icon-field>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.phone_or_email?.length"
              >
                {{ errors?.phone_or_email[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Source
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-pen-to-square z-index-999" />
                <auto-complete
                  class="w-100"
                  input-class="w-100 input-lead-source"
                  dropdown-class="py-1"
                  placeholder="Type lead source"
                  @focus="delete errors?.lead_source"
                  v-model="attributes.lead_source"
                  :suggestions="filterSources"
                  @complete="handleFilterSource"
                />
              </icon-field>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_source?.length"
                >{{ errors?.lead_source[0] }}</span
              >
            </div>
          </div>
        </div>

        <div class="col-lg-5 lead-details-right">
          <div class="modal-header py-lg-2 px-0 border-bottom">
            <div class="d-flex justify-content-center align-items-center">
              <i class="pi pi-pen-to-square fs-16px me-2"></i>
              <span class="text-hard fw-bold fs-16px">Details</span>
            </div>
          </div>

          <div class="modal-body p-0 pt-3">
            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Lead title
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-user-edit fs-16px" />
                <input-text
                  class="w-100"
                  @focus="delete errors?.lead_title"
                  v-model="attributes.lead_title"
                  placeholder="Title"
                ></input-text>
              </icon-field>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_title?.length"
              >
                {{ errors?.lead_title[0] }}
              </span>
            </div>

            <div class="mb-3 position-relative">
              <label class="mb-2 fs-16px text-head">
                Status
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <select-option
                key="lead-status"
                filter
                v-model="attributes.lead_status"
                :options="leadStatuses"
                :filterFields="['name']"
                optionLabel="name"
                placeholder="Select a status"
                class="w-100"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </select-option>

              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_status?.length"
              >
                {{ errors?.lead_status[0] }}
              </span>
            </div>

            <div class="mb-3 add-new-lead-owner-list-dropdown">
              <label for="select_owner_label" class="mb-2 fs-16px text-head">
                Owner
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <select-option
                filter
                :filter-fields="['name', 'email']"
                :loading="isLoadingUsers"
                @click="fetchUsers"
                v-model="leadOwner"
                :options="users"
                optionLabel="name"
                placeholder="Select a Country"
                class="w-100"
              >
                <template #value="slotProps">
                  <div
                    v-if="slotProps.value"
                    class="d-flex justify-context-start align-items-center"
                  >
                    <div
                      class="circle-avatar me-2"
                      style="--height: 25px; --width: 25px"
                    >
                      <img
                        :alt="slotProps.value.name"
                        :src="slotProps.value.profile_avatar"
                        class="avatar"
                      />
                    </div>
                    <div class="owner-name fs-16px fw--bold text-hard">
                      {{ slotProps.value.name || slotProps.value.email }}
                    </div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="d-block">
                    <div
                      class="d-flex justify-context-start align-items-center"
                    >
                      <div
                        class="circle-avatar me-2"
                        style="--height: 32px; --width: 32px"
                      >
                        <img
                          :alt="slotProps.option?.name"
                          :src="slotProps.option?.profile_avatar"
                          class="avatar"
                        />
                      </div>
                      <div class="owner-name fs-16px fw--bold text-hard">
                        <div class="">
                          {{ slotProps.option?.name }}
                        </div>
                        <div class="text-soft fs-14px">
                          {{ slotProps.option?.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </select-option>
              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_owner?.length"
                >{{ errors?.lead_owner[0] }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row m-0">
        <div class="col-lg-7 py-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <button @click="hideModal" class="btn btn-danger">Close</button>
            </div>
            <div>
              <loading-button
                :is-loading="isLoading"
                @submit="handleCreateNewLead"
                >Save Change</loading-button
              >
            </div>
          </div>
        </div>
        <div class="col-lg-5 lead-details-right"></div>
      </div>
    </template>
  </modal-dialog>
</template>

<style lang="scss"
  scoped>
:deep(.owner-name) {
  line-height: 16px;
}

:deep(.input-lead-source) {
  padding-left: 2.5rem !important;
}
@media (min-width: 992px) {
  .lead-details-right {
    background-color: #f5f7fa;
  }
}
</style>