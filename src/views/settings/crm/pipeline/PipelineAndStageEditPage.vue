<script setup>
  import StageDeleteConfirmModal from './components/StageDeleteConfirmModal.vue';
  import SettingsTopNavbar from '@components/SettingsTopNavbar.vue';
  import { ref, onMounted, reactive } from "vue";
  import CustomScrollbar from "custom-vue-scrollbar";
  import { VueDraggableNext } from "vue-draggable-next";
  import { useApiRequest } from "@actions";
  import PipelineStages from "./components/PipelineStages.vue";
  import { $toast } from "@config";
  import { delay } from "@helpers";
  import { useRoute, useRouter } from "vue-router";

  const $route = useRoute();
  const $router = useRouter();
  const errors = ref({});
  const pipeline_id = ref(null);
  const pipeline = reactive({
    title: null,
    is_sales_pipeline: 1,
    pipeline_id: null,
  });

  const primary_stages = ref([]);
  const success_stages = ref([]);
  const lost_stages = ref([]);

  const demo_primary_stages = ref([
    { id: 0, name: "New", color: "rgb(0, 126, 229)", status: "promary" },
  ]);

  const demo_success_stages = ref([
    { id: 0, name: "Sold", color: "rgb(41, 153, 0)", status: "success" },
  ]);

  const demo_lost_stages = ref([
    { id: 0, name: "Lost", color: "rgb(66, 66, 66)", status: "lost" },
  ]);

  const is_submit = ref(false);

  const toggle_delete_modal = ref(false);
  const delete_stage = ref(null);

  function handleDeleteConfirmModal(stage) {
    toggle_delete_modal.value = true;
    delete_stage.value = stage;
  }

  const fetchPipelineData = async () => {

    $toast.clear();

    if (!pipeline_id.value) return;

    await useApiRequest({
      url: `/settings/pipelines/${pipeline_id.value}`,
    }).then((res) => {

      const { pipeline: data, primary, success, lost } = res;

      Object.assign(pipeline, data);

      pipeline_id.value = pipeline.pipeline_id;

      primary_stages.value = primary;
      success_stages.value = success;
      lost_stages.value = lost;

    }).catch((error) => {
      $toast.error("Oops, something went wrong");
    });

  };

  const handleUpdateOrCreate = async () => {

    $toast.clear();

    if (!pipeline.title) return errors.value = { title: ["The title field is required."] };

    is_submit.value = true;

    const payload = {
      pipeline_id: pipeline_id.value,
      title: pipeline.title,
      is_sales_pipeline: pipeline.is_sales_pipeline,
      stages: [
        ...primary_stages.value,
        ...success_stages.value,
        ...lost_stages.value,
      ],
    };

    await useApiRequest({
      url: '/settings/pipelines',
      method: pipeline_id.value ? "PUT" : "POST",
      payload,
    }).then(async (res) => {

      const { success, message, errors: apiErrors, pipeline: data } = res;

      if (success) {

        $toast.success(message.text);

        await delay(500);

        fetchPipelineData();

        if (pipeline_id.value) return;

        pipeline_id.value = data.pipeline_id;

        Object.assign(pipeline, data);

        $router.push({ name: 'PipelineAndStageEditPage', params: { id: data.pipeline_id } });

        return;
      }

      $toast.error(message.text);

      errors.value = apiErrors ?? {};

    }).catch((error) => {

      $toast.error(error.message);

    }).finally(() => {

      is_submit.value = false;

    });
  };

  onMounted(() => {
    const params = $route.params;

    if (!params.id) return;

    pipeline_id.value = params.id;
    fetchPipelineData();

  });
</script>

