<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>Email & SMS sending</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Connected email account</h2>
                        <span class="sub-title">Sync your inbox and see your conversations in Pylon CRM.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-12">
                    <p class="">Your email address <span class="mx-1 fw-bold">connections@electrifyingaustralia.com.au</span> is not yet connected.</p>
                    <div>
                        <button class="btn btn-primary fw-bold">Connect your email</button>
                    </div>
                </div>

            </div>

            <hr class="mt-4 mb-5">

            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>SMS sending</h2>
                        <span class="sub-title">Chat with your customers in Pylon CRM.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-12">
                    <p class="">SMS integration coming soon.</p>
                </div>

            </div>


            <hr class="mt-4 mb-5">


            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>SMS sending</h2>
                        <span class="sub-title">Chat with your customers in Pylon CRM.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-12">
                    <QuillEditor theme="snow" placeholder="Insert text here ..." />
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>

            </div>

            <hr class="mt-4 mb-5">

            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>User Email Signature</h2>
                        <span class="sub-title">This will be be used instead of your company wide email signature.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-12">
                    <QuillEditor theme="snow" placeholder="Insert text here ..." />
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Save Settings</button>
                    </div>
                </div>

            </div>

            <hr class="mt-4 mb-5">

            <div class="row">

                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Email Templates</h2>
                        <span class="sub-title">Setup email templates so you quickly send out emails to your customers</span>
                    </div>
                </div>

                <div class="col-lg-8 col-12">
                    <table class="table table-bordered table-sm table-striped table-hover table-light">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="35%" scope="col">Name</th>
                                <th class="fw-bold" width="40%" scope="col">Subject</th>
                                <th class="fw-bold" width="25%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Add new template</button>
                    </div>
                </div>

            </div>


            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>SMS Templates</h2>
                        <span class="sub-title">Setup sms templates so you quickly send out text messages to your customers</span>
                    </div>
                </div>
                <div class="col-lg-8 col-12">
                    <table class="table table-bordered table-sm table-striped table-hover table-light">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="35%" scope="col">Name</th>
                                <th class="fw-bold" width="40%" scope="col">Subject</th>
                                <th class="fw-bold" width="25%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>353420c</td>
                                <td>A1486311</td>
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
                    <div class="mt-3">
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