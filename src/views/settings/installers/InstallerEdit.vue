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
    
    <div class="content-header d-flex justify-content-start align-items-center">
        <router-link to="/settings/installers">
            <h1 class="mb-0">Installers list</h1>
        </router-link>
        <div class="mx-2">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
        </div>
        <h1 class="mb-0">Edit Installer</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-6">

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">First name <span class="ms-3 badge bg-warning">Required</span></label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>
                    

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Last name <span class="ms-3 badge bg-warning">Required</span></label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">ABN</label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Company Name</label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Phone Number</label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">After-hours Phone Number</label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Email</label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Electrical Licence Number <span class="ms-3 badge bg-warning">Required</span></label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">CEC Accreditation Number <span class="ms-3 badge bg-warning">Required</span></label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>

                    <div class="settings-group-item mb-3">
                        <label class="form-label-title">Workmanship Warranty (years) <span class="ms-3 badge bg-warning">Required</span></label>
                        <input type="text" class="form-control form-control-input form-control-lg- py-1">
                    </div>
                </div>
                <div class="col-lg-12 mt-3">
                    <button class="btn btn-primary fw-bold" href="">Save Settings</button>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
</style>