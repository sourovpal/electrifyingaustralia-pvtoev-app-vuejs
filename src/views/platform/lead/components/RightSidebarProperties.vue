<script>
    export default {
        data() {
            return {
                leadProperties:[],
                leadCustomProperties:{},
            }
        },
        watch: {
            "$store.state.leadEdit.leadProperties"(payload){
                this.leadProperties = payload;
            },
            "$store.state.leadEdit.leadCustomProperties"(payload){
                this.leadCustomPropertiesHandler(payload);
            }
        },
        methods: {
            leadCustomPropertiesHandler(properties){
                if(properties){
                    properties.map((item)=>{
                        this.leadCustomProperties[item.unique_id] = item;
                    });
                }
            },
            inputTypeHandler(event){
            }
        },
        mounted() {
            this.leadProperties = this.$store.getters.getLeadProperties;
            var properties = this.$store.getters.getLeadCustomProperties;
            this.leadCustomPropertiesHandler(properties);
        },
    }
</script>

<template>
    <div class="mb-1" v-for="(propertie, index) in leadProperties??[]" :key="index">
        <div class="fs-12px text-soft mb-1">{{ propertie.label }}</div>

        
        <!-- free_text  -->
        <div v-if="propertie.data_type_id == 'free_text'">
            <input 
            @click="inputTypeHandler($event)"
            class="form-control form-control-sm text-base" 
            type="text" readonly="true" :value="leadCustomProperties[propertie.unique_id]?.value">
        </div>


        <!-- multiline_free_text  -->
        <div v-if="propertie.data_type_id == 'multiline_free_text'">
            <textarea class="form-control form-control-sm text-base" rows="2" type="text"></textarea>
        </div>


        <!-- date  -->
        <div v-if="propertie.data_type_id == 'date'">
            <input class="form-control form-control-sm text-base" type="date">
        </div>


        <!-- date_and_time -->
        <div v-if="propertie.data_type_id == 'date_and_time'">
            <input class="form-control form-control-sm text-base" type="datetime-local">
        </div>


        <!-- real_number -->
        <div v-if="propertie.data_type_id == 'real_number'">
            <input class="form-control form-control-sm text-base" type="number">
        </div>


        <!-- yes_or_no -->
        <div v-if="propertie.data_type_id == 'yes_or_no'">
            <div class="btn-group">
                <button 
                class="btn btn-sm py-1"
                @click="leadCustomProperties[propertie.unique_id]['value'] = 'yes'"
                :class="`${(leadCustomProperties[propertie.unique_id]?.value == 'yes')?'btn-success active':'btn-success'}`">Yes</button>
                <button 
                class="btn btn-sm py-1 btn-danger"
                @click="leadCustomProperties[propertie.unique_id]['value'] = ''"
                >Reset</button>
                <button 
                class="btn btn-sm py-1" 
                @click="leadCustomProperties[propertie.unique_id]['value'] = 'no'"
                :class="`${(leadCustomProperties[propertie.unique_id]?.value == 'no')?'btn-success active':'btn-success'}`">No</button>
            </div>
        </div>


        <!-- single_choice -->
        <div v-if="propertie.data_type_id == 'single_choice'">
            <input class="form-control form-control-sm text-base" type="text">
        </div>


        <!-- multiple_choice -->
        <div v-if="propertie.data_type_id == 'multiple_choice'">
            <input class="form-control form-control-sm text-base" type="text">
        </div>




    </div>
</template>
<style lang="scss" scoped>
    .btn-success.active{
        background-color: #1d8747 !important;
    }
    input, textarea{
        font-weight: bold;
        font-size: 15px !important;
        padding-top: 3px;
        padding-bottom: 5px;
    }
</style>