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
            <h1>Templates</h1>
        </div>
    
        <div class="content-body">
            <section class="">

                <div class="row">
                    <div class="col-lg-3 col-3">
                        <div class="settings-group-header">
                            <h2>Proposal sharing</h2>
                            <p class="sub-title">These templates will be available in the email composer when sharing a proposal.</p>
                        </div>
                    </div>
                    <div class="col-lg-5 col-9">
                        <div class="settings-group-header">
                            <p class="sub-title">You don't have any custom email templates yet. When sharing your proposals via email, our default template will be used.</p>
                        </div>
                        <table class="table table-sm table-striped- table-borderless table-hover">
                            <thead>
                                <tr>
                                    <th class="text-muted" width="30%" scope="col">Name</th>
                                    <th class="text-muted" width="20%" scope="col">Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2 test</td>
                                    <td>test</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button class="btn btn-primary fw-bold">Add new template</button>
                        </div>
                    </div>
                </div>
                <hr class="mt-4 mb-5">
                <div class="row">
                    <div class="col-lg-3 col-3">
                        <div class="settings-group-header">
                            <h2>E-signature requests</h2>
                        </div>
                    </div>
                    <div class="col-lg-5 col-9">
                        
                        <div class="settings-group-item">
                            <a href="/settings/component-prices/panel" class="card card-shadow  py-3 px-3">
                                <div class="d-flex align-items-center justify-content-between">
                                    Click here to go to the eSignature settings page
                                </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
    
                <br><br><br>
            </section>
        </div>
    
      </vue-custom-scrollbar>
    
    </template>
    
    <style lang="scss" scoped>
    .card-shadow{
        // box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
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
    .card{
        svg{
            fill:#3b6dc1;
        }
    }
    .card-shadow{
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
        }
    
    }
    
    </style>