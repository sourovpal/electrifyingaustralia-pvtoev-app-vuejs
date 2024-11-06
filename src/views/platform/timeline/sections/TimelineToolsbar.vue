<script setup>
  import { ref, computed } from "vue";
  import { Skeletor } from "vue-skeletor";
  import { usePlatformStore } from "@stores";
  import ActionBar from "@components/ActionBar/ActionBar.vue";
  import LeftActionBar from "@components/ActionBar/LeftActionBar.vue";
  import RightActionBar from "@components/ActionBar/RightActionBar.vue";
  import TeamMembersPopover from "../../components/dropdowns/TeamMembersPopover.vue";
  import { AvatarIcon } from "@assets/icons";
  import LeadReCategoriseModal from "../modals/LeadReCategoriseModal.vue";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";
  import { useClipboard } from "@vueuse/core";
  import TeamMembersGroup from '@views/platform/timeline/components/TeamMembersGroup.vue';

  const platformStore = usePlatformStore();
  const editLead = computed(() => platformStore.getEditLead);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const isLoading = computed(() => platformStore.getIsLoading);
  const leadOwner = computed(() => platformStore.getLeadOwner);
  const leadStatus = computed(() => platformStore.getLeadStatus);
  const leadStage = computed(() => platformStore.getLeadStage);
  const statuses = computed(() => platformStore.getStatuses);
  const prevLeadId = computed(() => platformStore.getPrevLeadId);
  const nextLeadId = computed(() => platformStore.getNextLeadId);
  const primaryContact = computed(() => platformStore.getPrimaryContact);
  const users = computed(() => platformStore.getUsers);
  const isLoadingFetchUsers = ref(false);
  const toggleReCategoriesModal = ref(false);

  function copyClipboardHandler() {
    var source = ` Title : ${editLead.value.lead_title ?? null}\n Owner : ${leadOwner.value.name ?? null
      }\n Value : ${"$" + editLead.value.estimated_value}\n Status : ${leadStatus.value.name ?? null
      }\n Person : ${primaryContact.value.full_name ?? null}\n Email : ${primaryContact.value.email ?? null
      }\n Phone : ${primaryContact.value.phone_number ?? null}\n Link : ${window.location.href
      }`;
    const { copy, copied } = useClipboard();
    copy(source);
    $toast.success(`Copied to clipboard`);
  }

  function handleFetchNewLead($leadId) {
    platformStore.setEditLeadId($leadId);
    platformStore.setIsFirstLoading(true);
    platformStore.resetLeadEditTimeline();
    platformStore.callFetchNewLead($leadId, true);
    platformStore.callFetchLeadStages($leadId);
    platformStore.callFetchLeadContacts($leadId);
    platformStore.callFetchFiles({ lead_id: $leadId, page: 1 });
    platformStore.callFetchTimelineLogs(true, $leadId);
    platformStore.callFetchLeadTasks($leadId);
  }

  function handleLoadUsers() {
    if (users.value?.length) return;

    platformStore.callFetchUsers(function ({ loading, users }) {
      isLoadingFetchUsers.value = loading;
    });
  }

  async function updateLeadOwnerHandler(owner = null) {
    $toast.clear();

    await useApiRequest({
      url: `/platform/${editLeadId.value}/owner`,
      method: "PUT",
      payload: {
        owner_id: owner?.user_id,
      },
    })
      .then((res) => {
        const { success, errors, message } = res;

        if (success) {
          platformStore.setLeadOwner(owner);

          platformStore.callFetchTimelineLogs();

          return;
        }

        $toast.error(message.text);
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
      });
  }

</script>


