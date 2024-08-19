<script setup></script>
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
                    <select @click="delete errors?.time_zone"
                        class="form-control"
                        v-model="time_zone">
                        <option v-for="(timezome, index) in timezomes"
                            :key="index"
                            :value="timezome.name">{{ timezome.name }} &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {{
                            timezome.offset }}</option>
                    </select>
                </div>
                <span v-if="!errors?.time_zone?.length"
                    class="form-input-commant">This timezone will be used when time-stamping e-signature
                    documents.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.time_zone?.length">{{ errors?.time_zone[0] }}</span>
            </div>

            <div class="d-flex">
                <button :disabled="isSubmitTimeZoneUpdate"
                    @click="updateCompanyData('update_time_zone')"
                    class="btn btn-primary fw-bold">
                    <div v-if="isSubmitTimeZoneUpdate">
                        <svg class="spinner"
                            viewBox="0 0 50 50"
                            style="width:20px;height:20px;margin-left:0px;">
                            <circle style="stroke: #ffffff;"
                                class="path"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                stroke-width="5"></circle>
                        </svg>
                        <span>Submitting...</span>
                    </div>
                    <span v-if="!isSubmitTimeZoneUpdate">Save Settings</span>
                </button>
                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>

        </div>
    </div>
</template>