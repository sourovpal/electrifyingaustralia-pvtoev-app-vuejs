<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {FetchProfile, UpdateProfile} from '../../../actions/ProfileAction';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
    name:'ProfileIndex',
    data() {
        return{
            fetchUser:{},
            isFetching:false,
            name:'',
            display_name:'',
            job_title:'',
            username:'',
            email:'',
            phone_office:'',
            phone_mobile:'',
            time_zone:'',
            profile_avatar:'',
            company_name:'',
            default_profile_avatar:'',
            map_base_layer_style:'',
            isBasicDetailsChangeCount:0,
            isContactInfoChangeCount:0,
            isBasicDetailsSubmit:false,
            isContactInfoSubmit:false,
            isProfileImageSubmit:false,
            isProfileImageRemoveSubmit:false,
            profileImageRemoveConfirmDialog:false,
            errors:{},
            inputProfileImage:null,
            profileImageFile:null,
        }
    },
    components:{
        CustomScrollbar,
        Cropper
    },
    methods: {
        async fetchProfileData(){
            try{
                this.isFetching = true;
                const res = await FetchProfile();
                const {user} = res;
                this.fetchUser = user;                
            }catch{
                try{
                    var data = error.response.data;
                    this.$toast[data.type](data.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isFetching = false;
            }
        },
        async resetInputField(section=null){
            if(!section){
                return;
            }
            var user = this.fetchUser;
            
            if(section === 'basic_details'){
                this.name         = user.name;
                this.display_name = user.display_name;
                this.job_title    = user.job_title;
                this.username     = user.username;
                this.isBasicDetailsChangeCount = 0;
                this.errors = {};
            }else if(section === 'contact_info'){
                this.phone_mobile = user.phone_mobile;
                this.phone_office = user.phone_office;
                this.isContactInfoChangeCount = 0;
                this.errors = {};
            }
        },
        async formSubmitHandler(section=null, payload=null){
            var data = new FormData();
            data.append('action', section);
            if(section === 'basic_details' && !this.isBasicDetailsSubmit && this.isBasicDetailsChangeCount !== 1){
                
                data.append('name', this.name);
                data.append('username', this.username);
                data.append('job_title', this.job_title);
                data.append('display_name', this.display_name);
                this.isBasicDetailsSubmit = true;
                
            }else if(section === 'contact_info' && !this.isContactInfoSubmit && this.isContactInfoChangeCount !== 1){
                
                data.append('phone_mobile', this.phone_mobile);
                data.append('phone_office', this.phone_office);
                this.isContactInfoSubmit = true;
                
            }else if(section === 'profile_photo_upload' && !this.isProfileImageSubmit){
                if(payload && payload.remove_profile_photo === 1 && this.profileImageFile){
                    this.profileImageRemoveConfirmDialog = false;
                    this.profileImageFile = null;
                    this.profile_avatar = this.fetchUser.profile_avatar
                    return;
                }else if(payload && payload.remove_profile_photo === 1){
                    this.profileImageRemoveConfirmDialog = false;
                    data.append('remove_profile_photo', 1);
                    this.isProfileImageRemoveSubmit = true;
                }else if(this.profileImageFile){
                    data.append('profile_photo', this.profileImageFile);
                    this.isProfileImageSubmit = true;
                }else{
                    return ;
                }
            }else{
                return ;
            }
            try{
                const res = await UpdateProfile(data);
                
                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){
                }
                
                try{
                    const {user} = res;
                    this.fetchUser = user;
                    this.errors = {};
                    this.profileImageFile = null;
                    this.isContactInfoChangeCount = 0;
                    this.isBasicDetailsChangeCount = 0;
                }catch(error){
                }
                
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
                this.isBasicDetailsSubmit = false;
                this.isContactInfoSubmit  = false;
                this.isProfileImageSubmit = false;
                this.isProfileImageRemoveSubmit = false;
            }
            
            
        },
        async selectProfileImage(e){
            if(e.target.files && e.target.files.length){
                var file = e.target.files[0];
                if(file){
                    this.$refs.showCropperModel.click();
                    this.inputProfileImage = URL.createObjectURL(file);
                    e.target.value = '';
                }else{
                }
            }
        },
        async prifilePhotoCrop() {
            const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			this.profile_avatar = canvas.toDataURL();
            this.$refs.closeCropperModel.click();
            this.inputProfileImage = null;

            const response = await fetch(canvas.toDataURL());
            const blob = await response.blob();
            this.profileImageFile = await new File([blob], 'profile-image.png', { lastModified:Date.now() });
		}
    },
    mounted() {
        this.fetchProfileData();
        
        this.$watch(vm => [this.name, this.display_name, this.job_title, this.username], val => {
            this.isBasicDetailsChangeCount += 1;
        }, {immediate: true, deep: true});
        
        this.$watch(vm => [this.phone_mobile, this.phone_office], val => {
            this.isContactInfoChangeCount += 1;
        }, {immediate: true, deep: true});
        
        this.$watch(vm => [this.fetchUser], val => {
            try{
                var user = this.fetchUser;
                this.name           = user.name;
                this.display_name   = user.display_name;
                this.job_title      = user.job_title;
                this.username       = user.username;
                this.email          = user.email;
                this.phone_office   = user.phone_office;
                this.phone_mobile   = user.phone_mobile;
                this.time_zone      = user.time_zone;
                this.profile_avatar = user.profile_avatar;
                this.company_name   = user.company_name;
                this.default_profile_avatar = user.default_profile_avatar;
                this.map_base_layer_style   = user.map_base_layer_style;
                this.isBasicDetailsChangeCount = this.isContactInfoChangeCount = 0;
            }catch(error){
            }
        }, {immediate: true, deep: true});
        
    },
}

