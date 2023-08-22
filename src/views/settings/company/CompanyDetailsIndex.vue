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
        <h1>Company</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Company logo</h2>
                        <span class="sub-title">This logo will appear in your solar proposals.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="preview-logo">
                                <img class="logo-img" src="https://static.getpylon.com/images/companies/V3vLWPgnNAtXjcevk46rX92OP59HUuIG8Ebv18zT.png.png" alt="">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="settings-group-item mb-1">
                                <input type="file" class="form-control form-control-sm form-control-input form-control-lg">
                            </div>
                        </div>
                        <div class="col-md-4 text-end">
                            <a class="btn btn-danger" href="">Remove Logo</a>
                        </div>
                        <div class="settings-group-item">
                            <span class="form-input-commant">For best results, use a horizontal image with a white or transparent background.</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Contact information</h2>
                        <span class="sub-title">This information will appear on your proposal cover page and quote page.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Company name</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Your company name may be used on invoices, receipts and customer facing proposals.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Business name / trading name</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Your business name or trading name will be used instead of your company name where possible and also in your Terms and Conditions.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Australian Business Number (ABN)</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Your business identifier may be used on invoices, receipts and proposals. Please make sure it's correct.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Contact phone (office)</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Contact phone (mobile)</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Company contact email</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Company Website</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Address</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg mb-2">
                    </div>
                    
                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Time & Location</h2>
                        <span class="sub-title">These settings affect how time is displayed.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Default timezone</label>
                        <div class="select-box">
                            <select class="form-control form-control-sm form-control-input form-control-lg">
                                <option value="">Default timezone</option>
                                <option value="">Select Options</option>
                                <option value="">Select Options</option>
                            </select>
                        </div>
                        <span class="form-input-commant">This timezone will be used when time-stamping e-signature documents.</span>
                    </div>

                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Social Media Details</h2>
                        <span class="sub-title">Links to your company social media accounts</span>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Twitter handle</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Check Link: <a href="">https://twitter.com/</a></span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Instagram username</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Check Link: <a href="">https://instagram.com/electrifying.australia</a></span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Facebook username</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg">
                        <span class="form-input-commant">Check Link: <a href="">https://facebook.com/electrifyingau</a></span>
                    </div>

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
.preview-logo{
    padding: 25px 20px;
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    border-radius:5px;
    img{
        max-height: 100px;
        width: auto !important;
        max-width:50%;
    }
}
</style>