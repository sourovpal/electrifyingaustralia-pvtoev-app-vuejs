<script setup>
import { onClickOutside } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";

const props = defineProps({
  uniqueId: {
    type: String,
    default: "free_text",
  },
  modelValue: {
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "Lable Name",
  },
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["change", "update:modelValue"]);
const selectedOptions = ref([]);
const multipleChooseRef = ref();
const searchOption = ref(null);
const searchOptionRef = ref();
const isOpen = ref(false);

watchEffect(() => {
  if (Array.isArray(props.modelValue) && props.modelValue) {
    selectedOptions.value = props.modelValue;
  } else if (props.modelValue) {
    selectedOptions.value = [props.modelValue];
  } else {
    selectedOptions.value = [];
  }
});

const unSelectedOptionsList = computed(() => {
  return props.options.filter((item) => {
    var search = item?.value
      ?.toLowerCase()
      .search(searchOption.value?.toLowerCase());
    if (
      (!selectedOptions.value?.includes(item?.value) && search > -1) ||
      (!searchOption.value && !selectedOptions.value?.includes(item?.value))
    ) {
      return item;
    }
  });
});

function selectNewOption(e) {
  if (props.multiple) {
    if (selectedOptions.value.includes(e)) {
      var index = selectedOptions.value.indexOf(e);
      if (index > -1) {
        selectedOptions.value.splice(index, 1);
      }
    } else {
      selectedOptions.value.push(e);
    }
  } else {
    selectedOptions.value = [e];
  }

  if (props.multiple) {
    emits("update:modelValue", selectedOptions.value);
    emits("change", selectedOptions.value);
  } else {
    emits("update:modelValue", selectedOptions.value?.join(","));
    emits("change", selectedOptions.value?.join(","));
  }
  searchOption.value = null;
  searchOptionRef.value?.focus();
}

function showSearchInput() {
  isOpen.value = true;
  setTimeout(() => {
    searchOptionRef.value?.focus();
  }, 100);
}

onClickOutside(multipleChooseRef, (e) => {
  isOpen.value = false;
});
</script>

<template>
  <div
    class="multiple-select"
    :class="{ open: isOpen }"
    ref="multipleChooseRef"
    @click="showSearchInput"
  >
    <label class="fs-14px text-soft d-block" :for="uniqueId">{{ label }}</label>

    <div class="selected-options" :class="{ 'cursor-pointer': !multiple }">
      <ul class="option-list d-flex flex-wrap">
        <li
          class="option-item-empty text-soft fw-bold"
          v-if="
            (!selectedOptions?.length && !isOpen && multiple) ||
            (!selectedOptions?.length && !multiple)
          "
        >
          —
        </li>
        <li class="single-choose-option text-head" v-if="!multiple">
          {{ selectedOptions?.join(",") }}
        </li>
        <li
          v-else
          class="option-item text-head"
          v-for="(option, index) in selectedOptions"
          :key="index"
        >
          {{ option }}
          <span class="remove-btn" @click="selectNewOption(option)"
            >&times;</span
          >
        </li>
        <li v-if="multiple" class="option-search">
          <input
            v-show="isOpen"
            ref="searchOptionRef"
            type="text"
            placeholder="Search..."
            v-model="searchOption"
            @focus="isOpen = true"
          />
        </li>
      </ul>
    </div>

    <div v-if="isOpen" class="un-selected-options">
      <ul class="option-list">
        <li v-if="!multiple" class="search-option">
          <input
            ref="searchOptionRef"
            type="text"
            v-model="searchOption"
            placeholder="Search..."
          />
        </li>
        <li
          v-for="(option, index) in unSelectedOptionsList"
          :key="index"
          class="option-item px-2 text-head fs-14px fw-bold"
          @click="selectNewOption(option.value)"
        >
          {{ option.value }}
        </li>
        <li
          v-show="!unSelectedOptionsList?.length"
          class="option-item px-2 text-head fs-14px fw-bold"
        >
          Not Found.
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.multiple-select {
  position: relative;
}

.selected-options {
  border: 1px solid #bdbdbd !important;
  border-radius: 3px;
  backdrop-filter: #f5f7fa;
  &:hover {
    background: #ffffff;
  }
  &.cursor-pointer {
    cursor: pointer;
  }
  .option-item-empty {
    padding: 0px 0px 1px 10px;
    font-size: .775rem;
    margin-top: 4px;
  }
  .single-choose-option {
    line-height: 22.78px;
    margin-top: 5px;
    padding: 0px 0px 0px 8px;
    font-size: 0.775rem;
    font-weight: bold;
  }
  .option-list {
    list-style: none;
    padding: 2px 3px 2px 3px;
    margin: 0;
    margin-top: -5px;
    display: flex;
    flex-wrap: wrap;
    .option-item {
      margin-top: 5px;
      line-height: 8px;
      padding: 5.5px 0px 7px 8px;
      background: #dddddd;
      border-radius: 2px;
      font-size: 0.775rem;
      margin-right: 5px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;

      .remove-btn {
        padding: 6px 8px 6px 6px;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .option-search {
      flex-grow: 1;
      margin-top: 3px;
      height: 24px;
      input {
        border: none;
        outline: none;
        box-shadow: none;
        width: 100%;
        height: 100%;
        font-size: 14px;
        padding: 0px 0px 0px 4px;
        background: transparent;
      }
    }
  }
}

.un-selected-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  width: 100%;
  border: 1px solid #bdbdbd !important;
  border-top: none !important;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  max-height: 130px;
  overflow: auto;
  z-index: 99;
  .search-option {
    border-bottom: 1px solid #bdbdbd;
    input {
      border: none;
      outline: none;
      width: 100%;
      margin: 0px;
      padding: 0px 5px;
    }
  }
  .option-list {
    margin: 0px;
    padding: 0px;
    list-style: none;
    .option-item {
      cursor: pointer;
      &:hover {
        background: #dddddd;
      }
    }
  }
}

.multiple-select.open {
  .selected-options {
    background: #ffffff;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
}
.multiple-select:not(.open) {
  .selected-options {
    max-height: 28.5px !important;
    overflow: hidden;
  }
}
</style>