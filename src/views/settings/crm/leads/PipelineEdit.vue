<!-- <script>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { FindPipeline, UpdateOrCreatePipelines } from '../../../../actions/PipelineAction';
    import PipelineStages from './components/PipelineStages.vue';
    export default {
        name: 'AccountIndex',
        components: {
            CustomScrollbar,
            VueDraggableNext,
            PipelineStages
        },
        data() {
            return {
                errors: {},
                title: null,
                is_sales_pipeline: 0,
                pipelineId: null,
                primaryStages: [{ id: 0, name: 'New', color: 'rgb(0, 126, 229)', status: 0, }],
                successStages: [{ id: 0, name: 'Sold', color: 'rgb(41, 153, 0)', status: 2, }],
                lostStages: [{ id: 0, name: 'Lost', color: 'rgb(66, 66, 66)', status: 1, }],
                isSubmitPipelineStage: false,
            }
        },
        methods: {
            async fetchPipelineDataById() {
                try {
                    this.$toast.clear();
                    if (this.pipelineId) {
                        const res = await FindPipeline({ id: this.pipelineId });
                        const { success, pipeline } = res;
                        if (success && pipeline) {
                            this.pipelineId = pipeline.pipeline_id;
                            this.title = pipeline.title;
                            this.is_sales_pipeline = pipeline.is_sales_pipeline;

                            this.primaryStages = pipeline.active_stages;
                            this.successStages = pipeline.success_stages;
                            this.lostStages = pipeline.lost_stages;
                        }
                    } else {
                        this.$toast.error('Invalid installer details 404');
                    }
                } catch (error) {
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                }
            },
            async updateOrCreatePipelineHandler() {
                try {
                    this.$toast.clear();

                    if (this.title === '' || this.title === null) {
                        this.errors = {
                            title: ['The title field is required.']
                        };
                        return;
                    }
                    this.isSubmitPipelineStage = true;
                    var data = {
                        title: this.title,
                        is_sales_pipeline: this.is_sales_pipeline,
                        stages: [
                            ...this.primaryStages,
                            ...this.successStages,
                            ...this.lostStages,
                        ]
                    };

                    const res = await UpdateOrCreatePipelines(this.pipelineId, data);
                    const { success, message, errors, pipeline_id } = res;
                    if (success) {
                        this.$toast.success(message.text);
                        if (!this.pipelineId) {
                            this.pipelineId = pipeline_id;
                            this.fetchPipelineDataById();
                            this.$router.push({ path: `/settings/crm/pipeline/${pipeline_id}` })
                        }
                    } else {
                        this.$toast.error(message.text);
                        this.errors = errors ?? {};
                    }

                } catch (error) {
                    this.$toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitPipelineStage = false;
                }
            }
        },
        mounted() {
            const params = this.$route.params;
            if (params.id) {
                this.pipelineId = params.id;
                this.fetchPipelineDataById();
            }
        },
    }

</script> -->

<script setup>
import { ref, onMounted } from "vue";
import CustomScrollbar from "custom-vue-scrollbar";
import { VueDraggableNext } from "vue-draggable-next";
import { useApiRequest } from "@actions";
import PipelineStages from "./components/PipelineStages.vue";
import { $toast } from "@config";
import { useRoute, useRouter } from "vue-router";

// Define reactive variables
const $route = useRoute();
const $router = useRouter();
const errors = ref({});
const title = ref(null);
const is_sales_pipeline = ref(0);
const pipelineId = ref(null);

const primaryStages = ref([]);
const successStages = ref([]);
const lostStages = ref([]);

const demoPrimaryStages = ref([
  { id: 0, name: "New", color: "rgb(0, 126, 229)", status: "promary" },
]);
const demoSuccessStages = ref([
  { id: 0, name: "Sold", color: "rgb(41, 153, 0)", status: "success" },
]);
const demoLostStages = ref([
  { id: 0, name: "Lost", color: "rgb(66, 66, 66)", status: "lost" },
]);

const isSubmitPipelineStage = ref(false);

// Fetch pipeline data by ID
const fetchPipelineDataById = async () => {
  $toast.clear();
  if (pipelineId.value) {
    await useApiRequest({
      url: `pipelines/${pipelineId.value}`,
    }).then((res) => {
        const { success, pipeline, message } = res;
        if (success && pipeline) {
          pipelineId.value = pipeline.pipeline_id;
          title.value = pipeline.title;
          is_sales_pipeline.value = pipeline.is_sales_pipeline;
          primaryStages.value = pipeline.primary_stages;
          successStages.value = pipeline.success_stages;
          lostStages.value = pipeline.lost_stages;
        } else {
          $toast.error(message.text);
        }
      })
      .catch((error) => {
        $toast.error("Oops, something went wrong");
      });
  }
};

