<script setup>
import { ref, onMounted, reactive } from "vue";
import { Modal } from "mdb-ui-kit";
import CustomScrollbar from "custom-vue-scrollbar";
import SelectObject from "@views/platform/components/fields/SelectObject.vue";
import { useApiRequest } from "@actions";
import { $toast } from "@config";

const emits = defineEmits(["handleRefresh"]);
const modalRef = ref(null);
const errors = ref({});
let attributes = reactive({
  email: null,
  role: null,
  reset: 1,
});
const roles = ref([]);
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

onMounted(() => {
  errors.value = {};
  attributes.email = attributes.role = null;
  attributes.reset = Math.random();
  getRoles();
});
function hideModal() {
  modalRef.value?.hide();
}

async function handleInvited() {
  $toast.clear();
  errors.value = {};
  isLoading.value = true;
  delete attributes["reset"];
  await useApiRequest({
    url: "/users/invite",
    method: "post",
    payload: attributes,
  })
    .then((res) => {
      const { success, message, errors: apiErrors } = res;
      if (success) {
        emits("handleRefresh", { page: 1 });
        $toast.success(message.text);
        attributes.email = attributes.role = null;
        attributes.reset = Math.random();
        hideModal();
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
</script>

<template>
  <bootstrap-modal v-bind="$attrs" ref="modalRef">
    <template #header>
      <div class="modal-header">
        <h5 class="modal-title text-base">Member invitation</h5>
      </div>
    </template>
    <p class="form-subtitle fs-14px mb-3">
      Invite team members by their email. Team members will be able to
      collaborate with existing projects and share designs.
    </p>
    <div class="row settings-group-item mb-3">
      <div class="col-2 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Email:</label>
      </div>
      <div
        class="col-8 me-auto d-flex justify-content-start align-items-center flex-direction-column"
      >
        <input
          @click="delete errors?.email"
          v-model="attributes.email"
          class="form-control"
          type="text"
        />
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.email?.length"
          >{{ errors?.email[0] }}</span
        >
      </div>
    </div>
    <div class="row settings-group-item mb-0">
      <div class="col-2 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Role:</label>
      </div>
      <div class="col-8 me-auto">
        <select-object
          :key="attributes.reset"
          :options="roles"
          label="name"
          return-value="name"
          v-model="attributes.role"
          auto-selected
        ></select-object>
        <span
          class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.role?.length"
          >{{ errors?.role[0] }}</span
        >
      </div>
    </div>
    <template #footer>
      <div class="modal-footer flex-between-center border-top-0">
        <div
          class="mb-0 w-100 d-flex justify-content-between align-items-center"
        >
          <div>
            <button
              type="button"
              class="btn btn-danger fw-bold btn-sm"
              data-mdb-dismiss="modal"
            >
              Cancel
            </button>
          </div>
          <div>
            <loading-button
              :is-loading="isLoading"
              :disabled="!attributes.email"
              @click="handleInvited"
              class="btn-sm"
              >Send Invitation</loading-button
            >
          </div>
        </div>
      </div>
    </template>
  </bootstrap-modal>
</template>
<style scoped
  lang="scss">
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
  font-weight: 100;
  color: #abacb0;
  letter-spacing: 0.2px;
  text-align: center;
}
</style>