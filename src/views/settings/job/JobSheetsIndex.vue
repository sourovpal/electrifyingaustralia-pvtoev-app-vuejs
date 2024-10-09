<script setup>
</script>

<template>

    <div class="content content-y-100vh">

        <div class="content-header">
            <h1>Job Sheets</h1>
        </div>

        <div class="content-body">
            <section class="">
                <div class="row">
                    <div class="col-lg-2 col-12">
                        <div class="settings-group-header">
                            <h2>Bill of materials</h2>
                            <p class="sub-title">The bill of materials contains all the physical items that are needed
                                to complete the job.</p>
                        </div>
                    </div>
                    <div class="col-lg-8 col-12">
                        <div class="settings-group-header">
                            <h2 class="text-muted">Default items</h2>
                        </div>
                        <table class="table table-sm table-striped- table-hover">
                            <thead>
                                <tr>
                                    <th class="text-muted"
                                        width="30%"
                                        scope="col">Item</th>
                                    <th class="text-muted"
                                        width="20%"
                                        scope="col">Unit quantity</th>
                                    <th class="text-muted"
                                        width="25%"
                                        scope="col">Unit</th>
                                    <th class="text-muted"
                                        width="10%"
                                        scope="col">Multiplier</th>
                                    <th class="text-muted"
                                        width="10%"
                                        scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Feet</td>
                                    <td>
                                    </td>
                                    <td>
                                        <div class="select-box">
                                            <select class="form-control">
                                                <option value="">Hello</option>
                                                <option value="">Hello 2</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="text-end">2</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Feet</td>
                                    <td>
                                    </td>
                                    <td>
                                        <div class="select-box">
                                            <select class="form-control">
                                                <option value="">Hello</option>
                                                <option value="">Hello 2</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="text-end">2</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Feet</td>
                                    <td>
                                    </td>
                                    <td>
                                        <div class="select-box">
                                            <select class="form-control">
                                                <option value="">Hello</option>
                                                <option value="">Hello 2</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="text-end">2</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <br><br><br>
            </section>
        </div>

    </div>

</template>

<style lang="scss"
    scoped>
    .select-box {
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 47%;
            right: 15px;
            border: 4px solid rgb(166 167 170 / 62%);
            transform: translateY(-50%) rotate(-135deg);
            border-top-color: transparent;
            border-left-color: transparent;
        }

        &::after {
            content: "";
            position: absolute;
            top: 53%;
            right: 15px;
            border: 4px solid rgb(166 167 170 / 62%);
            transform: translateY(-50%) rotate(45deg);
            border-top-color: transparent;
            border-left-color: transparent;
        }
    }
</style>