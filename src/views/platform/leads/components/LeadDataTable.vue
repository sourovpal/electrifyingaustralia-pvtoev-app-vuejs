<script setup>
  import { ref, computed } from "vue";
  import Datatable from "@components/Datatable/Datatable.vue";
  import DatatableHeader from "@components/Datatable/DatatableHeader.vue";
  import DatatableBody from "@components/Datatable/DatatableBody.vue";
  import ColumnSorted from "./ColumnSorted.vue";
  import DataTableSkeletor from "./DataTableSkeletor.vue";
  import { AvatarIcon } from "@assets/icons";
  import { useLeadsStore, usePlatformStore } from "@stores";
  import { handleDateTimeFormat, formatTimeAgo, getPropertieValue } from "@helpers";
  import EmptyPage from "@components/Errors/EmptyPage.vue";
  import ErrorPage from "@components/Errors/ErrorPage.vue";
  import { $toast } from "@config";
  import moment from "moment";
  import { useApiRequest } from "@actions";
  import { useClipboard } from "@vueuse/core";
  import TeamMembersPopover from "../../components/dropdowns/TeamMembersPopover.vue";

  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();
  // Computed
  const leads = computed(() => leadsStore.getLeads);
  const isFirstLoading = computed(() => leadsStore.getIsFirstLoading);
  const selectedLeads = computed(() => leadsStore.getSelectedLeads);
  const isError = computed(() => leadsStore.getError);
  const isLoading = computed(() => leadsStore.getIsLoading);
  const leadProperties = computed(() => platformStore.getLeadProperties);
  const statuses = computed(() => platformStore.getStatuses);
  const headerAttributes = computed(() => leadsStore.getHeaders);

  const teamMembersPopovarRef = ref(null);
  const selectedOwner = ref(null);
  const isStatusUpdating = ref(null);
  const isOwnerUpdating = ref(null);
  const isLoadingUsers = ref(false);
  const selectedEditLead = ref(null);

  function handleSelectRow(id) {
    leadsStore.setSelectedLeads(id);
  }

  async function handleUpdateLeadStatus(lead, status) {
    $toast.clear();
    isStatusUpdating.value = lead.lead_id;
    await useApiRequest({
      url: `/platform/status/${lead.lead_id}/update`,
      method: "PUT",
      payload: {
        status_id: lead.status?.status_id,
      },
    })
      .then((res) => {
        const { success, errors, message } = res;
        if (!success) $toast.error(message.text);
      })
      .catch((error) => {
        $toast.error(error.message.text);
      })
      .finally(() => {
        isStatusUpdating.value = null;
      });
  }

  function fetchUsers(event, lead) {

    selectedOwner.value = lead.owner;

    selectedEditLead.value = lead;

    teamMembersPopovarRef.value.toggle(event);

    if (platformStore.getUsers.length) return;

    platformStore.callFetchUsers(({ loading }) => {
      isLoadingUsers.value = loading;
    });

  }

  async function handleUpdateLeadOwner(owner) {
    $toast.clear();
    if (selectedEditLead.value.owner?.user_id == owner.user_id) return;
    isOwnerUpdating.value = selectedEditLead.value.lead_id;
    await useApiRequest({
      url: `/platform/owners/${selectedEditLead.value.lead_id}/update`,
      method: "PUT",
      payload: {
        owner_id: owner?.user_id,
      },
    })
      .then((res) => {
        const { success, errors, message } = res;
        if (success) {
          selectedEditLead.value.owner = owner;
          return;
        }
        $toast.error("You can't change the owner of this lead's");
      })
      .catch((error) => {
        $toast.error(error.message.text);
      })
      .finally(() => {
        isOwnerUpdating.value = null;
      });
  }

  function copyClipboardHandler(source) {
    if (!source) return;
    const { copy, copied } = useClipboard();
    copy(source);
    $toast.success(`Copied to clipboard`);
  }
</script>