</script>

<template>
    <div id="profile-index" class="content">        

        <CustomScrollbar thumbWidth="10" direction="horizontal">
          
          <div class="content-header">
              <h1>Profile</h1>
          </div>
      
          <div class="content-body">
              <section class="">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Basic details</h2>
                          </div>
                      </div>
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Full Name</label>
                              <input @focus="delete errors?.name" v-model="name" type="text" class="form-control form-control-input">
                              <span class="form-input-commant" v-if="!errors?.name?.length">Your full name will appear on your customer facing proposals.</span>
                              <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Job title at {{ company_name }}</label>
                              <input @focus="delete errors?.job_title" v-model="job_title" type="text" class="form-control form-control-input">
                              <span class="form-input-commant" v-if="!errors?.job_title?.length">Your job title may be used in proposals, email templates, etc.</span>
                              <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.job_title?.length">{{ errors?.job_title[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Display name</label>
                                <input @focus="delete errors?.display_name" v-model="display_name" type="text" class="form-control form-control-input">
                                <span class="form-input-commant" v-if="!errors?.display_name?.length">Only visible to other users on your Pylon Observer team.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.display_name?.length">{{ errors?.display_name[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Forum username</label>
                                <input @focus="delete errors?.username" type="text" v-model="username" class="form-control form-control-input">
                                <span class="form-input-commant" v-if="!errors?.username?.length">Visible to other Pylon Observer users, including those outside your team, in the Feedback forum.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.username?.length">{{ errors?.username[0] }}</span>
                            </div>
                            <div class="d-flex">
                                <button :disabled="isBasicDetailsSubmit" @click="formSubmitHandler('basic_details')" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                    <div v-if="isBasicDetailsSubmit">
                                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                    <span v-if="!isBasicDetailsSubmit">Save Settings</span>
                                </button>
                                <button v-if="isBasicDetailsChangeCount > 1" @click="resetInputField('basic_details')" class="btn btn-danger fw-bold ms-auto">Reset</button>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="mt-4 mb-5">
                    
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Contact information</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact number (office)</label>
                                <input @focus="delete errors?.phone_office" v-model="phone_office" type="text" class="form-control form-control-input">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.phone_office?.length">{{ errors?.phone_office[0] }}</span>
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Contact number (mobile)</label>
                                <input @focus="delete errors?.phone_mobile" v-model="phone_mobile" type="text" class="form-control form-control-input">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.phone_mobile?.length">{{ errors?.phone_mobile[0] }}</span>
                          </div>
                          
                          <div class="d-flex">
                            <button :disabled="isContactInfoSubmit" @click="formSubmitHandler('contact_info')" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                              <div v-if="isContactInfoSubmit">
                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                  <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span>Submitting...</span>
                              </div>
                              <span v-if="!isContactInfoSubmit">Save Settings</span>
                            </button>
                            <button v-if="isContactInfoChangeCount > 1" @click="resetInputField('contact_info')" class="btn btn-danger fw-bold ms-auto">Reset</button>
                        </div>
                      </div>
                  </div>
      
                  <hr class="mt-4 mb-5">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Preferences</h2>
                          </div>
                      </div>
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Map base layer style</label>
                              <div class="select-box">
                                  <select class="form-control form-control-input">
                                      <option value="">Select Options</option>
                                      <option value="">Select Options</option>
                                      <option value="">Select Options</option>
                                  </select>
                              </div>
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
                              <h2>Profile photo</h2>
                          </div>
                      </div>
                      <div class="col-lg-7 col-12">
                          <div class="row">

                            <div v-if="profileImageRemoveConfirmDialog" class="confirm-dialog-area">
                                <div class="confirm-dialog" style="max-width:380px;">
                                    <h1 class="text-hard fw-bold">Remove?</h1>
                                    <p>Are you ready to remove your profile photo?</p>
                                    <button @click="profileImageRemoveConfirmDialog=!profileImageRemoveConfirmDialog">Cancel</button>
                                    <button @click="formSubmitHandler('profile_photo_upload',{remove_profile_photo:1})">Confirm</button>
                                </div>
                            </div>
                                <!-- Profile image cropper -->
                                <div class="modal fade" id="prifileImageCroperModel" tabindex="-1" role="dialog" aria-labelledby="prifileImageCroperModel" aria-hidden="true" >
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Resize Profile Photo</h5>
                                            <button type="button" class="close" data-mdb-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            </div>
                                            <div class="modal-body">
                                                <cropper
                                                    class="cropper"
                                                    :src="inputProfileImage"
                                                    ref="cropper"
                                                    :stencil-size="{
                                                        width: 200,
                                                        height: 200
                                                    }"
                                                    :stencil-props="{
                                                        handlers: {},
                                                        aspectRatio: 1,
                                                    }"
                                                    image-restriction="stencil"
                                                    :auto-zoom="false"
                                                    :zoom="5"
                                                />
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger btn-sm" data-mdb-dismiss="modal" ref="closeCropperModel">Close</button>
                                                <button type="button" class="btn btn-primary btn-sm" @click="prifilePhotoCrop">Crop</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-8 pe-2">
                                    <div class="settings-group-item">
                                        <label class="form-label-title" for="">Upload a photo</label>
                                        <input @change="selectProfileImage" accept=".jpeg, .png, .jpg, .webp" type="file" class="form-control form-control-input">
                                    </div>
                                    <div class="d-flex">
                                        <button :disabled="isProfileImageSubmit" @click="formSubmitHandler('profile_photo_upload')" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                            <div v-if="isProfileImageSubmit">
                                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                                </svg>
                                                <span>Submitting...</span>
                                            </div>
                                            <span v-if="!isProfileImageSubmit">Save Settings</span>
                                        </button>
                                        
                                        <button ref="showCropperModel" data-mdb-toggle="modal" data-mdb-target="#prifileImageCroperModel" style="opacity: 0;visibility: hidden;"></button>
                                        <button v-if="profile_avatar" :disabled="isProfileImageRemoveSubmit" @click="profileImageRemoveConfirmDialog=!profileImageRemoveConfirmDialog" class="btn btn-danger ms-auto">
                                            <div v-if="isProfileImageRemoveSubmit">
                                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                                </svg>
                                                <span class="text-white">Submitting...</span>
                                            </div>
                                            <span v-if="!isProfileImageRemoveSubmit">Remove</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="col-lg-3 col-4 text-center">
                                    <div class="">
                                            <img class="img-thumbnail" style="width:100px;height:100px;" :src="profile_avatar??default_profile_avatar" alt="">
                                        </div>
                                </div>
                          </div>
                      </div>
                  </div>
                  <br><br><br>
              </section>
          </div>
      
        </CustomScrollbar>
    </div>
</template>

<style>
    #profile-index .scrollbar__wrapper{
        height: 100vh;
    }
    #profile-index .scrollbar__wrapper .scrollbar__scroller{
        height: 100%;
    }
    #profile-index .scrollbar__wrapper .scrollbar__content.scrollbar__content--horizontal{
        display: block;
    }
</style>