<script setup>
  import { ref, reactive, watch, computed, onMounted, nextTick } from "vue";
  import { formatLeadAddress } from "@helpers";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";
  import { useAuthStore, useLeadsStore, usePlatformStore } from "@stores";
  import { useDebounceFn } from '@vueuse/core';

  const emits = defineEmits(["refresh"]);
  const platformStore = usePlatformStore();
  const leadsStore = useLeadsStore();

  const leadSources = computed(() => platformStore.getSources);
  const leadStatuses = computed(() => platformStore.getStatuses);
  const users = computed(() => platformStore.getUsers);
  const authUser = computed(() => useAuthStore().getUser);

  const attributes = reactive({
    name: null,
    location: null,
    phone_number: null,
    email: null,
    lead_source: null,
    lead_title: null,
    lead_status: null,
    select_status: null,
    lead_owner: null,
  });

  const errors = ref({});
  const isLoading = ref(false);
  const isLoadingUsers = ref(false);
  const leadOwner = ref(null);
  const filterSources = ref([]);
  const selectedAddress = ref(null);

  const filterContacts = ref([]);
  const filterAddress = ref({
    label: 'Existing deals',
    items: [],
  });

  watch(
    leadStatuses,
    (statuses) => {
      if (statuses && statuses?.length) attributes.select_status = statuses[0];
    },
    { immediate: true, deep: true }
  );

  function handleFilterSource({ query }) {
    if (!query) return (filterSources.value = []);

    filterSources.value = leadSources.value
      ?.filter((item) => item.title?.toLowerCase().includes(query?.toLowerCase()))
      .map((item) => item.title);
  }

  const handleSearchAddress = useDebounceFn(async ({ query }) => {
    selectedAddress.value = null;
    await useApiRequest({
      url: '/platform/leads/search',
      method: 'post',
      payload: {
        limit: 5,
        search: query,
        columns: ['address_line_one', 'address_line_two', 'city', 'state', 'country'],
        lead: true,
      }
    }).then(leads => {
      if (!leads && !leads.length) filterAddress.value = { ...filterAddress.value, items: [] };

      filterAddress.value = {
        ...filterAddress.value,
        items: leads
      };

    }).catch(error => {
      filterAddress.value = { ...filterAddress.value, items: [] }
    });

  }, 1000);

  const handleSearchContact = useDebounceFn(async ({ query }) => {

    await useApiRequest({
      url: '/platform/leads/search',
      method: 'post',
      payload: {
        limit: 10,
        search: query,
        columns: ['first_name', 'last_name', 'email', 'phone_number'],
        contact: true,
      }
    }).then(contacts => {

      if (!contacts && !contacts.length) filterContacts.value = [];

      filterContacts.value = contacts;

    }).catch(error => {
      filterContacts.value = []
    });

  }, 1000);

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

    if (selectedAddress.value) {

      attributes["address"] = selectedAddress.value;

    } else if (attributes.location) {

      attributes["address"] = { address_one: attributes.location };

    }

    if (attributes.select_status && attributes.select_status?.status_id)
      attributes["lead_status"] = attributes.select_status?.status_id;

    attributes["lead_owner"] = leadOwner.value?.user_id;

    await useApiRequest({
      url: "/platform/leads",
      method: "POST",
      payload: attributes,
    })
      .then((res) => {

        const { success, message, errors: validation_errors } = res;

        if (success) {
          $toast[message.type](message.text);
          hideModal();
          return emits("refresh", true);
        }

        errors.value = validation_errors;

      })
      .catch((error) => {

        $toast.error(error.message.text);

      })
      .finally(() => {

        isLoading.value = false;

      });
  }

  onMounted(() => {
    leadOwner.value = authUser.value ?? {};
  });


  function handleSelectAddress(option) {
    selectedAddress.value = null;
    attributes.location = formatLeadAddress(option.value)
    selectedAddress.value = {
      address_one: option.value?.address_line_one,
      address_two: option.value?.address_line_two,
      city: option.value?.city,
      state: option.value?.state,
      post_code: option.value?.post_code,
    };
  }

  function handleSelectPhoneNumber(option) {
    nextTick(() => {
      if (option.value.email && !attributes.email) attributes.email = option.value.email;

      if (option.value.full_name && !attributes.name) attributes.name = option.value.full_name;

      if (!option.value.phone_number) return attributes.phone_number = null;
      attributes.phone_number = option.value.phone_number;
    });
  }

  function handleSelectEmailAddress(option) {

    nextTick(() => {
      if (option.value.phone_number && !attributes.phone_number) attributes.phone_number = option.value.phone_number;

      if (option.value.full_name && !attributes.name) attributes.name = option.value.full_name;

      if (!option.value.email) return attributes.email = null;
      attributes.email = option.value.email;
    });

  }

  function handleSelectCustomerName(option) {
    nextTick(() => {

      if (option.value.email && !attributes.email) attributes.email = option.value.email;

      if (option.value.phone_number && !attributes.phone_number) attributes.phone_number = option.value.phone_number;

      if (!option.value.full_name) return attributes.name = null;

      attributes.name = option.value.full_name;

    });
  }


