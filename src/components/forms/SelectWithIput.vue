<template>
  <div class="custom-select position-relative" ref="customMultipleSelectRef">
    <div
      class="dropdown form-control px-0"
      @click="toggleOptionList"
      tabindex="0"
      :class="{ open: isOpen}"
    >
      <Transition>
        <div v-if="isOpen" class="assign-options position-absolute pb-5">
          <ul class="item-list">
            <li
              class="item px-3 py-1"
              v-for="(item, index) in unselectedOptionsList"
              :key="index"
              @click="selectItem(item.value ?? item)"
            >
              {{ item.value ?? item }}
            </li>
          </ul>
        </div>
      </Transition>
      <span class="selected-option custom-input">
        <input
          ref="customInutRef"
          type="text"
          :placeholder="placeholder"
          v-model="selectedOptions"
          @focus="isOpen = true"
        />
      </span>
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
    modelValue: {},
    label:{
      type:Array,
      default:null,
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOptions:null,
      searchOption: null,
      customInput: "",
      notSearch: false,
    };
  },
  watch: {
    setModelValue() {},
    selectedOptions(options) {
        this.$emit("update:modelValue", tempOptions);
        this.$emit("change", tempOptions);
    },
  },
  computed: {
    setModelValue() {
      
    },
    unselectedOptionsList() {
      
    },
  },
  mounted() {
    onClickOutside(this.$refs["customMultipleSelectRef"], (event) => {
      this.isOpen = false;
    });
  },
  methods: {
    toggleOptionList(event) {
    },
    selectItem(item) {
      this.searchOption = "";
    },
    removeItem(item) {
      
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
</style>