<template>
  <error-page :css="{ icon: { width: '30%' } }"
    v-if="isError && !isLoading"></error-page>

  <empty-page :css="{ icon: { width: '30%' } }"
    v-else-if="!leads.length && !isLoading"></empty-page>

  <Datatable v-else
    height="calc(100vh - 97px)">
    
    <datatable-header>
      <div class="tbl-th"
        style="width: 3.6rem; flex-grow: 1"></div>

      <div v-show="!headerAttributes.includes('client')"
        class="tbl-th"
        style="width: 16rem; flex-grow: 1">
        Client
      </div>

      <div v-show="!headerAttributes.includes('lead_title')"
        class="tbl-th"
        style="width: 20rem; flex-grow: 1">
        Lead Title
      </div>

      <div v-show="!headerAttributes.includes('source')"
        @click="leadSortedHandler('source')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">
        Source
        <column-sorted field="source"
          :column="'column'"
          :order="'order'" />
      </div>

      <div v-show="!headerAttributes.includes('status')"
        @click="leadSortedHandler('status')"
        class="tbl-th cursor-pointer pe-0"
        style="width: 12rem; flex-grow: 1">
        Status
        <column-sorted field="status"
          :column="'column'"
          :order="'order'" />
      </div>

      <div v-show="!headerAttributes.includes('phone_number')"
        class="tbl-th text-end"
        style="width: 13rem; flex-grow: 1">
        Phone Number
      </div>

      <div v-show="!headerAttributes.includes('email_address')"
        class="tbl-th"
        style="width: 15rem; flex-grow: 1">
        Email Address
      </div>

      <div v-show="!headerAttributes.includes('address_line_one')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Address One
      </div>

      <div v-show="!headerAttributes.includes('address_line_two')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Address Two
      </div>

      <div v-show="!headerAttributes.includes('city')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">

        City

      </div>

      <div v-show="!headerAttributes.includes('state')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">

        State

      </div>

      <div v-show="!headerAttributes.includes('post_code')"
        @click="leadSortedHandler('post_code')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">

        Postcode
        <column-sorted field="post_code"
          :column="'column'"
          :order="'order'" />

      </div>

      <div v-show="!headerAttributes.includes('country')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Country
      </div>

      <!-- Custom Propertys -->

      <div v-for="(propertie, index) in leadProperties"
        :key="index"
        class="tbl-th"
        v-show="!headerAttributes.includes(propertie.unique_id)"
        style="width: 12rem; flex-grow: 1">

        <span class="text-overflow-ellipsis w-100">{{ propertie.label }}</span>

      </div>

      <div v-show="!headerAttributes.includes('last_update')"
        @click="leadSortedHandler('updated_at')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">

        Last Update

        <column-sorted field="updated_at"
          :column="'column'"
          :order="'order'" />

      </div>

      <div v-show="!headerAttributes.includes('first_create')"
        @click="leadSortedHandler('created_at')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">

        Created At
        <column-sorted field="created_at"
          :column="'column'"
          :order="'order'" />

      </div>

      <div v-show="!headerAttributes.includes('owner')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Owner
      </div>

    </datatable-header>

    <datatable-body>

      <data-table-skeletor v-if="isFirstLoading"></data-table-skeletor>

      <div v-else
        class="tbl-tr full-width"
        v-for="(lead, index) in leads"
        :key="index"
        :class="selectedLeads.includes(lead.lead_id) ? 'active' : ''">

        <div style="width: 3.5rem; flex-grow: 1"
          class="tbl-td full-width ps-2">

          <custom-checkbox @click="handleSelectRow(lead.lead_id)"
            :checked="!!selectedLeads.includes(lead.lead_id)" />

        </div>

        <div v-show="!headerAttributes.includes('client')"
          style="width:16rem; flex-grow: 1"
          class="tbl-td full-width">

          <router-link class="d-flex text-overflow-ellipsis justify-context-start align-items-center"
            :to="`/platform/leads/${lead.lead_id}`">

            <Avatar :image="lead?.primary_contact?.avatar"
              size="small"
              shape="circle"
              class="me-3"
              style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;min-width: var(--p-avatar-width);" />

            <span>{{ lead?.primary_contact?.full_name }}</span>

          </router-link>

        </div>

        <div v-show="!headerAttributes.includes('lead_title')"
          style="width: 20rem; flex-grow: 1"
          class="tbl-td full-width">

          <router-link class="text-overflow-ellipsis"
            :to="`/platform/leads/${lead.lead_id}`">

            {{ lead.lead_title ?? 'Untitled lead\'s' }}

          </router-link>

        </div>

        <div v-show="!headerAttributes.includes('source')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{ lead.source?.title }}</span>
        </div>

        <div v-show="!headerAttributes.includes('status')"
          style="width: 12rem; flex-grow: 1"
          class="tbl-td pe-0">

          <select-option pt:label:style="line-height:20px;"
            pt:label:class="fs-16px"
            filter
            scroll-height="20rem"
            auto-filter-focus
            :loading="isStatusUpdating == lead.lead_id"
            v-model="lead['status']"
            :options="statuses"
            :filterFields="['name']"
            optionLabel="name"
            placeholder="Select a status"
            class="w-100 select-option-small rounded-1 border"
            panel-class="panel-option-small"
            @change="handleUpdateLeadStatus(lead)">

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

        </div>

        <div v-show="!headerAttributes.includes('phone_number')"
          style="width: 13rem; flex-grow: 1"
          class="tbl-td">
          <div class="d-flex justify-content-between align-items-center w-100">
            <div class="me-2 call-phone">
              <button @click="
                  copyClipboardHandler(lead?.primary_contact?.phone_number)
                "
                v-show="lead?.primary_contact?.phone_number"
                class="toolbar-btn btn btn-light btn-floating btn-sm me-1">
                <font-awesome-icon icon="fas fa-copy"
                  class="fs-14px text-soft" />
              </button>
              <button v-show="lead?.primary_contact?.phone_number"
                target="_blank"
                title="Call phone number"
                class="toolbar-btn btn btn-light btn-floating btn-sm">
                <a :href="`tel:${lead?.primary_contact?.phone_number}`"
                  target="_blank">
                  <font-awesome-icon icon="fas fa-phone"
                    class="fs-14px text-soft" />
                </a>
              </button>
            </div>
            <div class="text-overflow-ellipsis">
              {{ lead.primary_contact?.phone_number }}
            </div>
          </div>
        </div>

        <div v-show="!headerAttributes.includes('email_address')"
          style="width: 15rem; flex-grow: 1"
          class="tbl-td">
          <a class="text-overflow-ellipsis">
            {{ lead.primary_contact?.email }}
          </a>
        </div>

        <div v-show="!headerAttributes.includes('address_line_one')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{
            lead.address_line_one
            }}</span>
        </div>

        <div v-show="!headerAttributes.includes('address_line_two')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{
            lead.address_line_two
            }}</span>
        </div>

        <div v-show="!headerAttributes.includes('city')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.city }}
        </div>

        <div v-show="!headerAttributes.includes('state')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.state }}
        </div>

        <div v-show="!headerAttributes.includes('post_code')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.post_code }}
        </div>

        <div v-show="!headerAttributes.includes('country')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.country }}
        </div>

        <!-- Custom Properties -->

        <div v-for="(propertie, index) in leadProperties"
          :key="index"
          :id="propertie?.unique_id"
          v-show="!headerAttributes.includes(propertie.unique_id)"
          class="tbl-td"
          style="width: 12rem; flex-grow: 1"
          v-html="getPropertieValue(propertie, lead)"></div>

        <div v-show="!headerAttributes.includes('last_update')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ formatTimeAgo(lead.updated_at, 30, "Do MMMM, YYYY") }}
        </div>

        <div v-show="!headerAttributes.includes('first_create')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ formatTimeAgo(lead.created_at, 30, "Do MMMM, YYYY") }}
        </div>

        <div v-show="!headerAttributes.includes('owner')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">

          <div class="settings-group-item owner-list-dropdown position-relative">

            <button class="owner-dropdown-toggler"
              @click="fetchUsers($event, lead)"
              aria-expanded="false"
              v-tippy="{
                content: lead.owner?.name ?? 'Change Owner',
                placement: 'top',
              }">

              <svg-custom-icon v-if="isOwnerUpdating == lead.lead_id"
                icon="SpinnerIcon" />

              <div v-else
                class="icon">
                <img v-if="lead.owner?.profile_avatar"
                  :src="lead.owner?.profile_avatar ?? AvatarIcon"
                  :alt="lead.owner?.name" />
              </div>

            </button>

          </div>

        </div>

      </div>

    </datatable-body>
  </Datatable>

  <team-members-popover ref="teamMembersPopovarRef"
    :member="selectedOwner"
    @change="handleUpdateLeadOwner"></team-members-popover>

</template>

<style scoped
  lang="scss">
  .tbl-tr {
    .call-phone {
      visibility: hidden;
    }

    &:hover {
      .call-phone {
        visibility: visible;
      }
    }
  }

  .text-overflow-ellipsis {
    max-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .owner-dropdown-toggler {
    cursor: pointer;
    width: auto !important;
    border: none;
    outline: none;
    padding: 3px 25px 3px 0px;
    background-color: transparent;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: "";
      position: absolute;
      right: 5px;
      top: 45%;
      transform: translateY(-50%) rotate(45deg);
      border: 0.25rem solid transparent;
      border-bottom-color: rgb(164, 164, 164);
      border-right-color: rgb(164, 164, 164);
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>