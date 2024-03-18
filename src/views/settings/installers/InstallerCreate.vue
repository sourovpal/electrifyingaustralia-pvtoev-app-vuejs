<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {CreateInstaller} from '../../../actions/InstallerAction';
export default {
  name:'AccountIndex',
    data() {
      return{
        errors:{},
        first_name:null,
        last_name:null,
        email:null,
        tax_identifier_type:null,
        abn:null,
        company_name:null,
        phone_number:null,
        house_phone_number:null,
        address:null,
        electrical_licence_number:null,
        cec_accreditation_number:null,
        workmanship_warranty:null,
        isSubmitCreateInstaller:false,
      }
    },
    components:{
        CustomScrollbar,
    },
    methods: {
        async createInstallerHandler(){
            try{
                var data = {
                    first_name:this.first_name,
                    last_name:this.last_name,
                    email:this.email,
                    tax_identifier_type:this.tax_identifier_type,
                    abn:this.abn,
                    company_name:this.company_name,
                    phone_number:this.phone_number,
                    house_phone_number:this.house_phone_number,
                    address:this.address,
                    electrical_licence_number:this.electrical_licence_number,
                    cec_accreditation_number:this.cec_accreditation_number,
                    workmanship_warranty:this.workmanship_warranty,
                };

                this.isSubmitCreateInstaller = true;

                const res = await CreateInstaller(data);
                
                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
                    this.first_name=null;
                    this.first_name=null;
                    this.last_name=null;
                    this.email=null;
                    this.tax_identifier_type=null;
                    this.abn=null;
                    this.company_name=null;
                    this.phone_number=null;
                    this.house_phone_number=null;
                    this.address=null;
                    this.electrical_licence_number=null;
                    this.cec_accreditation_number=null;
                    this.workmanship_warranty=null;
                }catch(error){}
                
            }catch(error){
                try{
                    var data = error.response.data;
                    this.errors = data.errors;
                }catch(e){}
                
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isSubmitCreateInstaller = false;
            }
        }
    },
  }
  
</script>

<template>
    <div id="installer-create" class="content add-custom-scrollbar">
        <CustomScrollbar thumbWidth="8" direction="horizontal">
            <div class="content-header d-flex justify-content-start align-items-center">
                <router-link to="/settings/installers">
                    <h1 class="mb-0 text-base">Installers list</h1>
                </router-link>
                <div class="mx-2">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
                </div>
                <h1 class="mb-0 text-soft">Create New</h1>
            </div>
        
            <div class="content-body">
                <section class="">
        
                    <div class="row">
                        <div class="col-lg-6">
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">First name <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                                <input @focus="delete errors?.first_name" v-model="first_name" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.first_name?.length">{{ errors?.first_name[0] }}</span>
                            </div>
                            
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Last name</label>
                                <input @focus="delete errors?.last_name" v-model="last_name" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.last_name?.length">{{ errors?.last_name[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">ABN</label>
                                <input @focus="delete errors?.abn" v-model="abn" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.abn?.length">{{ errors?.abn[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Company Name</label>
                                <input @focus="delete errors?.company_name" v-model="company_name" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.company_name?.length">{{ errors?.company_name[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Phone Number <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                                <input @focus="delete errors?.phone_number" v-model="phone_number" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.phone_number?.length">{{ errors?.phone_number[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">After-Hours Phone Number</label>
                                <input @focus="delete errors?.house_phone_number" v-model="house_phone_number" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.house_phone_number?.length">{{ errors?.house_phone_number[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Email <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                                <input @focus="delete errors?.email" v-model="email" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email?.length">{{ errors?.email[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Address</label>
                                <input @focus="delete errors?.address" v-model="address" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.address?.length">{{ errors?.address[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Tax Identifier Type</label>
                                <input @focus="delete errors?.tax_identifier_type" v-model="tax_identifier_type" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.tax_identifier_type?.length">{{ errors?.tax_identifier_type[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Electrical Licence Number</label>
                                <input @focus="delete errors?.electrical_licence_number" v-model="electrical_licence_number" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.electrical_licence_number?.length">{{ errors?.electrical_licence_number[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">CEC Accreditation Number</label>
                                <input @focus="delete errors?.cec_accreditation_number" v-model="cec_accreditation_number" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.cec_accreditation_number?.length">{{ errors?.cec_accreditation_number[0] }}</span>
                            </div>
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Workmanship Warranty (years)</label>
                                <input @focus="delete errors?.workmanship_warranty" v-model="workmanship_warranty" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.workmanship_warranty?.length">{{ errors?.workmanship_warranty[0] }}</span>
                            </div>
                        </div>
                        <div class="col-lg-12 mt-3">
                            <button :disabled="isSubmitCreateInstaller" @click="createInstallerHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                <div v-if="isSubmitCreateInstaller">
                                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                        <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                    </svg>
                                    <span>Submitting...</span>
                                </div>
                                <span v-if="!isSubmitCreateInstaller">Save Settings</span>
                            </button>
                        </div>
                    </div>
        
                    <br><br><br>
                </section>
            </div>
        </CustomScrollbar>
    </div>
</template>
<style lang="scss" scoped>
    .form-label-title{
        span{
            padding-bottom: 2px !important;
        }
    }
</style>
