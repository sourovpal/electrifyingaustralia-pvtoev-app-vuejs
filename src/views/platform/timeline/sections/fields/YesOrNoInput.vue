<script setup>
import { defineProps, ref, watchEffect } from "vue";
const props = defineProps({
  modelValue: {},
  small: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default:null,
  },
});
const emits = defineEmits(["change", "update:modelValue"]);
const stage = ref("");

watchEffect(() => {
  if (props.modelValue) {
    stage.value = props.modelValue;
  } else {
    stage.value = "";
  }
});

function manageYesOrNoHandler(val) {
  stage.value = val;
  emits("update:modelValue", stage.value);
  emits("change", stage.value);
}
</script>

<template>
  <label v-if="label" class="fs-14px text-soft d-block">{{ label }}</label>
  <div class="tri-state-toggle" :class="{ 'small-btn': small }">
    <button
      class="tri-state-toggle-button text-head"
      @click="manageYesOrNoHandler('yes')"
      :class="{ active: stage === 'yes' }"
    >
      Yes
    </button>
    <button
      class="tri-state-toggle-button text-head"
      @click="manageYesOrNoHandler('')"
      :class="{ active: stage === '' }"
    >
      Reset
    </button>
    <button
      class="tri-state-toggle-button text-head"
      @click="manageYesOrNoHandler('no')"
      :class="{ active: stage === 'no' }"
    >
      No
    </button>
  </div>
</template>

<style scoped lang="scss">
.tri-state-toggle {
  background: rgba(165, 170, 174, 0.25);
  box-shadow: inset 0 2px 8px 0 rgba(165, 170, 174, 0.25);
  border-radius: 24px;
  display: inline-flex;
  overflow: hidden;
  display: inline-flex;
  flex-direction: row;
  transition: all 500ms ease;
}
.tri-state-toggle-button {
  border-radius: 22px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  background-color: transparent;
  border: 0px solid transparent;
  margin: 2px;
  color: #727c8f;
  cursor: pointer;
  transition: all 0.5s ease;
  flex-grow: 1;
  &.active {
    font-weight: bold;
    background-image: linear-gradient(
      -180deg,
      #fff 0%,
      #fafafa 81%,
      #f2f2f2 100%
    );
    border: 1px solid rgba(207, 207, 207, 0.6);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in;
  }
  
  &:focus {
    outline: none;
  }
}
.tri-state-toggle {
  &.small-btn {
    border-radius: 16px;
    width: 100%;
    button {
      height: 24px;
      width: 65px;
    }
  }
}
</style>