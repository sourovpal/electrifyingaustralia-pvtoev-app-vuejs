<script>
export default {

}
</script>

<template>

<div
  class="modal fade"
  id="AddADestinationModal"
  data-mdb-backdrop="static"
  data-mdb-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h5 class="modal-title" id="staticBackdropLabel">Create webhook destination</h5>
      </div>
      <div class="modal-body">
        <div class="settings-group-item">
            <label class="form-label-title" for="">URL:</label>
            <input type="text" class="form-control form-control-input">
            <span class="form-input-commant text-start">A POST request will be sent to this URL when a new event occurs.</span>
        </div>
        <div class="settings-group-item">
            <label class="form-label-title" for="">Permissions</label>
            <span class="form-input-commant text-start fw-16px fw-bold mb-3">You can select any combination of events which you wish to be sent to this destination. For security reasons, you <strong>cannot change this</strong> once the destination is created.</span>
            <div class="ps-3">
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        <span class="event-name">solar_projects.created</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        <span class="event-name">solar_projects.updated</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        <span class="event-name">solar_projects.deleted</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        <span class="event-name">solar_designs.created</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">
                        <span class="event-name">solar_designs.updated</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        <span class="event-name">solar_designs.deleted</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        <span class="event-name">web_proposals.signed</span>
                    </label>
                </div>
                <div class="settings-group-item mb-3">
                    <label class="form-label-title d-flex justify-content-start align-items-center">
                        <input class="me-2 form-check-input" type="checkbox">                
                        <span class="event-name">events.test_sent</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="settings-group-item">
          <label class="form-label-title">See the  <a class="ms-1" href="">documentation of event types.</a></label>
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
<style scoped lang="scss">
.event-name{
  background-color: #f1f1f1;
  font-size: 12px;
  padding: 0px 8px;
  border-radius: 3px;
  margin-left:8px;
}

</style>