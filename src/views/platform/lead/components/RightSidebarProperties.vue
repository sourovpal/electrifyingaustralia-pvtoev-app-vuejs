<script>
    import MultipleSelectVue from './forms/MultipleSelect.vue';
    import SingleSelect from './forms/SingleSelect.vue';
    import {LeadPropertieUpdate} from '../../../../actions/LeadAction';
    import moment from 'moment';

    export default {
        components:{
            MultipleSelectVue,
            SingleSelect,
        },
        data() {
            return {
                leadProperties:[],
                formData:{},
                proptected:null,
                moment: null,
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
            async updateLeadCustomPropertieHandler(unique_id, event=null){
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
            },
            dateTimeFormat(date, format){
                if(date){
                    return this.moment(date).format(format);
                }
                return '';
            },
            protectedInputFieldHandler(e){
                var target = e.target;
                if((target.tagName == 'INPUT' || target.tagName == 'TEXTAREA') && target.closest('.propertie-warpper')){
                    return;
                }

                if(this.proptected){
                    this.proptected.classList.add('protected');
                    this.proptected = null;
                }

                if(target.classList.contains('protected')){
                    this.proptected = target;
                    this.proptected.classList.remove('protected');
                }
            }
        },
        mounted() {
            this.formData = {};
            this.leadProperties = this.$store.getters.getLeadProperties;
            this.formData = this.$store.getters.getLeadCustomProperties??{};  
            this.$el.addEventListener('click', this.protectedInputFieldHandler);
        },
        beforeDestroy() {
           window.removeEventListener('click', this.protectedInputFieldHandler);
        },
        created() {
            this.moment = moment;
        },
    }
</script>

<template>
    <div>
        <div class="mb-2 lead-propertie-input" v-for="(field, index) in leadProperties" :key="index">
    
            <label class="fs-12px text-soft d-block" :for="field?.unique_id">{{ field?.label }}</label>
    
            <div class="protected propertie-warpper"  v-if="field?.data_type_id === 'free_text' || field?.data_type_id === 'read_only'" :data-value="formData[field.unique_id]">
                <input class="form-control form-control-sm fw-bold text-head" type="text"
                @blur="updateLeadCustomPropertieHandler(field.unique_id, $event)"
                :name="field?.unique_id" v-model="formData[field.unique_id]" />
            </div>
    
    
    
            <div class="protected propertie-warpper"  v-else-if="field?.data_type_id === 'real_number'"  :data-value="formData[field.unique_id]">
                <input class="form-control form-control-sm fw-bold text-head" type="number" 
                @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                :name="field?.unique_id" 
                v-model="formData[field.unique_id]" />
            </div>
    
    
    
    
            <div  class="protected propertie-warpper" v-else-if="field?.data_type_id === 'date'"  :data-value="dateTimeFormat(formData[field.unique_id], 'DD/MM/YYYY')">
                <input class="form-control form-control-sm fw-bold text-head" type="date" 
                @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                :name="field?.unique_id" v-model="formData[field.unique_id]" />
            </div>
    
    
            <div class="protected propertie-warpper" v-else-if="field?.data_type_id === 'date_and_time'"  :data-value="dateTimeFormat(formData[field.unique_id], 'DD/MM/YYYY hh:mm a')">
                <input class="form-control form-control-sm fw-bold text-head" type="datetime-local" 
                @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                :name="field?.unique_id" v-model="formData[field.unique_id]" />
            </div>
    
    
    
    
            
            <div class="protected propertie-warpper" v-else-if="field?.data_type_id === 'multiline_free_text'"  :data-value="formData[field.unique_id]">
                <textarea class="form-control form-control-sm fw-bold text-head" :name="field?.unique_id" 
                @blur="updateLeadCustomPropertieHandler(field.unique_id)" rows="1"
                v-model="formData[field.unique_id]"></textarea>
            </div>
    
    
    
            <div v-else-if="field?.data_type_id === 'yes_or_no'" class="tri-state-toggle">
                <button 
                @click="manageYesOrNoHandler('yes', field.unique_id)"
                :class="{'active':formData[field.unique_id]==1}" 
                class="tri-state-toggle-button text-head fw-bold fs-12px">
                    Yes
                </button>
                <button 
                @click="manageYesOrNoHandler('', field.unique_id)" 
                :class="{'active':formData[field.unique_id] != -1 && formData[field.unique_id]!= 1}"
                class="tri-state-toggle-button fs-16px text-head fw-bold">
                    &times;
                </button>
                <button 
                @click="manageYesOrNoHandler('no', field.unique_id)" 
                :class="{'active':formData[field.unique_id] == -1}"
                class="tri-state-toggle-button text-head fw-bold fs-12px">
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
    </div>
</template>

<style lang="scss">
.lead-propertie-input {
    .form-control{
        border-color:rgb(189 189 189 / 55%) !important;
        background-color: #f5f7fa;
        position: relative;
        &:read-only{
            cursor: pointer;
        }
        &:hover{
            background-color: #ffffff;
        }
    }
}
.protected{
    position: relative;
    &::before{
        position: absolute;
        content:attr(data-value);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color:#f5f7fa;
        z-index: 9;
        border-radius: 5px;
        cursor: pointer;
        padding-left: 12px;
        padding-top: 3px;
        border:1px solid rgb(189 189 189 / 55%);
        font-size:12px;
        font-weight:bold;
        color:#364a63 !important;
        letter-spacing:0.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        :hover{
            background-color: #ffffff;
        }
    }
}
</style>
