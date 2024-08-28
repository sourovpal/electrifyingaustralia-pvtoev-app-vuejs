<script setup>
    import { ref, reactive, defineProps, watch, computed, onMounted } from 'vue';
    import { UpdateTimezone } from '@actions/CompanyAction';
    import { FetchTimezoneList } from '@actions/AppAction';

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
        time_zone: '',
        timezones: [],
        isSubmitSocialInformation: false,
    });

    watch(() => props.company, (company) => {
        state.errors = {};
        state.time_zone = company.time_zone;
    }, { deep: true });

    const isResetButtonActive = computed({
        get() {
            function isEqual(val1, val2) {
                return (val1 === val2) || (val1 === null && val2 === "") || (val1 === "" && val2 === null);
            }
            return !(isEqual(state.time_zone, props.company.time_zone));
        }
    });


    async function fetchTimezoneListHandler() {
        try {
            const res = await FetchTimezoneList();
            const { success, timezones } = res;
            if (success) {
                state.timezones = timezones;
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {

        }
    }


    async function updateTimeZoneHandler() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitSocialInformation = true;
            var payload = {
                time_zone: state.time_zone,
            };
            var res = await UpdateTimezone(payload);
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
            state.isSubmitSocialInformation = false;
        }
    }

    onMounted(() => {
        fetchTimezoneListHandler();
    });

</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Time & Location</h2>
                <span class="sub-title">These settings affect how time is displayed.</span>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Default timezone</label>
                <div class="select-box">
                    <select @click="delete state.errors?.time_zone"
                        class="form-control"
                        v-model="state.time_zone">
                        <option v-for="(timezone, index) in state.timezones"
                            :key="index"
                            :value="timezone.name">{{ timezone.name }} &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {{
                            timezone.offset }}</option>
                    </select>
                </div>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.time_zone?.length">{{ state.errors?.time_zone[0] }}</span>
                <span v-else
                    class="form-input-commant">This timezone will be used when time-stamping e-signature
                    documents.</span>
            </div>

            <div class="d-flex">
                <loading-button :disabled="!isResetButtonActive"
                    :isLoading="state.isSubmitSocialInformation"
                    @click="updateTimeZoneHandler">
                    Save Settings
                </loading-button>
                <button v-if="isResetButtonActive"
                    @click="company['random_number']=Math.random()"
                    class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>

        </div>
    </div>
</template>