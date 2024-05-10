<template>
  <div class="custom-select" @click="toggleDropdown">
    <div class="selected-items  py-2 " style="border: 1px solid #dddddd;">
      <div v-for="(option, index) in selectedOptions" :key="index" class="selected-item">
        {{ option }} <span @click.stop="removeOption(option)" class="remove">x</span>
      </div>
    </div>
    <div class="dropdown" v-show="isOpen">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="toggleOption(option)"
        :class="{ 'selected': isSelected(option) }"
        class="dropdown-item"
      >
        {{ option }}
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
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOptions: this.value
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleOption(option) {
      const index = this.selectedOptions.indexOf(option);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      } else {
        this.selectedOptions.push(option);
      }
      this.$emit('update:modelValue', this.selectedOptions);
    },
    isSelected(option) {
      return this.selectedOptions.includes(option);
    },
    removeOption(option) {
      const index = this.selectedOptions.indexOf(option);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
        this.$emit('update:modelValue', this.selectedOptions);
      }
    }
  },
  watch: {
    value(newValue) {
      this.selectedOptions = newValue;
      console.log(newValue)
    }
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  display: block;
  width: 100%;
  padding:5px;

}

.selected-items {
  display: flex;
  flex-wrap: wrap;
}

.selected-item {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.selected-item:hover {
  background-color: #f0f0f0;
}

.selected-item .remove {
  margin-left: 5px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
}

.dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown-item.selected {
  background-color: #007bff;
  color: #fff;
}
</style>