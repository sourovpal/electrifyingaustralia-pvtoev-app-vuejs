<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'ProfileIndex',
    data() {
      return{
      }
    },
    components:{
        vueCustomScrollbar,
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Profile</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Basic details</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Full Name</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Your full name will appear on your customer facing proposals.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Job title at Electrifying Australia</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Your job title may be used in proposals, email templates, etc.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Display name</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Only visible to other users on your Pylon Observer team.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Forum username</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Visible to other Pylon Observer users, including those outside your team, in the Feedback forum.</span>
                    </div>
                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Contact information</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Contact number (office)</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Contact number (mobile)</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>
                    
                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Preferences</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Map base layer style</label>
                        <div class="select-box">
                            <select class="form-control form-control-sm form-control-input form-control-lg">
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
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Profile photo</h2>
                    </div>
                </div>
                <div class="col-lg-7 col-9">
                    <div class="row">
                        <div class="col-lg-6 col-8 pe-2">
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Upload a photo</label>
                                <input type="file" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                            <div>
                                <button class="btn btn-primary fw-bold">Save Settings</button>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 col-4 text-center">
                            <div class="">
                                <img class="img-thumbnail" style="width:100px;height:100px;" src="https:via.placeholder.com/100x100" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.content{
    .content-header{
        margin-top: 1.5rem;
        margin-bottom: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        line-height: 1.1;
        h1{
            height: 2rem;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.5rem;
            color: #1f2933;
            line-height: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 600;
        }
    }
    .content-body{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        .settings-group-header{
            h2{
                font-weight: 600;
                font-size: 1rem;
            }
        }
        .settings-group-item{
            margin-bottom: 25px;
            .form-label-title{
                margin-bottom: 0.25rem;
                line-height: 1.5rem;
                font-weight: 600;
                color: #3e4c59;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                font-size: .875rem;
            }
            .form-control-input{
                background: #f5f7fa;
                border:none;
                border-bottom:2px solid transparent;
                border-radius:0px !important;
                &:focus{
                    box-shadow: none;
                    border-bottom-color: #007ee5;
                }                          
            }
            .select-box{
                position: relative;
                &::before{
                    content: "";
                    position: absolute;
                    top: 47%;
                    right: 15px;
                    border: 4px solid rgb(166 167 170 / 62%);
                    transform: translateY(-50%) rotate(-135deg);
                    border-top-color: transparent;
                    border-left-color: transparent;
                }
                &::after{
                    content: "";
                    position: absolute;
                    top: 53%;
                    right: 15px;
                    border: 4px solid rgb(166 167 170 / 62%);
                    transform: translateY(-50%) rotate(45deg);
                    border-top-color: transparent;
                    border-left-color: transparent;
                }
            } 
            .form-input-commant{
                font-size: 13px;
                padding: 4px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }
        }
    }

}

</style>