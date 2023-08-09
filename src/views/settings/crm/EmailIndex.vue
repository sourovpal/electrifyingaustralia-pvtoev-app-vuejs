<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';


export default {
  name:'ProfileIndex',
    data() {
      return{
        content: '<h2>I am Example</h2>',
        editorOption:{
        }
      }
    },
    components:{
        vueCustomScrollbar,
        QuillEditor
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Email & SMS sending</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Connected email account</h2>
                        <span class="sub-title">Sync your inbox and see your conversations in Pylon CRM.</span>
                    </div>
                </div>
                <div class="col-lg-6 col-9">
                    <p class="">Your email address <span class="mx-1 fw-bold">connections@electrifyingaustralia.com.au</span> is not yet connected.</p>
                    <div>
                        <button class="btn btn-primary fw-bold">Connect your email</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>SMS sending</h2>
                        <span class="sub-title">Chat with your customers in Pylon CRM.</span>
                    </div>
                </div>
                <div class="col-lg-6 col-9">
                    <p class="">SMS integration coming soon.</p>
                </div>
            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>SMS sending</h2>
                        <span class="sub-title">Chat with your customers in Pylon CRM.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <QuillEditor theme="snow" placeholder="Insert text here ..." />
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>User Email Signature</h2>
                        <span class="sub-title">This will be be used instead of your company wide email signature.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <QuillEditor theme="snow" placeholder="Insert text here ..." />
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Email Templates</h2>
                        <span class="sub-title">Setup email templates so you quickly send out emails to your customers</span>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="35%" scope="col">Name</th>
                                <th class="fw-bold" width="40%" scope="col">Subject</th>
                                <th class="fw-bold" width="25%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Add new template</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>SMS Templates</h2>
                        <span class="sub-title">Setup sms templates so you quickly send out text messages to your customers</span>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="35%" scope="col">Name</th>
                                <th class="fw-bold" width="40%" scope="col">Subject</th>
                                <th class="fw-bold" width="25%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Add new template</button>
                    </div>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>
<style>
.ql-container{
    height:250px;
}
</style>
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
            .sub-title{
                font-size: 13px;
                padding: 4px 0px;
                display: block;
                color: #616e7c;
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
                font-size: 12px;
                padding: 6px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }
        }
    }

}

</style>