<script setup>

</script>

<template>

    <div class="py-2 fs-14px fw-bold text-head">TODO TASKS</div>

    <div class="card mb-3">
        <div class="card-body pt-0 pb-0 px-0">
            <table class="table table-sm align-middle mb-0 bg-white">
                <thead class="bg-light">
                    <tr>
                        <th class="fw-bold fs-14px"
                            width="5%"></th>
                        <th class="fw-bold fs-14px"
                            width="30%">Name</th>
                        <th class="fw-bold fs-14px"
                            width="30%">Title</th>
                        <th class="fw-bold fs-14px"
                            width="15%">Duration</th>
                        <th class="fw-bold fs-14px"
                            width="15%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 8"
                        :key="index">
                        <th>
                            <custom-checkbox class="btn-sm"></custom-checkbox>
                        </th>
                        <td>
                            <p class="fw-normal mb-1">Software engineer</p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">Software engineer</p>
                        </td>
                        <td>
                            <span class="badge badge-success rounded-pill d-inline">Active</span>
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