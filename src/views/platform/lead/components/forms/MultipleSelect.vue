<template>
  <div class="custom-select dropdown position-relative">

    <div v-if="!selectedOptions?.length && usebg && !isOpen && !isEdit" @click="isEdit=!isEdit"
    class="form-control form-control-sm form-control-tags-input" :class="{bg:usebg}">
      <span class="fw-bold text-head d-flex justify-content-center align-items-center">–</span>
    </div>

    <div v-else class="form-control form-control-sm form-control-tags-input px-1" :class="{active:isOpen, bg:usebg}" @click="toggleDropdown">
      <label v-for="(option, index) in selectedOptions" :key="index" class="tag-lable text-head">
        {{ option }} <span @click.stop="removeOption(option)" class="close-tag">&times;</span>
      </label>
    </div>


    <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-" v-show="isOpen" :class="{show:isOpen}" @click="(e)=>e.stopPropagation()">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="toggleOption(option?.value??option )"
          :class="{ 'selected active': isSelected(option?.value??option ) }"
          class="dropdown-item text-hard fw-bold fs-14px d-flex py-1"
        >
        {{ option?.value??option  }}
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
      type: Array,
      default: () => []
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
      selectedOptions: this.value,
      isEdit:false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.isEdit = false;
    },
    toggleOption(option) {
      const index = this.selectedOptions.indexOf(option);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      } else {
        this.selectedOptions.push(option);
      }
      this.$emit('update:modelValue', this.selectedOptions);
      this.$emit('change', this.name,  this.selectedOptions);
    },
    isSelected(option) {
      return this.selectedOptions.includes(option);
    },
    removeOption(option) {
      const index = this.selectedOptions.indexOf(option);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
        this.$emit('update:modelValue', this.selectedOptions);
        this.$emit('change', this.name,  this.selectedOptions);
      }
    }
  },
  watch: {
    value(newValue) {
      this.selectedOptions = newValue;
    },
  }
};
</script>

<style scoped lang="scss">
.dropdown-menu{
  max-height:155px;
  overflow-y: auto;
  user-select: none;
}
.form-control-tags-input{
  min-height: 28.75px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  cursor: pointer;
  &.bg{
    background-color: #f5f7fa;
    border-color:rgba(189, 189, 189, 0.55);
  }
  &:hover{
    background-color: #ffffff;
  }
  &.active{
    border-color: #3b71ca;
    box-shadow: inset 0 0 0 1px #3b71ca;
  }
  .tag-lable{
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #d3d3d3;
    padding: 2px 8px;
    border-radius: 2px;
    background: #eaedf1;
    line-height: 13.77px;
    margin: 3px 6px 3px 0px;
    user-select: none;
    .close-tag{
      font-size: 20px;
      font-weight: bold;
      position: relative;
      top: 2px;
      margin-left: 5px;
      cursor: pointer;
      padding: 0px 2px;
      transition: all 0.2s ease-in-out;
      line-height: 10px;
      display: none;
      &:hover{
        color:rgb(255, 34, 68);
      }
    }
  }
}
.search-tags-list{
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 600;
      margin-top:5px;
      user-select: none;
      &:hover{
        background-color: rgb(0 38 113 / 6%);
        cursor: pointer;
      }
    }
  }
}
</style>