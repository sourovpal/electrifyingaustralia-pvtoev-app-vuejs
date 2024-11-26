<script setup>
  import { ref, onMounted, reactive } from "vue";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";

  const props = defineProps({
    teamMember: { type: Object, default: {} }
  });

  const emits = defineEmits(['refresh']);

  const attributes = reactive({
    name: '',
    email: '',
    phone_office: '',
    phone_mobile: '',
    role: '',
  });

  const errors = ref({});
  const roles = ref([]);

  const is_loading_roles = ref(false);
  const is_submit_update = ref(false);
  const is_submit_delete = ref(false);

  function handleFetchUserRoles() {

    is_loading_roles.value = true;

    useApiRequest({
      url: '/settings/roles/list',
    }).then(_roles => {

      roles.value = _roles;

    }).catch(error => {

      $toast.error(error.message);

    }).finally(_ => {

      is_loading_roles.value = false;

    });

  }

  function handleUpdate() {

    if (!attributes.email) return errors.value = { 'email': ['Email missing.'] };

    $toast.clear();
    errors.value = {};

    is_submit_update.value = true;

    useApiRequest({
      url: `/settings/users/${props.teamMember.user_id}`,
      method: 'PUT',
      payload: {
        name: attributes.name,
        phone_office: attributes.phone_office,
        phone_mobile: attributes.phone_mobile,
        role: attributes.role?.role_id
      }
    }).then(({ success, errors: _errors, message }) => {

      if (_errors) return errors.value = _errors;

      if (success) {
        $toast.success(message.text);
        emits('refresh');
      }

    }).catch(error => {

      $toast.error(error.message);

    }).finally(_ => {

      is_submit_update.value = false;

    });

  }

  function handleDelete() {

    is_submit_delete.value = true;
    $toast.clear();

    useApiRequest({
      url: `/settings/users/${props.teamMember.user_id}`,
      method: 'delete',
    }).then(({ message }) => {

      $toast.success(message.text);

      emits('refresh');

    }).catch(error => {

      $toast.error(error.message);

    }).finally(_ => {

      is_submit_delete.value = false;

    });

  }

  onMounted(() => {

    let edit = props.teamMember;

    if (!edit.is_owner) handleFetchUserRoles();

    attributes.name = edit.name;
    attributes.email = edit.email;
    attributes.phone_office = edit.phone_office;
    attributes.phone_mobile = edit.phone_mobile;

    if (edit.roles?.length) attributes.role = edit.roles[0];

  });

</script>

