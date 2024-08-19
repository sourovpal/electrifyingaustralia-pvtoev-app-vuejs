<script setup>

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

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Twitter username</label>
                <input @focus="delete errors?.twitter_link"
                    v-model="twitter_link"
                    type="text"
                    class="form-control">
                <span v-if="!errors?.twitter_link?.length"
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://twitter.com/${twitter_link}`">https://twitter.com/{{ twitter_link }}</a></span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.twitter_link?.length">{{ errors?.twitter_link[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Instagram username</label>
                <input @focus="delete errors?.instagram_link"
                    v-model="instagram_link"
                    type="text"
                    class="form-control">
                <span v-if="!errors?.instagram_link?.length"
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://instagram.com/${instagram_link}`">https://instagram.com/{{ instagram_link
                        }}</a></span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.instagram_link?.length">{{ errors?.instagram_link[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Facebook username</label>
                <input @focus="delete errors?.facebook_link"
                    v-model="facebook_link"
                    type="text"
                    class="form-control">
                <span v-if="!errors?.facebook_link?.length"
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://facebook.com/${facebook_link}`">https://facebook.com/{{ facebook_link
                        }}</a></span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.facebook_link?.length">{{ errors?.facebook_link[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Pinterest username</label>
                <input @focus="delete errors?.pinterest_link"
                    v-model="pinterest_link"
                    type="text"
                    class="form-control">
                <span v-if="!errors?.pinterest_link?.length"
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://www.pinterest.com/${pinterest_link}`">https://www.pinterest.com/{{
                        pinterest_link }}</a></span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.pinterest_link?.length">{{ errors?.pinterest_link[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title"
                    for="">Youtube username</label>
                <input @focus="delete errors?.youtube_link"
                    v-model="youtube_link"
                    type="text"
                    class="form-control">
                <span v-if="!errors?.youtube_link?.length"
                    class="form-input-commant">Check Link: <a target="_blank"
                        :href="`https://www.youtube.com/${youtube_link}`">https://www.youtube.com/{{ youtube_link
                        }}</a></span>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.youtube_link?.length">{{ errors?.youtube_link[0] }}</span>
            </div>

            <div class="d-flex">
                <button :disabled="isSubmitSocialMediaUpdate"
                    @click="updateCompanyData('update_social_media')"
                    class="btn btn-primary fw-bold">
                    <div v-if="isSubmitSocialMediaUpdate">
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
                    <span v-if="!isSubmitSocialMediaUpdate">Save Settings</span>
                </button>
                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>

        </div>
    </div>
</template>