// Update or create pipeline handler
const updateOrCreatePipelineHandler = async () => {
  $toast.clear();
  if (!title.value) {
    errors.value = { title: ["The title field is required."] };
    return;
  }
  isSubmitPipelineStage.value = true;
  const payload = {
    title: title.value,
    is_sales_pipeline: is_sales_pipeline.value,
    stages: [
      ...primaryStages.value,
      ...successStages.value,
      ...lostStages.value,
    ],
  };
  let url = "/pipelines";
  if (pipelineId.value) {
    url += `/${pipelineId.value}`;
  }
  await useApiRequest({
    url,
    method: "post",
    payload,
  })
    .then((res) => {
      const { success, message, errors: apiErrors, pipeline_id } = res;
      if (success) {
        $toast.success(message.text);
        if (!pipelineId.value) {
          pipelineId.value = pipeline_id;
          fetchPipelineDataById();
          $router.push({ path: `/settings/crm/pipeline/${pipeline_id}` });
        }
      } else {
        $toast.error(message.text);
        errors.value = apiErrors ?? {};
      }
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong");
    })
    .finally(() => {
      isSubmitPipelineStage.value = false;
    });
};
// On mounted lifecycle hook
onMounted(() => {
  const params = $route.params;
  if (params.id) {
    pipelineId.value = params.id;
    fetchPipelineDataById();
  }
});
</script>

<template>
  <div class="content content-y-100vh">
    <div
      class="content-header d-flex justify-content-start align-stages-center"
    >
      <router-link to="/settings/crm/leads">
        <h1 class="mb-0 text-base">Pipelines</h1>
      </router-link>
      <div class="mx-2 d-flex justify-content-center align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
          ></path>
          <path fill="none" d="M0 0h24v24H0V0z"></path>
        </svg>
      </div>
      <h1 class="mb-0 text-soft">{{ pipelineId ? "Edit" : "Add New" }}</h1>
    </div>

    <div class="content-body">
      <section class="">
        <div class="row">
          <div class="col-lg-4">
            <div class="settings-group-item mb-3">
              <label class="form-label-title"
                >Title
                <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px"
                  >Required</span
                ></label
              >
              <input
                @focus="delete errors?.title"
                v-model="title"
                type="text"
                class="form-control py-1"
              />
              <span
                class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.title?.length"
                >{{ errors?.title[0] }}</span
              >
            </div>

            <div class="settings-group-item mb-3">
              <div
                @click="is_sales_pipeline = !is_sales_pipeline"
                class="d-flex justify-content-start align-stages-center"
              >
                <label
                  class="custom-form-checkbox btn btn-floating btn-light"
                  style="margin-left: -10px"
                >
                  <svg
                    v-if="!is_sales_pipeline"
                    class="unchecked"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
                    />
                  </svg>
                  <svg
                    v-if="is_sales_pipeline"
                    class="checked"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    ></path>
                  </svg>
                </label>
                <label class="form-label-title mb-0">Sales pipeline</label>
              </div>
              <span class="form-input-commant w-75"
                >Sales pipelines are used to track sales opportunities. When an
                opportunity exits the pipeline, it will be considered sold.
              </span>
              <div class="py-3">
                <router-link
                  class="d-flex justify-content-start align-items-center"
                  :to="`/settings/crm/properties?pipeline=${pipelineId}&title=${title}`"
                >
                  Add New Propertie
                  <span class="icon ms-2">
                    <svg
                      fill="currentColor"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      ></path>
                    </svg>
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <PipelineStages
          title="Primary stages"
          description='Active stages represent the part of the pipeline that is "in progress".
                    This will probably be most of the pipeline.'
          :stages="primaryStages"
          :demo="demoPrimaryStages"
          :add-new="{
            name: `New Primary Stage`,
            id: null,
            status: 'primary',
            color: 'white',
          }"
        />
        <br />

        <PipelineStages
          title="Successful stages"
          description='Active stages represent the part of the pipeline that is "in progress".
                This will probably be most of the pipeline.'
          :stages="successStages"
          :demo="demoSuccessStages"
          :add-new="{
            name: `New Success Stage`,
            id: null,
            status: 'success',
            color: 'white',
          }"
        />
        <br />

        <PipelineStages
          title="Unsuccessful stages"
          description="Unsuccessful stages are ways that things might fail or go wrong. While
                    you might only have one failure type, you can add multiple unsuccessful stages to track
                    different types of failure."
          :stages="lostStages"
          :demo="demoLostStages"
          :add-new="{
            name: `New Lost Stage`,
            id: null,
            status: 'lost',
            color: 'white',
          }"
        />

        <div class="row">
          <div class="col-lg-12 mt-3">
            <LoadingButton
              @click="updateOrCreatePipelineHandler"
              :isLoading="isSubmitPipelineStage"
              :disabled="isSubmitPipelineStage"
            >
              Save Settings
            </LoadingButton>
          </div>
        </div>

        <br /><br /><br />
      </section>
    </div>
  </div>
</template>


<style lang="scss"
    scoped>
.form-label-title {
  span {
    padding-bottom: 2px !important;
  }
}
</style>