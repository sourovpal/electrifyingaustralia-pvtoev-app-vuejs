<template>
  <div class="col-4 mx-auto">
    <form @submit.prevent="submitForm">
      
      <div class="mb-3" v-for="(field, index) in formFields" :key="index">
        <label :for="field.name">{{ field.label }}</label>

        <input @blur="submitForm(field.name)" class="form-control" v-if="field.type === 'text'" :type="field.type" :placeholder="field.placeholder" :name="field.name" v-model="formData[field.name]" />

        <textarea class="form-control" v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" :name="field.name" v-model="formData[field.name]"></textarea>

        <input v-else-if="field.type === 'checkbox'" :type="field.type" :name="field.name" v-model="formData[field.name]" />
        
        <input v-else-if="field.type === 'radio'" :type="field.type" :name="field.name" :value="field.value" v-model="formData[field.name]" />

        <MultipleSelectVue
        v-else-if="field.type === 'multiple-select'" 
        :name="field.name"
        @change="(value, name)=>submitForm(name, value)"
        :options="['Option 1', 'Option 2', 'Option 3', 'html', 'css', 'js', 'php', 'java', 'javascript', 'jquery']" 
        :value="formData[field.name]"
        v-model="formData[field.name]" />

        <SingleSelect
        v-else-if="field.type === 'select'" 
        :name="field.name"
        @change="(value, name)=>submitForm(name, value)"
        :options="['Option 1', 'Option 2', 'Option 3', 'html', 'css', 'js', 'php', 'java', 'javascript', 'jquery']" 
        :value="formData[field.name]"
        v-model="formData[field.name]" />

      </div>
      <button type="submit">Submit</button>
    </form>
    <pre>{{ formData }}</pre>

  </div>
</template>

<script>
import MultipleSelectVue from './forms/MultipleSelect.vue';
import SingleSelect from './forms/SingleSelect.vue';
export default {
  components:{
    MultipleSelectVue,
    SingleSelect,
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      formFields: [
        { name: "fullName", label: "Full Name", type: "text", placeholder: "Type name" },
        { name: "email", label: "Email", type: "text", placeholder: "Type email" },
        { name: "message", label: "Message", type: "textarea", placeholder: "Type your message" },
        { name: "subscribe", label: "Subscribe to newsletter", type: "checkbox" },
        { name: "gender", label: "Gender", type: "radio", value: "male" },
        { name: "gender", label: "Gender", type: "radio", value: "female" },
        { name: "country", label: "Country", type: "select", options: ["USA", "Canada", "UK", "Australia"] },
        { name: "languages", label: "Languages", type: "multiple-select", options: ["English", "French", "Spanish", "German"] }
      ],
      formData: {
        "fullName": "sourovpal",
        "email": "admin1234@gmail.com",
        "message": "Hello Sourov",
        "subscribe": true,
        languages: [
          "html",
          "Option 1"
        ]
      },
    };
  },
  watch:{
    selectedOption(v){
      console.log(selectedOption);
    }
  },
  methods: {
    submitForm(name, value=null) {
        console.log(name, this.formData[name]);
      // Handle form submission logic here
      console.log("Form submitted with data:", this.formData);
    },
    handleSelect(selectedOptions) {
      console.log('Selected options:', selectedOptions);
      // Do something with the selected options
    }
  }
};
</script>
