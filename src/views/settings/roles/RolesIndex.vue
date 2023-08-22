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

</style>