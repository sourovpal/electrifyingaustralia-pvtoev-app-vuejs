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
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    }
</style>