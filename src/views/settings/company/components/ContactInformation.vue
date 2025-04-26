<script setup>
    import { ref, reactive,   watch, computed } from 'vue';
    import { UpdateContactInformation } from '@actions/CompanyAction';
    import { $toast } from '@config';
    const props = defineProps({
        company: {
            type: Object,
            default: {},
        },
        isLoading: {
            type: Boolean,
            default: false,
        }
    });

    const emits = defineEmits(['getCompanyDetailsHandler']);

    const state = reactive({
        errors: {},
        company_name: null,
        business_name: null,
        business_number: null,
        office_phone: null,
        mobile_phone: null,
        email: null,
        website: null,
        street_name: null,
        unit: null,
        city: null,
        postcode: null,
        state: null,
        country: null,
        isSubmitContactInformation: false,
    });

    watch(() => props.company, (company) => {
        state.errors = {};
        state.company_name = company.company_name;
        state.business_name = company.business_name;
        state.business_number = company.business_number;
        state.office_phone = company.office_phone;
        state.mobile_phone = company.mobile_phone;
        state.email = company.email;
        state.website = company.website;
        state.street_name = company.street_name;
        state.unit = company.unit;
        state.city = company.city;
        state.postcode = company.postcode;
        state.state = company.state;
        state.country = company.country;
    }, { deep: true });

    const isResetButtonActive = computed({
        get() {
            function isEqual(val1, val2) {
                return (val1 === val2) || (val1 === null && val2 === "") || (val1 === "" && val2 === null);
            }
            return !(
                isEqual(state.company_name, props.company.company_name) &&
                isEqual(state.business_name, props.company.business_name) &&
                isEqual(state.business_number, props.company.business_number) &&
                isEqual(state.office_phone, props.company.office_phone) &&
                isEqual(state.mobile_phone, props.company.mobile_phone) &&
                isEqual(state.email, props.company.email) &&
                isEqual(state.website, props.company.website) &&
                isEqual(state.street_name, props.company.street_name) &&
                isEqual(state.unit, props.company.unit) &&
                isEqual(state.city, props.company.city) &&
                isEqual(state.state, props.company.state) &&
                isEqual(state.country, props.company.country) &&
                isEqual(state.postcode, props.company.postcode)
            );
        }
    });


    async function updateContactInformation() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitContactInformation = true;
            var payload = {
                company_name: state.company_name,
                business_name: state.business_name,
                business_number: state.business_number,
                office_phone: state.office_phone,
                mobile_phone: state.mobile_phone,
                email: state.email,
                website: state.website,
                street_name: state.street_name,
                unit: state.unit,
                city: state.city,
                postcode: state.postcode,
                state: state.state,
                country: state.country,
            };
            var res = await UpdateContactInformation(payload);
            const { success, errors, message } = res;
            $toast[message.type](message.text);

            if (success) {
                emits('getCompanyDetailsHandler');
            } else {
                state.errors = errors;
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            state.isSubmitContactInformation = false;
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Contact information</h2>
                <span class="sub-title">This information will appear on your proposal cover page and quote page.</span>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Company name</label>
                <input @focus="delete state.errors?.company_name"
                    v-model="state.company_name"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.company_name?.length">{{ state.errors?.company_name[0] }}</span>
                <span class="form-input-commant"
                    v-else>Your company name may be used on invoices, receipts and
                    customer facing proposals.</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Business name / trading name</label>
                <input @focus="delete state.errors?.business_name"
                    v-model="state.business_name"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.business_name?.length">{{ state.errors?.business_name[0] }}</span>
                <span v-else
                    class="form-input-commant">Your business name or trading name will be used instead of your company
                    name where possible and also in your Terms and Conditions.</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Australian Business Number (ABN)</label>
                <input @focus="delete state.errors?.business_number"
                    v-model="state.business_number"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.business_number?.length">{{ state.errors?.business_number[0] }}</span>
                <span v-else
                    class="form-input-commant">Your business identifier may be used on invoices, receipts and proposals.
                    Please make sure it's correct.</span>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Contact phone (office)</label>
                        <input @focus="delete state.errors?.office_phone"
                            v-model="state.office_phone"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.office_phone?.length">{{ state.errors?.office_phone[0] }}</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Contact phone (mobile)</label>
                        <input @focus="delete state.errors?.mobile_phone"
                            v-model="state.mobile_phone"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.mobile_phone?.length">{{ state.errors?.mobile_phone[0] }}</span>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Company contact email</label>
                        <input @focus="delete state.errors?.email"
                            v-model="state.email"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.email?.length">{{ state.errors?.email[0] }}</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Company Website</label>
                        <input @focus="delete state.errors?.website"
                            v-model="state.website"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.website?.length">{{ state.errors?.website[0] }}</span>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-lg-6">

                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Unit</label>
                        <input @focus="delete state.errors?.unit"
                            v-model="state.unit"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.unit?.length">{{ state.errors?.unit[0] }}</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Street Name</label>
                        <input @focus="delete state.errors?.street_name"
                            v-model="state.street_name"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.street_name?.length">{{ state.errors?.street_name[0] }}</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">City</label>
                        <input @focus="delete state.errors?.city"
                            v-model="state.city"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.city?.length">{{ state.errors?.city[0] }}</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">State</label>
                        <input @focus="delete state.errors?.state"
                            v-model="state.state"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.state?.length">{{ state.errors?.state[0] }}</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Country</label>
                        <input @focus="delete state.errors?.country"
                            v-model="state.country"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.country?.length">{{ state.errors?.country[0] }}</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Postcode</label>
                        <input @focus="delete state.errors?.postcode"
                            v-model="state.postcode"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.postcode?.length">{{ state.errors?.postcode[0] }}</span>
                    </div>
                </div>
            </div>


            <div class="d-flex">
                <loading-button :isLoading="state.isSubmitContactInformation"
                    :disabled="!isResetButtonActive"
                    @click="updateContactInformation">
                    Save Settings
                </loading-button>
                <button v-if="isResetButtonActive"
                    @click="company['random_number']=Math.random()"
                    class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>
        </div>
    </div>
</template>