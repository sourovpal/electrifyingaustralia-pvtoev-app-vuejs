<script setup>
  import { ref, computed, onMounted, nextTick } from "vue";
  import { formatLeadAddress, formatTimeAgo } from "@helpers";
  import { usePipelineStore } from "@stores";
  import { useClipboard } from "@vueuse/core";
  import { $toast } from '@config';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    lead: { type: Object, default: {} },
    pipeline: {
      default({ lead }) {
        return lead.pipeline ?? {}
      }
    },
    owner: {
      default({ lead }) {
        return lead.owner ?? {}
      }
    },
    stage: {
      default({ lead }) {
        return lead.pipeline_stage ?? {}
      }
    },
    contact: {
      default({ lead }) {
        return lead.primary_contact ?? {}
      }
    },
  });

  const pipelineStore = usePipelineStore();
  const pipelinePirimaryStages = computed(() => pipelineStore.getPipelinePrimaryStages);
  const pipelineSuccessStages = computed(() => pipelineStore.getPipelineSuccessStages);
  const pipelineLostStages = computed(() => pipelineStore.getPipelineLostStages);


  const popoverRef = ref(null);
  const progress = ref(0);
  const progressColor = ref(null);
  const popovarItems = [
    { title: 'Name', value: props.contact.full_name, copy: true },
    { title: 'Email', value: props.contact.email, copy: true },
    { title: 'Phone', value: props.contact.phone_number, copy: true },
    { title: 'Address', value: formatLeadAddress(props.lead), copy: true },
    { title: 'First Create', value: formatTimeAgo(props.lead?.created_at), copy: false },
    { title: 'Last update', value: formatTimeAgo(props.lead?.updated_at), copy: false },
  ];

  const toggle = (event) => {
    popoverRef.value.toggle(event);
  }


  function getProgress() {

    let primary = pipelinePirimaryStages.value?.length;
    let success = pipelineSuccessStages.value?.length;
    let lost = pipelineLostStages.value?.length;
    let stage = props.stage;
    let position = stage?.position ?? 0;
    let totalStage = 0;

    if (stage.status == 'primary') {

      totalStage = primary;

      progressColor.value = stage.color != 'white' ? stage.color : null;

    } else if (stage.status == 'success') {

      position = (position - primary);

      totalStage = success;

      progressColor.value = stage.color != 'white' ? stage.color : null;

    } else if (stage.status == 'lost') {

      position = (position - (primary + success));

      totalStage = lost;

      progressColor.value = stage.color != 'white' ? stage.color : null;

    }

    if (position && totalStage)
      return (position / totalStage) * 100;

    return 0;
  }

  function copyClipboardHandler(source) {
    const { copy, copied } = useClipboard();
    copy(source);
    $toast.success(`Copied to clipboard`);
  }


  onMounted(() => {
    progress.value = getProgress();
    nextTick(() => {
      if (progressColor.value) return;
      if (progress.value == 100) progressColor.value = '#16a085';
      else if (progress.value > 79) progressColor.value = '#2ecc71';
      else if (progress.value > 69) progressColor.value = 'rgb(0, 126, 229)';
      else if (progress.value > 49) progressColor.value = 'rgb(255, 204, 4)';
      else if (progress.value > 29) progressColor.value = 'rgb(255, 87, 34)';
      else progressColor.value = 'rgb(236, 64, 122)';
    });
  })

</script>

