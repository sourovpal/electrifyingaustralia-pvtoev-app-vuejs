<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'AccountIndex',
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
        <h1>Account</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Account email</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Email address</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">When changing your account email address, you will be sent a email to validate your new email address.</span>
                    </div>
                    
                    <div>
                        <button class="btn btn-primary fw-bold">Change Email</button>
                    </div>
                </div>
            </div>
            
            <hr class="mt-4 mb-5">
            
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Change password</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">
                    
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
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Active sessions</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <div class="table-responsive">
                        <table class="table table-sm table-striped table-hover">
                            <thead>
                                <tr>
                                    <th class="fw-bold" scope="col">Browser</th>
                                    <th class="fw-bold" scope="col">Location</th>
                                    <th class="fw-bold" scope="col">Last seen</th>
                                    <th class="fw-bold" scope="col">Active Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="col">Chrome on Windows</td>
                                    <td scope="col">Dhaka, Dhaka</td>
                                    <td scope="col">2 minutes ago</td>
                                    <td scope="col"><span class="badge rounded-pill badge-info">Other</span></td>
                                </tr>
                                <tr>
                                    <td scope="col">Chrome on Windows</td>
                                    <td scope="col">Dhaka, Dhaka</td>
                                    <td scope="col">2 minutes ago</td>
                                    <td scope="col"><span class="badge rounded-pill badge-primary">Current</span></td>
                                </tr>
                                <tr>
                                    <td scope="col">Chrome on Windows</td>
                                    <td scope="col">Dhaka, Dhaka</td>
                                    <td scope="col">2 minutes ago</td>
                                    <td scope="col"><span class="badge rounded-pill badge-info">Other</span></td>
                                </tr>
                                <tr>
                                    <td scope="col">Chrome on Windows</td>
                                    <td scope="col">Dhaka, Dhaka</td>
                                    <td scope="col">2 minutes ago</td>
                                    <td scope="col"><span class="badge rounded-pill badge-info">Other</span></td>
                                </tr>
                            </tbody>
                        </table>
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
                    top: 50%;
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