<template>
    <div class="custom-select dropdown" @click="toggleDropdown">

      <div v-if="!selectedOptionLabel && usebg && !isEdit" class="form-control form-control-sm" :class="{bg:usebg}" @click="isEdit=!isEdit">
        <span class="fw-bold text-head d-flex align-items-center">–</span>
      </div>

      <input v-else class="form-control cursor-pointer form-control-sm fw-bold text-head" :class="{bg:usebg}" data-mdb-toggle="dropdown" :value="selectedOptionLabel" readonly>
  
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
        usebg: {
          type: Boolean,
          default:false,
        },
    },
    data() {
      return {
        isOpen: false,
        selectedOption:this.value,
        selectedOptionLabel: null,
        isEdit:false,
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
        this.isEdit = true;
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
  .form-control{
    &.bg{
      background-color: #f5f7fa;
      border-color:rgba(189, 189, 189, 0.55);
    }
    &:hover{
      background-color: #ffffff;
    }
  }
  .dropdown-menu{
    max-height:155px;
    overflow-y: auto;
    user-select: none;
  }
</style>