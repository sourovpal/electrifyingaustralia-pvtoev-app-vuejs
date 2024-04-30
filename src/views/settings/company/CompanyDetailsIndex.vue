<script>
import {FetchComapny, UpdateComapny} from '../../../actions/CompanyAction';
export default {
    name:'ProfileIndex',
    data() {
        return{
            errors:{},
            fetchData:{},
            timezomes:[],
            company_name:null,
            business_name:null,
            business_number:null,
            office_phone:null,
            mobile_phone:null,
            email:null,
            website:null,
            street_name:null,
            unit:null,
            city:null,
            postcode:null,
            state:null,
            country:null,
            business_logo:null,
            time_zone:null,
            twitter_link:null,
            instagram_link:null,
            facebook_link:null,
            pinterest_link:null,
            youtube_link:null,
            companyDetailsUpdateReset:0,
            isSubmitCompanyDetailsUpdate:false,
            isSubmitSocialMediaUpdate:false,
            isSubmitTimeZoneUpdate:false,
            businessLogoFile:null,
        }
    },
    methods: {
        async fetchComapnyData(){
            try{
                const res = await FetchComapny();
                try{
                    const {company, timezomes} = res;
                    this.fetchData = company;
                    this.timezomes = timezomes;
                }catch(error){
                    this.$toast.error('Oops, something went wrong');
                }
            }catch(error){
                this.$toast.error('Oops, something went wrong');
            }
        },
        async updateCompanyData(action = null){
            const formData = new FormData();
            formData.append('action', action);
            if(action === 'update_company_details'){
                this.isSubmitCompanyDetailsUpdate = true;
                formData.append('company_name', this.company_name??'');
                formData.append('business_name', this.business_name??'');
                formData.append('business_number', this.business_number??'');
                formData.append('office_phone', this.office_phone??'');
                formData.append('mobile_phone', this.mobile_phone??'');
                formData.append('email', this.email??'');
                formData.append('website', this.website??'');
                formData.append('street_name', this.street_name??'');
                formData.append('unit', this.unit??'');
                formData.append('city', this.city??'');
                formData.append('state', this.state??'');
                formData.append('postcode', this.postcode??'');
                formData.append('country', this.country??'');
                if(this.businessLogoFile){
                    formData.append('business_logo', this.businessLogoFile);
                }
                
            }else if(action === 'update_time_zone'){

                this.isSubmitTimeZoneUpdate = true;                
                formData.append('time_zone', this.time_zone??'');
                
            }else if(action === 'update_social_media'){
                
                this.isSubmitSocialMediaUpdate = true;
                formData.append('twitter_link', this.twitter_link??'');
                formData.append('instagram_link', this.instagram_link??'');
                formData.append('facebook_link', this.facebook_link??'');
                formData.append('pinterest_link', this.pinterest_link??'');
                formData.append('youtube_link', this.youtube_link??'');
                
            }else if(action === 'remove_comapny_logo'){
                this.isSubmitTimeZoneUpdate = true;
                formData.append('remove_business_logo', 1);
            }else{
                return false;
            }

            try{
                const res = await UpdateComapny(formData);

                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){}
                try{
                    this.businessLogoFile = null;
                    const {company} = res;
                    this.fetchData = company;
                    this.isSubmitSocialMediaUpdate = 
                    this.isSubmitCompanyDetailsUpdate = 
                    this.isSubmitTimeZoneUpdate = false;
                }catch(error){}
                
            }catch(error){
                try{
                    var data = error.response.data;
                    console.log(data);
                    this.errors = data.errors;
                }catch(e){}
                
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isSubmitSocialMediaUpdate = 
                this.isSubmitCompanyDetailsUpdate = 
                this.isSubmitTimeZoneUpdate = false;
            }
        },
        async selectLogoHandler(e){
            if(e.target.files && e.target.files.length > 0){
                var file = e.target.files[0];
                this.business_logo = URL.createObjectURL(file);
                this.businessLogoFile = file;
            }
        }
    },
    mounted() {
        this.fetchComapnyData();

        this.$watch(vm => [this.fetchData], val => {
            try{
                var company = this.fetchData;
                this.company_name    = company.company_name;
                this.business_name   = company.business_name;
                this.business_number = company.business_number;
                this.office_phone    = company.office_phone;
                this.mobile_phone    = company.mobile_phone;
                this.email           = company.email;
                this.website         = company.website;
                this.street_name     = company.street_name;
                this.state           = company.state;
                this.unit            = company.unit;
                this.city            = company.city;
                this.postcode        = company.postcode;
                this.country         = company.country;
                this.business_logo   = company.business_logo;
                this.time_zone       = company.time_zone;
                this.twitter_link    = company.twitter_link;
                this.instagram_link  = company.instagram_link;
                this.facebook_link   = company.facebook_link;
                this.pinterest_link  = company.pinterest_link;
                this.youtube_link    = company.youtube_link;
            }catch(error){
            }
        }, {immediate: true, deep: true});
    },
  }
  
