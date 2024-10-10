<script>
export default {
  name:'ProfileIndex',
    data() {
      return{
      }
    },
  }
  
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1 class="mb-3">Proposal preferences</h1>
        <p class="w-75 sub-title pe-5">
            The settings below change the way your solar proposals work. Changes to these settings will take <strong>immediate effect</strong> on your web proposals.
            <br><br>
            They will not change PDFs you have downloaded, or e-signature requests that have already been sent.
        </p>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Visual design</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Accent colour</label>
                        <input type="text" class="form-control" value="">
                        <span class="form-input-commant">This colour is used in charts, tables, and to emphasise other elements on the proposal.</span>
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
                        <h2>Acceptance</h2>
                        <span class="sub-title">Allow your customers to accept your proposals smoothly.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title d-flex justify-content-start align-items-center">
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <span class="fw-bold ms-3">Show acceptance sidebar in web proposal</span>
                        </label>
                        <span class="form-input-commant">This sidebar allows a customer to instantly accept your proposal and send you a signed copy.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title d-flex justify-content-start align-items-center">
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <span class="fw-bold ms-3">Allow payments to be accepted in the sidebar</span>
                        </label>
                        <span class="form-input-commant">When you have set up your <a href="">payments account</a>, your customers will be able to place deposits using their credit card, right from the web proposal.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title d-flex justify-content-start align-items-center">
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <span class="fw-bold ms-3">Allow payment of the full amount as well as the deposit</span>
                        </label>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Sidebar logo</h2>
                        <span class="sub-title">This logo will appear in the acceptance sidebar of your solar proposals.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    
                    <div class="settings-group-item">
                        <div class="mb-3">
                            <img style="width:64px;height:64px;" src="https://static.getpylon.com/images/companies/5tSQv83tKc5kwluVZohTp1j6tij6NSUIoT05k1Xs.png.png" alt="">
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <div class="settings-group-item mb-1">
                                    <input type="file" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-4 text-end">
                                <a class="btn btn-danger" href="">Remove Logo</a>
                            </div>
                            <div class="">
                                <span class="form-input-commant">For best results, use a square image with a white or transparent background.</span>
                            </div>
                        </div>
                    </div>

                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Proposal Video Link</h2>
                        <span class="sub-title">Enhance your proposal by embedding a company video of your choice. This video will appear after the Cover Page. Supports both Vimeo and Youtube.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Sidebar Video Link</label>
                        <input type="text" class="form-control" placeholder="https://">
                        <span class="form-input-commant">If left blank, this will be omitted from your proposal.</span>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">
            
            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Contact details</h2>
                        <span class="sub-title">These details are used on the front page and quote page.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title d-flex justify-content-start align-items-center">
                            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                            <span class="fw-bold ms-3">Use salesperson details</span>
                        </label>
                        <span class="form-input-commant">Use salesperson specific contact details on proposals. You can set them up individually in your Team member settings. If one of your salespeople doesn't have their own details, your company contact details will be used instead.</span>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Quote details</h2>
                        <span class="sub-title">The quote page of your proposal can be completed by your customers to begin purchasing from you.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Default proposal currency</label>
                        <input type="text" class="form-control">
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Acceptance message</label>
                        <input type="text" class="form-control">
                        <span class="form-input-commant">This text appears on the Quote page of your proposal.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Footer message</label>
                        <input type="text" class="form-control">
                        <span class="form-input-commant">This text appears in the footer of every page of your proposal.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Days offer valid for</label>
                        <input type="text" class="form-control">
                        <span class="form-input-commant">When you create a design, its proposal will be 'valid until' the creation date plus this many days. If you leave this blank, 'valid until' will not be displayed.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Sub-total GST</label>
                        <div class="btn-group">
                            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked />
                            <label class="btn btn-secondary fw-bold" for="option1">Included</label>

                            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" />
                            <label class="btn btn-secondary fw-bold" for="option2">Excluded</label>

                            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
                            <label class="btn btn-secondary fw-bold" for="option3">No tax</label>
                        </div>
                        <span class="form-input-commant">Choose the default GST option appropriate for your business and quoting process.</span>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Deposit amount</label>
                        <div class="btn-group mb-4">
                            <input type="radio" class="btn-check" name="options2" id="option10" autocomplete="off" checked />
                            <label class="btn btn-secondary fw-bold" for="option10">No deposit</label>

                            <input type="radio" class="btn-check" name="options2" id="option20" autocomplete="off" />
                            <label class="btn btn-secondary fw-bold" for="option20">Percentage</label>

                            <input type="radio" class="btn-check" name="options2" id="option30" autocomplete="off" />
                            <label class="btn btn-secondary fw-bold" for="option30">Fixed amount</label>
                        </div>
                        <input type="text" class="form-control">
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
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-info fw-bold">Add new milestone</button>
                        </div>
                    </div>


                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Automatic reference numbers</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-12">

                    <div class="list-group mb-3">
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="flexRadioDefault1"/>
                                <label class="form-check-label  fw-bold" for="flexRadioDefault1"> No automatic reference numbers </label>
                                <p class="ps-1 commant">You will still be able to edit the reference number for each project indiviudally.</p>
                            </div>
                        </div>
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="" checked data-toggle="list-group-input-checked"/>
                                <label class="form-check-label fw-bold" for=""> Sequential automatic reference numbers </label>
                                <p class="ps-1 commant">Projects will be assigned reference numbers sequentially as they are created.</p>
                                <div class="settings-group-item" data-toggle="list-group-input-toggle">
                                    <label class="form-label-title" for="">Starting at:</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item px-3 py-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Automatic" id="flexRadioDefault1"/>
                                <label class="form-check-label  fw-bold" for="flexRadioDefault1"> Random automatic reference numbers </label>
                                <p class="ps-1 commant">Projects will be assigned a random 8-digit reference number. <strong>Not allowed as sequential numbering was previously enabled.</strong></p>
                            </div>
                        </div>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Automatic reference number prefix</label>
                        <input type="text" class="form-control" value="##">
                        <span class="form-input-commant">Your automatically-generated reference numbers will begin with this prefix. Must be 2 or 3 letters.</span>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Bank details</h2>
                        <span class="sub-title">Your bank details will appear on the Quote page of your proposal. This gives your customers an immediate avenue for payment.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Name of bank</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Account name</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">BSB</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="settings-group-item">
                                <label class="form-label-title" for="">Account number</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Proposal pages</h2>
                        <span class="sub-title">You can also select pages for each project. This setting will apply to all projects that don't have their own preferences.</span>
                    </div>
                </div>
                <div class="col-lg-7 col-12">

                    <div class="proposal-pages">
                        <div>
                            <span class="proposal-pages d-flex flex-wrap">
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">1. COVER</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <rect  fill="#fff" width="105" height="148"></rect> 
                                            <path  fill="#E4E7EB" d="M9,9h25v9H9V9 M9,25h11v2H9V25 M77,25h19v2H77V25 M9,42h77v5H9V42 M9,49h52v3H9V49 M9,69h15v3H9V69 M9,85h22V74H9V85 M9,134h13v5H9V134 M23,134h13v5H23V134 M37,134h13v5H37V134 M9,112h8v2H9V112 M39,112h8v2h-8V112 M69,112h8v2h-8V112 M9,115h24v2H9V115 M39,115h16v2H39V115 M69,115h19v2H69V115 M9,121h7v2H9V121 M9,118h9v2H9V118 M9,59h34v2H9V59 M9,99h34v2H9V99"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">2. ABOUT US</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <rect  fill="#fff" width="105" height="148"></rect> 
                                            <path  fill="#E4E7EB" d="M9,9h25v9H9V9 M9,25h11v2H9V25 M77,25h19v2H77V25 M9,42h77v5H9V42 M9,49h52v3H9V49 M9,69h15v3H9V69 M9,85h22V74H9V85 M9,134h13v5H9V134 M23,134h13v5H23V134 M37,134h13v5H37V134 M9,112h8v2H9V112 M39,112h8v2h-8V112 M69,112h8v2h-8V112 M9,115h24v2H9V115 M39,115h16v2H39V115 M69,115h19v2H69V115 M9,121h7v2H9V121 M9,118h9v2H9V118 M9,59h34v2H9V59 M9,99h34v2H9V99"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">3. PANEL LAYOUT</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M10,14h85v85H10V14z M72,102h23v2H72V102z M89,112h6v1h-6V112z M74.5,106H95v5H74.5V106z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">4. COMP. MARKS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M10,14h85v85H10V14z M72,102h23v2H72V102z M89,112h6v1h-6V112z M74.5,106H95v5H74.5V106z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">5. SYSTEM DETAILS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M9,14h23v4H9V14z M9,65h23v4H9V65z M9,101h23v4H9V101z M9,124h23v4H9V124z M39,124h23v3H39V124z M39,128h53v2 H39V128z M39,131h45v2H39V131z M39,101h14v4H39V101z M69,101h14v4H69V101z M9,107h17v3H9V107z M9,113h9v3H9V113z M39,107h8v3h-8V107 z M39,113h9v3h-9V113z M69,107h8v3h-8V107z M69,113h9v3h-9V113z M39,14h14v4H39V14z M39,21h23v4H39V21z M39,28h45v4H39V28z M39,35 h30v4H39V35z M39,42h32v4H39V42z M39,49h15v4H39V49z M39,65h57v26H39V65z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">6. STORAGE</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <rect  fill="#fff" width="105" height="148"></rect> 
                                            <path  fill="#E4E7EB" d="M9,9h25v9H9V9 M9,25h11v2H9V25 M77,25h19v2H77V25 M9,42h77v5H9V42 M9,49h52v3H9V49 M9,69h15v3H9V69 M9,85h22V74H9V85 M9,134h13v5H9V134 M23,134h13v5H23V134 M37,134h13v5H37V134 M9,112h8v2H9V112 M39,112h8v2h-8V112 M69,112h8v2h-8V112 M9,115h24v2H9V115 M39,115h16v2H39V115 M69,115h19v2H69V115 M9,121h7v2H9V121 M9,118h9v2H9V118 M9,59h34v2H9V59 M9,99h34v2H9V99"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">7. FIN. SUMMARY</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#F5F7FA" d="M9,36h87v15H9V36z M9,66h87v15H9V66z"></path> 
                                            <path  fill="#E4E7EB" d="M9,14h66v5H9V14z M9,20h36v5H9V20z M9,51h87v15H9V51z M9,81h87v15H9V81z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">8. FIN. ANALYSIS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M9,10h66v5H9V10z M9,27h41v9H9V27z M55,27h41v9H55V27z M9,44h23v4H9V44z M9,79h23v4H9V79z M39,44h57v26H39V44z M39,79h57v26H39V79z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">9. INT. ANALYSIS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M9,10h66v5H9V10z M9,27h41v13H9V27z M55,27h41v10H55V27z M9,50h23v4H9V50z M39,50h57v18H39V50z M9,72h23v4H9V72 z M39,72h57v18H39V72z M9,94h23v4H9V94z M39,94h57v18H39V94z M9,116h23v4H9V116z M39,116h57v18H39V116z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">10. ENV. ANALYSIS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M9,10h66v5H9V10z M9,33h41v7H9V33z M55,33h41v4H55V33z M9,48h23v4H9V48z M9,16h32v5H9V16z M9,75h23v4H9V75z M39,75h57v20H39V75z M9,102h23v4H9V102z M39,102h57v19H39V102z M39,48h57v20H39V48z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">11. ADDONS</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#F5F7FA" d="M56,70h41v20H56V70z M10,45h87v24H10V45z"></path> 
                                            <path  fill="#E4E7EB" d="M10,10h12v5H10V10z M10,23h32v5H10V23z M72,10h25v9H72V10z M56,23h41v5H56V23z M10,41h87v4H10V41z M10,105h19v4 H10V105z M33,105h63v6H33V105z M10,116h19v4H10V116z M33,116h19v11H33V116z M10,29h22v5H10V29z M63,29h34v5H63V29z M10,69h87v1H10 V69z M56,90h41v1H56V90z M56,92h41v1H56V92z M56,90h41v1H56V90z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">12. ACKS.</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <rect  fill="#fff" width="105" height="148"></rect> 
                                            <path  fill="#E4E7EB" d="M9,9h25v9H9V9 M9,25h11v2H9V25 M77,25h19v2H77V25 M9,42h77v5H9V42 M9,49h52v3H9V49 M9,69h15v3H9V69 M9,85h22V74H9V85 M9,134h13v5H9V134 M23,134h13v5H23V134 M37,134h13v5H37V134 M9,112h8v2H9V112 M39,112h8v2h-8V112 M69,112h8v2h-8V112 M9,115h24v2H9V115 M39,115h16v2H39V115 M69,115h19v2H69V115 M9,121h7v2H9V121 M9,118h9v2H9V118 M9,59h34v2H9V59 M9,99h34v2H9V99"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">13. QUOTE</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#F5F7FA" d="M56,70h41v20H56V70z M10,45h87v24H10V45z"></path> 
                                            <path  fill="#E4E7EB" d="M10,10h12v5H10V10z M10,23h32v5H10V23z M72,10h25v9H72V10z M56,23h41v5H56V23z M10,41h87v4H10V41z M10,105h19v4 H10V105z M33,105h63v6H33V105z M10,116h19v4H10V116z M33,116h19v11H33V116z M10,29h22v5H10V29z M63,29h34v5H63V29z M10,69h87v1H10 V69z M56,90h41v1H56V90z M56,92h41v1H56V92z M56,90h41v1H56V90z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">14. ADD. INFO</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#E4E7EB" d="M9,10h27v5H9V10z M39,10h27v9H39V10z M69,10h27v7H69V10z M69,19h16v4H69V19z M69,25h18v4H69V25z M69,37h18v4H69 V37z M69,31h15v4H69V31z M69,43h11v4H69V43z M69,54h27v10H69V54z M39,21h15v5H39V21z M39,28h12v5H39V28z M39,54h7v4h-7V54z M39,60 h11v4H39V60z M39,66h17v4H39V66z M39,74.9l19,0.3l-0.1,4l-19-0.3L39,74.9z M39,81h22v4H39V81z M39,87h15v4H39V87z M39,93h16v4H39V93 z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">15. FINANCING</div> 
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path> 
                                            <path  fill="#F5F7FA" d="M9,27h87v25H9V27z M9,58h87v14H9V58z"></path> 
                                            <path  fill="#E4E7EB" d="M9,10h15v5H9V10z M71,10h25v9H71V10z M9,23h87v4H9V23z M9,54h87v4H9V54z M9,81h23v4H9V81z M39,81h57v26H39V81z"></path>
                                        </svg> 
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path> 
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">16. NETCC CONS. INFO.</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <rect  fill="#fff" width="105" height="148"></rect>
                                            <path  fill="#E4E7EB" d="M9,9h25v9H9V9 M9,25h11v2H9V25 M77,25h19v2H77V25 M9,42h77v5H9V42 M9,49h52v3H9V49 M9,69h15v3H9V69 M9,85h22V74H9V85 M9,134h13v5H9V134 M23,134h13v5H23V134 M37,134h13v5H37V134 M9,112h8v2H9V112 M39,112h8v2h-8V112 M69,112h8v2h-8V112 M9,115h24v2H9V115 M39,115h16v2H39V115 M69,115h19v2H69V115 M9,121h7v2H9V121 M9,118h9v2H9V118 M9,59h34v2H9V59 M9,99h34v2H9V99"></path>
                                        </svg>
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">17. ASS'D VALUES</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path>
                                            <path  fill="#E4E7EB" d="M9,10h27v5H9V10z M39,10h27v9H39V10z M69,10h27v7H69V10z M69,19h16v4H69V19z M69,25h18v4H69V25z M69,37h18v4H69 V37z M69,31h15v4H69V31z M69,43h11v4H69V43z M69,54h27v10H69V54z M39,21h15v5H39V21z M39,28h12v5H39V28z M39,54h7v4h-7V54z M39,60 h11v4H39V60z M39,66h17v4H39V66z M39,74.9l19,0.3l-0.1,4l-19-0.3L39,74.9z M39,81h22v4H39V81z M39,87h15v4H39V87z M39,93h16v4H39V93 z"></path>
                                        </svg>
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">18. ASSUMPTIONS</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path>
                                            <path  fill="#E4E7EB" d="M9,10h27v5H9V10z M9,17h87v4H9V17z M9,23h85v4H9V23z M9,29h84v4H9V29z M9,35h47v4H9V35z M9,41h84v4H9V41z M9,47 h86v4H9V47z M9,56h86v9H9V56z"></path>
                                        </svg>
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item">
                                    <div  class="page__name">19. T&amp;C</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path>
                                            <path  fill="#E4E7EB" d="M9,11h21v4H9V11z M55,11h41v116H55V11z M9,16h41v12H9V16z M9,34h41v29H9V34z M9,30h18v2H9V30z M9,69h41v58H9V69 z M9,65h18v2H9V65z"></path>
                                        </svg>
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div  class="page proposal-pages__item" draggable="false">
                                    <div  class="page__name">20. WARRANTY</div>
                                    <div  class="page__body page__body--visible">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="148" viewBox="0 0 105 148" width="105">
                                            <path  fill="#fff" d="M0,0h105v148H0V0z"></path>
                                            <path  fill="#E4E7EB" d="M9,10h21v4H9V10z M9,15h87v12H9V15z"></path>
                                        </svg>
                                        <div  class="page__check page__check--visible">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 24 24" width="32">
                                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                                <path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>

                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Proposal Watermark</h2>
                        <span class="sub-title">You can also upload an image to appear in the background of every page of your proposal</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">
                    <div class="settings-group-item mb-2">
                        <label class="form-label-title">Watermark Upload</label>
                    </div>
                    <div  class="proposal-image-uploads__item proposal-image-uploads__add">
                        <div  class="icon icon--24">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path  d="M0 0h24v24H0z" fill="none"></path>
                                <path  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                        </div>
                    </div>

                    <div class="mt-3">
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