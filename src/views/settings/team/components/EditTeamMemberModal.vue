<script setup>
import { ref, onMounted, reactive } from "vue";
import { Modal } from "mdb-ui-kit";
import CustomScrollbar from "custom-vue-scrollbar";
import SelectObject from "@views/platform/components/fields/SelectObject.vue";
import { useApiRequest } from "@actions";
import { $toast } from "@config";

const emits = defineEmits(["handleRefresh"]);
const props = defineProps({
  teamMember: { type: Object, default: {} },
});
const modalRef = ref(null);
const errors = ref({});
let attributes = reactive({});
const roles = ref([]);
const selectedRole = ref({});
const isLoading = ref(false);

async function getRoles() {
  await useApiRequest({
    url: "/roles?limit=100",
  })
    .then((res) => {
      const { success, message, roles: rolesData } = res;
      if (success) {
        roles.value = rolesData;
        return;
      }
      $toast.error(message.text);
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong");
    })
    .finally(() => {});
}

async function handleUpdate() {
  $toast.clear();
  errors.value = {};
  isLoading.value = true;
  await useApiRequest({
    url: `/users/${attributes.user_id}/update`,
    method: "post",
    payload: attributes,
  })
    .then((res) => {
      const { success, message, errors: apiErrors } = res;
      if (success) {
        emits("handleRefresh", { page: 1 });
        $toast.success(message.text);
        modalRef.value?.hide();
      } else if (!success && apiErrors) {
        errors.value = apiErrors;
      } else {
        $toast.error(message.text);
      }
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong.");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  getRoles();
  selectedRole.value = {};
  errors.value = {};
  attributes = { ...props.teamMember };
  if (props.teamMember.roles?.length) {
    selectedRole.value = { ...props.teamMember.roles[0] };
  }
});
</script>

<template>
  <bootstrap-modal v-bind="$attrs" ref="modalRef" size="lg">
    <template #header>
      <div class="modal-header">
        <h5 class="modal-title text-base">Manage Team Member</h5>
      </div>
    </template>

    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Name:</label>
      </div>
      <div
        class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column"
      >
        <input
          @click="delete errors?.name"
          v-model="attributes.name"
          class="form-control"
          type="text"
        />
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.name?.length"
          >{{ errors?.name[0] }}</span
        >
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Email Address:</label>
      </div>
      <div
        class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column"
      >
        <input
          v-model="attributes.email"
          class="form-control cursor-no-drop"
          type="text"
          readonly
        />
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Phone (office):</label>
      </div>
      <div
        class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column"
      >
        <input
          @click="delete errors?.phone_office"
          v-model="attributes.phone_office"
          class="form-control"
          type="text"
        />
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.phone_office?.length"
          >{{ errors?.phone_office[0] }}</span
        >
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Phone (mobile):</label>
      </div>
      <div
        class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column"
      >
        <input
          @click="delete errors?.phone_mobile"
          v-model="attributes.phone_mobile"
          class="form-control"
          type="text"
        />
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.phone_mobile?.length"
          >{{ errors?.phone_mobile[0] }}</span
        >
      </div>
    </div>
    <div class="row settings-group-item mb-0">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Role:</label>
      </div>
      <div class="col-7 me-auto">
        <select-object
          :options="roles"
          :selected="selectedRole"
          label="name"
          return-value="name"
          v-model="attributes.role"
          @change="(_, s_role) => (selectedRole = s_role)"
        ></select-object>
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.access_roles?.length"
          >{{ errors?.access_roles[0] }}</span
        >
      </div>
    </div>

    <hr style="margin: 2.5rem 0px" />

    <div class="row settings-group-item mb-0">
      <div class="col-3 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title text-danger mb-0"
          >The danger zone:</label
        >
      </div>
      <div class="col-8">
        <div class="mb-4">
          <h6 class="modal-title text-base">Reset user password</h6>
          <p class="text-base fs-12px mb-3">
            This will log
            <span class="text-danger fw-bold">{{
              attributes.display_name
            }}</span>
            out of all sessions, remove their current password and send a
            password reset email to
            <span class="text-danger fw-bold"> {{ attributes.email }}</span> .
          </p>
          <div class="">
            <a class="btn btn-outline-warning btn-sm reset-btn" href=""
              >Reset password now</a
            >
          </div>
        </div>
        <!--  -->
        <div class="">
          <h6 class="modal-title text-base">Remove user from team</h6>
          <p class="text-base fs-12px mb-3">
            This will remove
            <span class="text-danger fw-bold">{{
              attributes.display_name
            }}</span>
            from [companie_name]. Their projects will remain in the team and can
            be reassigned to other users.
          </p>
          <div class="">
            <a class="btn btn-outline-danger btn-sm remove-btn" href=""
              >Remove user from team</a
            >
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="modal-footer flex-between-center border-top-0">
        <div class="d-flex justify-content-between align-items-center w-100">
          <button
            type="button"
            class="btn btn-danger fw-bold btn-sm"
            data-mdb-dismiss="modal"
          >
            Cancel
          </button>
          <loading-button
            class="btn-sm"
            :is-loading="isLoading"
            :disabled="!attributes.email"
            @click="handleUpdate"
            >Save Change</loading-button
          >
        </div>
      </div>
    </template>
  </bootstrap-modal>
</template>
<style scoped
  lang="scss">
.reset-btn {
  background-color: #fff7e8;
}

.remove-btn {
  background-color: #ffe7eb;
}

.custom-form-select {
  width: 100%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  .dropdown-item {
    cursor: pointer;
  }
}

.form-subtitle {
  line-height: 15px;
  font-size: 12px;
  font-weight: 100;
  color: #abacb0;
  letter-spacing: 0.2px;
}
</style>