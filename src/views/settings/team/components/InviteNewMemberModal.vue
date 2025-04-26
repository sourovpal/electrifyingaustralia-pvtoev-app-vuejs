<script setup>

  import { ref, onMounted, reactive } from "vue";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";

  const emits = defineEmits(["refresh", "close"]);

  const attributes = reactive({
    email: '',
    role: '',
  });

  const roles = ref([]);
  const is_loading_roles = ref(false);
  const is_submit = ref(false);
  const errors = ref({});

  function handleFetchUserRoles() {

    is_loading_roles.value = true;

    useApiRequest({
      url: '/settings/roles/list',
    }).then(_roles => {

      roles.value = _roles;

    }).catch(error => {

      $toast.error(error.message.text);

    }).finally(_ => {

      is_loading_roles.value = false;

    });

  }

  function handleSubmitInvite() {

    if (!attributes.email) return errors.value = { 'email': ['Email missing.'] };

    errors.value = {};

    is_submit.value = true;

    useApiRequest({
      url: '/settings/users',
      method: 'POST',
      payload: {
        email: attributes.email,
        role: attributes.role?.role_id
      }
    }).then(({ success, errors: _errors, message }) => {

      if (_errors) return errors.value = _errors;

      if (success) {
        $toast.success(message.text);
        emits('refresh');
      }

    }).catch(error => {

      $toast.error(error.message.text);

    }).finally(_ => {

      is_submit.value = false;

    });

  }

  onMounted(() => {
    handleFetchUserRoles();
  });


</script>

<template>
  <modal-dialog v-bind="$attrs"
    style="border-radius:6px;"
    modal
    pt:header:class="pt-1 pb-2 ps-3 pe-2"
    pt:content:class="pt-1 pb-2 ps-3"
    :header="`Invite New User`"
    :style="{ width: '30rem' }">

    <section class="pt-3">

      <div class="mb-3 d-flex justify-content-between align-items-center">

        <div class="label-title text-end d-flex align-items-center">

          <label class="mb-1 fs-16px text-head">Email:</label>

        </div>

        <div class="flex-grow-1">

          <input-text size="small"
            placeholder="Email address"
            v-model="attributes['email']"
            class="w-100"
            @click="delete errors.email"></input-text>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.email?.length">
            {{ errors.email[0] }}
          </span>

        </div>

      </div>

      <div class="mb-3 d-flex justify-content-between align-items-center">

        <div class="label-title text-end d-flex align-items-center">

          <label class="mb-1 fs-16px text-head">User Role:</label>

        </div>

        <div class="flex-grow-1">

          <select-option :loading="is_loading_roles"
            filter
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

      <div class="d-flex justify-content-between align-items-center pt-3">

        <Button size="small"
          type="button"
          label="Cancel"
          severity="secondary"
          @click="emits('close', true)"></Button>

        <Button size="small"
          type="button"
          :loading="is_submit"
          severity="success"
          @click="handleSubmitInvite"
          label="Send Invite"></Button>

      </div>

    </section>

  </modal-dialog>
</template>
<style scoped
  lang="scss">
  .label-title {
    width: 20%;
  }
</style>