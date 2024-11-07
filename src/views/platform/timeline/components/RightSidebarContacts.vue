<script setup>
  import { computed, watchEffect, ref, watch } from "vue";
  import { Skeletor } from "vue-skeletor";
  import { usePlatformStore } from "@stores";
  import { useAppStore } from "@stores";
  import ContactEditModal from "../modals/ContactEditModal.vue";
  import { useApiRequest } from "@actions/api";
  import { useClipboard } from "@vueuse/core";
  import { $toast } from "@config";

  import { useConfirm } from "primevue/useconfirm";

  const confirm = useConfirm();
  const platformStore = usePlatformStore();

  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const contacts = computed(() => platformStore.getLeadContacts);
  const statuses = computed(() => platformStore.getStatuses);
  const leadStatus = computed(() => platformStore.getLeadStatus);
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);

  const dropdownPopober = ref(null);
  const toggleContactEditModal = ref(false);
  const contactEditModal = ref(null);
  const lead_status = ref(null);

  watch(leadStatus, (value) => lead_status.value = value, { deep: true, immediate: true });

  const primaryContact = computed({
    get() {
      return platformStore.getPrimaryContact;
    },
    set(contact) {
      platformStore.setPrimaryContact(contact);
    }
  });

  const confirmDeleteContact = (event) => {
    confirm.require({
      target: event.currentTarget,
      header: 'Delete Contact?',
      message: 'Are you sure you want to Delete?',
      icon: 'pi pi-trash fs-16px',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
        style: 'height:2rem'
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
        style: 'height:2rem'
      },
      accept: () => deleteLeadContactHandler(primaryContact.value?.contact_id),
      reject: () => { }
    });
  };

  function handleContactEdit(state = false, attributes = null) {
    toggleContactEditModal.value = state;
    contactEditModal.value = attributes;
  }

  async function deleteLeadContactHandler(id) {

    await useApiRequest({
      url: `/contacts/${id}/delete`,
      method: "delete",
    })
      .then((res) => {

        const { success, message } = res;

        if (!success) return;

        platformStore.callFetchLeadContacts(
          platformStore.editLeadId,
          ({ loading, contacts }) => {

            if (!loading && contacts && typeof contacts[0] != "undefined")
              platformStore.setPrimaryContact(contacts[0]);

          });

      })
      .catch((error) => {
        $toast.error(error.message);
      });
  }

  function copyClipboardHandler(source = null) {

    $toast.clear();

    if (!source) return;

    const { copy, copied } = useClipboard();

    copy(source);

    $toast.success(`${source} Copied to clipboard`);

  }

  async function updateLeadStatusHandler({ value }) {
    $toast.clear();

    await useApiRequest({
      url: `/platform/${platformStore.editLeadId}/status`,
      method: "PUT",
      payload: {
        status_id: value?.status_id,
      },
    })
      .then((res) => {
        const { success, errors, message } = res;

        if (!success) return $toast.error(message.text);

        platformStore.callFetchTimelineLogs();
        platformStore.setLeadStatus(value);

      })
      .catch((error) => {
        $toast.error(error.message);
      });
  }



