<script>
    import MultipleSelectVue from './forms/MultipleSelect.vue';
    import SingleSelect from './forms/SingleSelect.vue';
    import { LeadPropertieUpdate } from '../../../../actions/LeadAction';
    import moment from 'moment';

    import { useLeadStore } from '../../../../stores/lead';
    import { useAppStore } from '../../../../stores/app';


    export default {
        components: {
            MultipleSelectVue,
            SingleSelect,
        },
        setup(props) {
            const leadStore = useLeadStore();
            const appStore = useAppStore();
            return { leadStore, appStore };
        },
        data() {
            return {
                formData: {},
                proptected: null,
                moment: null,
                editProperties: {},
            }
        },
        watch: {
            "customPropertiesValue"(payload) {
                this.formData = payload ?? {};
                this.editProperties = {};
            },
        },
        methods: {
            enabledPropertieEditHandler(unique_id) {
                if (Object.keys(this.editProperties).includes(unique_id)) {
                    delete this.editProperties[unique_id];
                } else {
                    this.editProperties[unique_id] = true;
                }
            },
            manageYesOrNoHandler(action, unique_id) {
                if (action == 'yes') {
                    this.formData[unique_id] = 1;
                } else if (action == 'no') {
                    this.formData[unique_id] = -1;
                } else {
                    this.formData[unique_id] = "";
                }
                this.updateLeadCustomPropertieHandler(unique_id);
            },
            async updateLeadCustomPropertieHandler(unique_id, event = null) {
                var leadId = this.$route.params?.id ?? null;
                if (Object.keys(this.formData).includes(unique_id)) {
                    var data = {
                        propertie: {
                            key: unique_id,
                            value: this.formData[unique_id]
                        },
                        lead_id: leadId,
                    };
                    const res = await LeadPropertieUpdate(data);
                }
                this.enabledPropertieEditHandler(unique_id);
            },
            dateTimeFormat(date, format) {
                if (date) {
                    return this.moment(date).format(format);
                }
                return '';
            },
            protectedInputFieldHandler(e) {
                var target = e.target;
                if ((target.tagName == 'INPUT' || target.tagName == 'TEXTAREA') && target.closest('.propertie-warpper')) {
                    return;
                }

                if (this.proptected) {
                    this.proptected.classList.add('protected');
                    this.proptected = null;
                }

                if (target.classList.contains('protected')) {
                    this.proptected = target;
                    this.proptected.classList.remove('protected');
                }
            },
            getFormValueHandler(unique_id) {
                if (this.formData[unique_id]) {
                    return this.formData[unique_id];
                }
                return "–";
            }
        },
        computed: {
            leadProperties() {
                return [
                    ...this.leadStore.getLeadProperties ?? [],
                    ...this.leadStore.getCurrentLead?.pipeline?.properties ?? []
                ];
            },
            customPropertiesValue() {
                return this.leadStore.getLeadCustomProperties ?? {};
            }
        },
        created() {
            this.moment = moment;
        },
    }
</script>

