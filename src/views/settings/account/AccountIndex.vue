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

</style>