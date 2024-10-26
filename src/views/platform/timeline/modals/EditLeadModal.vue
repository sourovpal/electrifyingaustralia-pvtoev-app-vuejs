<script setup>
  import { ref, computed, onMounted, watch, reactive } from "vue";
  import { useApiRequest } from "@actions/api";
  import { usePlatformStore } from "@stores";
  import LeadCustomProperties from "./sections/LeadCustomProperties.vue";
  import { useToast } from "vue-toast-notification";
  import { $toast } from "@config";
  import SelectLeadSource from "../../components/fields/SelectLeadSource.vue";

  const platformStore = usePlatformStore();
  const tabShowAll = ref("show-all");
  const tabLeadProperties = ref("lead-properties");
  const tabPipelineProperties = ref("pipeline-properties");
  const toggleTabName = ref("show-all");
  const isSubmitEditLead = ref(false);
  const leadEditModalRef = ref(null);
  const sourcesIsLoading = ref(false);
  const errors = ref({});

  const leadFormData = reactive({ estimated_value: 0.0 });
  const editLead = computed(() => platformStore.getEditLead);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadProperties = computed(() => platformStore.getLeadProperties);
  const pipelineProperties = computed(() => platformStore.getPipelineProperties);
  const leadSources = computed(() => platformStore.getLeadSources);
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
  const propertiesValues = computed(() => platformStore.getLeadPropertiesValues);
  const sources = computed(() => platformStore.getSources);

  onMounted(() => {

    if (!sources.value?.length) {

      platformStore.callFetchSources(function ({ loading }) {

        sourcesIsLoading.value = loading;

      });

    }

    Object.assign(leadFormData, editLead.value);

    leadFormData.lead_source = editLead.value.source?.title;

    leadFormData.estimated_value = editLead.value.estimated_value ?? 0.0;

  });

  async function submitLeadFormHandler() {

    $toast.clear();

    isSubmitEditLead.value = true;

    errors.value = {};

    var data = {
      ...leadFormData,
      properties_values: { ...propertiesValues.value },
    };

    const res = await useApiRequest({
      url: `/leads/${editLeadId.value}/update`,
      method: "post",
      payload: data,
    })
      .then((res) => {
        const { success, message, ...args } = res;

        isSubmitEditLead.value = false;

        if (!success && args.errors) {

          errors.value = args.errors;
          return;
        }

        platformStore.callFetchTimelineLogs();

        platformStore.callFetchNewLead(platformStore.getEditLeadId);

        $toast[message.type](message.text);

      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
        isSubmitEditLead.value = false;

      });
  }
</script>

<template>
  <bootstrap-modal v-bind="$attrs"
    ref="leadEditModalRef"
    :body-style="{'padding-top':'0px'}"
    :dialog-style="{'max-width':'600px'}"
    size="lg">
    <template #header>
      <div class="modal-header py-2 px-2">
        <div class="d-flex justify-content-center align-items-center py-0">
          <font-awesome-icon icon="fas fa-user-edit"
            class="text-head me-2"></font-awesome-icon>
          <span class="text-hard fw-bold fs-16px">Edit properties</span>
        </div>
        <div>
          <svg-custom-icon v-if="sourcesIsLoading"
            icon="SpinnerIcon" />
          <button v-else
            class="btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
            data-mdb-dismiss="modal">
            <font-awesome-icon icon="fas fa-close"
              class="text-soft"></font-awesome-icon>
          </button>
        </div>
      </div>
    </template>
    <ul v-if="leadProperties?.length || pipelineProperties?.length"
      class="nav nav-tabs nav-justified mb-3 d-none d-lg-flex"
      id="ex1"
      role="tablist">
      <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
        :class="{ active: toggleTabName == tabShowAll }"
        @click="toggleTabName = tabShowAll">
        Show All
      </li>
      <li v-if="leadProperties?.length"
        class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
        :class="{ active: toggleTabName == tabLeadProperties }"
        @click="toggleTabName = tabLeadProperties">
        Lead Properties
      </li>
      <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
        v-if="isPipelineLead && pipelineProperties?.length"
        :class="{ active: toggleTabName == tabPipelineProperties }"
        @click="toggleTabName = tabPipelineProperties">
        Pipeline Properties
      </li>
    </ul>

    <div v-show="toggleTabName == tabShowAll">
      <div class="my-3 position-relative">
        <label class="form-label-title"
          for="">Lead title</label>
        <input @click="delete errors?.lead_title"
          v-model="leadFormData['lead_title']"
          class="form-control"
          type="text" />
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.lead_title?.length">{{ errors?.lead_title[0] }}</span>
      </div>

      <div class="mb-3 position-relative">
        <label class="form-label-title"
          for="">Estimated value</label>
        <vue-number @click="delete errors?.estimated_value"
          class="form-control"
          v-model="leadFormData['estimated_value']"
          v-bind="{
            decimal: '.',
            separator: ',',
            prefix: '$',
            precision: 2,
            masked: false,
          }"></vue-number>
        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.estimated_value?.length">{{ errors?.estimated_value[0] }}</span>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Lead source</label>
            <SelectLeadSource :options="sources"
              v-model="leadFormData['lead_source']"
              :input="true" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.lead_source?.length">
              {{ errors?.lead_source[0] }}
            </span>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Source ID</label>
            <input @click="delete errors?.lead_source_id"
              v-model="leadFormData['lead_source_id']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.lead_source_id?.length">{{ errors?.lead_source_id[0] }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Address one</label>
            <input @click="delete errors?.address_line_one"
              v-model="leadFormData['address_line_one']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.address_line_one?.length">{{ errors?.address_line_one[0] }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">City</label>
            <input @click="delete errors?.city"
              v-model="leadFormData['city']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.city?.length">{{ errors?.city[0] }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Address two</label>
            <input @click="delete errors?.address_line_two"
              v-model="leadFormData['address_line_two']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.address_line_two?.length">{{ errors?.address_line_two[0] }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">State</label>
            <input @click="delete errors?.state"
              v-model="leadFormData['state']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.state?.length">{{ errors?.state[0] }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Postcode</label>
            <input @click="delete errors?.post_code"
              v-model="leadFormData['post_code']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.post_code?.length">{{ errors?.post_code[0] }}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Country</label>
            <input @click="delete errors?.country"
              v-model="leadFormData['country']"
              class="form-control"
              type="text" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.country?.length">{{ errors?.country[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Lead Properties -->
    <div v-show="toggleTabName == tabShowAll || toggleTabName == tabLeadProperties">
      <div class="py-3"
        v-if="toggleTabName == tabShowAll && leadProperties?.length">
        <h6 class="fs-16px fw-bold text-hard">Custom properties</h6>
      </div>
      <LeadCustomProperties :properties="leadProperties" />
    </div>
    <div v-show="toggleTabName == tabPipelineProperties">
      <LeadCustomProperties :properties="pipelineProperties" />
    </div>
    <br />
    <div class="d-flex justify-content-between align-items-center">
      <button data-mdb-dismiss="modal"
        class="btn btn-danger">Close</button>
      <LoadingButton @submit="submitLeadFormHandler"
        :disabled="isSubmitEditLead"
        :is-loading="isSubmitEditLead"
        title="Save Change" />
    </div>
  </bootstrap-modal>
</template>