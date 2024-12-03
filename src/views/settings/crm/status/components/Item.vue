<script setup>

    import { useApiRequest } from '@actions';
    import { ref, onMounted, reactive } from 'vue';
    import { $toast } from '@config';

    const props = defineProps({
        status: { type: Object, default: {} }
    });

    const emits = defineEmits(['delete']);

    const initial_status = reactive({});

    onMounted(() => Object.assign(initial_status, { ...props.status }));

    function handleUpdate(payload = {}) {

        $toast.clear();

        Object.assign(props.status, { ...props.status, ...payload });

        if (initial_status.name == props.status.name &&
            initial_status.is_lost == props.status.is_lost
        ) return;

        useApiRequest({
            url: '/settings/statuses',
            method: 'PUT',
            payload: props.status
        }).then(res => {
            $toast.success(res.message.text);
            Object.assign(initial_status, { ...props.status });
        }).catch(error => $toast.error(error.message.text));
    }

</script>

<template>

    <div class="list-group-item px-0 py-0 border-0">

        <icon-field>

            <input-icon class="pi pi-sort-alt fs-14px handle-move handle" />

            <input-text class="w-100 rounded-0 h-100 status-input fs-16px"
                v-model="status['name']"
                size="large"
                @blur="handleUpdate"
                placeholder="Name"></input-text>

            <input-icon v-if="status.is_lost"
                class="pi pi-sort-down-fill is-lost fs-14px" />

            <input-icon class="pi pi-ellipsis-v action-dropdow-toggler fs-14px"
                data-mdb-toggle="dropdown" />

            <div class="dropdown-menu dropdown-menu-end">


                <button v-if="!status?.is_lost"
                    @click="handleUpdate({is_lost:1})"
                    class="dropdown-item py-1 fs-14px fw-bold text-head d-flex justify-content-between align-items-center">

                    <span>Make a Lost</span>

                    <i class="pi pi-sort-down-fill fs-12px ms-auto text-soft"></i>

                </button>

                <button v-else
                    @click="handleUpdate({is_lost:0})"
                    class="dropdown-item py-1 fs-14px fw-bold text-head">Make a Active</button>

                <button @click="emits('delete', true)"
                    class="mb-1 dropdown-item py-1 fs-14px fw-bold text-danger">Delete</button>

            </div>
        </icon-field>


    </div>

</template>

<style scoped
    lang="scss">
    .list-group-item {
        position: relative;

        .handle-move {
            cursor: move;
            opacity: 0;
            transition: opacity 0.2s linear;
        }

        .is-lost,
        .action-dropdow-toggler {
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s linear;
            right: 8px;
        }

        .is-lost {
            opacity: 1;
        }

        &:hover {

            .action-dropdow-toggler,
            .handle-move {
                opacity: 1;
            }

            .is-lost {
                opacity: 0;
                visibility: hidden;
            }

        }

        .status-input:not(:hover),
        .status-input:not(:focus) {
            border-color: #dddddd;
            border-bottom-color: transparent;
        }

        .dropdown-menu.dropdown-menu-end {
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
            border-radius: 3px !important;

            &::before {
                content: "";
                position: absolute;
                top: -7px;
                right: 10px;
                border: 7px solid #dedede;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }

            &::after {
                content: "";
                position: absolute;
                top: -6px;
                right: 10px;
                border: 7px solid white;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
        }
    }
</style>