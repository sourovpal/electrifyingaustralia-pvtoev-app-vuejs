<script setup>
import {
  ref,
  computed,
  onMounted,
  defineExpose,
  watch,
  shallowReactive,
} from "vue";
import { Modal } from "mdb-ui-kit";
import { LeadUpdate } from "../../../../actions/LeadAction";
import { useLeadStore } from "../../../../stores/lead";
import { useAppStore } from "../../../../stores/app";
import LeadCustomProperties from "./sections/LeadCustomProperties.vue";
import { useToast } from "vue-toast-notification";
import { CONFIG } from "../../../../config";
import MultipleSelectVue from "../../../../components/forms/MultipleSelect.vue";
// Define
const emits = defineEmits(["findLeadByIdHandler"]);
// Assign Veriable
const leadStore = useLeadStore();
const appStore = useAppStore();
const tabShowAll = ref("show-all");
const tabLeadProperties = ref("lead-properties");
const tabPipelineProperties = ref("pipeline-properties");
const toggleTabName = ref("show-all");
const modalInstance = ref(null);
const isSubmitEditLead = ref(false);
const leadEditModalRef = ref(null);
const errors = ref({});

const leadFormData = shallowReactive({});
const customFormData = ref({});
// Computed
const currentLead = computed(() => leadStore.getCurrentLead);
const leadProperties = computed(() => leadStore.getLeadProperties);
const pipelineProperties = computed(() => leadStore.getPipelineProperties);
const leadSources = computed(() => leadStore.getLeadSources);
const isPipelineLead = computed(() => leadStore.getIsPipelineLead);
const leadPropertiesValues = computed(() => leadStore.getLeadPropertiesValues);
const $toast = useToast(CONFIG.TOAST);
// On Mounted
onMounted(() => {
  modalInstance.value = new Modal(leadEditModalRef.value);
});

watch(leadPropertiesValues, (n) => {
  customFormData.value = n;
});

watch(currentLead, (n) => {
  leadFormData.lead_title = n.lead_title;
  leadFormData.estimated_value = n.estimated_value;
  leadFormData.lead_source = n.source?.title;
  leadFormData.lead_source_id = n.lead_source_id;
  leadFormData.address_line_one = n.address_line_one;
  leadFormData.address_line_two = n.address_line_two;
  leadFormData.state = n.state;
  leadFormData.city = n.city;
  leadFormData.post_code = n.post_code;
  leadFormData.country = n.country;
});

// functions
function showModalHandler() {
  errors.value = {};
  modalInstance.value.show();
}

function hideModalHandler() {
  modalInstance.value.hide();
}

async function submitLeadFormHandler() {
  try {
    $toast.clear();
    isSubmitEditLead.value = true;
    errors.value = {};
    var data = {
      ...leadFormData,
      properties_values: { ...customFormData.value },
      lead_id: currentLead.value.id,
    };
    const res = await LeadUpdate(data);
    const { message } = res;
    $toast[message.type](message.text);
    emits("findLeadByIdHandler");
    isSubmitEditLead.value = false;
  } catch (error) {
    isSubmitEditLead.value = false;
    try {
      errors.value = error.response.data.errors;
    } catch (error) {}

    try {
      var message = error.response.data.message;
      $toast[message.type](message.text);
    } catch (e) {
      $toast.error("Oops, something went wrong");
    }
  }
}

defineExpose({ showModalHandler, hideModalHandler });
</script>

