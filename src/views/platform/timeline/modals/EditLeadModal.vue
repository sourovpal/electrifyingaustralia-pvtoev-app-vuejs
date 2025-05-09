<script setup>
  import { ref, computed, onMounted, watch, reactive } from "vue";
  import { useApiRequest } from "@actions";
  import { usePlatformStore } from "@stores";
  import LeadCustomProperties from "../components/LeadCustomProperties.vue";
  import { useToast } from "vue-toast-notification";
  import { $toast } from "@config";
  import moment from 'moment';

  const leadFormData = reactive({ estimated_value: 0.0 });
  const editLead = computed(() => platformStore.getEditLead);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadProperties = computed(() => platformStore.getLeadProperties);
  const pipelineProperties = computed(() => platformStore.getPipelineProperties);
  const leadSources = computed(() => platformStore.getSources);
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
  const leadPipeline = computed(() => platformStore.getLeadPipeline);
  const propertiesValues = computed(() => platformStore.getLeadPropertiesValues);
  const sources = computed(() => platformStore.getSources);

  const platformStore = usePlatformStore();
  const isLoading = ref(false);
  const leadEditModalRef = ref(null);
  const sourcesIsLoading = ref(false);
  const filterSources = ref([]);
  const errors = ref({});
  const hasProperties = ref(false);


  watch(() => [leadProperties.value, pipelineProperties.value], () => {

    if ((leadProperties.value?.length || pipelineProperties.value?.length)) return hasProperties.value = true;

    hasProperties.value = false;

  }, { deep: true, immediate: true });


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


  function formatProperties() {

    let properties_values = {};

    let attributes = leadProperties.value?.concat(pipelineProperties.value ?? []);

    for (let unique_id in propertiesValues.value ?? {}) {

      let value = propertiesValues.value[unique_id];

      let attribute = attributes.find(item => item.unique_id == unique_id);

      if (attribute && attribute.data_type_id == 'date' && value) value = moment(value).format("MM/DD/YYYY");

      else if (attribute && attribute.data_type_id == 'date_and_time' && value) value = moment(value).format("MM/DD/YYYY HH:mm");

      properties_values[unique_id] = value;

    }
    return properties_values;
  }


  async function submitLeadFormHandler() {

    $toast.clear();

    isLoading.value = true;

    errors.value = {};

    let properties_values = {};

    if (hasProperties.value) properties_values = await formatProperties();

    var data = {
      lead_title: leadFormData.lead_title,
      lead_source: leadFormData.lead_source,
      lead_source_id: leadFormData.lead_source_id,
      estimated_value: leadFormData.estimated_value,
      address_line_one: leadFormData.address_line_one,
      address_line_two: leadFormData.address_line_two,
      city: leadFormData.city,
      state: leadFormData.state,
      country: leadFormData.country,
      post_code: leadFormData.post_code,
      properties_values,
    };

    const res = await useApiRequest({
      url: `/platform/deals/${editLeadId.value}/update`,
      method: "PUT",
      payload: data,
    })
      .then((res) => {
        const { success, message, ...args } = res;

        isLoading.value = false;

        if (!success && args.errors) {

          errors.value = args.errors;
          return;
        }

        platformStore.callFetchTimelineLogs();

        platformStore.callFetchNewLead(platformStore.getEditLeadId);

        $toast[message.type](message.text);

      })
      .catch((error) => {
        $toast.error(error.message.text);
        isLoading.value = false;
      });
  }

  function handleFilterSource({ query }) {
    if (!query) return (filterSources.value = []);

    filterSources.value = leadSources.value
      ?.filter((item) => item.title?.toLowerCase().includes(query?.toLowerCase()))
      .map((item) => item.title);
  }

</script>

