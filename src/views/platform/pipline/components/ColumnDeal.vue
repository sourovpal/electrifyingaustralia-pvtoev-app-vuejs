<script setup>
import { ref } from "vue";

import { formatLeadAddress } from "@helpers";

defineOptions({
  inheritAttrs: false,
});

const popoverRef = ref(null);

const toggle = (event) => {
    popoverRef.value.toggle(event);
}

const props = defineProps({
  lead: { type: Object, default: {} },
});
</script>

<template>
  <router-link draggable="true" :to="`/platform/deals/${lead.lead_id}`">
    <div class="pip-item">
      <div class="d-flex jsutify-content-between align-items-center">
        <h5 class="pip-title text-head">
          {{
            lead.lead_title ??
            lead.primary_contact?.full_name ??
            "Title not added yet."
          }}
        </h5>

        <div @click.prevent="toggle" class="px-1 py-1 popover-icon">
          <span class="pi pi-info-circle text-soft"></span>
        </div>
      </div>

      <p class="pip-sub-title">
        <!-- v-html="formatLeadAddress(lead, `<i class='text-soft'>Address not added yet.</i>`)" -->
        Ms. Sharma 2234 NSW 31/10/6:00 PM Phone (IN)
      </p>

      <div class="d-flex justify-content-between align-items-center">
        <div class="bar">
          <div class="progress"></div>
        </div>
        <span>85%</span>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div class="pip-value">${{ lead?.estimated_value ?? 0.0 }}</div>
        <div class="pip-source text-soft">
          {{ lead?.source?.title ?? "Not added yet" }}
        </div>
      </div>

      <div
        class="pip-user d-flex justify-content-between align-items-center mt-1"
      >
        <div>
          <img class="pip-user-avatar" :src="lead?.owner?.profile_avatar" />
        </div>

        <div class="text-warning">
          <span class="me-1">5</span>
          <font-awesome-icon
            icon="fas fa-folder-open"
            class="fs-14px"
          ></font-awesome-icon>
        </div>

        <div class="text-parimary">
          <span class="me-1">5</span>
          <font-awesome-icon
            icon="fas fa-list-check"
            class="fs-14px"
          ></font-awesome-icon>
        </div>

        <div class="text-info">
          <span class="me-1">5</span>
          <font-awesome-icon
            icon="fas fa-users"
            class="fs-14px"
          ></font-awesome-icon>
        </div>

        <div class="text-warning">
          <span class="me-1">5</span>
          <font-awesome-icon
            icon="fas fa-star"
            class="fs-14px"
          ></font-awesome-icon>
        </div>

        <!-- <div class="fs-16px star-value d-flex justify-content-start align-items-center"
                    :class="{'text-soft':!lead.confidence}">
                    <span class="me-1">{{ lead.confidence }}</span> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 0 24 24"
                        width="16px"
                        :fill="`#${lead.confidence?'de911d':'8094ae'}`"
                        class="icon icon--star icon--inline">
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                        </path>
                    </svg> -->
        <!-- </div> -->
      </div>
    </div>
  </router-link>

  <Popover ref="popoverRef">
    <div class="flex flex-col gap-4">
      <div>
        <span class="font-medium block mb-2">Team Members</span>
      </div>
    </div>
  </Popover>
</template>

<style scoped
    lang="scss">
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
  width: 50%;
  height: 6px;
  border-radius: 5px;
  background: #3498db;
  /* background: -webkit-linear-gradient(to right, #f47c34, #e03f97);
        background: -o-linear-gradient(to right, #f47c34, #e03f97);
        background: -moz-linear-gradient(to right, #f47c34, #e03f97);
        background: -ms-linear-gradient(to right, #f47c34, #e03f97); */
  /* background: linear-gradient(to right, #1fff9a, #63ffb9); */
  /* -webkit-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
        -moz-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
        -o-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
        -ms-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
        transition: 600ms cubic-bezier(0.6, 0, 0.38, 1); */
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

    .star-value {
      color: #de911d;
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