</script>

<template>
    <div id="account-index" class="content content-y-100vh">
          
          <div class="content-header">
              <h1>Company</h1>
          </div>
      
          <div class="content-body">
              <section class="">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Company logo</h2>
                              <span class="sub-title">This logo will appear in your solar proposals.</span>
                          </div>
                      </div>
                      <div class="col-lg-5 col-12">
                          <div class="row">
                              <div v-if="business_logo" class="col-lg-8">
                                  <div class="preview-logo">
                                      <img class="logo-img" :src="business_logo" alt="">
                                  </div>
                              </div>
                              <div class="col-md-8">
                                  <div class="settings-group-item mb-1">
                                      <input @click="delete errors?.business_logo" @change="selectLogoHandler" type="file" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-4 text-end">
                                    <button class="btn btn-danger btn-sm">Remove</button>
                                </div>
                                <div class="settings-group-item">
                                    <span v-if="!errors?.business_logo?.length" class="form-input-commant">For best results, use a horizontal image with a white or transparent background.</span>
                                    <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.business_logo?.length">{{ errors?.business_logo[0] }}</span>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  <hr class="mt-4 mb-5">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Contact information</h2>
                              <span class="sub-title">This information will appear on your proposal cover page and quote page.</span>
                          </div>
                      </div>
                      <div class="col-lg-5 col-12">
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company name</label>
                                <input @focus="delete errors?.company_name" v-model="company_name" type="text" class="form-control">
                                <span class="form-input-commant" v-if="!errors?.company_name?.length">Your company name may be used on invoices, receipts and customer facing proposals.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.company_name?.length">{{ errors?.company_name[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Business name / trading name</label>
                                <input @focus="delete errors?.business_name" v-model="business_name" type="text" class="form-control">
                                <span v-if="!errors?.business_name?.length" class="form-input-commant">Your business name or trading name will be used instead of your company name where possible and also in your Terms and Conditions.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.business_name?.length">{{ errors?.business_name[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Australian Business Number (ABN)</label>
                                <input @focus="delete errors?.business_number" v-model="business_number" type="text" class="form-control">
                                <span v-if="!errors?.business_number?.length" class="form-input-commant">Your business identifier may be used on invoices, receipts and proposals. Please make sure it's correct.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.business_number?.length">{{ errors?.business_number[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact phone (office)</label>
                                <input @focus="delete errors?.office_phone" v-model="office_phone" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.office_phone?.length">{{ errors?.office_phone[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact phone (mobile)</label>
                                <input @focus="delete errors?.mobile_phone" v-model="mobile_phone" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.mobile_phone?.length">{{ errors?.mobile_phone[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company contact email</label>
                                <input @focus="delete errors?.email" v-model="email" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email?.length">{{ errors?.email[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company Website</label>
                                <input @focus="delete errors?.website" v-model="website" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.website?.length">{{ errors?.website[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Unit</label>
                                <input @focus="delete errors?.unit" v-model="unit" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.unit?.length">{{ errors?.unit[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Street Name</label>
                                <input @focus="delete errors?.street_name" v-model="street_name" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.street_name?.length">{{ errors?.street_name[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">City</label>
                                <input @focus="delete errors?.city" v-model="city" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.city?.length">{{ errors?.city[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">State</label>
                                <input @focus="delete errors?.state" v-model="state" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.state?.length">{{ errors?.state[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Country</label>
                                <input @focus="delete errors?.country" v-model="country" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.country?.length">{{ errors?.country[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Postcode</label>
                                <input @focus="delete errors?.postcode" v-model="postcode" type="text" class="form-control">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.postcode?.length">{{ errors?.postcode[0] }}</span>
                            </div>
                            
                            <div class="d-flex">
                                <button :disabled="isSubmitCompanyDetailsUpdate" @click="updateCompanyData('update_company_details')" class="btn btn-primary fw-bold">
                                    <div v-if="isSubmitCompanyDetailsUpdate">
                                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                    <span v-if="!isSubmitCompanyDetailsUpdate">Save Settings</span>
                                </button>
                                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="mt-4 mb-5">
                    
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Time & Location</h2>
                                <span class="sub-title">These settings affect how time is displayed.</span>
                            </div>
                        </div>
                        <div class="col-lg-5 col-12">
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Default timezone</label>
                                <div class="select-box">
                                    <select @click="delete errors?.time_zone" class="form-control" v-model="time_zone">
                                        <option v-for="(timezome, index) in timezomes" :key="index" :value="timezome.name">{{ timezome.name }} &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {{ timezome.offset }}</option>
                                    </select>
                                </div>
                                <span v-if="!errors?.time_zone?.length" class="form-input-commant">This timezone will be used when time-stamping e-signature documents.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.time_zone?.length">{{ errors?.time_zone[0] }}</span>
                            </div>
                            
                            <div class="d-flex">
                                <button :disabled="isSubmitTimeZoneUpdate" @click="updateCompanyData('update_time_zone')" class="btn btn-primary fw-bold">
                                    <div v-if="isSubmitTimeZoneUpdate">
                                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                    <span v-if="!isSubmitTimeZoneUpdate">Save Settings</span>
                                </button>
                                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
                            </div>

                        </div>
                    </div>
                    
                    <hr class="mt-4 mb-5">
                    
                    
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Social Media Details</h2>
                                <span class="sub-title">Links to your company social media accounts</span>
                            </div>
                        </div>
                        <div class="col-lg-5 col-12">
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Twitter username</label>
                                <input @focus="delete errors?.twitter_link" v-model="twitter_link" type="text" class="form-control">
                                <span v-if="!errors?.twitter_link?.length" class="form-input-commant">Check Link: <a target="_blank" :href="`https://twitter.com/${twitter_link}`">https://twitter.com/{{ twitter_link }}</a></span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.twitter_link?.length">{{ errors?.twitter_link[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Instagram username</label>
                                <input @focus="delete errors?.instagram_link" v-model="instagram_link" type="text" class="form-control">
                                <span v-if="!errors?.instagram_link?.length" class="form-input-commant">Check Link: <a target="_blank" :href="`https://instagram.com/${instagram_link}`">https://instagram.com/{{ instagram_link }}</a></span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.instagram_link?.length">{{ errors?.instagram_link[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Facebook username</label>
                                <input @focus="delete errors?.facebook_link" v-model="facebook_link" type="text" class="form-control">
                                <span v-if="!errors?.facebook_link?.length" class="form-input-commant">Check Link: <a target="_blank" :href="`https://facebook.com/${facebook_link}`">https://facebook.com/{{ facebook_link }}</a></span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.facebook_link?.length">{{ errors?.facebook_link[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Pinterest username</label>
                                <input @focus="delete errors?.pinterest_link" v-model="pinterest_link" type="text" class="form-control">
                                <span v-if="!errors?.pinterest_link?.length" class="form-input-commant">Check Link: <a target="_blank" :href="`https://www.pinterest.com/${pinterest_link}`">https://www.pinterest.com/{{ pinterest_link }}</a></span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.pinterest_link?.length">{{ errors?.pinterest_link[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Youtube username</label>
                                <input @focus="delete errors?.youtube_link" v-model="youtube_link" type="text" class="form-control">
                                <span v-if="!errors?.youtube_link?.length" class="form-input-commant">Check Link: <a target="_blank" :href="`https://www.youtube.com/${youtube_link}`">https://www.youtube.com/{{ youtube_link }}</a></span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.youtube_link?.length">{{ errors?.youtube_link[0] }}</span>
                            </div>
                            
                            <div class="d-flex">
                                <button :disabled="isSubmitSocialMediaUpdate" @click="updateCompanyData('update_social_media')" class="btn btn-primary fw-bold">
                                    <div v-if="isSubmitSocialMediaUpdate">
                                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                    <span v-if="!isSubmitSocialMediaUpdate">Save Settings</span>
                                </button>
                                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
                            </div>
                          
                      </div>
                  </div>
                  <br><br><br>
              </section>
          </div>
      
    </div>
</template>

<style lang="scss" scoped>
.preview-logo{
    padding: 25px 20px;
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    border-radius:5px;
    img{
        max-height: 100px;
        width: auto !important;
        max-width:50%;
    }
}
</style>