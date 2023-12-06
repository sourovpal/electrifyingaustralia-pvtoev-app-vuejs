<script>
export default {
    
}
</script>

<template>
    <div class="dropdown-menu" id="table_header_properties" @click="(e)=>e.stopPropagation()">
        <div class="row pb-2">
            <div class="col-6">
                <div class="pb-2 pt-2 ps-2 pe-3">
                    <h6 class="fs-14px">Lead properties</h6>
                </div>
                <div class="">
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                        <span class="fs-12px">Lead source</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">First created</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Last updated</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Owner</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Status</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Phone number</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Address line 1</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Address line 2</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">City</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">State</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Postcode</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Country</span>
                    </label>
                </div>
            </div>
            <div class="col-6">
                <div class="pb-2 pt-2 ps-2 pe-3">
                    <h6 class="fs-14px">Custom properties</h6>
                </div>
                <div class="">
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                        <span class="fs-12px">Call Center Agent Name</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Recording Link</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Quarter Bill Amount</span>
                    </label>
                    <label class="d-flex justify-content-start align-item-start ps-2 pe-3 py-2 check-label-propertis">
                        <input class="form-check-input" type="checkbox"  value="" aria-label="..." />
                        <span class="fs-12px">Appointment Date & Time</span>
                    </label><br>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #table_header_properties{
        width:408px;
        min-height:300px;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        border-radius:3px !important;
        &::before{
            content: "";
            position: absolute;
            top: -6px;
            right: 20px;
            border: 7px solid rgb(203 209 215);
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
            
        }
        &::after{
            content: "";
            position: absolute;
            top: -6px;
            right: 20px;
            border: 7px solid white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;

        }
        .check-label-propertis{
            cursor: pointer;
            &:hover{
                background-color: #f1f3f9;
            }
        }
    }
</style>