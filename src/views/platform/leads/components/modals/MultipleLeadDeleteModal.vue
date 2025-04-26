<script setup>
  import { Modal } from "mdb-ui-kit";
  import { ref, watch, computed, onMounted } from "vue";
  import { useLeadsStore } from "@stores";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";

  const leadsStore = useLeadsStore();
  const deleteMultipleLeads = ref(null);
  const emits = defineEmits(["refresh", "close"]);
  const selectedLeads = computed(() => leadsStore.getSelectedLeads);
  const errors = ref({});
  const is_loading = ref(false);
  const input_number = ref(null);

  async function handleLeadsDelete() {

    errors.value = {};

    if (!input_number.value) {

      return (errors.value = {
        input_number: [
          `Please confirm by typing the number <strong>( ${selectedLeads.value?.length} )</strong> in the box below .`,
        ],
      });

    } else if (input_number.value != selectedLeads.value?.length) {

      return (errors.value = {
        input_number: [
          "The number you entered does not match the total selected leads.",
        ],
      });

    }

    is_loading.value = true;

    await useApiRequest({
      url: "/platform/leads",
      method: "DELETE",
      payload: {
        leads: selectedLeads.value,
      },
    })
      .then((res) => {

        const { message } = res;

        $toast[message.type](message.text);

        return emits("refresh", true);
        return emits("close", true);

      })
      .catch((error) => {
        $toast.error(error.message.text);
      })
      .finally(() => {
        is_loading.value = false;
      });
  }

</script>

<template>
  <modal-dialog v-bind="$attrs"
    style="border-radius:6px;"
    modal
    dismissableMask
    pt:header:class="pt-1 pb-2 ps-3 pe-2 text-danger"
    pt:content:class="pt-1 pb-2 ps-3"
    :header="`&nbsp;`"
    :style="{ width: '28rem' }">
    <template #container>

      <div class="text-center px-3 pt-4 pb-3">

        <h5 class="text-danger fs-16px">
          <i class="pi pi-trash me-2"></i>
          Are you sure you want to delete this lead?
        </h5>

        <p class="fs-12px text-soft w-75 mx-auto">
          To confirm, please type the number of leads to delete ({{ selectedLeads?.length }}) in the box below.
          This action is irreversible!
        </p>

        <div class="px-3">
          <input-text class="w-100"
            size="small"
            v-model="input_number"
            type="number"
            min="1"
            @click="delete errors['input_number']">
          </input-text>

          <span v-if="errors['input_number'] && errors['input_number']?.length"
            class="d-block py-1 fs-14px text-danger"
            v-html="errors.input_number[0]">
          </span>

        </div>

        <div class="d-flex justify-content-between align-items-center px-3 mx-auto mt-3">

          <danger-button label="Cancel"
            @click="emits('close', true)"></danger-button>

          <success-button :loading="is_loading"
            @click="handleLeadsDelete"
            label="Delete"></success-button>

        </div>

      </div>

    </template>
  </modal-dialog>
</template>