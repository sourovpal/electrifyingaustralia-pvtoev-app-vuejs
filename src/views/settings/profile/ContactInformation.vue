<script>
    import {FetchProfile, UpdateProfile} from '../../../actions/ProfileAction';
    export default {
        props: {
            fetchUser: Object,
        },
        data() {
            return {
                errors:{},
                phone_office:null,
                phone_mobile:null,
                isSubmitContactInfo:false,
            }
        },
        watch: {
            fetchUser:{
                handler(val){
                    try{
                        this.phone_office = val.phone_office;
                        this.phone_mobile = val.phone_mobile;
                    }catch(error){}
                },
                immediate:true, deep:true,
            }
        },
        methods: {
            async formSubmitHandler(payload=null){
                var data = {
                    action:'contact_info',
                    phone_office:this.phone_office,
                    phone_mobile:this.phone_mobile,
                };
                this.isSubmitContactInfo = true;
                
                try{
                    const res = await UpdateProfile(data);
                    
                    try{
                        const {message} = res;
                        this.$toast[message.type](message.text);
                    }catch(error){
                    }
                    
                    try{
                        const {user} = res;
                        this.$cookies.remove(import.meta.env.VITE_AUTH_USER, '/');
                        this.$cookies.set(import.meta.env.VITE_AUTH_USER, user, '1y', '/');
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
                    this.isSubmitContactInfo = false;
                }
                
            },
        },
        mounted(){
            try{
                const {phone_office, phone_mobile} = this.$cookies.get(import.meta.env.VITE_AUTH_USER);
                this.phone_office = phone_office;
                this.phone_mobile = phone_mobile;
            }catch(error){

            }
        }
    }
</script>
<template>
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
                <button :disabled="isSubmitContactInfo" @click="formSubmitHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                <div v-if="isSubmitContactInfo">
                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                    <span>Submitting...</span>
                </div>
                <span v-if="!isSubmitContactInfo">Save Settings</span>
                </button>
                <button class="btn btn-danger fw-bold ms-auto">Reset</button>
            </div>
        </div>
    </div>
</template>