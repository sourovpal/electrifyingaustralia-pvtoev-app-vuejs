<script>
    import { Modal } from "mdb-ui-kit";
    import { Cropper } from 'vue-advanced-cropper'
    import 'vue-advanced-cropper/dist/style.css';
    import {FetchProfile, UpdateProfile} from '../../../../actions/ProfileAction';
    export default {
        props: {
            fetchUser: Object,
        },
        data() {
            return {
                errors:{},
                modalInstance:null,
                profile_avatar:null,
                default_profile_avatar:null,
                inputProfileImage:null,
                profileImageFile:null,
                isSubmitProfileImage:false,
                isSubmitProfileImageRemove:false,
                profileImageRemoveConfirmDialog:false,
            }
        },
        components:{
            Cropper,
        },
        watch: {
            "fetchUser"(val){
                try{
                    this.profile_avatar = val.profile_avatar;
                }catch(error){}
            }
        },
        methods: {
            showModalHandler(){
                this.modalInstance.show();
            },
            hideModalHandler(){
                this.modalInstance.hide();
            },
            async formSubmitHandler(payload=null){

                var data = new FormData();
                data.append('action', 'profile_photo_upload');

                if(payload && payload.remove_profile_photo === 1 && this.profileImageFile){

                    this.profileImageRemoveConfirmDialog = false;
                    this.profileImageFile = null;
                    this.profile_avatar = this.fetchUser.profile_avatar
                    return;

                }else if(payload && payload.remove_profile_photo === 1){

                    this.profileImageRemoveConfirmDialog = false;
                    data.append('remove_profile_photo', 1);
                    this.isSubmitProfileImageRemove = true;
                    
                }else if(this.profileImageFile){
                    
                    data.append('profile_photo', this.profileImageFile);
                    this.isSubmitProfileImage = true;

                }else{

                    this.errors['profile_photo'] = ['Please select profile photo.'];
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
                        this.profile_avatar = user.profile_avatar;
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
                    this.isSubmitProfileImage = false;
                    this.isSubmitProfileImageRemove = false;
                }
                
            },
            async selectProfileImage(e){
                if(e.target.files && e.target.files.length){
                    var file = e.target.files[0];
                    if(file){
                        this.showModalHandler();
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
                this.hideModalHandler();
                this.inputProfileImage = null;

                const response = await fetch(canvas.toDataURL());
                const blob = await response.blob();
                this.profileImageFile = await new File([blob], 'profile-image.png', { lastModified:Date.now() });
            }
        },
        mounted(){
            this.modalInstance = new Modal(this.$refs.prifileImageCroperModel);
        },
    }
</script>
<template>
    <div class="row">

        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Profile photo</h2>
            </div>
        </div>

        <div class="col-lg-5 col-12">
            <div class="row">

                <div class="col-lg-9 col-8 pe-2">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Upload a photo</label>
                        <input @click="delete errors?.profile_photo" @change="selectProfileImage" accept=".jpeg, .png, .jpg, .webp" type="file" class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.profile_photo?.length">{{ errors?.profile_photo[0] }}</span>
                    </div>

                    <div class="d-flex">

                        <button :disabled="isSubmitProfileImage" @click="formSubmitHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitProfileImage">
                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span>Submitting...</span>
                            </div>
                            <span v-if="!isSubmitProfileImage">Save Settings</span>
                        </button>
                        
                        <button v-if="profile_avatar" :disabled="isSubmitProfileImageRemove" @click="profileImageRemoveConfirmDialog=!profileImageRemoveConfirmDialog" class="btn btn-danger ms-auto">
                            <div v-if="isSubmitProfileImageRemove">
                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span class="text-white">Submitting...</span>
                            </div>
                            <span v-if="!isSubmitProfileImageRemove">Remove</span>
                        </button>

                    </div>
                </div>
                    
                <div class="col-lg-3 col-4 text-end">
                    <div class="">
                        <img class="img-thumbnail" style="width:100px;height:100px;" :src="profile_avatar??default_profile_avatar" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Confirm Dialog -->
    <div v-if="profileImageRemoveConfirmDialog" class="confirm-dialog-area">
        <div class="confirm-dialog" style="max-width:380px;">
            <h1 class="text-hard fw-bold">Remove?</h1>
            <p>Are you ready to remove your profile photo?</p>
            <button @click="profileImageRemoveConfirmDialog=!profileImageRemoveConfirmDialog">Cancel</button>
            <button @click="formSubmitHandler({remove_profile_photo:1})">Confirm</button>
        </div>
    </div>

    <!-- Profile image cropper -->
    <div class="modal fade" ref="prifileImageCroperModel" tabindex="-1" role="dialog" aria-labelledby="prifileImageCroperModel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header mx-3 py-1">
                <h5 class="modal-title" id="exampleModalLabel">Resize Profile Photo</h5>
                <button type="button" class="btn btn-light btn-sm btn-floating" data-mdb-dismiss="modal" aria-label="Close">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
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
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <button type="button" class="btn btn-danger btn-sm" data-mdb-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary btn-sm" @click="prifilePhotoCrop()">Crop</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>