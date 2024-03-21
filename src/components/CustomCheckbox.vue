<script>
    export default {
        props: {
            modelValue:{},
            type:{default:'checkbox'},
            value:{default:''},
        },
        computed:{
            model:{
                get(e) {
                    if(typeof this.modelValue === 'object'){
                        var index = this.modelValue.indexOf(this.value);
                        if(index > -1){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        if((this.value != "" && this.modelValue == "") || 
                        (this.value == "" && this.modelValue != "") || 
                        (this.value === this.modelValue)){
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                set(value) {
                    if(typeof this.modelValue === 'object'){
                        var index = this.modelValue.indexOf(this.value);
                        if(index > -1){
                            this.modelValue.splice(index, 1);
                        }else{
                            this.modelValue.push(this.value);
                            this.$emit('update:modelValue', this.modelValue);
                        }
                    }else{
                        if(this.value){
                            this.$emit('update:modelValue', this.value);;
                        }else {
                            this.$emit('update:modelValue', value);
                        }
                    }
                },
            },
        },
    };
    </script>

<template>
    <label class="custom-form-checkbox btn btn-floating btn-light">
        <input :type="type" :value="value" v-model="model">
        <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
        <!-- <svg class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> -->
        <svg class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
        <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-440h400v-80H280v80Zm-80 320q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> -->
    </label>
</template>
