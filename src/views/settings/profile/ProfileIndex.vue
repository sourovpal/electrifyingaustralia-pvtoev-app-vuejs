<script>
import CustomScrollbar from 'custom-vue-scrollbar';

export default {
  name:'ProfileIndex',
    data() {
      return{
      }
    },
    components:{
        CustomScrollbar,
    }
  }
  
</script>
<style>
    #profile-index .scrollbar__wrapper{
        height: 100vh;
    }
    #profile-index .scrollbar__wrapper .scrollbar__scroller{
        height: 100%;
    }
    #profile-index .scrollbar__wrapper .scrollbar__content.scrollbar__content--horizontal{
        display: block;
    }
</style>
<template>
    <div id="profile-index" class="content">
        <CustomScrollbar thumbWidth="10" direction="horizontal">
          
          <div class="content-header">
              <h1>Profile</h1>
          </div>
      
          <div class="content-body">
              <section class="">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Basic details</h2>
                          </div>
                      </div>
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Full Name</label>
                              <input type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Your full name will appear on your customer facing proposals.</span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Job title at Electrifying Australia</label>
                              <input type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Your job title may be used in proposals, email templates, etc.</span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Display name</label>
                              <input type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Only visible to other users on your Pylon Observer team.</span>
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Forum username</label>
                              <input type="text" class="form-control form-control-input">
                              <span class="form-input-commant">Visible to other Pylon Observer users, including those outside your team, in the Feedback forum.</span>
                          </div>
                          <div>
                              <button class="btn btn-primary fw-bold">Save Settings</button>
                          </div>
                      </div>
                  </div>
      
                  <hr class="mt-4 mb-5">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Contact information</h2>
                          </div>
                      </div>
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Contact number (office)</label>
                              <input type="text" class="form-control form-control-input">
                          </div>
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Contact number (mobile)</label>
                              <input type="text" class="form-control form-control-input">
                          </div>
                          
                          <div>
                              <button class="btn btn-primary fw-bold">Save Settings</button>
                          </div>
                      </div>
                  </div>
      
                  <hr class="mt-4 mb-5">
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Preferences</h2>
                          </div>
                      </div>
                      <div class="col-lg-6 col-12">
      
                          <div class="settings-group-item">
                              <label class="form-label-title" for="">Map base layer style</label>
                              <div class="select-box">
                                  <select class="form-control form-control-input">
                                      <option value="">Select Options</option>
                                      <option value="">Select Options</option>
                                      <option value="">Select Options</option>
                                  </select>
                              </div>
                          </div>
      
                          <div>
                              <button class="btn btn-primary fw-bold">Save Settings</button>
                          </div>
                      </div>
                  </div>
      
                  <hr class="mt-4 mb-5">
      
      
                  <div class="row">
                      <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                          <div class="settings-group-header">
                              <h2>Profile photo</h2>
                          </div>
                      </div>
                      <div class="col-lg-7 col-12">
                          <div class="row">
                              <div class="col-lg-6 col-8 pe-2">
                                  <div class="settings-group-item">
                                      <label class="form-label-title" for="">Upload a photo</label>
                                      <input type="file" class="form-control form-control-input">
                                  </div>
                                  <div>
                                      <button class="btn btn-primary fw-bold">Save Settings</button>
                                  </div>
                              </div>
                              
                              <div class="col-lg-3 col-4 text-center">
                                  <div class="">
                                      <img class="img-thumbnail" style="width:100px;height:100px;" src="" alt="">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <br><br><br>
              </section>
          </div>
      
        </CustomScrollbar>
    </div>
</template>

<style lang="scss" scoped>

</style>