</script>
<template>


  <div
    class="col-r-header d-flex justify-content-between align-items-center border-bottom overflow-x-auto overflow-y-hidden">

    <div class="left ps-2 ms-2 py-1 d-flex justify-content-start align-items-center">

      <template v-if="!isFirstLoading">

        <Avatar v-for="(item, index) in contacts"
          :class="`${primaryContact.contact_id == item.contact_id ? 'shadow-border position-relative' : ''}`"
          @click="primaryContact = item"
          v-tippy="{ content: `${item.full_name}`, placement: 'top' }"
          :key="index"
          :image="item.avatar"
          size="small"
          shape="circle"
          class="me-2 cursor-pointer"
          style="--p-avatar-width:32px;--p-avatar-height:32px;" />

      </template>
      <!-- Skeletor Animation -->

      <template v-else>

        <Avatar v-for="(item, index) in 5"
          :key="Math.random()"
          class="cursor-pointer fw-bold me-2"
          shape="circle"
          size="small"
          style="--p-avatar-width:32px;--p-avatar-height:32px;--p-avatar-background:rgb(0 0 0 / 12%);" />

      </template>

    </div>

    <div class="right pe-3 py-1 d-flex justify-content-end align-items-center">

      <button @click="handleContactEdit(true)"
        v-tippy="{ content: 'Add a contact', placement: 'top' }"
        class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">

        <font-awesome-icon icon="fas fa-plus"
          class="text-soft fs-16px"></font-awesome-icon>

      </button>

    </div>

  </div>

  <div class="px-3 py-2">

    <div class="pt-2 d-flex justify-content-center align-items-center">
      <Avatar class="cursor-pointer fw-bold me-2"
        shape="circle"
        :image="primaryContact.avatar"
        size="small"
        style="--p-avatar-width:3.5rem;--p-avatar-height:3.5rem;--p-avatar-background:rgb(0 0 0 / 12%);" />
    </div>

    <div class="text-center py-2">

      <div>
        <h3 class="user-name fs-18px fw-bold text-head mb-0"
          v-if="!isFirstLoading">

          {{ primaryContact?.full_name }}

        </h3>

        <Skeletor v-else
          width="50%"
          style="height: 1rem" />
      </div>

      <div class="d-flex justify-content-center align-items-center py-2">

        <Button icon="pi pi-user-edit fs-18px"
          style="height:2rem;width:2rem;"
          class="me-1"
          severity="secondary"
          variant="text"
          @click="handleContactEdit(true, primaryContact)" />

        <Button icon="pi pi-copy"
          style="height:2rem;width:2rem;"
          severity="secondary"
          class="me-1"
          variant="text" />

        <Button icon="pi pi-info-circle"
          style="height:2rem;width:2rem;"
          severity="secondary"
          class="me-1"
          variant="text" />

        <Button icon="pi pi-trash fs-14px"
          :disabled="primaryContact.is_primary == 1"
          style="height:2rem;width:2rem;"
          severity="danger"
          class="me-1"
          variant="text"
          @click="confirmDeleteContact($event)" />

        <Button icon="pi pi-ellipsis-v fs-12px"
          style="height:2rem;width:2rem;"
          severity="secondary"
          class="me-1"
          variant="text" />
      </div>

    </div>

    <div>

      <table v-if="isFirstLoading"
        class="tbl-contact-info w-100">

        <tr v-for="(item, index) in [55, 70]"
          :key="index">

          <td class="d-flex justify-content-between align-items-center mb-2"
            width="100%">

            <Skeletor :width="`${item}%`"
              style="height: 0.8rem" />

            <div class="d-flex justify-content-end align-items-center"
              style="width: 25%">

              <Skeletor width="5%"
                style="flex-grow: 1; height: 0.8rem"
                class="me-2" />

              <Skeletor width="5%"
                style="flex-grow: 1; height: 0.8rem"
                class="me-2" />

            </div>

          </td>

        </tr>

      </table>

      <table v-if="!isFirstLoading"
        class="tbl-contact-info w-100">
        <tr v-if="primaryContact?.email">

          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-envelope"
              class="text-soft fs-16px">
            </font-awesome-icon>

          </td>

          <td class="fs-16px">

            <a class="d-block user-email text-soft"
              :href="`mailto:${primaryContact?.email}`">
              {{ primaryContact?.email }}
            </a>

          </td>

          <td width="20%">

            <div class="d-flex justify-content-end align-items-center">

              <button @click="copyClipboardHandler(primaryContact?.email)"
                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">

                <i class="pi pi-copy text-soft fs-16px"></i>

              </button>

              <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                target="_blank"
                :href="`mailto:${primaryContact?.email}`">

                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                  class="text-soft fs-14px"></font-awesome-icon>

              </a>

            </div>

          </td>

        </tr>

        <tr v-else
          @click="handleContactEdit(true, primaryContact)"
          class="cursor-pointer">
          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-envelope"
              class="text-soft fs-16px"></font-awesome-icon>

          </td>

          <td class="fs-16px text-soft">Add email</td>

        </tr>

        <tr v-for="(item, index) in primaryContact?.another_emails ?? []"
          :key="index"
          v-show="item.email">

          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-envelope"
              class="text-soft fs-16px"></font-awesome-icon>

          </td>

          <td class="fs-16px">

            <a class="d-block user-email text-soft"
              :href="`mailto:${item?.email}`">
              {{ item?.email }}
            </a>

          </td>

          <td width="20%">

            <div class="d-flex justify-content-end align-items-center">

              <button @click="copyClipboardHandler(item?.email)"
                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">

                <i class="pi pi-copy text-soft fs-16px"></i>

              </button>

              <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                target="_blank"
                :href="`mailto:${item?.email}`">

                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                  class="text-soft fs-14px"></font-awesome-icon>

              </a>

            </div>

          </td>

        </tr>
        <tr v-if="primaryContact?.phone_number">
          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-phone"
              class="text-soft fs-15px"></font-awesome-icon>

          </td>

          <td class="fs-16px">

            <a class="d-block text-soft user-phone"
              :href="`tel:${primaryContact?.phone_number}`">
              {{ primaryContact?.phone_number }}
            </a>

            <Skeletor v-if="isFirstLoading"
              width="70%" />

          </td>

          <td width="20%">

            <div class="d-flex justify-content-end align-items-center">

              <button @click="copyClipboardHandler(primaryContact?.phone_number)"
                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">

                <i class="pi pi-copy text-soft fs-16px"></i>

              </button>

              <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                :href="`tel:${primaryContact?.phone_number}`">

                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                  class="text-soft fs-14px"></font-awesome-icon>

              </a>

            </div>

          </td>

        </tr>

        <tr v-else
          @click="handleContactEdit(true, primaryContact)"
          class="cursor-pointer">

          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-phone"
              class="text-soft fs-15px"></font-awesome-icon>

          </td>

          <td @click="handleContactEdit(true, primaryContact)"
            class="fs-16px text-soft">
            Add phone
          </td>

        </tr>

        <tr v-for="(item, index) in primaryContact?.another_phones ?? []"
          :key="index"
          v-show="item.phone_number">

          <td class="fs-16px"
            width="10%">

            <font-awesome-icon icon="fas fa-phone"
              class="text-soft fs-15px"></font-awesome-icon>

          </td>

          <td class="fs-16px">

            <a class="d-block text-soft user-phone"
              :href="`tel:${item?.phone_number}`">
              {{ item?.phone_number }}
            </a>

          </td>

          <td width="20%">

            <div class="d-flex justify-content-end align-items-center">

              <button @click="copyClipboardHandler(item?.phone_number)"
                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">

                <i class="pi pi-copy text-soft fs-16px"></i>

              </button>

              <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                :href="`tel:${item?.phone_number}`">

                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                  class="text-soft fs-14px"></font-awesome-icon>

              </a>

            </div>

          </td>

        </tr>

      </table>

    </div>

    <div v-if="!isPipelineLead"
      class="py-2">
      <label class="fs-16px fw-bold text-soft mb-2"
        for="">Status</label>
      <select-option :options="statuses"
        filter
        @change="updateLeadStatusHandler"
        size="small"
        v-model="lead_status"
        option-label="name"
        pt:label:class="py-1"
        class="w-100 select-option-small"
        panel-class="panel-option-small"></select-option>
    </div>

  </div>

  <!-- Modal Area -->
  <contact-edit-modal v-if="toggleContactEditModal"
    :contact-edit="contactEditModal"
    @close="() => (toggleContactEditModal = false)"></contact-edit-modal>

</template>

<style scoped
  lang="scss">
  tr {
    td.hover {
      opacity: 0;
    }

    &:hover {
      td.hover {
        opacity: 1;
      }
    }
  }

  .shadow-border::before {
    position: absolute;
    content: "";
    width: 35px;
    height: 2px;
    background-color: #0275d8;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
  }

  .border-0 {
    border-color: transparent !important;
  }
</style>