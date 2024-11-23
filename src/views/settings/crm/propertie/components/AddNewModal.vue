<script setup>
    import propertieTypes from './propertie-types.js';
    import { reactive, ref, watch, toRef } from 'vue';
    import InputOption from './InputOption.vue';
    import { useConfirm } from "primevue/useconfirm";
    import ToggleSwitch from "primevue/toggleswitch";
    import { onMounted } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';


    const confirm = useConfirm();

    const emits = defineEmits(['close']);

    const attributes = reactive({
        propertie_label: null,
        propertie_label: null,
        propertie_type: null,
        propertie_unique_id: null,
        pipeline: null,
    });

    const is_pipeline_loading = ref(false);

    const pipelines = ref([]);

    const options = ref([{ value: '' }]);

    const is_input_options = ref(false);

    const errors = ref({});

    function handleFetchPipeline() {

        is_pipeline_loading.value = true;

        useApiRequest({
            url: `/settings/pipelines`,
        }).then(pipelines_ => {

            pipelines.value = [{ pipeline_id: 0, title: "Lead" }, ...pipelines_];

        }).catch(error => {

        }).finally(_ => {

            is_pipeline_loading.value = false;

        });

    }

    function handleAddNewOption() {
        options.value.push({ value: null });
    }

    function handleDeleteOption(index, option) {

        if (option.value) return confirmDelete(index);

        options.value.splice(index.value, 1);
    }

    const confirmDelete = (index) => {
        confirm.require({
            target: null,
            header: 'Delete Option?',
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-trash fs-16px',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
                style: 'height:2rem'
            },
            acceptProps: {
                label: 'Delete',
                severity: 'danger',
                style: 'height:2rem'
            },
            accept: () => options.value.splice(index, 1),
            reject: () => { }
        });
    };


    function handleSubmitPropertie() {

        let payload = {
            label: attributes.propertie_label,
            unique_id: attributes.propertie_unique_id,
            data_type: attributes.propertie_type?.data_type ?? null,
            data_type_id: attributes.propertie_type?.id ?? null,
            pipeline_id: attributes.pipeline?.pipeline_id ?? null,
            options: options.value
        }

        useApiRequest({
            url: `/settings/properties`,
            method: 'POST',
            payload,
        }).then(({ errors: _errors }) => errors.value = _errors)
            .catch(error => {
                $toast.error(error.message);
            }).finally(_ => {

            });

    }


    watch(
        () => attributes.propertie_type,
        () => {

            if (attributes.propertie_type?.id == 'multiple_choice' ||
                attributes.propertie_type?.id == 'single_choice') {
                return is_input_options.value = true;
            }
            options.value = [{ value: null }];
            return is_input_options.value = false;
        });


    onMounted(() => {
        handleFetchPipeline();
    });

</script>

<template>

    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="pt-1 pb-2 ps-3 pe-2"
        pt:content:class="pt-1 pb-2 ps-3"
        header="Add Propertie"
        :style="{ width: '30rem' }">

        <div class="">

            <div class="mb-2">

                <label class="mb-1 fs-16px text-head">Propertie label:</label>

                <input-text size="small"
                    placeholder="Propertie name"
                    v-model="attributes.propertie_label"
                    class="w-100"></input-text>

            </div>

            <div class="mb-2">
                <label class="mb-1 fs-16px text-head">Propertie Type: {{ is_input_options }}</label>
                <select-option :loading="is_pipeline_loading"
                    filter
                    v-model="attributes['propertie_type']"
                    :options="propertieTypes"
                    :filterFields="['data_type']"
                    optionLabel="data_type"
                    placeholder="Select a type"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">

                    <template #value="slotProps">

                        <div v-if="slotProps.value"
                            class="flex items-center">
                            <div>{{ slotProps.value.data_type }}</div>
                        </div>

                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>

                    </template>

                    <template #option="slotProps">

                        <div class="flex items-center">
                            <div>{{ slotProps.option.data_type }}</div>
                        </div>

                    </template>

                </select-option>

                <template v-if="is_input_options">

                    <input-option :options="options"
                        @add-new="handleAddNewOption"
                        @delete="handleDeleteOption"></input-option>

                </template>

            </div>

            <div class="mb-2">
                <label class="mb-1 fs-16px text-head">Unique ID:</label>
                <input-text size="small"
                    placeholder="Unique ID"
                    v-model="attributes.propertie_unique_id"
                    class="w-100"></input-text>
            </div>

            <div class="mb-2">

                <label class="mb-1 fs-16px text-head">Use Case:</label>
                <select-option :loading="is_pipeline_loading"
                    filter
                    v-model="attributes['pipeline']"
                    :options="pipelines"
                    :filterFields="['title']"
                    optionLabel="title"
                    placeholder="Select a pipeline"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small">

                    <template #value="slotProps">

                        <div v-if="slotProps.value"
                            class="flex items-center">
                            <div>{{ slotProps.value.title }}</div>
                        </div>

                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>

                    </template>

                    <template #option="slotProps">

                        <div class="flex items-center">
                            <div>{{ slotProps.option.title }}</div>
                        </div>

                    </template>

                </select-option>

            </div>

            <div class="mt-2">
                <label class="mb-1 fs-16px text-head d-block">Visibility:</label>
                <ToggleSwitch 
                severity="success"
                v-model="attributes.visibility"
                 />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">

                <Button size="small"
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="emits('close', true)"></Button>

                <Button size="small"
                    type="button"
                    severity="success"
                    label="Save Change"
                    @click="handleSubmitPropertie"></Button>

            </div>

        </div>

    </modal-dialog>

</template>