<template>
    <div>
        <div class="mb-2 lead-propertie-input"
            v-for="(field, index) in leadProperties"
            :key="index">

            <label class="fs-12px text-soft d-block"
                :for="field?.unique_id">{{ field?.label }}</label>

            <div v-if="field?.data_type_id === 'free_text' || field?.data_type_id === 'read_only'">

                <div @click="enabledPropertieEditHandler(field.unique_id)"
                    v-if="!editProperties[field.unique_id]"
                    class="form-control form-control-sm text-overflow-ellipsis">
                    <span class="text-head fw-bold input-value-preview">{{ getFormValueHandler(field.unique_id)
                        }}</span>
                </div>

                <input v-else
                    class="form-control form-control-sm fw-bold text-head"
                    type="text"
                    @blur="updateLeadCustomPropertieHandler(field.unique_id, $event)"
                    :name="field?.unique_id"
                    v-model="formData[field.unique_id]" />

            </div>



            <div v-else-if="field?.data_type_id === 'real_number'">

                <div @click="enabledPropertieEditHandler(field.unique_id)"
                    v-if="!editProperties[field.unique_id]"
                    class="form-control form-control-sm text-overflow-ellipsis">
                    <span class="text-head fw-bold input-value-preview">{{ getFormValueHandler(field.unique_id)
                        }}</span>
                </div>

                <input v-else
                    class="form-control form-control-sm fw-bold text-head"
                    type="number"
                    @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                    :name="field?.unique_id"
                    v-model="formData[field.unique_id]" />

            </div>




            <div v-else-if="field?.data_type_id === 'date'">
                <div @click="enabledPropertieEditHandler(field.unique_id)"
                    v-if="!editProperties[field.unique_id]"
                    class="form-control form-control-sm text-overflow-ellipsis">
                    <span class="text-head fw-bold input-value-preview">{{ getFormValueHandler(field.unique_id)
                        }}</span>
                </div>

                <input v-else
                    class="form-control form-control-sm fw-bold text-head"
                    type="date"
                    @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                    :name="field?.unique_id"
                    v-model="formData[field.unique_id]" />
            </div>


            <div v-else-if="field?.data_type_id === 'date_and_time'">
                <div @click="enabledPropertieEditHandler(field.unique_id)"
                    v-if="!editProperties[field.unique_id]"
                    class="form-control form-control-sm text-overflow-ellipsis">
                    <span class="text-head fw-bold input-value-preview">{{ getFormValueHandler(field.unique_id)
                        }}</span>
                </div>

                <input v-else
                    class="form-control form-control-sm fw-bold text-head"
                    type="datetime-local"
                    @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                    :name="field?.unique_id"
                    v-model="formData[field.unique_id]" />
            </div>





            <div v-else-if="field?.data_type_id === 'multiline_free_text'">

                <div @click="enabledPropertieEditHandler(field.unique_id)"
                    v-if="!editProperties[field.unique_id]"
                    class="form-control form-control-sm text-overflow-ellipsis">
                    <span class="text-head fw-bold input-value-preview">{{ getFormValueHandler(field.unique_id)
                        }}</span>
                </div>

                <textarea v-else
                    class="form-control form-control-sm fw-bold text-head"
                    :name="field?.unique_id"
                    @blur="updateLeadCustomPropertieHandler(field.unique_id)"
                    rows="1"
                    v-model="formData[field.unique_id]"></textarea>
            </div>



            <div v-else-if="field?.data_type_id === 'yes_or_no'"
                class="tri-state-toggle">
                <button @click="manageYesOrNoHandler('yes', field.unique_id)"
                    :class="{'active':formData[field.unique_id]==1}"
                    class="tri-state-toggle-button text-head fw-bold fs-12px">
                    Yes
                </button>
                <button @click="manageYesOrNoHandler('', field.unique_id)"
                    :class="{'active':formData[field.unique_id] != -1 && formData[field.unique_id]!= 1}"
                    class="tri-state-toggle-button fs-16px text-head fw-bold">
                    &times;
                </button>
                <button @click="manageYesOrNoHandler('no', field.unique_id)"
                    :class="{'active':formData[field.unique_id] == -1}"
                    class="tri-state-toggle-button text-head fw-bold fs-12px">
                    No
                </button>
            </div>



            <MultipleSelectVue v-else-if="field?.data_type_id === 'multiple_choice'"
                :name="field?.unique_id"
                :options="field?.options??[]"
                @change="updateLeadCustomPropertieHandler"
                :value="formData[field?.unique_id]"
                v-model="formData[field.unique_id]"
                :usebg="true" />



            <SingleSelect v-else-if="field?.data_type_id === 'single_choice'"
                :name="field?.unique_id"
                :options="field?.options??[]"
                @change="updateLeadCustomPropertieHandler"
                :value="formData[field?.unique_id]"
                v-model="formData[field.unique_id]"
                :usebg="true" />


        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .lead-propertie-input {
        .form-control {
            border-color: rgb(189 189 189 / 55%) !important;
            background-color: #f5f7fa;
            position: relative;

            &:read-only {
                cursor: pointer;
            }

            &:hover {
                background-color: #ffffff;
            }
        }
    }

    .text-overflow-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>