<template>

  <modal-dialog v-bind="$attrs"
    style="border-radius:6px;"
    modal
    pt:header:class="pt-1 pb-2 ps-3 pe-2"
    pt:content:class="pt-1 pb-2 ps-3"
    :header="`Manage Team Member`"
    :style="{ width: '50rem' }">

    <section class="pt-3">

      <div class="mb-3 row pe-5">

        <div class="col-3 text-end d-flex align-items-center">

          <label class="mb-1 ms-auto fs-16px text-head">Name:</label>

        </div>

        <div class="col-9">

          <input-text size="small"
            placeholder="Full name"
            v-model="attributes['name']"
            class="w-100"
            @click="delete errors.name"></input-text>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.name?.length">
            {{ errors.name[0] }}
          </span>

        </div>

      </div>

      <div class="mb-3 row pe-5">

        <div class="col-3 text-end d-flex align-items-center">

          <label class="mb-1 ms-auto fs-16px text-head">Email:</label>

        </div>

        <div class="col-9">

          <input-text size="small"
            placeholder="Email address"
            v-model="attributes['email']"
            readonly
            class="w-100"
            @click="delete errors.email"></input-text>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.email?.length">
            {{ errors.email[0] }}
          </span>

        </div>

      </div>

      <div class="mb-3 row pe-5">

        <div class="col-3 text-end d-flex align-items-center">

          <label class="mb-1 ms-auto fs-16px text-head">Phone (Office):</label>

        </div>

        <div class="col-9">

          <input-text size="small"
            placeholder="Phone (office)"
            v-model="attributes['phone_office']"
            class="w-100"
            @click="delete errors.phone_office"></input-text>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.phone_office?.length">

            {{ errors.phone_office[0] }}

          </span>

        </div>

      </div>

      <div class="mb-3 row pe-5">

        <div class="col-3 text-end d-flex align-items-center">

          <label class="mb-1 ms-auto fs-16px text-head">Phone (Mobile):</label>

        </div>

        <div class="col-9">

          <input-text size="small"
            placeholder="Phone (mobile)"
            v-model="attributes['phone_mobile']"
            class="w-100"
            @click="delete errors.phone_mobile"></input-text>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.phone_mobile?.length">
            {{ errors.phone_mobile[0] }}
          </span>

        </div>

      </div>

      <div class="mb-3 row pe-5">

        <div class="col-3 text-end d-flex align-items-center">

          <label class="mb-1 fs-16px text-head ms-auto">User Role:</label>

        </div>

        <div class="col-9">

          <select-option :loading="is_loading_roles"
            filter
            :disabled="teamMember.is_owner"
            v-model="attributes['role']"
            :options="roles"
            :filterFields="['name']"
            optionLabel="name"
            placeholder="Select a user role"
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
            v-if="errors?.role?.length">
            {{ errors.role[0] }}
          </span>

        </div>

      </div>

      <div class="d-flex justify-content-end align-items-center py-3 pe-5">

        <Button size="small"
          type="button"
          :loading="is_submit_update"
          severity="success"
          @click="handleUpdate"
          label="Save Change"></Button>

      </div>

      <div class="row settings-group-item mb-5">

        <div class="col-3 d-flex justify-content-end align-items-baseline">

          <label class="form-label-title text-danger mb-0">The danger zone:</label>

        </div>

        <div class="col-8">

          <div class="mb-4">

            <h6 class="modal-title text-head">Reset user password</h6>

            <p class="text-head fs-12px mb-3">

              This will log

              <span class="text-danger fw-bold">
                {{attributes.name || 'unknown name'}}
              </span>

              out of all sessions, remove their current password and send a
              password reset email to

              <span class="text-danger fw-bold"> {{ attributes.email }}</span> .

            </p>


            <Button label="Reset Password"
              severity="success"
              size="small"
              variant="outlined" />

          </div>

          <div class="">

            <h6 class="modal-title text-head">Remove user from team</h6>

            <p class="text-head fs-12px mb-3">

              This will remove

              <span class="text-danger fw-bold">
                {{attributes.name || 'unknown name'}}
              </span>

              from [companie_name]. Their projects will remain in the team and can
              be reassigned to other users.

            </p>

            <Button label="Remove"
              severity="danger"
              size="small"
              @click="handleDelete"
              :loading="is_submit_delete"
              variant="outlined" />

          </div>

        </div>

      </div>

    </section>

  </modal-dialog>


  <!-- <bootstrap-modal v-bind="$attrs"
    ref="modalRef"
    size="lg">
    <template #header>
      <div class="modal-header">
        <h5 class="modal-title text-base">Manage Team Member</h5>
      </div>
    </template>

    <div class="row settings-group-item mb-3">

      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Name:</label>
      </div>

      <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
        <input @click="delete errors?.name"
          v-model="attributes.name"
          class="form-control"
          type="text" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Email Address:</label>
      </div>
      <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
        <input v-model="attributes.email"
          class="form-control cursor-no-drop"
          type="text"
          readonly />
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Phone (office):</label>
      </div>
      <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
        <input @click="delete errors?.phone_office"
          v-model="attributes.phone_office"
          class="form-control"
          type="text" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.phone_office?.length">{{ errors?.phone_office[0] }}</span>
      </div>
    </div>
    <div class="row settings-group-item mb-3">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Phone (mobile):</label>
      </div>
      <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
        <input @click="delete errors?.phone_mobile"
          v-model="attributes.phone_mobile"
          class="form-control"
          type="text" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.phone_mobile?.length">{{ errors?.phone_mobile[0] }}</span>
      </div>
    </div>
    <div class="row settings-group-item mb-0">
      <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title mb-0">Role:</label>
      </div>
      <div class="col-7 me-auto">
        <select-object :options="roles"
          :selected="selectedRole"
          label="name"
          return-value="name"
          v-model="attributes.role"
          @change="(_, s_role) => (selectedRole = s_role)"></select-object>
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.access_roles?.length">{{ errors?.access_roles[0] }}</span>
      </div>
    </div>

    <hr style="margin: 2.5rem 0px" />

    <div class="row settings-group-item mb-0">
      <div class="col-3 d-flex justify-content-end align-items-baseline">
        <label class="form-label-title text-danger mb-0">The danger zone:</label>
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
            <a class="btn btn-outline-warning btn-sm reset-btn"
              href="">Reset password now</a>
          </div>
        </div>
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
            <a class="btn btn-outline-danger btn-sm remove-btn"
              href="">Remove user from team</a>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="modal-footer flex-between-center border-top-0">
        <div class="d-flex justify-content-between align-items-center w-100">
          <button type="button"
            class="btn btn-danger fw-bold btn-sm"
            data-mdb-dismiss="modal">
            Cancel
          </button>
          <loading-button class="btn-sm"
            :is-loading="isLoading"
            :disabled="!attributes.email"
            @click="handleUpdate">Save Change</loading-button>
        </div>
      </div>
    </template>
  </bootstrap-modal> -->
</template>
<style scoped
  lang="scss">

</style>