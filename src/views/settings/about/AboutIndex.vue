<script>
import {FetchAboutUs, UpdateAboutUs} from '../../../actions/AboutUsAction';
export default {
  name:'ProfileIndex',
    data() {
      return{
        errors:{},
        sub_title:null,
        description:null,
        isSubmitAboutUs:false,
      }
    },
    components:{
    },
    methods: {
        async fetchAboutUsHandler(){
            try{
                const res = await FetchAboutUs();
                
                try{
                    const {about_us} = res;
                    this.sub_title   = about_us.sub_title;
                    this.description = about_us.description;
                }catch(error){}

            }catch(error){

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }

            }finally{

            }
        },
        async aboutUsUpdateOrCreateHandler(){
            try{
                this.isSubmitAboutUs = true;
                var data = {
                    sub_title:this.sub_title,
                    description:this.description,
                };
                const res = await UpdateAboutUs(data);
                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){}
            }catch(error){

                try{
                    this.errors = error.response.data.errors;
                }catch(error){}

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }

            }finally{
                this.isSubmitAboutUs = false;
            }
        }
    },
    mounted() {
        this.fetchAboutUsHandler();
    },
  }
</script>

<template>
<div class="content content-y-100vh">
    <div class="content-header">
        <h1 class="text-base">About Us</h1>
    </div>

    <div class="content-body">

        <section class="">

            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Image</h2>
                        <span class="sub-title">This image will appear on your about us page.</span>
                    </div>
                </div>

                <div class="col-lg-6 col-12 d-flex justify-content-start align-items-center">
                    <button class="btn btn-primary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z"></path></svg>
                        Upload
                    </button>
                </div>

            </div>

            <br><br><br>
            
            <div class="row mt-lg-5 mt-0">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Content</h2>
                        <span class="sub-title">This information will be used to populate the "about us" page in your solar proposal.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-12">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Sub Title</label>
                        <input @focus="delete errors?.sub_title" v-model="sub_title" type="text" class="form-control" value="Electrifying Australia PTY LTD">
                        <span class="form-input-commant" v-if="!errors?.sub_title?.length">This will appear underneath your company name on the about us page</span>
                        <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.sub_title?.length">{{ errors?.sub_title[0] }}</span>
                    </div>
                    <div class="settings-group-item about-us-description">
                        <label class="form-label-title" for="">Description</label>
                        <textarea @focus="delete errors?.description" v-model="description" class="form-control" cols="30" rows="8"></textarea>
                        <span class="form-input-commant" v-if="!errors?.description?.length">{{ description?.length??0 }}/2000</span>
                        <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.description?.length">{{ errors?.description[0] }}</span>
                    </div>
                    <div class="">
                        <button :disabled="isSubmitAboutUs" @click="aboutUsUpdateOrCreateHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitAboutUs">
                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span>Submitting...</span>
                            </div>
                            <span v-if="!isSubmitAboutUs">Save Settings</span>
                            </button>
                    </div>
                </div>
            </div>
            <br><br><br><br><br><br>
        </section>
    </div>
</div>

</template>