<template>

  <modal-dialog modal
    :visible="true"
    pt:root:class="rounded-2"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: `${hasProperties?'40vw':'30vw'}` }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">
    >
    <template #container>
      <div class="">
        <div class="row m-0">

          <div class="col-lg-8 py-2 ps-3"
            :class="{'col-lg-12':!hasProperties}">

            <div class="py-2 d-flex justify-context-start align-items-center">
              <span class="me-2">
                <i class="pi pi-pen-to-square"></i>
              </span>
              <span class="fw-bold fs-18px fw-bold text-head">Edit Deals</span>
            </div>

            <div class="mb-3">
              <label class="mb-2 fs-14px text-head">
                Lead title
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-user-edit fs-14px" />
                <input-text class="w-100"
                  size="small"
                  @focus="delete errors?.lead_title"
                  v-model="leadFormData['lead_title']"
                  placeholder="Lead title"></input-text>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.lead_title?.length">
                {{ errors?.lead_title[0] }}
              </span>
            </div>

            <div class="mb-3">

              <label class="mb-2 fs-14px text-head">
                Estimated value
                <span class="text-soft fs-12px ms-1">(Optional)</span>
              </label>

              <icon-field>
                <input-icon class="pi pi-dollar fs-13px z-index-999" />
                <input-number class="w-100 icon"
                  inputId="currency-us"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  fluid
                  size="small"
                  @focus="delete errors?.estimated_value"
                  v-model="leadFormData['estimated_value']"
                  placeholder="Estimated value"></input-number>
              </icon-field>

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.estimated_value?.length">
                {{ errors?.estimated_value[0] }}
              </span>

            </div>


            <div class="row">
              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Address one
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-home fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.address_line_one"
                      v-model="leadFormData['address_line_one']"
                      placeholder="Address one"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.address_line_one?.length">
                    {{ errors?.address_line_one[0] }}
                  </span>

                </div>

              </div>

              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Address two
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-home fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.address_line_two"
                      v-model="leadFormData['address_line_two']"
                      placeholder="Address two"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.address_line_two?.length">
                    {{ errors?.address_line_two[0] }}
                  </span>

                </div>

              </div>

            </div>



            <div class="row">
              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    City
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-map-marker fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.city"
                      v-model="leadFormData['city']"
                      placeholder="City"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.city?.length">
                    {{ errors?.city[0] }}
                  </span>

                </div>

              </div>

              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    State
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-directions-alt fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.state"
                      v-model="leadFormData['state']"
                      placeholder="State"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.state?.length">
                    {{ errors?.state[0] }}
                  </span>

                </div>

              </div>

            </div>


            <div class="row">
              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Postcode
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-compass fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.post_code"
                      v-model="leadFormData['post_code']"
                      placeholder="Postcode"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.post_code?.length">
                    {{ errors?.post_code[0] }}
                  </span>

                </div>

              </div>

              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Country
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-globe fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.country"
                      v-model="leadFormData['country']"
                      placeholder="Country"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.country?.length">
                    {{ errors?.country[0] }}
                  </span>

                </div>

              </div>

            </div>



            <div class="row">

              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Source
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-pen-to-square fs-14px z-index-999" />
                    <auto-complete class="w-100 auto-complete-small icon"
                      size="small"
                      panel-class="auto-complete-option-small"
                      input-class="w-100 auto-complete-input"
                      dropdown-class="py-1"
                      placeholder="Type lead source"
                      @focus="delete errors?.lead_source"
                      v-model="leadFormData['lead_source']"
                      :suggestions="filterSources"
                      @complete="handleFilterSource" />
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.lead_source?.length">
                    {{ errors?.lead_source[0] }}
                  </span>

                </div>

              </div>

              <div class="col-lg-6">

                <div class="mb-3">

                  <label class="mb-2 fs-14px text-head">
                    Source ID
                    <span class="text-soft fs-12px ms-1">(Optional)</span>
                  </label>

                  <icon-field>
                    <input-icon class="pi pi-hashtag fs-14px" />
                    <input-text class="w-100"
                      size="small"
                      @focus="delete errors?.lead_source_id"
                      v-model="leadFormData['lead_source_id']"
                      placeholder="Source ID"></input-text>
                  </icon-field>

                  <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.lead_source_id?.length">
                    {{ errors?.lead_source_id[0] }}
                  </span>

                </div>

              </div>

            </div>

            <div class="col-lg-12">

              <div class="d-flex jsutify-content-between align-items-center w-100">

                <danger-button @click="platformStore.setToggleLeadEditModal()">Close</danger-button>

                <success-button @click="submitLeadFormHandler"
                  :loading="isLoading"
                  class="ms-auto"
                  label="Save Change">
                </success-button>

              </div>

            </div>

          </div>

          <div v-if="hasProperties"
            class="col-lg-4 py-2 pe-0 col-right">

            <div class="py-2 d-flex justify-context-start align-items-center">
              <span class="me-2">
                <i class="pi pi-database"></i>
              </span>
              <span class="fw-bold fs-18px fw-bold text-head">Properties</span>
            </div>

            <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
              class="custom-properties pe-3">

              <lead-custom-properties :properties="leadProperties"></lead-custom-properties>

              <lead-custom-properties v-if="leadPipeline"
                :properties="pipelineProperties"
                :label-highlight="leadPipeline.title"></lead-custom-properties>

            </scroll-panel>

          </div>

        </div>

      </div>
    </template>
  </modal-dialog>



</template>

<style scoped
  lang="scss">
  .col-right {
    background-color: #f8f9f9;

    .custom-properties {
      width: 100%;
      height: 57vh;
      overflow-x: hidden;
    }
  }
</style>