<script setup>
    import { ref, reactive, defineProps, watch, computed } from 'vue';
    import { UpdateSocialDetails } from '../../../../actions/CompanyAction';
    import { $toast } from '../../../../config';
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
        twitter_link: '',
        instagram_link: '',
        facebook_link: '',
        pinterest_link: '',
        youtube_link: '',
        isSubmitSocialInformation: false,
    });

    watch(() => props.company, (company) => {
        state.errors = {};
        state.twitter_link = company.twitter_link;
        state.instagram_link = company.instagram_link;
        state.facebook_link = company.facebook_link;
        state.pinterest_link = company.pinterest_link;
        state.youtube_link = company.youtube_link;
    }, { deep: true });

    const isResetButtonActive = computed({
        get() {
            function isEqual(val1, val2) {
                return (val1 === val2) || (val1 === null && val2 === "") || (val1 === "" && val2 === null);
            }
            return !(
                isEqual(state.twitter_link, props.company.twitter_link) &&
                isEqual(state.instagram_link, props.company.instagram_link) &&
                isEqual(state.facebook_link, props.company.facebook_link) &&
                isEqual(state.pinterest_link, props.company.pinterest_link) &&
                isEqual(state.youtube_link, props.company.youtube_link)
            );
        }
    });


    async function updateSocialInformation() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitSocialInformation = true;
            var payload = {
                twitter_link: state.twitter_link,
                instagram_link: state.instagram_link,
                facebook_link: state.facebook_link,
                pinterest_link: state.pinterest_link,
                youtube_link: state.youtube_link,
            };
            var res = await UpdateSocialDetails(payload);
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
</script>

<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Social Media Details</h2>
                <span class="sub-title">Links to your company social media accounts</span>
            </div>
        </div>
        <div class="col-lg-5 col-12">
            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Facebook username</label>
                        <input @focus="delete state.errors?.facebook_link"
                            v-model="state.facebook_link"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.facebook_link?.length">{{ state.errors?.facebook_link[0] }}</span>
                        <span v-else
                            class="form-input-commant">Check Link: <a target="_blank"
                                :href="`https://facebook.com/${state.facebook_link}`">https://facebook.com/{{
                                state.facebook_link
                                }}</a></span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Twitter username</label>
                        <input @focus="delete state.errors?.twitter_link"
                            v-model="state.twitter_link"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.twitter_link?.length">{{ state.errors?.twitter_link[0] }}</span>
                        <span v-else
                            class="form-input-commant">Check Link: <a target="_blank"
                                :href="`https://twitter.com/${state.twitter_link}`">https://twitter.com/{{
                                state.twitter_link
                                }}</a></span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Instagram username</label>
                        <input @focus="delete state.errors?.instagram_link"
                            v-model="state.instagram_link"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.instagram_link?.length">{{ state.errors?.instagram_link[0] }}</span>
                        <span v-else
                            class="form-input-commant">Check Link: <a target="_blank"
                                :href="`https://instagram.com/${state.instagram_link}`">https://instagram.com/{{
                                state.instagram_link
                                }}</a></span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Pinterest username</label>
                        <input @focus="delete state.errors?.pinterest_link"
                            v-model="state.pinterest_link"
                            type="text"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="state.errors?.pinterest_link?.length">{{ state.errors?.pinterest_link[0] }}</span>
                        <span v-else
                            class="form-input-commant">Check Link: <a target="_blank"
                                :href="`https://www.pinterest.com/${state.pinterest_link}`">https://www.pinterest.com/{{
                                state.pinterest_link }}</a></span>
                    </div>
                </div>
            </div>



            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Youtube username</label>
                <input @focus="delete state.errors?.youtube_link"
                    v-model="state.youtube_link"
                    type="text"
                    class="form-control">
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="state.errors?.youtube_link?.length">{{ state.errors?.youtube_link[0] }}</span>
                <span v-else
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://www.youtube.com/${state.youtube_link}`">https://www.youtube.com/{{
                        state.youtube_link
                        }}</a></span>
            </div>

            <div class="d-flex">
                <loading-button :disabled="!isResetButtonActive"
                    :isLoading="state.isSubmitSocialInformation"
                    @click="updateSocialInformation">
                    Save Settings
                </loading-button>
                <button v-if="isResetButtonActive"
                    @click="company['random_number']=Math.random()"
                    class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>

        </div>
    </div>
</template>