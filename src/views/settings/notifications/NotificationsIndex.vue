<script setup>
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>Notifications</h1>
    </div>

    <div class="content-body">
        <section class="">
            <div class="row">
                <div class="col-lg-2 col-3">
                    <div class="settings-group-header">
                        <h2>Communications</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">

                    <div class="settings-group-item d-flex justify-content-between align-items-center">
                        <div class="">
                            <h2 class="title">Weekly team summary</h2>
                            <span class="sub-title">Weekly emails will be sent on Monday mornings.</span>
                        </div>
                        <div>
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                        </div>
                    </div>
                </div>
            </div>

            <hr class="mt-4 mb-5">


            <div class="row">
                <div class="col-lg-2 col-3">
                    <div class="settings-group-header">
                        <h2>Notification preferences</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <table class="table table-sm table-borderless ">
                        <thead class="tbl-bg-tp">
                            <tr>
                                <th class="fw-bold py-0" width="80%">Notification</th>
                                <th class="fw-bold py-0 text-center" width="10%">In-app</th>
                                <th class="fw-bold py-0 text-center" width="10%">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Reminder notifications</h2>
                                        <span class="sub-title">Notification emails will be sent when reminders are due.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Comment mentions</h2>
                                        <span class="sub-title">You will be notified when a team member mentions you in a comment.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Comment replies</h2>
                                        <span class="sub-title">You will be notified when someone replies to one of your comments</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Unassigned new leads</h2>
                                        <span class="sub-title">You will be notified when a new Lead is created in your team by an integration, and the Lead has not not automatically been assigned an owner.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">SMS message replies</h2>
                                        <span class="sub-title">You will be notified when an SMS message is sent by a customer to a Lead which you are assigned to.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Lead assigned</h2>
                                        <span class="sub-title">You will be notified when another user makes you the owner of a Lead.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Task assigned</h2>
                                        <span class="sub-title">You will be notified when another user assigns a task to you.</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                            <tr>
                                <td width="80%">
                                    <div class="settings-group-item mb-3">
                                        <h2 class="title">Daily Task Summary</h2>
                                        <span class="sub-title">You will be notified each morning with a summary of your tasks for the day</span>
                                    </div>
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                                <td class="text-center" width="10%">
                                    <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

<style lang="scss" scoped>
.tbl-bg-tp{
    background-color: #f6f6f6;
}
.content{
    .settings-group-item{
        .title{
            line-height: 1rem;
            font-weight: 600;
            color: #3e4c59;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            font-size:15px;
            margin-bottom: 0px;
        }
        .sub-title{
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 0;
            font-weight: 400;
            color: #616e7c;
            font-size: 14px;
        }
    }
}

</style>