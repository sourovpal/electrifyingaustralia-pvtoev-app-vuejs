<template>
    <div class="custom-select dropdown" @click="toggleDropdown">

      <input class="form-control cursor-pointer form-control-sm fw-bold text-head" data-mdb-toggle="dropdown" :value="selectedOptionLabel" readonly>
  
      <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-">
          <div
            v-for="(option, index) in options"
            :key="index"
            @click="toggleOption(option?.value??option)"
            :class="{ 'selected active': isSelected(option?.value??option, option?.label??option) }"
            class="dropdown-item text-hard fw-bold fs-14px d-flex py-1"
          >
          {{ option?.label??option?.value??option }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default:'select',
        },
    },
    data() {
      return {
        isOpen: false,
        selectedOption:this.value,
        selectedOptionLabel: null,
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      toggleOption(option) {
        if(this.selectedOption == option){
          this.selectedOptionLabel = this.selectedOption = null;
        }else{
          this.selectedOption = option;
        }
        this.$emit('update:modelValue', this.selectedOption);
        this.$emit('change', this.name, this.selectedOption);
      },
      isSelected(option, label=null) {
        if(this.selectedOption == option){
          this.selectedOptionLabel = label??option;
          return true;
        }
      },
    },
    watch: {
      value(newValue) {
        this.selectedOptionLabel = null;
        this.selectedOption = newValue;
      },
    }
  };
  </script>
  
  <style scoped>
  .dropdown-menu{
    max-height:155px;
    overflow-y: auto;
    user-select: none;
  }
</style>