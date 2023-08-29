<script>
export default{

}
</script>

<template>

<div class="modal fade" id="InviteNewMemberModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Member invitation</h5>
      </div>
      <div class="modal-body">
        <p class="form-subtitle">Invite team members by their email. Team members will be able to collaborate with existing projects and share designs.</p>
        <div class="row settings-group-item mb-3">
            <div class="col-2 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">Email:</label>
            </div>
            <div class="col-8 me-auto d-flex justify-content-start align-items-center">
                <input class="form-control form-control-input" type="text">
            </div>
        </div>
        <div class="row settings-group-item mb-0">
            <div class="col-2 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">Role:</label>
            </div>
            <div class="col-8 me-auto d-flex justify-content-start align-items-center">
                <div class="select-box w-100">
                    <select class="form-control form-control-input">
                        <option value="">Admin</option>
                        <option value="">User</option>
                        <option value="">Super Admin</option>
                        <option value="">Super User</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
      <div class="modal-footer flex-between-center">
        <button type="button" class="btn btn-light fw-bold" data-mdb-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary fw-bold">Invite member</button>
      </div>
    </div>
  </div>
</div>

</template>
<style scoped lang="scss">
.form-subtitle{
    line-height: 15px;
    font-size: 12px;
    font-weight: 100;
    color: #abacb0;
    letter-spacing: 0.2px;
}
</style>