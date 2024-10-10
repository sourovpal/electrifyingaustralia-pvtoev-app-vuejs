<template>
  <div class="custom-select position-relative" ref="customMultipleSelectRef">
    <div
      class="dropdown form-control px-0"
      @click="toggleOptionList"
      tabindex="0"
      :class="{ open: isOpen, 'custor-pointer single-option': !multiple, small: small }"
    >
      <div v-if="multiple" class="selected-options px-2">
        <ul class="option-list d-flex flex-wrap">
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
        <div v-if="isOpen" class="assign-options position-absolute">
          <ul class="item-list">
            <li v-if="!multiple && !input" class="search-item px-2 py-0">
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
              @click="selectItem(item.value ?? item)"
            >
              {{ item.value ?? item }}
            </li>
            <li
              @click="isOpen = false"
              class="item px-3 py-1"
              v-if="!unselectedOptionsList?.length"
            >
              Empty list item.
            </li>
          </ul>
        </div>
      </Transition>

      <span
        class="selected-option"
        v-if="!multiple && !input && selectedOptions.length"
        @click="toggleOptionList"
        >{{ selectedOptions?.join(",") }}</span
      >

      <span class="selected-option custom-input" v-if="input && !multiple">
        <input
          ref="customInutRef"
          type="text"
          :placeholder="placeholder"
          v-model="selectedOptions"
          @focus="isOpen = true"
        />
      </span>

      <span
        v-if="!multiple && !input && !selectedOptions.length"
        class="selected-option"
        >{{ placeholder }}</span
      >
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
    modelValue: {
    },
    input: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOptions: [],
      searchOption: null,
      customInput: "",
      notSearch: false,
    };
  },
  watch: {
    setModelValue() {},
    selectedOptions(options) {
      var tempOptions = "";
      if (this.multiple && !this.input) {
        this.$emit("update:modelValue", this.selectedOptions);
        this.$emit("change", this.selectedOptions);
      } else {
        if (Array.isArray(options)) {
          tempOptions = options.join(",");
        } else {
          tempOptions = options;
        }

        this.$emit("update:modelValue", tempOptions);
        this.$emit("change", tempOptions);

        if (this.input) {
          this.searchOption = tempOptions;
        }
      }
    },
  },
  computed: {
    setModelValue() {
      if (!this.modelValue || typeof this.modelValue === "undefined") {
        this.selectedOptions = [];
        return this.modelValue;
      }
      if (this.modelValue && Array.isArray(this.modelValue)) {
        this.selectedOptions = this.modelValue;
      } else if (this.modelValue && !Array.isArray(this.modelValue)) {
        this.selectedOptions = [this.modelValue];
      }
      return this.modelValue;
    },
    unselectedOptionsList() {
      return this.options.filter((item) => {
        if (
          (!this.selectedOptions.includes(item?.value ?? item) &&
            !this.searchOption) ||
          ((!this.selectedOptions.includes(item?.value ?? item) ||
            this.input) &&
            (item?.value || item)
              ?.toLowerCase()
              .search(this.searchOption?.toLowerCase()) > -1)
        ) {
          return item;
        }
      });
    },
  },
  mounted() {
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
        this.selectedOptions = this.selectedOptions.concat([item]);
      } else {
        this.selectedOptions = [];
        this.selectedOptions = this.selectedOptions.concat([item]);
        this.isOpen = false;
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
  border-color: #bdbdbd !important;
  &.open {
    border-bottom: none !important;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .selected-option {
    padding: 0px 12px 0px 12px;
    box-sizing: border-box;
    &.custom-input {
      padding: 0px !important;
      input {
        width: 100%;
        outline: none;
        box-shadow: none;
        border: none;
        padding: 0px 12px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
        color: #4f4f4f;
        background-color: #fff;
      }
    }
  }
}
.option-list {
  margin: 0px;
  padding: 0px;
  list-style: none;
  margin-top: -5px;
  .option-item {
    margin-top: 5px;
    line-height: 8px;
    padding: 1px 0px 2px 8px;
    background: #dddddd;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  z-index: 9999;
  top: 100%;
}
.item-list {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #bdbdbd;
  background: #ffffff;
  margin: 0px;
  padding: 0px;
  list-style: none;
  max-height: 165px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
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
.custor-pointer {
  cursor: pointer;
}
.form-control.small {
  padding: 4px 0px;
  min-height: 28.74px;
  &.single-option{
    line-height: 18px;
  }
  .option-list {
    .option-item {
      line-height: 3px !important;
    }
    .option-search {
      height: 22.74px !important;
      margin-top: 0px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      input{
        margin-top: 5px;
      }
    }
  }
}
</style>