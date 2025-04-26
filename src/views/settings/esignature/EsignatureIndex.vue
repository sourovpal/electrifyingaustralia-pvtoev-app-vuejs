<script setup>
import { SmartTagz } from "smart-tagz";
import "smart-tagz/dist/smart-tagz.css";
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>E-signature requests</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Successful signatures</h2>
                        <span class="sub-title">These settings define what happens when a customer signs one of your proposals.</span>
                    </div>
                </div>
                <div class="col-lg-5 col-12">

                    <div class="settings-group-item">
                        <div class="">
                            <p class="sub-title d-block">
                                The <span class="fw-bold d-inlice">project owner</span> 
                                and the user who sends the e-signature request will automatically receive emails when proposals are signed. If you want additional people to be notified, add them here.
                            </p>
                        </div>
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">CC</label>
                        <smart-tagz
                            style="background: #f5f7fa !important;"
                            autosuggest
                            editable
                            inputPlaceholder="Type email address..."
                            :allowPaste="{delimiter: ','}"
                            :allowDuplicates="false"
                            :maxTags="20"
                            :defaultTags="['cc.example@gmail.com']"
                        />
                    </div>

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">BCC</label>
                        <smart-tagz
                            style="background: #f5f7fa !important;"
                            autosuggest
                            editable
                            inputPlaceholder="Type email address..."
                            :allowPaste="{delimiter: ','}"
                            :allowDuplicates="false"
                            :maxTags="20"
                            :defaultTags="['bcc.example@gmail.com']"
                        />
                        <span class="text-muted form-input-commant pt-3">
                            Users emailed via BCC will not be visible to other recipients of the email. Note that your customers will not see this email at all.
                        </span>
                    </div>
                    <div>
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>
            </div>


            <div class="row mt-4">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Templates</h2>
                        <span class="sub-title">These templates will be available in the email composer when sharing a proposal.</span>
                    </div>
                </div>
                <div class="col-lg-8 col-12">
                    <table class="table table-bordered table-sm table-striped table-hover table-light">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="30%" scope="col">Name</th>
                                <th class="fw-bold" width="30%" scope="col">Subject</th>
                                <th class="fw-bold" width="20%" scope="col"><span class="d-none">Make Default</span></th>
                                <th class="fw-bold" width="15%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Templates</td>
                                <td>Templates E-Templates</td>
                                <td class="text-end">
                                    <button class="btn btn-sm btn-light fw-bold">Make default</button>
                                </td>
                                <td class="text-end">
                                    <a class="me-1 btn btn-info btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                    </a>
                                    <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                        <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button class="btn btn-primary fw-bold">Add new template</button>
                    </div>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </div>

</template>

<style lang="scss" scoped>
</style>