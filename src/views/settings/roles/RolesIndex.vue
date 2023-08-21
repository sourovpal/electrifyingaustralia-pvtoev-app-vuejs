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
        <h1>Roles & access</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Role permissions</h2>
                        <span class="sub-title">Each user in your team belongs to one role, and has the corresponding set of permissions.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item d-flex justify-content-between align-items-center">
                        <div class="">
                            <h5 class="title-">Admins</h5>
                            <span class="sub-title">Admins have full administrative access to the team. They can edit company branding, invite new users, modify billing information and see all projects owned by the team. Only your managers and high-level staff should be Admins.</span>
                        </div>
                    </div>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input disabled checked class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit all settings</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input disabled class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input disabled class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">Delete projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input disabled class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit CRM Items owned by other team members</span>
                    </label>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item d-flex justify-content-between align-items-center">
                        <div class="">
                            <h5 class="title-">Super Users</h5>
                            <span class="sub-title">Super Users are one level above Users. Your team leaders or accredited designers should be made Super Users.</span>
                        </div>
                    </div>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View team settings</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">Delete projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit CRM items owned by other team members</span>
                    </label>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item d-flex justify-content-between align-items-center">
                        <div class="">
                            <h5 class="title-">Users</h5>
                            <span class="sub-title">Super Users are one level above Users. Your team leaders or accredited designers should be made Super Users.</span>
                        </div>
                    </div>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input disabled class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View team settings</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">Delete projects owned by other team members</span>
                    </label>

                    <label class="form-label-title d-flex justify-content-start align-items-center mb-3">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        <span class="ms-2 fs-14px">View and edit CRM Items owned by other team members</span>
                    </label>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.tbl-bg-tp{
    background-color: #f6f6f6;
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