<template>
    <div class="custom-select" @click="toggleDropdown">
      <div class="selected-options">
        <div v-for="(option, index) in selectedOptions" :key="index" class="selected-option">
          {{ option }}
          <span class="remove-option" @click.stop="removeOption(option)">x</span>
        </div>
      </div>
      <ul v-if="isOpen" class="dropdown">
        <li v-for="(option, index) in options" :key="index">
          <input type="checkbox" :id="'option_' + index" :value="option" v-model="selectedOptions">
          <label :for="'option_' + index">{{ option }}</label>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isOpen: true,
        selectedOptions: []
      };
    },
    watch:{
        selectedOptions(val){
            console.log(val)
        }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      removeOption(optionToRemove) {
        this.selectedOptions = this.selectedOptions.filter(option => option !== optionToRemove);
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 200px; /* Adjust as needed */
    cursor: pointer;
  }
  
  .selected-options {
    border: 1px solid #ccc;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
  }
  
  .selected-option {
    background-color: #f0f0f0;
    margin-right: 5px;
    padding: 2px 5px;
    border-radius: 5px;
  }
  
  .remove-option {
    cursor: pointer;
    margin-left: 5px;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1000;
  }
  
  .dropdown li {
    padding: 5px;
  }
  
  .dropdown li:hover {
    background-color: #f0f0f0;
  }
  </style>