<template>
  <div
    class="modal fade add-new-lead-modal"
    id="leadEditModalRef"
    ref="leadEditModalRef"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content mb-5">
        <div class="modal-header py-2">
          <div class="d-flex justify-content-center align-items-center py-0">
            <svg
              class="svg-5 me-2"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z"
              />
            </svg>
            <span class="text-hard fw-bold fs-16px">Edit properties </span>
          </div>
          <div>
            <button
              class="btn btn-light btn-sm btn-floating d-lg-none"
              @click="hideModalHandler()"
            >
              <svg
                class="svg-5"
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22"
              >
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="modal-body pt-lg-0">
          <ul
            class="nav nav-tabs nav-justified mb-3 d-none d-lg-flex"
            id="ex1"
            role="tablist"
          >
            <li
              class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
              :class="{ active: toggleTabName == tabShowAll }"
              @click="toggleTabName = tabShowAll"
            >
              Show All
            </li>
            <li
              class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
              :class="{ active: toggleTabName == tabLeadProperties }"
              @click="toggleTabName = tabLeadProperties"
            >
              Lead Properties
            </li>
            <li
              class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
              v-if="isPipelineLead"
              :class="{ active: toggleTabName == tabPipelineProperties }"
              @click="toggleTabName = tabPipelineProperties"
            >
              Pipeline Properties
            </li>
          </ul>

          <div v-show="toggleTabName == tabShowAll">
            <div class="mb-3 position-relative">
              <label class="form-label-title" for="">Lead title</label>
              <input
                @click="delete errors?.lead_title"
                v-model="leadFormData['lead_title']"
                class="form-control"
                type="text"
              />
              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_title?.length"
                >{{ errors?.lead_title[0] }}</span
              >
            </div>

            <div class="mb-3 position-relative">
              <label class="form-label-title" for="">Estimated value</label>
              <input
                @click="delete errors?.estimated_value"
                v-model="leadFormData['estimated_value']"
                class="form-control"
                type="text"
              />
              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.estimated_value?.length"
                >{{ errors?.estimated_value[0] }}</span
              >
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Lead source</label>
                  <MultipleSelectVue
                    :options="leadSources"
                    v-model="leadFormData['lead_source']"
                    :input="true"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.lead_source?.length"
                  >
                    {{ errors?.lead_source[0] }}
                  </span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Source ID</label>
                  <input
                    @click="delete errors?.lead_source_id"
                    v-model="leadFormData['lead_source_id']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.lead_source_id?.length"
                    >{{ errors?.lead_source_id[0] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Address one</label>
                  <input
                    @click="delete errors?.address_line_one"
                    v-model="leadFormData['address_line_one']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.address_line_one?.length"
                    >{{ errors?.address_line_one[0] }}</span
                  >
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">City</label>
                  <input
                    @click="delete errors?.city"
                    v-model="leadFormData['city']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.city?.length"
                    >{{ errors?.city[0] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Address two</label>
                  <input
                    @click="delete errors?.address_line_two"
                    v-model="leadFormData['address_line_two']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.address_line_two?.length"
                    >{{ errors?.address_line_two[0] }}</span
                  >
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">State</label>
                  <input
                    @click="delete errors?.state"
                    v-model="leadFormData['state']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.state?.length"
                    >{{ errors?.state[0] }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Postcode</label>
                  <input
                    @click="delete errors?.post_code"
                    v-model="leadFormData['post_code']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.post_code?.length"
                    >{{ errors?.post_code[0] }}</span
                  >
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3 position-relative">
                  <label class="form-label-title" for="">Country</label>
                  <input
                    @click="delete errors?.country"
                    v-model="leadFormData['country']"
                    class="form-control"
                    type="text"
                  />
                  <span
                    class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.country?.length"
                    >{{ errors?.country[0] }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Lead Properties -->

          <div
            v-show="
              toggleTabName == tabShowAll || toggleTabName == tabLeadProperties
            "
          >
            <div class="py-3" v-if="toggleTabName == tabShowAll">
              <h6 class="fs-16px fw-bold text-hard">Custom properties</h6>
            </div>
            <LeadCustomProperties
              :leadProperties="leadProperties"
              :customFormData="customFormData"
            />
          </div>
          <div v-show="toggleTabName == tabPipelineProperties">
            <LeadCustomProperties
              :leadProperties="pipelineProperties"
              :customFormData="customFormData"
            />
          </div>
          <br>
          <div class="d-flex justify-content-between align-items-center">
            <button @click="hideModalHandler()" class="btn btn-danger">
              Close
            </button>
            <LoadingButton
              @submit="submitLeadFormHandler"
              :disabled="isSubmitEditLead"
              :is-loading="isSubmitEditLead"
              title="Save Change"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>