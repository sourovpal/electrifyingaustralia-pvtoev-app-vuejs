<script>
import { UpdateProfilePassword } from '../../../actions/ProfileAction';
export default {
    data() {
      return{
        errors:{},
        fetchUser:{},
        current_password:'',
        new_password:'',
        confirm_password:'',
        isPasswordSubmit:false,
      }
    },
    methods:{
        async changePasswordHandler(){
            try{
                this.isPasswordSubmit = true;
                const res = await UpdateProfilePassword({
                    current_password:this.current_password,
                    new_password:this.new_password,
                    confirm_password:this.confirm_password,
                });
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
                this.isPasswordSubmit = false;
            }
        },
    }
}
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Change password</h2>
            </div>
        </div>
        <div class="col-lg-6 col-12">
            
            <div class="settings-group-item">
                <label class="form-label-title" for="">Current password</label>
                <input @focus="delete errors?.current_password" v-model="current_password" type="text" class="form-control form-control-input">
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.current_password?.length">{{ errors?.current_password[0] }}</span>
            </div>
            
            <div class="settings-group-item">
                <label class="form-label-title" for="">New password</label>
                <input @focus="delete errors?.new_password" v-model="new_password" type="text" class="form-control form-control-input">
                <span class="form-input-commant" v-if="!errors?.new_password?.length">Please use at least 8 characters</span>
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.new_password?.length">{{ errors?.new_password[0] }}</span>
            </div>
            <div class="settings-group-item">
                <label class="form-label-title" for="">Confirm new password</label>
                <input @focus="delete errors?.confirm_password" v-model="confirm_password" type="text" class="form-control form-control-input">
                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.confirm_password?.length">{{ errors?.confirm_password[0] }}</span>
            </div>
            
            <div class="d-flex justify-content-start align-items-center">
                <button :disabled="isPasswordSubmit" @click="changePasswordHandler" class="btn btn-primary fw-bold">
                    <div v-if="isPasswordSubmit">
                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                        <span>Submitting...</span>
                    </div>
                    <span v-if="!isPasswordSubmit">Change Password</span>
                </button>
                <a class="fw-bold ms-4" href="">I forgot my password</a>
            </div>
        </div>
    </div>
</template>