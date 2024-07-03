<template>
  <div class="custom-select position-relative" ref="customMultipleSelectRef">
    <div
      class="dropdown form-control px-0"
      @click="toggleOptionList"
      tabindex="0"
      :class="{ open: isOpen, 'form-control-sm': multiple }"
    >
      <div class="selected-options px-2">
        <ul v-if="multiple" class="option-list d-flex flex-wrap">
          <li
            class="option-item"
            v-for="(option, index) in selectedOptions"
            :key="index"
          >
            {{ option }}
            <span class="remove-btn" @click="removeItem(option)">&times;</span>
          </li>
          <li class="option-search">
            <input
              type="text"
              placeholder=""
              v-model="searchOption"
              @focus="isOpen = true"
              @blur="isOpen = false"
            />
          </li>
        </ul>
      </div>
      <Transition>
        <div v-if="isOpen" class="assign-options position-absolute pb-5">
          <ul class="item-list">
            <li v-if="!multiple" class="search-item px-2 py-0">
              <input
                type="text"
                placeholder="Search..."
                v-model="searchOption"
              />
            </li>
            <li
              class="item px-3 py-1"
              v-for="(item, index) in unselectedOptionsList"
              :key="index"
              @click="selectItem(item.value)"
            >
              {{ item.value }}
            </li>
            <li class="item px-3 py-1" v-if="!unselectedOptionsList?.length">
              Empty list item.
            </li>
          </ul>
        </div>
      </Transition>

      <span
        class="selected-option"
        v-if="!multiple && selectedOptions.length"
        @click="toggleOptionList"
        >{{ selectedOptions?.join(",") }}</span
      >
      <span v-if="!multiple" class="selected-option">{{ placeholder }}</span>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
  },
  data() {
    return {
      isOpen: false,
      selectedOptions: [],
      searchOption: null,
    };
  },
  watch: {
    modelValue() {
      if (this.modelValue && Array.isArray(this.modelValue)) {
        this.selectedOptions = this.modelValue;
      } else if (this.modelValue && !Array.isArray(this.modelValue)) {
        this.selectedOptions = [this.modelValue];
      }
    },
  },
  computed: {
    unselectedOptionsList() {
      return this.options.filter((item) => {
        if (
          (!this.selectedOptions.includes(item.value) && !this.searchOption) ||
          (!this.selectedOptions.includes(item.value) &&
            item.value.toLowerCase().search(this.searchOption.toLowerCase()) >
              -1)
        ) {
          return item;
        }
      });
    },
  },
  mounted() {
    if (this.modelValue && Array.isArray(this.modelValue)) {
      this.selectedOptions = this.modelValue;
    } else if (this.modelValue && !Array.isArray(this.modelValue)) {
      this.selectedOptions = [this.modelValue];
    }
    onClickOutside(this.$refs["customMultipleSelectRef"], (event) => {
      this.isOpen = false;
    });
  },
  methods: {
    toggleOptionList(event) {
      if (!this.multiple && event.target === event.currentTarget) {
        this.isOpen = !this.isOpen;
      }
    },
    selectItem(item) {
      if (this.multiple) {
        this.selectedOptions.push(item);
        this.$emit("update:modelValue", this.selectedOptions);
        this.$emit("change", this.selectedOptions);
      } else {
        this.selectedOptions = [];
        this.selectedOptions.push(item);
        this.isOpen = false;
        this.$emit("update:modelValue", item);
        this.$emit("change", item);
      }
      this.searchOption = "";
    },
    removeItem(item) {
      if (this.selectedOptions.includes(item)) {
        var index = this.selectedOptions.indexOf(item);
        this.selectedOptions.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.form-control {
  min-height: 35.77px;
  box-shadow: none !important;
  cursor: text;
  &.open {
    border-bottom: none !important;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .selected-option {
    padding: 0px 0px 0px 12px;
  }
}
.option-list {
  margin: 0px;
  padding: 0px;
  list-style: none;
  margin-top: -5px;
  .option-item {
    margin-top: 5px;
    line-height: 12px;
    padding: 6px 0px 6px 8px;
    background: #dddddd;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 5px;
    .remove-btn {
      padding: 6px 8px 6px 4px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .option-search {
    flex-grow: 1;
    margin-top: 5px;
    input {
      border: none;
      outline: none;
      box-shadow: none;
      width: 100%;
      height: 100%;
      font-size: 14px;
      padding: 3.5px 0px;
    }
  }
}
.assign-options {
  left: -1px;
  right: -1px;
  overflow: hidden;
  top: 35px;
  z-index: 9999;
}
.item-list {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #bdbdbd;
  background: #ffffff;
  margin: 0px;
  padding: 0px;
  list-style: none;
  max-height: 175px;
  overflow: auto;
  .item {
    cursor: pointer;
    &:hover {
      background: #dddddd;
    }
  }
  .search-item {
    border-bottom: 1px solid #bdbdbd;
    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 6px 6px;
    }
  }
}
</style>