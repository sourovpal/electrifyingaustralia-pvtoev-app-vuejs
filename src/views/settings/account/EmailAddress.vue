<script>
import { UpdateProfile, UpdateProfilePassword } from '../../../actions/ProfileAction';
export default {
    props:{
        user:Object,
    },
    data() {
      return{
        errors:{},
        email:'',
        email_otp:'',
        password:'',
        showEmailOtpInputDialog:false,
        tempChangeEmail:'',
        isEmailChangeSubmit:false,
        isEmailChangeSubmitOtp:false,
      }
    },
    watch: {
        user:{
            handler(val){
                try{
                    this.email = val.email;
                }catch(error){}
            },
            immediate:true, deep:true,
        }
    },
    methods:{
        async updateEmailAddress(action=null){
            try{
                
                if(this.email === this.user.email){
                    this.errors = {email:['Please change current email address.']};
                    return ;
                }
                var data = new FormData();
                if(action === 'send_email_otp'){
                    this.isEmailChangeSubmit = true;
                    this.tempChangeEmail = '';
                    this.email_otp = '',
                    data.append('email', this.email??'');
                    data.append('action', 'send_email_otp');
                }else if(action === 'update_email'){
                    this.isEmailChangeSubmitOtp = true;
                    data.append('action', 'update_email');
                    data.append('email', this.tempChangeEmail??'');
                    data.append('email_otp', this.email_otp??'');
                    data.append('password', this.password??'');
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
                    this.password = '';
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
    }
}
</script>
<template>
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

    <div v-if="showEmailOtpInputDialog" class="confirm-dialog-area">
        <div class="confirm-dialog" style="max-width:450px;">
            <p class="text-hard pt-4 mb-2" style="margin: 0;font-size: 20px;line-height: 20px;">
                <span class="fw-bold text-primary">You got your verification code to this </span>
                <br> <span class="text-hard fs-14px ">{{ email }}</span>
            </p>
            <div class="px-4 pb-3 pt-2">
                <label class="form-label-title">Verification Code</label>
                <input @focus="delete errors?.email_otp" type="text" class="form-control form-control-input" v-model="email_otp" placeholder="">
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email_otp?.length">{{ errors?.email_otp[0] }}</span>
            </div>
            <div class="px-4 mb-5 pb-4">
                <label class="form-label-title">Your Current Password</label>
                <input @focus="delete errors?.password" type="text" class="form-control form-control-input" v-model="password" placeholder="">
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.password?.length">{{ errors?.password[0] }}</span>
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