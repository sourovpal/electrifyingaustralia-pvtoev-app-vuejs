<script>
    import {FetchProfile, UpdateProfile} from '../../../../actions/ProfileAction';
    import {inject} from 'vue';
    import Storage from '../../../../helpers/Storage';
    import {CONFIG} from '../../../../config';

    export default {
        setup(props) {
            const {user, updateUser} = inject('user_profile');
            const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
            return {user, updateUser, userStorage};
        },
        data() {
            return {
                errors:{},
                name:null,
                display_name:null,
                job_title:null,
                username:null,
                company_name:null,
                isSubmitBasicDetails:false,
            }
        },    
        watch:{
            'user'(n){
                this.setData();
            }
        },
        methods: {
            setData(){
                try{
                    this.name = this.user.name;
                    this.display_name = this.user.display_name;
                    this.job_title    = this.user.job_title;
                    this.username     = this.user.username;
                    this.company_name = this.user.company_name;
                }catch(error){}
            },
            async formSubmitHandler(payload=null){
                this.$toast.clear();
                var data = {
                    action      :'basic_details',
                    name        :this.name,
                    username    :this.username,
                    job_title   :this.job_title,
                    display_name:this.display_name,
                };
                this.isSubmitBasicDetails = true;
                try{
                    const res = await UpdateProfile(data);
                    this.updateUser(res.user);
                    this.userStorage.set(res.user);
                    try{
                        const {message} = res;
                        this.$toast[message.type](message.text);
                    }catch(error){}
                    
                    try{
                        const {user} = res;
                        
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
                    this.isSubmitBasicDetails = false;
                }
                
            },
        },
        computed:{
            isResetButtonActive(){
                return !(this.name == this.user.name
                && this.display_name == this.user.display_name
                && this.job_title    == this.user.job_title
                && this.username     == this.user.username
                && this.company_name == this.user.company_name);
            }
        },
        mounted() {
        },    
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Basic details</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">

            <div class="settings-group-item">
                <label class="form-label-title" for="">Full Name</label>
                <input @focus="delete errors?.name" v-model="name" type="text" class="form-control">
                <span class="form-input-commant" v-if="!errors?.name?.length">Your full name will appear on your customer facing proposals.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
            </div>

            <div class="settings-group-item">
                <label class="form-label-title" for="">Job title at {{ company_name }}</label>
                <input @focus="delete errors?.job_title" v-model="job_title" type="text" class="form-control">
                <span class="form-input-commant" v-if="!errors?.job_title?.length">Your job title may be used in proposals, email templates, etc.</span>
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.job_title?.length">{{ errors?.job_title[0] }}</span>
              </div>
              
              <div class="settings-group-item">
                  <label class="form-label-title" for="">Display name</label>
                  <input @focus="delete errors?.display_name" v-model="display_name" type="text" class="form-control">
                  <span class="form-input-commant" v-if="!errors?.display_name?.length">Only visible to other users on your Pylon Observer team.</span>
                  <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.display_name?.length">{{ errors?.display_name[0] }}</span>
              </div>
              
              <div class="settings-group-item">
                  <label class="form-label-title" for="">Forum username</label>
                  <input @focus="delete errors?.username" type="text" v-model="username" class="form-control">
                  <span class="form-input-commant" v-if="!errors?.username?.length">Visible to other Pylon Observer users, including those outside your team, in the Feedback forum.</span>
                  <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.username?.length">{{ errors?.username[0] }}</span>
              </div>
              <div class="d-flex">
                  <button :disabled="isSubmitBasicDetails" @click="formSubmitHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                      <div v-if="isSubmitBasicDetails">
                          <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                              <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                          </svg>
                          <span>Submitting...</span>
                      </div>
                      <span v-else>Save Settings</span>
                  </button>
                  <button 
                  v-if="isResetButtonActive" 
                  @click="setData()"
                  class="btn btn-danger fw-bold ms-auto">Reset</button>
              </div>
          </div>
      </div>
</template>