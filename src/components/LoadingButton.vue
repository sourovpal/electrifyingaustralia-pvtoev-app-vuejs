<script setup>
  import { defineProps, effect, ref, useAttrs, defineEmits } from "vue";

  const props = defineProps({
    title: {
      type: String,
      default: "Submit",
    },
    loadingText: {
      type: String,
      default: "Submitting...",
    },
    isLoading: {
      type: [Boolean, Number, String],
      default: false,
    },
    type: {
      type: String,
      default: "submit",
    },
    disabled: {
      type: [Boolean, Number, String],
      default: false,
    },
    size: {
      type: String,
      default: ''
    }
  });

  const emits = defineEmits(["submit", "click"]);
  const attrs = useAttrs();

  const isLoadingBtn = ref(false);
  effect(() => {
    if (props.isLoading) {
      isLoadingBtn.value = true;
    } else {
      setTimeout(() => {
        isLoadingBtn.value = false;
      }, 500);
    }
  });

  function submitHandler() {
    emits('submit');
    emits('click');
  }


</script>

<template>
  <button :disabled="(disabled || isLoadingBtn)"
    class="btn btn-primary px-3 d-flex justify-content-center align-items-center"
    :type="type"
    :class="size"
    @click="submitHandler"
    v-bind="attrs">
    <div v-if="isLoadingBtn">
      <svg class="spinner-btn"
        viewBox="0 0 50 50"
        style="width: 20px; height: 20px; margin-left: 0px">
        <circle style="stroke: #ffffff"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"></circle>
      </svg>
      <span class="text-white">{{ loadingText }}</span>
    </div>
    <slot v-else>
      <span class="text-white">{{ title }}</span>
    </slot>
  </button>
</template>

<style lang="scss"
  scoped>
  button {
    white-space: nowrap;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  .spinner-btn {
    animation: rotate 2s linear infinite;
    width: 25px;
    height: 25px;
    margin-right: 6px;
    margin-left: -25px;

    &>.path {
      stroke: #1f71ff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }
</style>