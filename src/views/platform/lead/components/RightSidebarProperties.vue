<script>
    import MultipleSelectVue from '../../../../components/forms/MultipleSelect.vue';
    import SingleSelect from '../../../../components/forms/SingleSelect.vue';
    import {LeadPropertieUpdate} from '../../../../actions/LeadAction';
    export default {
        components:{
            MultipleSelectVue,
            SingleSelect,
        },
        data() {
            return {
                leadProperties:[],
                formData:{},
            }
        },
        watch: {
            "$store.state.lead.leadProperties"(payload){
                this.leadProperties = payload;
            },
            "$store.state.lead.leadCustomProperties"(payload){
                this.formData = {};
                this.formData = payload??{};
            },
        },
        methods: {
            manageYesOrNoHandler(action, unique_id){
                if(action == 'yes'){
                    this.formData[unique_id] = 1;
                }else if(action == 'no'){
                    this.formData[unique_id] = -1;
                }else{
                    this.formData[unique_id] = "";
                }
                this.updateLeadCustomPropertieHandler(unique_id);
            },
            async updateLeadCustomPropertieHandler(unique_id, value=null){
                var leadId = this.$route.params?.id??null;
                if(Object.keys(this.formData).includes(unique_id)){
                    var data = {
                        propertie:{
                            key:unique_id, 
                            value:this.formData[unique_id]
                        },
                        lead_id:leadId,
                    };
                    const res = await LeadPropertieUpdate(data);
                }
            }
        },
        mounted() {
            this.formData = {};
            this.leadProperties = this.$store.getters.getLeadProperties;
            this.formData = this.$store.getters.getLeadCustomProperties??{};
        },
    }
</script>

<template>
    
    <div class="mb-1 lead-propertie-input" v-for="(field, index) in leadProperties" :key="index">

        <label class="fs-12px text-soft d-block mb-1" :for="field?.name">{{ field?.label }}</label>



        <input  
        v-if="field?.data_type_id === 'free_text' || field?.data_type_id === 'read_only'" 
        class="form-control" type="text"
        @blur="updateLeadCustomPropertieHandler(field.unique_id)"
        :name="field?.unique_id"
        v-model="formData[field.unique_id]" />




        <input  
        v-else-if="field?.data_type_id === 'real_number'" 
        class="form-control" type="number" 
        @blur="updateLeadCustomPropertieHandler(field.unique_id)"
        :name="field?.unique_id" 
        v-model="formData[field.unique_id]" />





        <input  
        v-else-if="field?.data_type_id === 'date'" 
        class="form-control" type="date" 
        @blur="updateLeadCustomPropertieHandler(field.unique_id)"
        :name="field?.unique_id" 
        v-model="formData[field.unique_id]" />



        <input  
        v-else-if="field?.data_type_id === 'date_and_time'" 
        class="form-control" type="datetime-local" 
        @blur="updateLeadCustomPropertieHandler(field.unique_id)"
        :name="field?.unique_id" 
        v-model="formData[field.unique_id]" />





        <textarea 
        v-else-if="field?.data_type_id === 'multiline_free_text'" 
        class="form-control" :name="field?.unique_id" 
        @blur="updateLeadCustomPropertieHandler(field.unique_id)"
        v-model="formData[field.unique_id]"></textarea>



        <div v-else-if="field?.data_type_id === 'yes_or_no'" class="tri-state-toggle">
            <button 
            @click="manageYesOrNoHandler('yes', field.unique_id)"
            :class="{'active':formData[field.unique_id]==1}" 
            class="tri-state-toggle-button text-head">
                Yes
            </button>
            <button 
            @click="manageYesOrNoHandler('', field.unique_id)" 
            :class="{'active':formData[field.unique_id] != -1 && formData[field.unique_id]!= 1}"
            class="tri-state-toggle-button fs-20px text-head">
                &times;
            </button>
            <button 
            @click="manageYesOrNoHandler('no', field.unique_id)" 
            :class="{'active':formData[field.unique_id] == -1}"
            class="tri-state-toggle-button text-head">
                No
            </button>
        </div>



        <MultipleSelectVue
        v-else-if="field?.data_type_id === 'multiple_choice'" 
        :name="field?.unique_id"
        :options="field?.options??[]" 
        @change="updateLeadCustomPropertieHandler"
        :value="formData[field?.unique_id]"
        v-model="formData[field.unique_id]" />
        




        <SingleSelect
        v-else-if="field?.data_type_id === 'single_choice'" 
        :name="field?.unique_id"
        :options="field?.options??[]" 
        @change="updateLeadCustomPropertieHandler"
        :value="formData[field?.unique_id]"
        v-model="formData[field.unique_id]" />

    </div>
    {{ formData }}
</template>

<style lang="scss">
    .lead-propertie-input .form-control{
        border-color:rgb(189 189 189 / 55%) !important;
        background-color: #f5f7fa;
        &:hover{
            background-color: #ffffff;
        }
    }


    .tri-state-toggle {
        background: rgb(165 170 174 / 0%);
        border-radius: 0px;
        display: inline-block;
        overflow: hidden;
        display: inline-flex;
        flex-direction: row;
        transition: all 500ms ease;
        width:145px;
        border: 1px solid #dddddd;
        border-radius: 5px;
    }
    .tri-state-toggle-button {
        border-radius: 0px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        background-color: transparent;
        border: 0px solid transparent;
        margin: 2px;
        cursor: pointer;
        flex-grow: 1;
        transition:all 0.5s ease;
    }

    .tri-state-toggle-button.active {
        background:#ffffff;
        border: 1px solid rgba(207,207,207,0.6);
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1);
        color: #6744B1;
        font-weight: 500;
        transition: all .5s ease-in;
    }

    .tri-state-toggle-button:focus {
        outline: none;
    }
</style>
