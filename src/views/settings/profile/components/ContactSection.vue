<script>
    import { UpdateContactInformation } from '../../../../actions/UserAction';
    import { inject } from 'vue';
    export default {
        props:{
            profileData:Object
        },
        data() {
            return {
                errors: {},
                isError: false,
                phone_office: null,
                phone_mobile: null,
                isSubmitContactInfo: false,
            }
        },
        watch: {
            "profileData"(val) {
                this.phone_office = val.phone_office;
                this.phone_mobile = val.phone_mobile;
            }
        },
        methods: {
            setData() {
                this.errors = {};
                this.phone_office = this.profileData.phone_office;
                this.phone_mobile = this.profileData.phone_mobile;
            },
            async formSubmitHandler(payload = null) {
                try {
                    var data = {
                        phone_office: this.phone_office,
                        phone_mobile: this.phone_mobile,
                    };
                    this.isError = false;
                    this.isSubmitContactInfo = true;
                    const res = await UpdateContactInformation(data);
                    const { success, errors, message } = res;
                    this.$toast[message.type](message.text);
                    if (success) {
                        this.$emit('fetch-profile');
                    } else {
                        this.errors = errors;
                    }
                } catch (error) {
                    this.$toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitContactInfo = false;
                }
            },
        },
        computed: {
            isResetButtonActive() {
                return !(this.phone_office == this.profileData.phone_office
                    && this.phone_mobile == this.profileData.phone_mobile);
            }
        },
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Contact information</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Contact number (office)</label>
                <input @focus="delete errors?.phone_office"
                    v-model="phone_office"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.phone_office?.length">{{ errors?.phone_office[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Contact number (mobile)</label>
                <input @focus="delete errors?.phone_mobile"
                    v-model="phone_mobile"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.phone_mobile?.length">{{ errors?.phone_mobile[0] }}</span>
            </div>

            <div class="d-flex">
                <div>
                    <loading-button class="btn-sm"
                        :isLoading="isSubmitContactInfo"
                        @click="formSubmitHandler()">
                        Save Settings
                    </loading-button>
                </div>
                <div class="ms-auto">
                    <button v-if="isResetButtonActive"
                        @click="setData()"
                        class="btn btn-sm btn-danger fw-bold ms-auto">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>