<template>

  <action-bar class="timeline-tools-bar"
    :class="{ 'border-0': isPipelineLead }">

    <left-action-bar class="left-hover-action ms-3 ps-1">

      <div class="lead-title">

        <Skeletor v-if="isFirstLoading"
          style="width: 150px" />

        <span v-else
          @click="platformStore.setToggleLeadEditModal(true)"
          class="text-head mb-0 fs-16px fw-bold lead-title-text cursor-pointer text-overflow-ellipsis">
          {{ editLead?.lead_title ?? primaryContact?.full_name }}
        </span>

      </div>

      <button @click="platformStore.setToggleLeadEditModal(true)"
        class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-2 d-none d-md-inline"
        style="margin-left: 14px">

        <font-awesome-icon icon="fas fa-pen"
          class="text-soft fs-14px" />

      </button>

      <button @click="copyClipboardHandler"
        class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-3 d-none d-md-inline">

        <font-awesome-icon icon="fas fa-copy"
          class="text-soft fs-16px"></font-awesome-icon>

      </button>

    </left-action-bar>

    <right-action-bar>

      <div class="me-3"
        v-if="isLoading">

        <svg-custom-icon icon="SpinnerIcon" />

      </div>

      <router-link v-if="!isPipelineLead"
        @click="handleFetchNewLead(prevLeadId)"
        :to="`${prevLeadId ? `/platform/leads/${prevLeadId}` : ''}`">

        <button v-tippy="{ content: 'Previous Lead', placement: 'top' }"
          class="toolbar-btn btn btn-light btn-sm btn-floating me-3 d-flex justify-content-center align-items-center"
          :disabled="!prevLeadId">

          <font-awesome-icon icon="fas fa-arrow-left"
            class="text-soft fs-16px"></font-awesome-icon>

        </button>

      </router-link>

      <router-link v-if="!isPipelineLead"
        @click="handleFetchNewLead(nextLeadId)"
        :to="`${nextLeadId ? `/platform/leads/${nextLeadId}` : ''}`">

        <button v-tippy="{ content: 'Next Lead', placement: 'top' }"
          class="toolbar-btn btn btn-light btn-sm btn-floating me-3 d-flex justify-content-center align-items-center"
          :disabled="!nextLeadId">

          <font-awesome-icon icon="fas fa-arrow-right"
            class="text-soft fs-16px"></font-awesome-icon>

        </button>

      </router-link>

      <button @click="platformStore.setToggleRightSidebar()"
        class="toolbar-btn btn btn-transparent shadow-0 btn-sm btn-floating me-3 d-flex justify-content-center align-items-center d-lg-none">

        <font-awesome-icon icon="fas fa-sliders"
          class="text-soft fs-16px"></font-awesome-icon>

      </button>

      <button v-if="!isPipelineLead"
        @click="platformStore.setCertifyModalAction('certify')"
        class="btn btn-sm btn-primary fw-bold me-3 justify-content-center align-items-center d-none d-md-flex">
        <i class="pi pi-check-circle fs-14px me-2"></i>
        certify
      </button>

      <div class="me-3">
        <team-members-group></team-members-group>
      </div>

      <avatar-group>
        <Avatar @click="$refs['teamMembersPopovarRef']?.toggle"
          :image="leadOwner?.profile_avatar || AvatarIcon"
          v-tippy="{ 
                content: leadOwner?.name 
                || leadOwner?.email 
                || `Change Owner`,
              placement: 'top'
              }"
          size="small"
          shape="circle"
          class="me-3 cursor-pointer"
          style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;" />

        <team-members-popover ref="teamMembersPopovarRef"
          :member="leadOwner"
          @change="updateLeadOwnerHandler"></team-members-popover>

      </avatar-group>

      <div class="me-3 position-relative">

        <button class="toolbar-btn btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
          data-mdb-toggle="dropdown">

          <font-awesome-icon icon="fas fa-ellipsis-vertical"
            class="text-soft fs-16px"></font-awesome-icon>

        </button>

        <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot">

          <!-- <span v-if="!isPipelineLead"
            @click="toggleLeadQualifiedModal = true"
            class="dropdown-item cursor-pointer text-head d-block d-lg-none py-1">Qualify</span> -->

          <span @click="toggleReCategoriesModal = !toggleReCategoriesModal"
            class="dropdown-item cursor-pointer text-head py-1">Re-categorise lead</span>

        </div>

      </div>

    </right-action-bar>

  </action-bar>

  <!--  -->

  <lead-re-categorise-modal v-model:visible="toggleReCategoriesModal"
    @close="() => (toggleReCategoriesModal = false)"
    v-if="toggleReCategoriesModal"></lead-re-categorise-modal>

</template>


<style scoped
  lang="scss">
  .lead-title {
    .lead-title-text {
      max-width: 25rem;
      display: block;
      white-space: nowrap;

      @media screen and (max-width: 500px) {
        max-width: 10rem !important;
      }
    }
  }

  .timeline-tools-bar {
    height: 2.5rem;
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

  .owner-list-dropdown {
    .dropdown-menu {
      z-index: 1000;
      max-width: 19rem;
      width: 16rem;
      padding: 0.5rem 0;
      margin: 0.125rem 0 0;
      font-size: 1rem;
      color: #292b2c;
      text-align: left;
      background-color: #fff;
      background-clip: padding-box;
      border-radius: 0.25rem;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

      &::before {
        content: "";
        position: absolute;
        top: -7px;
        right: 30px;
        border: 7px solid #f1f0f0;
        border-right-color: white;
        border-bottom-color: white;
        transform: rotate(45deg);
        border-bottom-color: transparent;
        border-right-color: transparent;
      }

      &::after {
        content: "";
        position: absolute;
        top: -6px;
        right: 30px;
        border: 7px solid white;
        border-right-color: white;
        border-bottom-color: white;
        transform: rotate(45deg);
        border-bottom-color: transparent;
        border-right-color: transparent;
      }

      @media screen and (max-width: 766px) {

        &::after,
        &::before {
          left: 30px;
          right: auto !important;
        }
      }

      .dropdown-header {
        font-size: 0.75rem;
        padding: 0 0.5rem;
        font-weight: 700;
        line-height: 1.5rem;
        margin-bottom: 0;
        padding-top: 0.5rem;
      }

      .dropdown-item.noselect {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 10px;
        user-select: none;
        border-bottom: 1px solid #dddddd;

        img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          margin-right: 10px;
        }

        span {
          display: inline-block;
          line-height: 18px;
        }
      }

      .project-owner-team-members {
        max-width: 19rem;
        max-height: 350px;

        .dropdown-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          user-select: none;

          img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            margin-right: 10px;
          }

          span {
            display: inline-block;
            line-height: 18px;
          }
        }
      }
    }

    .dropdown-body {
      .dropdown-input {
        .project-owner-filter {
          background: #f5f7fa;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border: 0;
          width: 100%;
        }
      }
    }
  }

  .curtom-dropdown-toggler-btn {
    border: 1px solid rgba(0, 0, 0, 0.09);

    &:hover {
      background-color: #f7f7f9 !important;
      border: 1px solid #007ee5 !important;
      box-shadow: 0 1px 3px rgba(0, 126, 229, 0.34) !important;
    }
  }
</style>