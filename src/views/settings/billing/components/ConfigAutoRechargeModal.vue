<script>
export default{

}
</script>

<template>

<div class="modal fade" id="ConfigAutoRechargeModal" tabindex="-1" aria-labelledby="ConfigAutoRechargeModal" aria-hidden="true">
  <div class="modal-dialog" style="max-width: 550px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Configure Auto-recharge</h5>
      </div>
      <div class="modal-body">
        <p class="form-subtitle">We'll only recharge from your selected payment method when your team's credit balance falls below the amount you set.</p>
        
        <div class="row settings-group-item mb-3">
            <div class="col-4 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">Auto recharge:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center">
              <div class="toggle-checkbox toggle-active" @click="(e)=>e.target.classList.toggle('toggle-active')">
                  <div class="toggle-slider">
                      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path fill="#007ee5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                  </div>
              </div>
            </div>
        </div>
        
        <div class="row settings-group-item mb-3">
            <div class="col-4 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">If the balance falls below:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center">
              <div class="select-box w-100">
                  <select class="form-control form-control-input">
                    <option value="100">100 credits</option>
                    <option value="250">250 credits</option>
                    <option value="500">500 credits</option>
                    <option value="750">750 credits</option>
                    <option value="1000">1000 credits</option>
                    <option value="1250">1250 credits</option>
                    <option value="1500">1500 credits</option>
                    <option value="1750">1750 credits</option>
                    <option value="2000">2000 credits</option>
                    <option value="2250">2250 credits</option>
                    <option value="2500">2500 credits</option>
                  </select>
              </div>
            </div>
        </div>
        
        <div class="row settings-group-item mb-3">
            <div class="col-4 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">Recharge with:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center">
              <div class="select-box w-100">
                  <select class="form-control form-control-input">
                    <optgroup label="Standard packages">
                      <option>$49.95 – 625 credits</option>
                      <option>$99.95 – 1300 credits</option>
                      <option>$199.95 – 2650 credits</option>
                      <option>$399.95 – 5400 credits</option>
                    </optgroup>
                  </select>
              </div>
            </div>
        </div>
        
        <div class="row settings-group-item mb-0">
            <div class="col-4 ms-auto d-flex justify-content-end align-items-center">
                <label class="form-label-title mb-0">Payment method:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center">
              <a class="btn btn-warning btn-sm" href="">Add a payment method</a>
            </div>
        </div>

    </div>
      <div class="modal-footer flex-between-center">
        <button type="button" class="btn btn-light fw-bold" data-mdb-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary fw-bold">Save</button>
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