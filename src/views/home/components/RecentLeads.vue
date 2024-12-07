<script setup>

</script>

<template>

    <div class="py-2 fs-14px fw-bold text-head">RECENT LEADS</div>

    <div class="card mb-3">
        <div class="card-body pt-0 pb-0 px-0">
            <table class="table table-sm align-middle mb-0 bg-white">
                <thead class="bg-light">
                    <tr>
                        <th class="fw-bold fs-14px"
                            width="30%">Title</th>
                        <th class="fw-bold fs-14px"
                            width="15%">Owner</th>
                        <th class="fw-bold fs-14px"
                            width="15%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 8"
                        :key="index">
                        <td>
                            <p class="fw-normal mb-1">Software engineer</p>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                    alt=""
                                    style="width: 30px; height: 30"
                                    class="rounded-circle" />
                                <div class="ms-3 lh-16px">
                                    <p class="fw-bold mb-0">John Doe</p>
                                    <p class="text-muted mb-0">john.doe@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button type="button"
                                class="btn btn-link btn-sm btn-rounded">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

</script>