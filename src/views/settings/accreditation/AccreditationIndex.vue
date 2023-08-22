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
        <h1>Accreditations</h1>
        <span class="w-75 sub-title pe-5">Available accreditations are determined by your localisation settings.</span>
    </div>

    <div class="content-body">
        <section class="">

            
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Australian Accreditations</h2>
                        <span class="sub-title">These logos will appear on the cover page of your solar proposals.</span>
                    </div>
                </div>
                <div class="col-lg-8 col-9">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">CEC Accredited Installer</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled" src="https://static.getpylon.com/images/accreditations/CEC-AccreditedInstaller_RGB_small.jpg" alt="">
                                </div>
                            </div>
                            <br>
                            <div class="settings-group-item w-75 mb-2">
                                <label class="form-label-title">Licence number:</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                            <div class="settings-group-item w-75">
                                <label class="form-label-title">Installer name:</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                        </div>
                    </div>
                    
                    <hr class="mt-3 mb-3">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">CEC Accredited Designer</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/CEC-AccreditedInstaller_RGB_small.jpg" alt="">
                                </div>
                            </div>
                            <br>
                            <div class="settings-group-item w-75 mb-2">
                                <label class="form-label-title">Designer name:</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">CEC Member</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/CEC_Member_RGB_small.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">NETCC Approved Seller</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/au/netcc-approved-seller.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">SEC Master Installer</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/SEC_MasterInstaller_new.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">SEC Small Business Member</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/SEC_smallbusinessmember.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">SolarCutters Member</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/au/solarcutters_member.jpg" alt="">
                                </div>
                            </div>
                            <br>
                            <div class="settings-group-item w-75 mb-2">
                                <label class="form-label-title fw-bold">Membership number:</label>
                                <a href="" class="btn btn- btn-info fw-bold text-start">Claim your membership</a>
                            </div>
                            <br>
                        </div>
                    </div>

                    <!-- ======================================================================
                    ======================================================================= -->
                    
                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Accredited Master Electrician</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/accredited_master_electrician.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Master Electricians Member</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/master_electricians_member.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Bronze Master Electrician</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/bronze_master_electrician.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Silver Master Electrician</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/silver_master_electrician.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Gold Master Electrician</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/gold_master_electrician.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Engineers Australia</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/engineers_australia.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">NECA Member</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/neca_member.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Tasmanian Renewable Energy Alliance</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/trea-logo-64h.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Australian Owned</h2>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled-" src="https://static.getpylon.com/images/accreditations/australian_owned.jpg" alt="">
                                </div>
                            </div>
                            <br>
                            <div class="settings-group-item w-75 mb-2">
                                <label class="form-label-title fw-bold">Membership number:</label>
                                <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-primary fw-bold">Save Settings</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Product Partnerships</h2>
                        <span class="sub-title">These logos will appear on the cover page of your solar proposals.</span>
                    </div>
                </div>
                <div class="col-lg-8 col-9">

                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-header">
                                <h2 class="fw-bold">Selectronic Accredited Integrator</h2>
                            </div>
                        </div>
                        <div class="col-6">

                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                                <div class="w-100 ms-3">
                                    <img class="img-101 img-disabled" src="https://static.getpylon.com/images/accreditations/selectronic_accredited_integrator.jpg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-3 mb-4">

                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-primary fw-bold">Save Settings</button>
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
.img-disabled{
    filter: grayscale(100%) opacity(.54);
}
.img-101{
    height: auto;
    max-height: 3rem;
    max-width: calc(100% - 4rem);
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
            .title{
                line-height: 1rem;
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
                font-size:15px;
                margin-bottom: 0px;
            }
            .sub-title{
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin-top: 0;
                font-weight: 400;
                color: #616e7c;
                font-size: 14px;
            }
        }
    }

}

</style>