</script>

<template>
  <modal-dialog modal
    v-bind="$attrs"
    pt:root:class="overflow-hidden"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '38vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">

    <template #container="{ closeCallback }">

      <div class="row m-0">

        <div class="col-lg-7">

          <div class="modal-header py-lg-2 px-0 border-bottom">

            <div class="d-flex justify-content-center align-items-center">

              <i class="pi pi-user-plus fs-18px me-2"></i>

              <span class="text-hard fw-bold fs-16px">Add New</span>

            </div>

            <div>

              <button class="btn btn-light btn-sm btn-floating d-lg-none"
                @click="closeCallback">
                <font-awesome-icon icon="fas fa-close"
                  class="fs-14px text-soft"></font-awesome-icon>
              </button>

            </div>

          </div>

          <div class="modal-body p-0 pt-3">

            <div class="mb-3">

              <label class="mb-2 fs-16px text-head">
                Customer name
                <span class="text-soft fs-12px ms-1">(Required)</span>
              </label>

              <icon-field>

                <input-icon class="pi pi-user fs-14px z-index-999" />
                <auto-complete class="w-100 auto-complete-small"
                  panel-class="auto-complete-option-small"
                  input-class="w-100 auto-complete-input"
                  dropdown-class="py-1"
                  placeholder="Full name"
                  optionLabel="full_name"
                  @focus="delete errors?.name"
                  v-model="attributes.name"
                  :suggestions="filterContacts"
                  @option-select="handleSelectCustomerName"
                  @complete="handleSearchContact">

                  <template #option="slotProps">

                    <div class="d-block">

                      <div class="d-flex justify-context-start align-items-center">

                        <div class="circle-avatar me-2"
                          style="--height: 1.6rem; --width: 1.6rem">

                          <img :alt="slotProps.option?.full_name"
                            :src="slotProps.option?.avatar"
                            class="avatar" />
                        </div>

                        <div class="owner-name fs-12px text-hard">

                          <div class="">
                            {{ slotProps.option?.full_name }}
                          </div>

                          <div class="text-soft fs-12px">
                            {{ slotProps.option?.email }} {{ slotProps.option?.phone_number }}
                          </div>

                        </div>

                      </div>

                    </div>

                  </template>

                </auto-complete>

              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.name?.length">
                {{ errors?.name[0] }}
              </span>

            </div>

            <div class="mb-3">

              <label class="mb-2 fs-16px text-head">
                Address
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-home fs-14px z-index-999" />
                <auto-complete class="w-100 auto-complete-small"
                  panel-class="auto-complete-option-small"
                  input-class="w-100 auto-complete-input"
                  dropdown-class="py-1"
                  placeholder="Address"
                  optionGroupLabel="label"
                  optionLabel="address_line_one"
                  optionGroupChildren="items"
                  @focus="delete errors?.address"
                  v-model="attributes.location"
                  :suggestions="[filterAddress]"
                  @option-select="handleSelectAddress"
                  @complete="handleSearchAddress">

                  <template #optiongroup="{option}">
                    <div class="flex items-center">
                      <div class="fs-14px">{{ option.label }}</div>
                    </div>
                  </template>

                  <template #option="{option}">

                    <div class="flex items-center">

                      <div>{{ formatLeadAddress(option) }}</div>
                      <div class="d-flex justify-context-start align-items-center fs-12px text-soft">
                        <span class="me-2">{{ option.primary_contact?.full_name }}</span>
                        <span class="me-2">{{ option.primary_contact?.phone }}</span>
                        <span class="me-2">{{ option.primary_contact?.email }}</span>
                      </div>

                    </div>

                  </template>

                </auto-complete>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.address?.length">
                {{ errors?.address[0] }}
              </span>

            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Phone number
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-address-book fs-14px z-index-999" />
                <auto-complete class="w-100 auto-complete-small"
                  panel-class="auto-complete-option-small"
                  input-class="w-100 auto-complete-input"
                  dropdown-class="py-1"
                  placeholder="Phone number"
                  optionLabel="phone_number"
                  @focus="delete errors?.phone_number"
                  v-model="attributes.phone_number"
                  :suggestions="filterContacts"
                  @option-select="handleSelectPhoneNumber"
                  @complete="handleSearchContact">

                  <template #option="slotProps">

                    <div class="d-block">

                      <div class="d-flex justify-context-start align-items-center">

                        <div class="circle-avatar me-2"
                          style="--height: 1.6rem; --width: 1.6rem">

                          <img :alt="slotProps.option?.full_name"
                            :src="slotProps.option?.avatar"
                            class="avatar" />
                        </div>

                        <div class="owner-name fs-12px text-hard">

                          <div class="">
                            {{ slotProps.option?.full_name }}
                          </div>

                          <div class="text-soft fs-12px">
                            {{ slotProps.option?.email }} {{ slotProps.option?.phone_number }}
                          </div>

                        </div>

                      </div>

                    </div>

                  </template>

                </auto-complete>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.phone_number?.length">
                {{ errors?.phone_number[0] }}
              </span>

            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Email address
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-envelope fs-14px z-index-999" />
                <auto-complete class="w-100 auto-complete-small"
                  panel-class="auto-complete-option-small"
                  input-class="w-100 auto-complete-input"
                  dropdown-class="py-1"
                  placeholder="Email address"
                  optionLabel="email"
                  @focus="delete errors?.email"
                  v-model="attributes.email"
                  :suggestions="filterContacts"
                  @option-select="handleSelectEmailAddress"
                  @complete="handleSearchContact">

                  <template #option="slotProps">
                    <div class="d-block">
                      <div class="d-flex justify-context-start align-items-center">
                        <div class="circle-avatar me-2"
                          style="--height: 1.6rem; --width: 1.6rem">
                          <img :alt="slotProps.option?.full_name"
                            :src="slotProps.option?.avatar"
                            class="avatar" />
                        </div>
                        <div class="owner-name fs-12px text-hard">
                          <div class="">
                            {{ slotProps.option?.full_name }}
                          </div>
                          <div class="text-soft fs-12px">
                            {{ slotProps.option?.email }} {{ slotProps.option?.phone_number }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                </auto-complete>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.email?.length">
                {{ errors?.email[0] }}
              </span>

            </div>

          </div>
        </div>

        <div class="col-lg-5 lead-details-right">
          <div class="modal-header py-lg-2 px-0 border-bottom">
            <div class="d-flex justify-content-center align-items-center">
              <i class="pi pi-pen-to-square fs-16px me-2"></i>
              <span class="text-hard fw-bold fs-16px">Deals</span>
            </div>
          </div>

          <div class="modal-body p-0 pt-3">

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Lead title
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-user-edit fs-14px" />
                <input-text class="w-100"
                  size="small"
                  @focus="delete errors?.lead_title"
                  v-model="attributes.lead_title"
                  placeholder="Title"></input-text>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_title?.length">
                {{ errors?.lead_title[0] }}
              </span>
            </div>

            <div class="mb-3 position-relative">
              <label class="mb-2 fs-16px text-head">
                Status
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <select-option filter
                v-model="attributes.select_status"
                :options="leadStatuses"
                :filterFields="['name']"
                optionLabel="name"
                placeholder="Select a status"
                class="w-100 select-option-small"
                panel-class="panel-option-small">
                <template #value="slotProps">
                  <div v-if="slotProps.value"
                    class="flex items-center">
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

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_status?.length">
                {{ errors?.lead_status[0] }}
              </span>
            </div>

            <div class="mb-3">
              <label class="mb-2 fs-16px text-head">
                Source
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-pen-to-square fs-14px z-index-999" />
                <auto-complete class="w-100 auto-complete-small"
                  panel-class="auto-complete-option-small"
                  input-class="w-100 auto-complete-input"
                  dropdown-class="py-1"
                  placeholder="Type lead source"
                  @focus="delete errors?.lead_source"
                  v-model="attributes.lead_source"
                  :suggestions="filterSources"
                  @complete="handleFilterSource" />
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_source?.length">{{ errors?.lead_source[0] }}</span>
            </div>

            <div class="mb-3 add-new-lead-owner-list-dropdown">
              <label for="select_owner_label"
                class="mb-2 fs-16px text-head">
                Owner
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <select-option filter
                :filter-fields="['name', 'email']"
                :loading="isLoadingUsers"
                @click="fetchUsers"
                v-model="leadOwner"
                :options="users"
                optionLabel="name"
                placeholder="Select a Country"
                class="w-100 select-option-small"
                panel-class="panel-option-small">

                <template #value="slotProps">

                  <div v-if="slotProps.value"
                    class="d-flex justify-context-start align-items-center">

                    <div class="circle-avatar me-2"
                      style="--height: 1.4rem; --width: 1.4rem">

                      <img :alt="slotProps.value.name"
                        :src="slotProps.value.profile_avatar"
                        class="avatar" />

                    </div>

                    <div class="owner-name fw--bold text-hard">
                      {{ slotProps.value.name || slotProps.value.email }}
                    </div>

                  </div>

                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>

                </template>

                <template #option="slotProps">
                  <div class="d-block">
                    <div class="d-flex justify-context-start align-items-center">
                      <div class="circle-avatar me-2"
                        style="--height: 1.6rem; --width: 1.6rem">
                        <img :alt="slotProps.option?.name"
                          :src="slotProps.option?.profile_avatar"
                          class="avatar" />
                      </div>
                      <div class="owner-name fs-12px text-hard">
                        <div class="">
                          {{ slotProps.option?.name }}
                        </div>
                        <div class="text-soft fs-12px">
                          {{ slotProps.option?.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </select-option>
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_owner?.length">{{ errors?.lead_owner[0] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-0">
        <div class="col-lg-7 py-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <button @click="hideModal"
                class="btn btn-danger btn-sm">Close</button>
            </div>
            <div>
              <loading-button class="btn-sm"
                :disabled="!attributes.name"
                :is-loading="isLoading"
                @submit="handleCreateNewLead">Save Change</loading-button>
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

  :deep(.auto-complete-input) {
    padding-left: 2.5rem !important;
  }

  @media (min-width: 992px) {
    .lead-details-right {
      background-color: #f5f7fa;
    }
  }
</style>