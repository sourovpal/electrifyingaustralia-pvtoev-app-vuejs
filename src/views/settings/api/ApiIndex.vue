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
        <h1>API settings</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-8">
                    <div class="card pt-3 pb-2 px-3 d-flex flex-row justify-content-start align-items-center shadow-0 settings__item--wide">
                        <div class="mx-3">
                            <img src="https://static.getpylon.com/images/app/ui/onboarding_api.png" style="width:120px;height:120px;">
                        </div> 
                        <div>
                            <div class="title mb-2">
                                Build on Pylon
                            </div>
                            <p class="sub-title mb-2">
                                Using the Observer API, you can integrate with other software to speed up your business processes. Whether you're using third-party software or your own custom apps, we can help you achieve your goals.
                            </p>
                            <div class="pb-3">
                                <a class="fw-bold d-flex justify-content-start align-items-center" href="">
                                    View developer documentation
                                    <div class="icon ms-1">
                                        <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="row mt-5">
                <div class="col-lg-8 col-3">
                    <div class="settings-group-header">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h2 class="fw-bold">API tokens</h2>
                            <a class="fw-bold d-flex justify-content-start align-items-center fs-14px" href="">
                                View request logs
                                <div class="icon ms-1">
                                    <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </div>
                            </a>
                        </div>
                        <div class="card shadow-0 border">
                            <div class="card-body">
                                <p class="text-muted fs-14px w-75 text-center mx-auto">
                                    API tokens allow your own software applications and integrations to make requests to the Pylon API.
                                    You don't have any API tokens yet!
                                </p>
                                <div class="text-center">
                                    <button class="btn btn-primary fw-bold">Create API token</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="row mt-5">
                <div class="col-lg-8 col-3">
                    <div class="settings-group-header">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h2 class="fw-bold">Webhook destinations</h2>
                            <a class="fw-bold d-flex justify-content-start align-items-center fs-14px" href="">
                                View event logs
                                <div class="icon ms-1">
                                    <svg fill="#386bc0" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </div>
                            </a>
                        </div>
                        <div class="card shadow-0 border">
                            <div class="card-body">
                                <p class="text-muted fs-14px w-75 text-center mx-auto">
                                    Webhooks can notify your external software of changes to data in your Pylon account.
                                    You don't have any webhook destinations yet!
                                </p>
                                <div class="text-center">
                                    <button class="btn btn-primary fw-bold">Add a destination</button>
                                </div>
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