<template>
  <div class="content content-y-100vh">

    <settings-top-navbar>
      <template #title>

        <div class="d-flex justify-content-start align-stages-center">

          <router-link to="/settings/crm/pipeline">
            <h1 class="mb-0 text-base fs-22px fw-bold">Pipelines</h1>
          </router-link>

          <div class="mx-2 d-flex justify-content-center align-items-center">

            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              <path fill="none"
                d="M0 0h24v24H0V0z"></path>
            </svg>

          </div>
          <h1 class="mb-0 text-soft fs-22px fw-bold">{{ pipeline_id ? pipeline.title ?? 'Edit' : "Add New" }}</h1>
        </div>
      </template>

    </settings-top-navbar>

    <div class="content-body">

      <section class="">

        <div class="row">

          <div class="col-lg-4">

            <div class="settings-group-item mb-3">

              <label class="form-label-title">
                Title
                <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">
                  Required
                </span>
              </label>

              <input-text @focus="delete errors?.title"
                v-model="pipeline.title"
                size="small"
                type="text"
                class="w-100" />

              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.title?.length">{{ errors?.title[0] }}</span>

            </div>

            <div class="settings-group-item mb-3">

              <div class="d-flex justify-content-start align-stages-center ms-n2">

                <custom-checkbox @click="pipeline.is_sales_pipeline = !pipeline.is_sales_pipeline"
                  :checked="!!pipeline.is_sales_pipeline"></custom-checkbox>

                <label class="form-label-title mb-0">Sales pipeline</label>

              </div>

              <span class="form-input-commant w-75">Sales pipelines are used to track sales opportunities. When an
                opportunity exits the pipeline, it will be considered sold.
              </span>

              <div class="py-3">

                <router-link class="d-flex justify-content-start align-items-center"
                  :to="`/settings/crm/properties?pipeline=${pipeline_id}&title=${pipeline.title}`">
                  Add New Propertie
                  <span class="icon ms-2">

                    <svg fill="currentColor"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18">
                      <path d="M0 0h24v24H0z"
                        fill="none"></path>
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                    </svg>

                  </span>
                </router-link>

              </div>
            </div>
          </div>
        </div>

        <PipelineStages title="Primary stages"
          description='Active stages represent the part of the pipeline that is "in progress".
                    This will probably be most of the pipeline.'
          :stages="primary_stages"
          :demo="demo_primary_stages"
          :add-new="{name: `New Primary Stage`,stage_id: null,status: 'primary',color: 'white',}"
          @handleDelete="handleDeleteConfirmModal" />
        <br />

        <PipelineStages title="Successful stages"
          description='Active stages represent the part of the pipeline that is "in progress".
                This will probably be most of the pipeline.'
          :stages="success_stages"
          :demo="demo_success_stages"
          :add-new="{name: `New Success Stage`, stage_id: null,status: 'success',color: 'white',}"
          @handleDelete="handleDeleteConfirmModal" />
        <br />

        <PipelineStages title="Unsuccessful stages"
          description="Unsuccessful stages are ways that things might fail or go wrong. While
                    you might only have one failure type, you can add multiple unsuccessful stages to track
                    different types of failure."
          :stages="lost_stages"
          :demo="demo_lost_stages"
          :add-new="{name: `New Lost Stage`, stage_id: null,status: 'lost',color: 'white',}"
          @handleDelete="handleDeleteConfirmModal" />

        <div class="row">
          <div class="col-lg-12 mt-3">
            <LoadingButton @click="handleUpdateOrCreate"
              :isLoading="is_submit"
              :disabled="is_submit">
              Save Settings
            </LoadingButton>
          </div>
        </div>

        <br /><br /><br />
      </section>
    </div>
  </div>

  <stage-delete-confirm-modal v-if="toggle_delete_modal"
    :delete-stage="delete_stage"
    v-model:visible="toggle_delete_modal"
    @close="toggle_delete_modal = false"
    :stages="[...primary_stages, ...success_stages, ...lost_stages]"
    :pipeline="pipeline"
    @refresh="fetchPipelineData">
  </stage-delete-confirm-modal>

</template>


<style lang="scss"
  scoped>
  .form-label-title {
    span {
      padding-bottom: 2px !important;
    }
  }
</style>