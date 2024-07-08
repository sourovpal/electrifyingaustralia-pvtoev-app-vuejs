<template>
  <div class="custom-select position-relative" ref="selectLeadSourceRef">
    <div
      class="dropdown form-control px-0"
      tabindex="0"
      :class="{ open: isOpen && filterOptions.length }"
    >
      <span class="selected-option custom-input">
        <input
          ref="customInutRef"
          type="text"
          @focus="isOpen = true"
          :placeholder="placeholder"
          v-model="selectedOption"
        />
        <span
          class="clear-input"
          v-if="selectedOption"
          @click="clearInputField(null)"
          >&times;</span
        >
      </span>

      <Transition>
        <div
          v-if="isOpen && filterOptions.length"
          class="assign-options position-absolute pb-5"
        >
          <ul class="item-list">
            <li
              class="item px-3 py-1"
              v-for="(option, index) in filterOptions"
              :key="index"
              @click="selectOptionHandler(option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>
  
  <script>
import { onClickOutside } from "@vueuse/core";
import { watchEffect } from "vue";
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
    modelValue: {},
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      searchOption: null,
    };
  },
  watch: {
    modelValue(n) {
      this.selectedOption = n;
    },
  },
  computed: {
    filterOptions() {
      return this.options.filter((item) => {
        var search =
          item.toLowerCase().search(this.selectedOption?.toLowerCase()) > -1;
        if (search) {
          return item;
        }
      });
    },
  },
  mounted() {
    onClickOutside(this.$refs["selectLeadSourceRef"], (event) => {
      this.$emit("update:modelValue", this.selectedOption);
      this.$emit("change", this.selectedOption);
      this.isOpen = false;
    });
  },
  methods: {
    selectOptionHandler(option) {
      this.$emit("update:modelValue", option);
      this.$emit("change", option);
      this.selectedOption = option;
      this.isOpen = false;
    },
    clearInputField(option) {
      this.selectedOption = option;
      this.$emit("update:modelValue", option);
      this.$emit("change", option);
      this.isOpen = true;
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
    position: relative;
    &.custom-input {
      padding: 0px !important;
      input {
        width: 100%;
        outline: none;
        box-shadow: none !important;
        border: none;
        padding: 0px 12px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
        color: #4f4f4f;
        background-color: #fff;
      }
    }
    .clear-input {
      position: absolute;
      right: 5px;
      font-size: 20px;
      top: 48%;
      transform: translateY(-50%);
      padding: 6px 8px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
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
      box-shadow: none !important;
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
  top: 34px;
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
  max-height: 178px;
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
</style>