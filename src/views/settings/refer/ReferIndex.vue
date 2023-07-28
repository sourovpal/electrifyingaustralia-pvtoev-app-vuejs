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
        <h1>Refer a friend</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-9">
                    <div class="card pt-3 pb-2 px-3 d-flex flex-row justify-content-start align-items-center shadow-0 settings__item--wide">
                        <div class="mx-3">
                            <img src="https://app.getpylon.com/img/success-gems.png" style="width:120px;height:120px;">
                        </div> 
                        <div>
                            <div class="title mb-2">
                                Limited time referral bonus!
                            </div>
                            <p class="sub-title">Receive <strong>500 bonus credits</strong> for referring a friend... <br>
                                Or refer <strong>5 friends</strong> to receive our brand new official Pylon t-shirt! <br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="row">
                <div class="col-lg-6 col-3">
                    <div class="settings-group-header">
                        <h2 class="fw-initial">Earn free credits</h2>
                        <p class="sub-title">
                            Know someone who'd love to use Observer?
                            <br>
                            Invite them here and you'll both get 500 bonus credits the first time they purchase credits.
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-3"><br>
                    <div class="settings-group-item">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Send invitation</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2 class="">Existing referrals</h2>
                        <p class="sub-title mt-4">You haven't sent any referrals yet.</p>
                    </div>
                </div>
                <div class="col-lg-8 col-8">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" scope="col">Username</th>
                                <th class="fw-bold" scope="col">Email</th>
                                <th class="fw-bold" scope="col">Created At</th>
                                <th class="fw-bold" scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">superadmin</td>
                                <td scope="col">superadmin@gmail.com</td>
                                <td scope="col">25/07/23</td>
                                <td scope="col">
                                    <a class="btn-link" href="">Profile</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.fw-initial{
    font-weight:inherit !important;
}
.settings__item--wide{
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    .title{
        font-size:1.125rem;
        font-weight: bold;
        color: #007ee5;
    }
    .sub-title{
        color: #004680;
        font-size: .875rem;
        opacity: .87;
    }
}
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
                font-size: 1.2rem;
            }
            .sub-title{
                font-size: 13px;
                line-height: 1rem;
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