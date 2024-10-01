<template>
  <div class="custom-select position-relative"
    ref="selectObjectRef">
    <div class="dropdown form-control px-0"
      tabindex="0"
      :class="{ open: isOpen, loading:(loading || disabled) }">

      <div v-if="loading"
        class="loader">
        <svg-custom-icon icon="SpinnerIcon" />
      </div>

      <span v-else
        class="selected-option custom-input">
        <input ref="customInutRef"
          type="text"
          :readonly="true"
          @click="isOpen = !isOpen"
          :placeholder="placeholder"
          :value="fetchValue(selectedOption)" />
      </span>

      <Transition>
        <div v-if="isOpen"
          class="assign-options position-absolute pb-5">
          <ul class="item-list">
            <li class="search-item px-2 py-0">
              <input type="text"
                placeholder="Search..."
                v-model="searchOption" />
            </li>
            <li class="item px-3 py-1"
              v-for="(option, index) in filterOptions"
              :key="index"
              @click="selectOptionHandler(option)">
              {{ fetchValue(option) }}
            </li>
            <li v-if="!filterOptions.length"
              class="item px-3 py-1">
              Not Data Found.
            </li>
          </ul>
        </div>
      </Transition>
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
      selected: {
        default: null,
      },
      label: {
        type: String,
        default: "value",
      },
      returnValue: {
        type: String,
        default: null,
      },
      loading: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
    },
    data() {
      return {
        isOpen: false,
        selectedOption: null,
        searchOption: null,
      };
    },
    watch: {
      selectedObject(n) {
        if (n === null) {
          this.selectedOption = null;
        }
      },
    },
    computed: {
      selectedObject() {
        return this.selected;
      },
      filterOptions() {
        return this.options.filter((item) => {
          var search =
            item[this.label]
              ?.toLowerCase()
              .search(this.searchOption?.toLowerCase()) > -1;
          if (search) {
            return item;
          }
        });
      },
    },
    mounted() {
      onClickOutside(this.$refs["selectObjectRef"], (event) => {
        this.isOpen = false;
      });
    },
    methods: {
      selectOptionHandler(option) {
        if (this.returnValue && option) {
          this.$emit("update:modelValue", option[this.returnValue]);
          this.$emit("change", option[this.returnValue]);
        } else {
          this.$emit("update:modelValue", option);
          this.$emit("change", option);
        }
        this.selectedOption = option;
        this.isOpen = false;
      },
      fetchValue(option) {
        if (option) {
          return option[this.label];
        }
        return null;
      },
    },
  };
</script>

<style lang="scss"
  scoped>
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
          cursor: pointer;
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
    max-height: 176px;
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

  .dropdown.loading {
    cursor: no-drop;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #e9ebee !important;
      border-radius: 3px;
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 9999;
    text-align: center;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>