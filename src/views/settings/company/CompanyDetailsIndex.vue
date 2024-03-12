<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {FetchComapny} from '../../../actions/CompanyAction';
export default {
  name:'ProfileIndex',
    data() {
      return{
        fetchData:{},
        timezomes:[],
        company_name:'',
        business_name:'',
        business_number:'',
        office_phone:'',
        mobile_phone:'',
        email:'',
        website:'',
        street_name:'',
        unit:'',
        city:'',
        postcode:'',
        state:'',
        country:'',
        business_logo:'',
        time_zone:'',
        twitter_link:'',
        instagram_link:'',
        facebook_link:'',
        pinterest_link:'',
        youtube_link:'',
      }
    },
    components:{
        CustomScrollbar,
    },
    methods: {
        async fetchComapnyData(){
            try{
                const res = await FetchComapny();
                try{
                    const {company, timezomes} = res;
                    this.fetchData = company;
                    this.timezomes = timezomes;
                }catch(error){}
            }catch(error){

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
    <div id="account-index" class="content">
        <CustomScrollbar>
          
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
                      <div class="col-lg-6 col-12">
                          <div class="row">
                              <div class="col-lg-8">
                                  <div class="preview-logo">
                                      <img class="logo-img" src="https://static.getpylon.com/images/companies/V3vLWPgnNAtXjcevk46rX92OP59HUuIG8Ebv18zT.png.png" alt="">
                                  </div>
                              </div>
                              <div class="col-md-8">
                                  <div class="settings-group-item mb-1">
                                      <input type="file" class="form-control form-control-input">
                                  </div>
                              </div>
                              <div class="col-md-4 text-end">
                                  <a class="btn btn-danger" href="">Remove</a>
                              </div>
                              <div class="settings-group-item">
                                  <span class="form-input-commant">For best results, use a horizontal image with a white or transparent background.</span>
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
                      <div class="col-lg-6 col-12">
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company name</label>
                                <input v-model="company_name" type="text" class="form-control form-control-input">
                                <span class="form-input-commant">Your company name may be used on invoices, receipts and customer facing proposals.</span>
                            </div>
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Business name / trading name</label>
                                <input v-model="business_name" type="text" class="form-control form-control-input">
                                <span class="form-input-commant">Your business name or trading name will be used instead of your company name where possible and also in your Terms and Conditions.</span>
                            </div>
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Australian Business Number (ABN)</label>
                                <input v-model="business_number" type="text" class="form-control form-control-input">
                                <span class="form-input-commant">Your business identifier may be used on invoices, receipts and proposals. Please make sure it's correct.</span>
                            </div>
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact phone (office)</label>
                                <input v-model="office_phone" type="text" class="form-control form-control-input">
                            </div>
        
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact phone (mobile)</label>
                                <input v-model="mobile_phone" type="text" class="form-control form-control-input">
                            </div>
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company contact email</label>
                                <input v-model="email" type="text" class="form-control form-control-input">
                            </div>
      
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Company Website</label>
                                <input v-model="website" type="text" class="form-control form-control-input">
                            </div>

                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Unit</label>
                                <input v-model="unit" type="text" class="form-control form-control-input">
                            </div>
                        
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Street Name</label>
                                <input v-model="street_name" type="text" class="form-control form-control-input">
                            </div>

                            <div class="settings-group-item">
                                <label class="form-label-title" for="">City</label>
                                <input v-model="city" type="text" class="form-control form-control-input">
                            </div>

                            <div class="settings-group-item">
                                <label class="form-label-title" for="">State</label>
                                <input v-model="state" type="text" class="form-control form-control-input">
                            </div>

                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Country</label>
                                <input v-model="country" type="text" class="form-control form-control-input">
                            </div>
                          
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Postcode</label>
                                <input v-model="postcode" type="text" class="form-control form-control-input">
                            </div>
                          
                            <div>
                                <button class="btn btn-primary fw-bold">Save Settings</button>
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
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Default timezone</label>
                              <div class="select-box">
                                  <select class="form-control form-control-input" v-model="time_zone">
                                      <option v-for="(timezome, index) in timezomes" :key="index" :value="timezome.name">{{ timezome.name }} &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; {{ timezome.offset }}</option>
                                  </select>
                              </div>
                              <span class="form-input-commant">This timezone will be used when time-stamping e-signature documents.</span>
                          </div>
      
                          <div>
                              <button class="btn btn-primary fw-bold">Save Settings</button>
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
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Twitter handle</label>
                              <input v-model="twitter_link" type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Check Link: <a target="_blank" :href="`https://twitter.com/${twitter_link}`">https://twitter.com/{{ twitter_link }}</a></span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Instagram username</label>
                              <input v-model="instagram_link" type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Check Link: <a target="_blank" :href="`https://instagram.com/${instagram_link}`">https://instagram.com/{{ instagram_link }}</a></span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Facebook username</label>
                              <input v-model="facebook_link" type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Check Link: <a target="_blank" :href="`https://facebook.com/${facebook_link}`">https://facebook.com/{{ facebook_link }}</a></span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Pinterest username</label>
                              <input v-model="pinterest_link" type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Check Link: <a target="_blank" :href="`https://www.pinterest.com/${pinterest_link}`">https://www.pinterest.com/{{ pinterest_link }}</a></span>
                          </div>
      
                          <div>
                              <button class="btn btn-primary fw-bold">Save Settings</button>
                          </div>
                          
                      </div>
                  </div>
                  <br><br><br>
              </section>
          </div>
      
        </CustomScrollbar>
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

<style>
    #account-index .scrollbar__wrapper{
        height: 100vh;
    }
    #account-index .scrollbar__wrapper .scrollbar__scroller{
        height: 100%;
    }
    #account-index .scrollbar__wrapper .scrollbar__content.scrollbar__content--horizontal{
        display: block;
    }
</style>