<script setup>
    import ConfigAutoRechargeModal from './components/ConfigAutoRechargeModal.vue';
</script>

<template>

    <div class="content content-y-100vh">

        <div class="content-header">
            <h1>Billing</h1>
        </div>

        <div class="content-body">
            <section class="">

                <div class="row">
                    <div class="col-lg-5 col-3">
                        <div class="settings-group-header">
                            <h2 class="mb-3">Credits overview</h2>
                            <h2 class="fs-13px">Credits overview</h2>
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="d-flex justify-content-start">
                                    <img src="https://app.getpylon.com/img/gem.png"
                                        alt=""
                                        class="mr-1">
                                    <strong class="ms-2">700</strong>
                                </div>
                                <button class="btn btn-primary py-2 btn-sm fw-bold ms-4">Add credits</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mt-5">
                    <div class="col-lg-5 col-3">
                        <div class="settings-group-header">
                            <h2 class="fs-13px">Auto-recharge</h2>
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="">
                                    <span class="text-muted">Disabled</span>
                                </div>
                                <button class="btn btn-secondary py-2 btn-sm fw-bold ms-4"
                                    type="button"
                                    data-mdb-toggle="modal"
                                    data-mdb-target="#ConfigAutoRechargeModal">Configure auto-recharge</button>
                                <config-auto-recharge-modal />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mt-5">
                    <div class="col-lg-5 col-3">
                        <div class="settings-group-header">
                            <h2 class="mb-3">Subscription overview</h2>
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="d-flex justify-content-start align-items-center">
                                    <span class="icon">
                                        <svg fill="#f0ad4e"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            width="24">
                                            <path d="M0 0h24v24H0z"
                                                fill="none"></path>
                                            <path
                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="ms-4">
                                        <h2 class="fs-14px mb-2">Subscription inactive</h2>
                                        <p class="mb-0 fs-14px">Your subscription is inactive. You can reactivate your
                                            subscription at any time.</p>
                                    </span>
                                    <span class="ms-2">
                                        <button class="btn btn-secondary py-2 btn-sm fw-bold ms-4">Resubscribe</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br>
                <hr class="mt-4 mb-5">

                <div class="row">
                    <div class="col-lg-8 col-3">
                        <div class="settings-group-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="mb-3">Usage summary</h2>
                                <div>
                                    <select class="form-control form-control-sm"
                                        name=""
                                        id="">
                                        <option value="">30 Days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mt-2">
                    <div class="col-lg-8">
                        <table class="table table-sm table-striped- table-hover">
                            <thead>
                                <tr>
                                    <th class="fw-bold"
                                        width="15%"
                                        scope="col">Product</th>
                                    <th class="fw-bold text-center"
                                        width="15%"
                                        scope="col">Quantity</th>
                                    <th class="fw-bold text-center"
                                        width="10%"
                                        scope="col">Credits/each</th>
                                    <th class="fw-bold text-center"
                                        width="10%"
                                        scope="col">Credits/total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SMS</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>E-signature request</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>SMS</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>E-signature request</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>SMS</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>E-signature request</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>SMS</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                                <tr>
                                    <td>E-signature request</td>
                                    <td class="text-center">41</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">82</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <a class="btn btn-primary"
                            href="">Add new installer</a>
                    </div>
                </div>

                <hr class="mt-4 mb-5">

                <div class="row">
                    <div class="col-lg-8 col-3">
                        <div class="settings-group-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="mb-3">Invoice history</h2>
                                <div>
                                    <select class="form-control form-control-sm"
                                        name=""
                                        id="">
                                        <option value="">30 Days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mt-2">
                    <div class="col-lg-8">
                        <table class="table table-sm table-striped- table-hover">
                            <thead>
                                <tr>
                                    <th class="fw-bold"
                                        width="15%"
                                        scope="col">Date</th>
                                    <th class="fw-bold text-center"
                                        width="15%"
                                        scope="col">Payment Method</th>
                                    <th class="fw-bold text-center"
                                        width="10%"
                                        scope="col">Amount Paid</th>
                                    <th class="fw-bold text-center"
                                        width="10%"
                                        scope="col">Credits</th>
                                    <th class="fw-bold text-center"
                                        width="15%"
                                        scope="col">Tax Invoice / Receipt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>August 19th 2023</td>
                                    <td class="text-center">Free credits</td>
                                    <td class="text-center">-</td>
                                    <td class="text-center">150</td>
                                    <td class="text-center">
                                        <div class="icon">
                                            <svg fill="#3b71ca"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                width="18"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                <path d="M0 0h24v24H0z"
                                                    fill="none"></path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-12 mt-3">
                        <a class="btn btn-primary"
                            href="">Add new installer</a>
                    </div>
                </div>

                <hr class="mt-4 mb-5">

                <div class="row">
                    <div class="col-lg-3 col-3">
                        <div class="settings-group-header">
                            <h2>Billing Information</h2>
                            <span class="sub-title">These details will appear on your invoices, and can be different to
                                the company details on your proposals.</span>
                        </div>
                    </div>
                    <div class="col-lg-5 col-9">

                        <div class="settings-group-item">
                            <label class="form-label-title"
                                for="">Billing contact name</label>
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg">
                        </div>

                        <div class="settings-group-item">
                            <label class="form-label-title"
                                for="">Billing company name</label>
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg">
                        </div>

                        <div class="settings-group-item">
                            <label class="form-label-title"
                                for="">Billing contact email</label>
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg">
                        </div>

                        <div class="settings-group-item">
                            <label class="form-label-title"
                                for="">Address</label>
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                            <input type="text"
                                class="form-control form-control-sm form-control-input form-control-lg mb-2">
                        </div>

                        <div>
                            <button class="btn btn-primary fw-bold">Save Settings</button>
                        </div>
                    </div>
                </div>


                <br><br><br>
            </section>
        </div>

    </div>

</template>

<style lang="scss"
    scoped>
</style>