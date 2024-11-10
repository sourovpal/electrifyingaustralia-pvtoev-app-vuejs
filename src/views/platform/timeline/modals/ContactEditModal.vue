<script setup>
  import { ref, computed, watch, onMounted, nextTick } from "vue";
  import { usePlatformStore, useAppStore } from "@stores";
  import { $toast } from "@config";
  import { useRoute } from "vue-router";
  import { useApiRequest } from "@actions";
  import { useDebounceFn } from "@vueuse/core";
  import { formatLeadAddress } from "@helpers";

  // Props
  const props = defineProps({
    showLead: { type: Boolean, default: false },
    contactEdit: { default: {} },
  });

  const emits = defineEmits(["update", "close"]);

  // Stores
  const platformStore = usePlatformStore();
  const appStore = useAppStore();

  // Refs and computed properties
  const leadQualifyModalRef = ref(null);
  const leadContacts = computed(() => platformStore.getLeadContacts);
  const editLead = computed(() => platformStore.getEditLead);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const address = ref("");

  // Reactive data
  const errors = ref({});
  const editContact = ref({});
  const another_phones = ref([]);
  const another_emails = ref([]);
  const intendedUse = ["Home", "Office", "Work", "Personal", "Mobile"];
  const searchContacts = ref([]);
  const isSearchStart = ref(false);
  const isCreateNewContact = ref(false);
  const isSubmitCreateNewContact = ref(false);

  // Watchers
  watch(
    () => editContact.value.first_name,
    (val) => {
      searchLeadContactHandler(val, ["first_name", "last_name"]);
    }
  );
  watch(
    () => editContact.value.last_name,
    (val) => {
      searchLeadContactHandler(val, ["first_name", "last_name"]);
    }
  );
  watch(
    () => editContact.value.email,
    (val) => {
      searchLeadContactHandler(val, ["email", "another_emails"]);
    }
  );
  watch(
    () => editContact.value.phone_number,
    (val) => {
      searchLeadContactHandler(val, ["phone_number", "another_phones"]);
    }
  );
  // Address formatting logic
  watch(
    () => editLead.value,
    (val) => {
      if (Object.keys(val).length) {
        address.value = formatLeadAddress(val);
      }
    }
  );

  function hideModalHandler() {
    emits('close', false);
  }

  function selectSearchContactHandler(contact = null) {

    if (contact) {

      isSearchStart.value = false;

      another_emails.value = [];

      another_phones.value = [];

      const attributes = {
        title: contact.title,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_number: contact.phone_number,
        email_use: contact.email_use,
        phone_use: contact.phone_use,
      };

      editContact.value = attributes;

      if (Array.isArray(contact.another_phones)) {

        another_phones.value = contact.another_phones;

      }

      if (Array.isArray(contact.another_emails)) {

        another_emails.value = contact.another_emails;

      }

    }

  }

  function selectContactHandler(contact = null) {

    isSearchStart.value = false;

    errors.value = {};

    another_emails.value = [];

    another_phones.value = [];

    searchContacts.value = [];

    if (contact) {

      isCreateNewContact.value = false;

      editContact.value = { ...contact };

      if (Array.isArray(contact?.another_phones)) {

        another_phones.value = contact.another_phones;

      }

      if (Array.isArray(contact?.another_emails)) {

        another_emails.value = contact.another_emails;

      }

    } else {

      isSearchStart.value = true;

      isCreateNewContact.value = true;

      editContact.value = {};

    }

  }

  function addedAnotherPhoneHandler() {

    if (!editContact.value?.phone_number) {

      errors.value["phone_number"] = ["This phone number field is required."];

      return;
    }

    if (another_phones.value.length > 0) {

      const last = another_phones.value[another_phones.value.length - 1];

      if (!last.phone_number) {

        errors.value["phone_number"] = ["This phone number field is required."];
        return;
      }

    }

    delete errors.value["phone_number"];

    another_phones.value.push({ phone_number: "", phone_use: "" });

  }

  function addedAnotherEmailHandler() {

    if (!editContact.value?.email) {

      errors.value["email"] = ["This email address field is required."];
      return;
    }

    if (another_emails.value.length > 0) {

      const last = another_emails.value[another_emails.value.length - 1];

      if (!last.email) {
        errors.value["email"] = ["This email address field is required."];
        return;
      }

    }

    delete errors.value["email"];

    another_emails.value.push({ email: "", email_use: "" });

  }

  const searchLeadContactHandler = useDebounceFn(async (search, fields) => {

    if (!isCreateNewContact.value || !search || !isSearchStart.value) {
      searchContacts.value = [];
      return;
    }

    await useApiRequest({
      url: "/contacts/search",
      method: "POST",
      payload: { lead_id: editLeadId.value, search, fields },
    })
      .then((res) => {

        const { success, contacts, message } = res;

        if (success) {

          searchContacts.value = contacts;

        } else {

          $toast[message.type](message.text);

        }
      })
      .catch(() => {
        $toast.clear();
        $toast.error(error.message);
      });

  }, 1000);

  async function createLeadContactHandler(copyContact = null) {

    try {

      $toast.clear();

      errors.value = {};

      let res = {};

      const leadId = platformStore.getEditLeadId;

      if (copyContact) {

        const payload = {
          lead_id: leadId,
          contact_id: copyContact.contact_id,
        };

        // Send request using payload...
      } else {

        isSubmitCreateNewContact.value = true;

        const phones = another_phones.value.filter((item) => item.phone_number);
        const emails = another_emails.value.filter((item) => item.email);

        const payload = {
          ...editContact.value,
          another_phones: phones,
          another_emails: emails,
          lead_id: leadId,
        };

        if (isCreateNewContact.value) {
          res = await useApiRequest({
            url: "/contacts",
            method: "POST",
            payload: payload,
          });
        } else {
          res = await useApiRequest({
            url: "/contacts/update",
            method: "POST",
            payload: payload,
          });
        }
      }

      const { success, message, errors: resErrors } = res;

      isSubmitCreateNewContact.value = false;

      if (!success && resErrors) {

        errors.value = resErrors;

      } else if (success) {

        emits("update", true);

        if (!props.showLead) {

          platformStore.callFetchTimelineLogs();

          platformStore.callFetchLeadContacts(leadId, ({ contacts }) => {

            if (isCreateNewContact.value || !Array.isArray(contacts)) return;

            const contact = contacts.find(
              (item) => item.contact_id === editContact.value.contact_id
            );

            if (contact) platformStore.setPrimaryContact(contact);

          });
        }

        isCreateNewContact.value = false;

        hideModalHandler();

      }

    } catch (error) {

      $toast.error("Oops, something went wrong");

    } finally {

      isSubmitCreateNewContact.value = false;
    }
  }
  onMounted(() => {

    nextTick(() => selectContactHandler(props.contactEdit));

  });