<template>
  <router-link draggable="true"
    :to="`/platform/deals/${lead.lead_id}`">
    <div class="pip-item">
      <div class="d-flex jsutify-content-between align-items-center">
        <h5 class="pip-title text-head">
          {{ contact?.full_name }}
        </h5>

        <div @click.prevent="toggle"
          class="px-1 py-1 popover-icon">
          <span class="pi pi-info-circle text-soft"></span>
        </div>

      </div>

      <p class="pip-sub-title"
        :class="{'text-soft':!lead.lead_title}">
        {{ lead.lead_title??'Tital not added yet' }}
      </p>

      <div class="d-flex justify-content-between align-items-center">
        <div class="bar">
          <div class="progress"
            :style="`--progress-width:${progress}%; --bg-color:${progressColor}`"></div>
        </div>
        <span class="text-head">{{ progress }}%</span>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="pip-value">${{ lead?.estimated_value?.toLocaleString() }}</div>
        <div class="pip-source text-soft">
          {{ lead?.source?.title ?? "Not added yet" }}
        </div>
      </div>

      <div class="pip-user d-flex justify-content-between align-items-center mt-1">
        <div v-tippy="{ content: `${owner.name}`, placement: 'top' }">
          <img class="pip-user-avatar"
            :src="owner?.profile_avatar" />
        </div>

        <div class="text-warning  d-flex justify-content-center align-items-center">
          <span class="me-1 fs-16px">{{ lead.lead_files_count }}</span>
          <i class="fs-16px pi pi-folder-open"></i>
        </div>

        <div class="text-info d-flex justify-content-center align-items-center">
          <span class="me-1 fs-16px">{{ lead.lead_subscribers_count }}</span>
          <i class="fs-16px pi pi-users"></i>
        </div>

        <div class="text-parimary d-flex justify-content-center align-items-center">
          <span class="me-1 fs-16px">{{ lead.tasks_count }}</span>
          <i class="pi pi-list-check fs-16px"></i>
        </div>

        <div class="text-warning d-flex justify-content-center align-items-center">
          <span class="me-1 fs-16px">{{ lead.confidence }}</span>
          <i class="fs-14px pi pi-star-fill"></i>
        </div>

      </div>
    </div>
  </router-link>

  <Popover ref="popoverRef">
    <div>

      <ul class="list-unstyled popovar-list mb-0">

        <li v-for="(item, index) in popovarItems"
          :key="index"
          class="d-flex justify-content-start align-items-center popovar-item cursor-pointer">

          <span class="fs-14px text-title fw-bold">{{ item.title }} :</span>

          <span class="fs-14px text-value ms-2">{{ item.value??'Not available' }}</span>

          <i v-if="item.copy && item.value"
            @click="copyClipboardHandler(item.value)"
            class="pi pi-copy text-copy pe-1 ps-2 py-1 ms-auto text-soft"></i>

        </li>

      </ul>

    </div>

  </Popover>
</template>

<style scoped
  lang="scss">
  .popovar-list {
    min-width: 15rem;

    .popovar-item {

      .text-title {
        white-space: nowrap;
        width: 5rem;
      }

      .text-copy {
        transition: opacity 0.2s ease-in-out;
        opacity: 0;
      }

      &:hover {
        .text-copy {
          opacity: 1;
        }
      }

      .text-value {}
    }
  }

  /* Relevant progress bar CSS */
  .popover-icon {
    line-height: 14px;
  }

  .bar {
    background: #ededed;
    width: 75%;
    height: 6px;
    border-radius: 5px;
  }

  .progress {
    --progress-width: 0%;
    width: var(--progress-width);
    height: 6px;
    border-radius: 5px;
    background: v-bind(progressColor);
  }

  .pip-item {
    background-color: #ffffff;
    border-radius: 8px;
    margin: 15px 0px;
    padding: 13px;
    height: 10rem;
    overflow: hidden;
    border: 1px solid var(--layout-border-color);

    .pip-title {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 225px;
      margin-bottom: 5px;
    }

    .pip-sub-title {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 3px;
      min-height: 36px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .pip-user {
      line-height: 18px;

      .pip-user-avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #f1f1f1;
        object-fit: cover;
      }

      .pip-value {
        color: #1f2933;
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1.5rem;
        margin-left: 0.5rem;
      }
    }

    .pip-source {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-left: 5rem;
    }
  }
</style>