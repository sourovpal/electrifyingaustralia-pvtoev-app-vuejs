<script>
export default {

}
</script>

<template>

<div
  class="modal fade"
  id="CreateApiTokenModal"
  data-mdb-backdrop="static"
  data-mdb-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h5 class="modal-title" id="staticBackdropLabel">Create API Token</h5>
      </div>
      <div class="modal-body">
        <div class="settings-group-item">
            <label class="form-label-title" for="">Token name:</label>
            <input type="text" class="form-control form-control-input">
        </div>
        <div class="settings-group-item">
            <label class="form-label-title" for="">Permissions</label>
            <div class="ps-3">
                <div class="settings-group-item mb-2">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        Read
                    </label>
                    <span class="form-input-commant text-start">Read information from API resources.</span>
                </div>
                <div class="settings-group-item mb-2">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        Write
                    </label>
                    <span class="form-input-commant text-start">Write data to the API, such as creating new resources, or updating or deleting existing ones.</span>
                </div>
                <div class="settings-group-item mb-2">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        Payment
                    </label>
                    <span class="form-input-commant text-start">Perform operations that incur additional billing. This includes spending credits as well as APIs which have their own billing.</span>
                </div>
                <div class="settings-group-item mb-2">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        Admin
                    </label>
                    <span class="form-input-commant text-start">Make changes to sensitive resources like team members and company details</span>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer border-0 d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-secondary btn-sm" data-mdb-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-sm">Save</button>
      </div>
    </div>
  </div>
</div>


</template>