</script>

<template>
  <modal-dialog modal
    :visible="true"
    pt:root:class="rounded-2"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '42vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">

    <template #container>

      <div class="row mx-0">

        <div class="col-lg-4 bg-col-left pb-2">

          <div class="modal-header py-2 px-0">

            <div class="d-flex justify-content-center align-items-center py-0">

              <svg class="svg-5 me-2"
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 -960 960 960"
                width="18">
                <path
                  d="M480-40q-33 0-56.5-23.5T400-120q0-33 23.5-56.5T480-200q33 0 56.5 23.5T560-120q0 33-23.5 56.5T480-40ZM240-760q-33 0-56.5-23.5T160-840q0-33 23.5-56.5T240-920q33 0 56.5 23.5T320-840q0 33-23.5 56.5T240-760Zm0 240q-33 0-56.5-23.5T160-600q0-33 23.5-56.5T240-680q33 0 56.5 23.5T320-600q0 33-23.5 56.5T240-520Zm0 240q-33 0-56.5-23.5T160-360q0-33 23.5-56.5T240-440q33 0 56.5 23.5T320-360q0 33-23.5 56.5T240-280Zm480-480q-33 0-56.5-23.5T640-840q0-33 23.5-56.5T720-920q33 0 56.5 23.5T800-840q0 33-23.5 56.5T720-760ZM480-280q-33 0-56.5-23.5T400-360q0-33 23.5-56.5T480-440q33 0 56.5 23.5T560-360q0 33-23.5 56.5T480-280Zm240 0q-33 0-56.5-23.5T640-360q0-33 23.5-56.5T720-440q33 0 56.5 23.5T800-360q0 33-23.5 56.5T720-280Zm0-240q-33 0-56.5-23.5T640-600q0-33 23.5-56.5T720-680q33 0 56.5 23.5T800-600q0 33-23.5 56.5T720-520Zm-240 0q-33 0-56.5-23.5T400-600q0-33 23.5-56.5T480-680q33 0 56.5 23.5T560-600q0 33-23.5 56.5T480-520Zm0-240q-33 0-56.5-23.5T400-840q0-33 23.5-56.5T480-920q33 0 56.5 23.5T560-840q0 33-23.5 56.5T480-760Z" />
              </svg>

              <span v-if="showLead"
                class="text-hard fw-bold fs-16px">Related Deals</span>

              <span v-else
                class="text-hard fw-bold fs-16px">Contacts</span>

            </div>

            <div>

              <button class="btn btn-light btn-sm btn-floating d-lg-none"
                @click="hideModalHandler()">

                <font-awesome-icon icon="fas fa-close"
                  class="fs-14px text-soft" />

              </button>

            </div>

          </div>

          <div class="modal-body px-0">

            <div v-if="showLead"
              class="lead-details p-2 bg-white">

              <router-link @click="hideModalHandler"
                :to="`/platform/leads/${editLead.lead_id}`">

                <ul class="m-0 p-0 list-unstyled">

                  <li v-if="address"
                    class="fw-bold text-head fs-14px">
                    {{ address }}
                  </li>

                  <li class="fw-bold text-soft fs-12px">
                    {{ editLead.lead_title ?? "Untitled lead's" }}
                  </li>

                  <li class="fw-bold text-soft fs-12px">
                    ${{ editLead.estimated_value }}
                  </li>

                </ul>

              </router-link>

            </div>
            <div v-else>

              <ul class="contacts-list list-unstyled">

                <li v-for="(item, index) in leadContacts"
                  :key="index"
                  @click="selectContactHandler(item)"
                  :class="item.contact_id == editContact.contact_id ? 'active' : ''"
                  class="list-item d-flex justify-content-start align-items-center">

                  <div class="circle-avatar me-2 cursor-pointer"
                    style="width: 40px; height: 40px; min-width: 40px">

                    <img class="rounded-circle border"
                      alt="avatar1"
                      :src="item.avatar" />

                  </div>

                  <div class="contact-details">

                    <span class="details-text text-head fs-16px d-block fw-bold">{{ item.full_name }}</span>

                    <span class="details-text text-soft fs-14px d-block">
                      {{ item.email ?? item.phone_number ?? "example@gmail.com" }}
                    </span>

                  </div>

                </li>

                <li v-if="searchContacts.length"
                  class="pb-2 text-soft">
                  Existing Contacts
                </li>

                <li v-for="(item, index) in searchContacts"
                  :key="index"
                  @click="selectSearchContactHandler(item)"
                  class="list-item d-flex justify-content-start align-items-center">

                  <div class="circle-avatar me-2 cursor-pointer"
                    style="width: 40px; height: 40px; min-width: 40px">

                    <img class="rounded-circle border"
                      alt="avatar1"
                      :src="item.avatar" />

                  </div>

                  <div class="contact-details">

                    <span class="details-text text-head fs-16px d-block fw-bold">{{ item.full_name }}</span>

                    <span class="details-text text-soft fs-14px d-block">
                      {{ item.email ?? item.phone_number ?? "example@gmail.com"}}
                    </span>

                  </div>

                </li>

              </ul>

              <button v-if="!isCreateNewContact"
                @click="selectContactHandler()"
                class="btn crm-btn w-100">
                Add New
              </button>

            </div>

          </div>

        </div>

        <div class="col-lg-8 pb-2">

          <div class="modal-header py-2 px-0">

            <div class="d-flex justify-content-center align-items-center py-0">

              <svg class="svg-5 me-2"
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22">
                <path
                  d="M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
              </svg>

              <span v-if="!isCreateNewContact"
                class="text-hard fw-bold fs-16px">
                Edit Contact
              </span>

              <span v-else
                class="text-hard fw-bold fs-16px">
                Add Contact
              </span>

              <svg v-if="editContact?.is_primary"
                :class="`ms-2 crm-text `"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height="24"
                viewBox="0 -960 960 960"
                width="24">
                <path
                  d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
              </svg>

            </div>

          </div>

          <div class="modal-body px-0">

            <div class="mb-2">

              <label class="mb-2 fs-14px text-head">Title</label>

              <icon-field>
                <input-icon class="pi pi-user fs-14px z-index-999" />
                <input-text size="small" placeholder="e.g. Mr."
                  class="w-100"
                  @click="delete errors?.title"
                  v-model="editContact.title" />
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.title?.length">
                {{ errors?.title[0] }}
              </span>

            </div>

            <div class="row">

              <div class="col-lg-6">

                <div class="mb-2">

                  <label class="mb-2 fs-14px text-head">First name</label>

                  <icon-field>

                    <input-icon class="pi pi-user fs-14px z-index-999" />

                    <input-text size="small" class="w-100" placeholder="e.g. Example"
                      @click="delete errors?.first_name"
                      v-model="editContact.first_name" />

                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.first_name?.length">
                    {{ errors?.first_name[0] }}
                  </span>

                </div>

              </div>

              <div class="col-lg-6">

                <div class="mb-2">

                  <label class="mb-2 fs-14px text-head">Last name</label>

                  <icon-field>

                    <input-icon class="pi pi-user fs-14px z-index-999" />

                    <input-text size="small"
                      class="w-100" placeholder="e.g. Example"
                      @click="delete errors?.last_name"
                      v-model="editContact.last_name" />

                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.last_name?.length">
                    {{ errors?.last_name[0] }}
                  </span>

                </div>

              </div>

            </div>

            <div class="row">

              <div class="col-lg-8 mb-3 mb-lg-0">

                <div class="">

                  <label class="mb-2 fs-14px text-head">Phone number</label>

                  <icon-field>

                    <input-icon class="pi pi-phone fs-14px z-index-999" />

                    <input-text size="small" class="w-100"
                      @click="delete errors?.phone_number" placeholder="e.g. +1 000000000"
                      :class="{'border-error':errors?.phone_number && !editContact.phone_number,
                      }"
                      v-model="editContact.phone_number" />

                  </icon-field>


                </div>

              </div>

              <div class="col-lg-4 mb-3 mb-lg-0">

                <div class="">

                  <label class="mb-2 fs-14px text-head">Intended use</label>

                  <select-option filter
                    v-model="editContact.phone_use"
                    :options="intendedUse"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">
                  </select-option>

                </div>

              </div>

            </div>

            <div class="row mt-lg-2"
              v-for="(item, index) in another_phones"
              :key="index">

              <div class="col-lg-8 mb-3 mb-lg-0">

                <div class="">

                  <label class="form-label-title d-block d-lg-none">Phone number</label>

                  <icon-field>

                    <input-icon class="pi pi-phone fs-14px z-index-999" />

                    <input-text size="small" class="w-100"
                      @click="delete errors?.phone_number" placeholder="e.g. +1 00000000"
                      :class="{'border-error': errors?.phone_number && !item.phone_number}"
                      v-model="item['phone_number']" />

                  </icon-field>

                </div>

              </div>

              <div class="col-lg-4 mb-3 mb-lg-0">

                <div class="">

                  <label class="form-label-title d-block d-lg-none">Intended use</label>

                  <select-option filter
                    v-model="item['phone_use']"
                    :options="intendedUse"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">
                  </select-option>

                </div>

              </div>

            </div>

            <div class="row mb-1">

              <div class="col-lg-8">

                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.phone_number?.length">
                  {{ errors?.phone_number[0] }}
                </span>

              </div>

              <div class="col-lg-4">

                <div @click="addedAnotherPhoneHandler()"
                  class="fs-14px text-primary cursor-pointer py-1 select-none">
                  Add another phone
                </div>

              </div>

            </div>

            <div class="row">

              <div class="col-lg-8 mb-3 mb-lg-0">

                <div class="">

                  <label class="mb-2 fs-14px text-head">Email address</label>
                  <icon-field>

                    <input-icon class="pi pi-envelope fs-14px z-index-999" />

                    <input-text size="small" class="w-100" placeholder="e.g. example@gmail.com"
                      @click="delete errors?.email"
                      :class="{'border-error': errors?.email && !editContact.email}"
                      v-model="editContact.email" />

                  </icon-field>

                </div>

              </div>

              <div class="col-lg-4 mb-3 mb-lg-0">

                <div class="">

                  <label class="mb-2 fs-14px text-head">Intended use</label>

                  <select-option filter
                    v-model="editContact.email_use"
                    :options="intendedUse"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">
                  </select-option>

                </div>

              </div>

            </div>

            <div class="row mt-lg-2"
              v-for="(item, index) in another_emails"
              :key="index">

              <div class="col-lg-8 mb-3 mb-lg-0">

                <div class="">

                  <label class="form-label-title d-block d-lg-none">Email address</label>

                  <icon-field>

                    <input-icon class="pi pi-envelope fs-14px z-index-999" />

                    <input-text size="small" class="w-100"
                      @click="delete errors?.email" placeholder="e.g. example@gmail.com"
                      :class="{ 'border-error': errors?.email && !item.email }"
                      v-model="item['email']" />

                  </icon-field>


                </div>

              </div>

              <div class="col-lg-4 mb-3 mb-lg-0">

                <div class="">

                  <label class="form-label-title d-block d-lg-none">Intended use</label>

                  <select-option filter
                    v-model="item['email_use']"
                    :options="intendedUse"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">
                  </select-option>

                </div>

              </div>

            </div>

            <div class="row mb-1">

              <div class="col-lg-8">

                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.email?.length">{{ errors?.email[0] }}</span>

              </div>

              <div class="col-lg-4">

                <div @click="addedAnotherEmailHandler()"
                  class="fs-14px text-primary cursor-pointer py-1 select-none">
                  Add another email
                </div>

              </div>

            </div>

            <div class="mb-2">

              <label class="mb-2 fs-14px text-head">Notes
                <span class="text-soft fs-12px ms-1">(Optional)</span></label>

              <text-area @click="delete errors?.notes" class="w-100"
                v-model="editContact.notes"
                rows="3"></text-area>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.notes?.length">{{ errors?.notes[0] }}</span>

            </div>

            <div class="d-flex justify-content-between align-items-center pt-2">

              <button @click="hideModalHandler()"
                class="btn btn-danger">
                Close
              </button>

              <loading-button :disabled="!(editContact.first_name && editContact.last_name)"
                :isLoading="isSubmitCreateNewContact"
                @click="createLeadContactHandler()">
                {{ isCreateNewContact ? "Create New" : "Update" }}
              </loading-button>

            </div>

          </div>

        </div>

      </div>

    </template>

  </modal-dialog>
</template>
<style lang="scss"
  scoped>
  .lead-details {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 3px;
  }

  .search-contacts {
    .list-item {
      padding: 6px 15px;
      background-color: #ffffff;
      transition: all 0.3s ease-in-out;
      border-radius: 3px;

      &:hover {
        background-color: #f0f3f6;
      }
    }
  }

  .border-error {
    border-color: rgb(220 76 100);
  }

  .bg-col-left {
    background-color: #f5f7fa;
  }

  .contacts-list {
    .list-item {
      padding: 8px 5px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      margin-bottom: 8px;
      border-left: 3px solid transparent;
      background: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

      &:hover,
      &.active {
        border-left-color:var(--crm-border-color);
      }

      .contact-details {
        line-height: 18px;
        overflow: hidden;

        .details-text {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>