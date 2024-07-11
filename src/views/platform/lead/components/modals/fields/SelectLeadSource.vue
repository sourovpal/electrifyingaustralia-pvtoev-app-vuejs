<template>
  <div class="custom-select" ref="selectLeadSourceRef">
    <div
      class="dropdown px-0 position-relative"
      :class="{
        open: isOpen && filterOptions.length,
        'small-size':small
      }"
    >
      <input
        class="form-control"
        :class="{ 'form-control-sm': small }"
        ref="customInutRef"
        type="text"
        @focus="isOpen = true"
        :placeholder="placeholder"
        v-model="selectedOption"
      />

      <Transition>
        <div
          v-if="isOpen && filterOptions.length"
          class="assign-options position-absolute"
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
    small: {
      type: Boolean,
      default: false,
    },
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
  box-shadow: none !important;
  outline: none !important;
  border-color: #bdbdbd !important;
}
.assign-options {
  left: 0px;
  right: 0px;
  overflow: hidden;
  top: 100%;
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
.dropdown {
  &.open {
    .form-control {
      border-bottom: none !important;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &.small-size{
      .item-list {
        .item {
          padding: 3px 14px !important;
          font-size: 0.776rem !important;
        }
      }
    }
  }
}
</style>