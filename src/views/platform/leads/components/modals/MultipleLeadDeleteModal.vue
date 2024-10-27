<script setup>
import { Modal } from "mdb-ui-kit";
import { ref, watch, computed, onMounted } from "vue";
import { useLeadsStore } from "@stores";
import { useApiRequest } from "@actions";
import { $toast } from "@config";

const leadsStore = useLeadsStore();
const deleteMultipleLeads = ref(null);
const emits = defineEmits(["refresh", "close"]);
const modalInstance = computed(() => leadsStore.getMultipleDeleteModal);
const selectedLeads = computed(() => leadsStore.getSelectedLeads);
const errors = ref({});
const isLoading = ref(false);
const inputTotalDeleteLeads = ref(null);

function hideModal() {
  modalInstance.value?.hide();
  inputTotalDeleteLeads.value = null;
  emits("close", true);
}

async function handleLeadsDelete() {
  console.log(modalInstance.value);
  errors.value = {};
  if (!inputTotalDeleteLeads.value) {
    return (errors.value = {
      lead_number: [
        `Please confirm by typing the number <strong>( ${selectedLeads.value?.length} )</strong> in the box below .`,
      ],
    });
  } else if (inputTotalDeleteLeads.value != selectedLeads.value?.length) {
    return (errors.value = {
      lead_number: [
        "The number you entered does not match the total selected leads.",
      ],
    });
  }
  isLoading.value = true;
  await useApiRequest({
    url: "/leads/delete",
    method: "POST",
    payload: {
      leads: selectedLeads.value,
    },
  })
    .then((res) => {
      const { success, message } = res;
      $toast[message.type](message.text);
      if (success) {
        inputTotalDeleteLeads.value = null;
        return emits("refresh", true);
      }
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong");
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  leadsStore.setMultipleDeleteModal(new Modal(deleteMultipleLeads.value));
});
</script>

<template>
  <div
    class="modal fade add-new-lead-modal"
    id="deleteMultipleLeads"
    ref="deleteMultipleLeads"
    aria-hidden="true"
    aria-labelledby="deleteMultipleLeads"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content" style="border: 1px solid #dc4c64">
        <div class="modal-header py-2">
          <div class="d-flex justify-content-center align-items-center py-0">
            <font-awesome-icon
              icon="fas fa-trash"
              class="fs-16px text-head me-2"
            ></font-awesome-icon>
            <span class="text-hard fw-bold fs-16px">Delete</span>
          </div>
          <div>
            <button
              class="btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
              @click="hideModal()"
            >
              <font-awesome-icon
                icon="fas fa-close"
                class="fs-16px text-soft"
              ></font-awesome-icon>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <label>Name</label>
          <input-text type="text" />
          <select-option
            v-model="inputTotalDeleteLeads"
            filter
            :options="[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]"
            optionLabel="id"
          ></select-option>

          <p class="text-center fs-14px">
            Are you sure you want to delete this lead? This action cannot be
            undone! <br />
            To confirm your intent, please type the number of leads
            <strong> ({{ selectedLeads.length }}) </strong> in the box below:
          </p>
          <div>
            <input
              @click="delete errors?.lead_number"
              class="form-control"
              type="number"
              v-model="inputTotalDeleteLeads"
            />
            <span
              class="fs-14px text-danger py-1 w-100 d-block"
              v-html="errors?.lead_number[0]"
              v-if="errors?.lead_number?.length"
            ></span>
          </div>
        </div>
        <div
          class="modal-footer d-flex justify-content-between align-items-center border-0"
        >
          <div>
            <button @click="hideModal()" class="btn btn-danger btn-sm">
              Cancel
            </button>
          </div>
          <div>
            <loading-button
              class="btn-sm btn-warning"
              :is-loading="isLoading"
              @submit="handleLeadsDelete"
              >Confirm?</loading-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss"
    scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>