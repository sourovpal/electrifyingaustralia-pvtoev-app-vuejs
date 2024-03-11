<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {UpdateProfilePassword, FetchProfile, UpdateProfile} from '../../../actions/ProfileAction';
import {LogoutAction} from '../../../actions/AuthAction';

export default {
  name:'AccountIndex',
    data() {
      return{
        errors:{},
        fetchUser:{},
        activeUsers:[],
        isFetching:false,
        email:'',
        email_otp:'',
        current_password:'',
        new_password:'',
        confirm_password:'',
        showEmailOtpInputDialog:false,
        tempChangeEmail:'',
        isEmailChangeSubmit:false,
        isEmailChangeSubmitOtp:false,
      }
    },
    components:{
        CustomScrollbar,
    },
    methods: {
        async fetchProfileData(is_token=false){
            try{
                this.isFetching = true;
                const res = await FetchProfile(1);
                const {user, active_users} = res;
                if(is_token){
                    this.activeUsers = active_users;              
                }else{
                    this.fetchUser = user;
                    this.activeUsers = active_users;              
                }
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
        async updateEmailAddress(action=null){
            try{

                if(this.email === this.fetchUser.email){
                    return ;
                }
                var data = new FormData();
                if(action === 'send_email_otp'){
                    this.isEmailChangeSubmit = true;
                    this.tempChangeEmail = '';
                    this.email_otp = '',
                    data.append('email', this.email);
                    data.append('action', 'send_email_otp');
                }else if(action === 'update_email'){
                    this.isEmailChangeSubmitOtp = true;
                    data.append('action', 'update_email');
                    data.append('email', this.tempChangeEmail);
                    data.append('email_otp', this.email_otp);
                }else{
                    return;
                }

                const res = await UpdateProfile(data);

                if(action === 'send_email_otp'){
                    this.tempChangeEmail = this.email;
                    this.showEmailOtpInputDialog = true;
                }else{
                    this.tempChangeEmail = '';
                    this.email_otp = '';
                    this.showEmailOtpInputDialog = false;
                }

                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
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
                this.isEmailChangeSubmit = false;
                this.isEmailChangeSubmitOtp = false;
            }
        },
        async logoutOthersDevice(token_id, current=0){
            try{
                const res = await LogoutAction(token_id);
                try{
                    this.fetchProfileData(true);
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){}
            }catch{

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }

            }
        }
    },
    mounted() {
        this.fetchProfileData();
        setInterval(()=>{
            this.fetchProfileData(true);
        },10000);

        this.$watch(vm => [this.fetchUser], val => {
            try{
                var user = this.fetchUser;
                this.email = user.email;
            }catch(error){
            }
        }, {immediate: true, deep: true});

    },
  }
  
</script>

<template>

    <div id="account-index" class="content">
        <CustomScrollbar thumbWidth="10" direction="horizontal">
            <div class="content-header">
                <h1>Account</h1>
            </div>
        
            <div class="content-body">
                <section class="">
        
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Account email</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
        
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Email address</label>
                                <input @focus="delete errors?.email" v-model="email" type="text" class="form-control form-control-input">
                                <span class="form-input-commant" v-if="!errors?.email?.length">When changing your account email address, you will be sent a email to validate your new email address.</span>
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email?.length">{{ errors?.email[0] }}</span>
                            </div>
                            
                            <div>
                                <button :disabled="isEmailChangeSubmit" @click="updateEmailAddress('send_email_otp')" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                    <div v-if="isEmailChangeSubmit">
                                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                    <span v-if="!isEmailChangeSubmit">Change Email</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="mt-4 mb-5">
                    
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Change password</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-12">
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Current password</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                            
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">New password</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                                <span class="form-input-commant">Please use at least 8 characters</span>
                            </div>
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Confirm new password</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                            
                            <div class="d-flex justify-content-start align-items-center">
                                <button class="btn btn-primary fw-bold">Change Password</button>
                                <a class="fw-bold ms-4" href="">I forgot my password</a>
                            </div>
                        </div>
                    </div>
        
                    <hr class="mt-4 mb-5">
        
                    <div class="row">
                        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                            <div class="settings-group-header">
                                <h2>Active sessions</h2>
                            </div>
                        </div>
                        <div class="col-lg-9 col-12">
                            <div class="table-responsive-lg">
                                <table class="table table-bordered table-sm table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th class="fw-bold py-1" width="25%" scope="col">Browser</th>
                                            <th class="fw-bold py-1" width="20%" scope="col">Location</th>
                                            <th class="fw-bold py-1" width="15%" scope="col">Sign In</th>
                                            <th class="fw-bold py-1" width="15%" scope="col">Last seen</th>
                                            <th class="fw-bold py-1" width="5%" scope="col">User</th>
                                            <th class="fw-bold py-1" width="5%" scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(session, index) in activeUsers" :key="index">
                                            <td scope="col" class="py-1">{{ session.browser }}</td>
                                            <td scope="col" class="py-1">{{ session.location }}</td>
                                            <td scope="col" class="py-1">{{ session.created_at }}</td>
                                            <td scope="col" class="py-1">{{ session.updated_at }}</td>
                                            <td scope="col" class="py-1"><span :class="`btn btn-sm py-0 px-1 fs-12px btn-${(session.is_active==1)?'danger':'warning'}`">{{ (session.is_active == 1)?'Current':'Other' }}</span></td>
                                            <td scope="col" class="py-1">
                                                <button :disabled="session.is_active" @click="logoutOthersDevice(session.id)" class="btn btn-sm btn-danger py-0 px-1" v-tippy='{ content:"Sign Out", placement : "top" }'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="14px" viewBox="0 0 24 24" width="14px" fill="#ffffff"><path d="M0,0h24v24H0V0z" fill="none"></path> <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"></path></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
        
                    <br><br><br>
                </section>
            </div>            
        </CustomScrollbar>
    </div>




    <div v-if="showEmailOtpInputDialog" class="confirm-dialog-area">
        <div class="confirm-dialog" style="max-width:380px;">
            <p class="text-hard pt-4 mb-2" style="margin: 0;font-size: 20px;line-height: 18px;">
                <span class="fw-bold">You got your verification code to this </span>
                <br> <span class="text-hard fs-14px">{{ email }}</span>
            </p>
            <div class="px-4 mb-5 pb-3 pt-2">
                <input @focus="delete errors?.email_otp" type="text" class="form-control form-control-input" v-model="email_otp" placeholder="Code: 123456">
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email_otp?.length">{{ errors?.email_otp[0] }}</span>
            </div>
            <button @click="showEmailOtpInputDialog=!showEmailOtpInputDialog">Cancel</button>
            <button :disabled="isEmailChangeSubmitOtp" @click="updateEmailAddress('update_email')">
                <div v-if="isEmailChangeSubmitOtp">
                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                        <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                    <span>Submitting...</span>
                </div>
                <span v-if="!isEmailChangeSubmitOtp">Confirm</span>
            </button>
        </div>
    </div>

</template>

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