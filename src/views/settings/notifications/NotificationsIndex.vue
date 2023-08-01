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
        <h1>Notifications</h1>
    </div>

    <div class="content-body">
        <section class="">
            <div class="row">
                <div class="col-lg-2 col-3">
                    <div class="settings-group-header">
                        <h2>Communications</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">

                    <div class="settings-group-item d-flex justify-content-between align-items-center">
                        <div class="">
                            <h2 class="title">Weekly team summary</h2>
                            <span class="sub-title">Weekly emails will be sent on Monday mornings.</span>
                        </div>
                        <div>
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                        </div>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-2 col-3">
                    <div class="settings-group-header">
                        <h2>Notification preferences</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <table class="table table-sm table-borderless ">
                        <thead class="tbl-bg-tp">
                            <tr>
                                <th class="fw-bold py-0" width="80%">Notification</th>
                                <th class="fw-bold py-0 text-center" width="10%">In-app</th>
                                <th class="fw-bold py-0 text-center" width="10%">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Reminder notifications</h2>
                                        <span class="sub-title">Notification emails will be sent when reminders are due.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Comment mentions</h2>
                                        <span class="sub-title">You will be notified when a team member mentions you in a comment.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Comment replies</h2>
                                        <span class="sub-title">You will be notified when someone replies to one of your comments</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Unassigned new leads</h2>
                                        <span class="sub-title">You will be notified when a new Lead is created in your team by an integration, and the Lead has not not automatically been assigned an owner.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">SMS message replies</h2>
                                        <span class="sub-title">You will be notified when an SMS message is sent by a customer to a Lead which you are assigned to.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Lead assigned</h2>
                                        <span class="sub-title">You will be notified when another user makes you the owner of a Lead.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Task assigned</h2>
                                        <span class="sub-title">You will be notified when another user assigns a task to you.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Daily Task Summary</h2>
                                        <span class="sub-title">You will be notified each morning with a summary of your tasks for the day</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
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