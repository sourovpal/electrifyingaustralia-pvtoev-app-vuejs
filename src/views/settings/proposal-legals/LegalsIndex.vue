<script setup>
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1 class="mb-3">Proposal legals</h1>
        <p class="w-lg-75 sub-title pe-5">
            The settings below change the way your solar proposals work. Changes to these settings will take <strong>immediate effect</strong> on your web proposals.
            <br><br>
            They will not change PDFs you have downloaded, or e-signature requests that have already been sent.
        </p>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-2 col-12">
                    <div class="settings-group-header">
                        <h2>Terms and conditions</h2>
                        <span class="sub-title">These documents are your contract with your customers.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item mb-2">
                        <label for="" class="form-label-title">Terms & conditions content</label>
                    </div>
                    <div class="list-group mb-3">
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="flexRadioDefault1"/>
                                <label class="form-check-label  fw-bold" for="flexRadioDefault1"> Do not include Terms & Conditions </label>
                                <p class="ps-1 commant">Do not include Terms & Conditions pages in the generated proposals.</p>
                            </div>
                        </div>
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="" checked data-toggle="list-group-input-checked"/>
                                <label class="form-check-label fw-bold" for=""> <a href="">Pylon Standard</a> Terms & Conditions </label>
                                <p class="ps-1 commant">Include Pylon's Standard CEC Terms & Conditions.
                                This includes everything you need in a Standard Sales Contract. Learn more <a href="">here</a>.</p>
                                <div class="settings-group-item" data-toggle="list-group-input-toggle">
                                    <label class="form-label-title" for="">Starting at:</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="flexRadioDefault1"/>
                                <label class="form-check-label  fw-bold" for="flexRadioDefault1"> Custom Terms & Conditions </label>
                                <p class="ps-1 commant">Enter your company's own Terms & Conditions content for inclusion in your proposals.</p>
                                <a href="/settings/proposal-legals/warranty" class="fw-bold py-3 ps-1 d-flex">
                                    <span>Edit Terms & Conditions</span>
                                    <div class="icon icon--18 icon--brand-primary">
                                        <svg   xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Terms & conditions footer</label>
                        <input type="text" class="form-control" value="##">
                        <span class="form-input-commant">This text appears in the footer of your T&Cs pages.</span>
                    </div>
                    
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Payment milestones</label>
                        <div class="">
                            <div class="d-flex">
                                <label style="width:25%;font-weight: 100;" class="form-label-title" for="">% due</label>
                                <label style="width:75%;font-weight: 100;" class="form-label-title" for="">	Milestone name</label>
                            </div>
                            <div class="d-flex mb-2">
                                <input type="number" style="width:25%;" class="form-control" value="10">
                                <input type="text" style="width:47%;" class="form-control me-3" value="Deposit">
                                <button style="width:20%" class="btn btn-danger">Delete</button>
                            </div>
                            <div class="d-flex">
                                <input type="number" style="width:25%;" class="form-control" value="90">
                                <input type="text" style="width:47%;" class="form-control me-3" value="Installation Completion">
                                <button style="width:20%" class="btn btn-danger">Delete</button>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-info fw-bold" style="">Add new milestone</button>
                            </div>
                        </div>
                        
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Installation completion turn around</label>
                        <div class="">
                            <select class="form-control" name="" id="">
                                <option value="">New</option>
                            </select>
                        </div>
                        <span class="form-input-commant">This text appears in the footer of your T&Cs pages.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Default Special Conditions</label>
                        <textarea class="form-control" rows="2"></textarea>
                        <span class="form-input-commant">This content will appear in the Schedule 1 — Special Conditions page of all future proposals.</span>
                    </div>

                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12">
                    <div class="settings-group-header">
                        <h2>Warranty</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Warranty content</label>
                        <router-link to="/settings/proposal-legals/warranty" class="fw-bold py-3 d-flex">
                            <span>Edit warranty</span>
                            <div class="icon icon--18 icon--brand-primary">
                                <svg   xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                </svg>
                            </div>
                        </router-link>
                        <span class="form-input-commant">Your warranty information will be appended to the end of your proposal after your Terms & Conditions.</span>
                    </div>
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Workmanship warranty duration (years)</label>
                        <input type="text" class="form-control">
                        <span class="form-input-commant">If left blank, this detail will be omitted from your proposal.</span>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <br><br><br><br><br><br>
        </section>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.proposal-pages{
    .proposal-pages__item{
        margin: 1rem 1rem 1rem 0;
        .page__name{
            box-sizing: border-box;
            color: #9aa5b1;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 0.5rem;
            line-height: 15px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            max-width: 105px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .page__body{
            position: relative;
            border: 3px solid transparent;
            cursor: pointer;
            transition:all 0.3s;
            border-color:#007ee5; // remove this
            &.active,
            &:hover{
                border-color:#007ee5;
                .page__check{
                    fill: #0aa312!important;
                }
            }
            .page__check{
                transition: .3s;
                fill: #0aa312!important; // remove this
                // fill: #99a5b1;
                width: 32px;
                height: 32px;
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: #fff;
                border-radius: 50%;
            }
        }

    }
}

.proposal-image-uploads__item{
    cursor: pointer;
    position: relative;
    width: 105px;
    height: 148px;
    background-color: #e4e7eb;
    border-radius: 0.25rem;
    border: 1px solid #9aa5b1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 4.5rem;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    overflow: hidden;
    margin: 0 1rem 1rem 0;
}



.settings-group-item[data-toggle="list-group-input-toggle"]{
    display: none;
}
.form-check-input{
    .form-check-label{
        font-size: 14px;
    }
    &:checked{
        .form-check-label{
               color:#007ee5;
        }
    }

}

.form-check-input[data-toggle="list-group-input-checked"]:checked ~ .settings-group-item[data-toggle="list-group-input-toggle"]{
        display: block;
}
.list-group {
    .list-group-item{
        &:hover{
            background:#f2f2f2!important;
        }
        .commant{
            font-size: 13px;
            padding: 6px 0px;
            display: block;
            color: #616e7c;
            line-height: 1rem;
            margin-bottom:0px;
        }
    }
}
.btn-check:checked + .btn{
    --mdb-btn-bg: #3b71ca;
    --mdb-btn-color: #fff;
    --mdb-btn-hover-bg: #386bc0;
    --mdb-btn-hover-color: #fff;
    --mdb-btn-focus-bg: #386bc0;
    --mdb-btn-focus-color: #fff;
    --mdb-btn-active-bg: #3566b6;
    --mdb-btn-active-color: #fff;
}
.content-header{
    .sub-title{
        font-size:14px;
    }
}
</style>