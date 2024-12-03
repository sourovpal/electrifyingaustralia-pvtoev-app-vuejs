<script setup>
    import propertieTypes from './propertie-types.js';
    import { reactive, ref, watch, toRef } from 'vue';
    import InputOption from './InputOption.vue';
    import { useConfirm } from "primevue/useconfirm";
    import ToggleSwitch from "primevue/toggleswitch";
    import { onMounted, nextTick } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const confirm = useConfirm();

    const props = defineProps({
        editPropertie: { type: Object, default: null },
    });

    const emits = defineEmits(['close', 'refresh']);

    const attributes = reactive({
        label: null,
        label: null,
        data_type: null,
        unique_id: null,
        pipeline: null,
        default_value: null,
    });

    const is_pipeline_loading = ref(false);

    const pipelines = ref([]);

    const options = ref([]);

    const is_input_options = ref(false);

    const is_edit_unique_id = ref(false);

    const errors = ref({});

    function handleFetchPipeline() {

        is_pipeline_loading.value = true;

        useApiRequest({
            url: `/settings/pipelines`,
        }).then(pipelines_ => {

            pipelines.value = [{ pipeline_id: 0, title: "Lead" }, ...pipelines_];

            if (props.editPropertie)
                attributes.pipeline = findPipeline(props.editPropertie.pipeline_id);

        }).catch(error => {
            $toast.error(error.message.text);
        }).finally(_ => {

            is_pipeline_loading.value = false;

        });

    }

    function handleAddNewOption() {
        options.value.push({ value: null });
    }

    function handleDeleteOption(index, option) {
        if (option.value) return confirmDelete(index);

        options.value.splice(index, 1);
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
            label: attributes.label,
            unique_id: makeStrtoSlug(attributes.unique_id),
            data_type: attributes.data_type?.data_type ?? null,
            data_type_id: attributes.data_type?.id ?? null,
            pipeline_id: attributes.pipeline?.pipeline_id ?? null,
            default_value: attributes.default_value,
            visibility: !!attributes.visibility,
            options: options.value?.length ? options.value : null
        }
        const { pipeline_id } = route.query;

        if (!attributes.pipeline && pipeline_id) payload.pipeline_id = pipeline_id;


        useApiRequest({
            url: `/settings/properties` + (props.editPropertie ? `?propertie_id=${props.editPropertie.propertie_id}` : ``),
            method: props.editPropertie ? "PUT" : "POST",
            payload,
        }).then(({ errors: _errors, message, success }) => {

            errors.value = _errors;

            if (success) {
                $toast.success(message.text);
                emits('refresh', true);
                emits('close', true);
            }

        }).catch(error => {
            $toast.error(error.message.text);
        }).finally(_ => {

        });

    }

    function makeStrtoSlug(input) {
        if (!input) return null;
        return input
            .toString()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
    }

    function handleToggleEditUniqueId() {

        if (is_edit_unique_id.value) attributes.unique_id = makeStrtoSlug(attributes.label);
        else attributes.unique_id = null;

        is_edit_unique_id.value = !is_edit_unique_id.value;
    }

    function findDataType(id) {
        return propertieTypes.find(item => item.id == id);
    }

    function findPipeline(id) {
        if (!id) return { pipeline_id: 0, title: 'Lead' };

        return pipelines.value?.find(item => item.pipeline_id == id);
    }

    watch(
        () => attributes.data_type,
        () => {

            if (attributes.data_type?.id == 'multiple_choice' ||
                attributes.data_type?.id == 'single_choice' ||
                attributes.data_type?.id == 'read_only') {

                attributes.default_value = null;

                if (attributes.data_type.id != 'read_only') {

                    if (props.editPropertie?.options?.length) options.value = [...props.editPropertie.options];

                    else options.value = [{ value: null }];
                }

                return is_input_options.value = true;
            }

            attributes.default_value = null;

            options.value = [];

            return is_input_options.value = false;

        });

    watch(
        () => attributes.label,
        () => {

            if (is_edit_unique_id.value || props.editPropertie) return;

            attributes.unique_id = makeStrtoSlug(attributes.label);
        });

    watch(
        () => attributes.unique_id,
        () => {

            if (!is_edit_unique_id.value) return;

            attributes.unique_id = makeStrtoSlug(attributes.unique_id);
        });

    onMounted(() => {
        if (props.editPropertie) {

            handleFetchPipeline();
            let edit = props.editPropertie;

            attributes.label = edit.label;

            attributes.unique_id = edit.unique_id;

            nextTick(() => {
                if (attributes.data_type?.id == 'multiple_choice' ||
                    attributes.data_type?.id == 'single_choice' ||
                    attributes.data_type?.id == 'read_only') {
                    attributes.default_value = edit.default_value;
                    options.value = edit.options?.length ? [...edit.options] : [];
                }
            });
            attributes.visibility = !!edit.visibility;
            attributes.data_type = findDataType(edit.data_type_id);
        }
    });

</script>

<template>

    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="pt-1 pb-2 ps-3 pe-2"
        pt:content:class="pt-1 pb-2 ps-3"
        :header="`${editPropertie?'Edit':'Add'} Property`"
        :style="{ width: '30rem' }">

        <div class="">

            <div class="mb-2">

                <label class="mb-1 fs-16px text-head">Label:</label>

                <input-text size="small"
                    placeholder="Propertie name"
                    v-model="attributes.label"
                    class="w-100"
                    @click="delete errors.label"></input-text>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.label?.length">
                    {{ errors.label[0] }}
                </span>
            </div>

            <div class="mb-2">

                <label class="mb-1 fs-16px text-head">Data Type:</label>
                <select-option :loading="is_pipeline_loading"
                    filter
                    :disabled="!!editPropertie"
                    v-model="attributes['data_type']"
                    :options="propertieTypes"
                    :filterFields="['data_type']"
                    optionLabel="data_type"
                    placeholder="Select a type"
                    class="w-100 select-option-small"
                    panel-class="panel-option-small"
                    @click="delete errors.data_type">

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


                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.data_type?.length">
                    {{ errors.data_type[0] }}
                </span>

                <template
                    v-if="is_input_options && (attributes.data_type?.id == 'single_choice' || attributes.data_type?.id == 'multiple_choice')">

                    <input-option :options="options"
                        @add-new="handleAddNewOption"
                        @delete="handleDeleteOption"></input-option>

                </template>

                <template v-else-if="is_input_options && (attributes.data_type?.id == 'read_only')">

                    <div class="mb-2 mt-2">
                        <label class="mb-1 fs-16px text-head">Default Value:</label>
                        <input-text size="small"
                            placeholder="Default value"
                            v-model="attributes.default_value"
                            class="w-100"></input-text>
                    </div>

                </template>

            </div>

            <div class="mb-2">
                <label class="mb-1 fs-16px text-head">Unique ID:</label>

                <icon-field>

                    <input-icon v-if="!editPropertie">

                        <custom-checkbox :checked="is_edit_unique_id"
                            @click="handleToggleEditUniqueId"
                            class="toggle-unique-id"></custom-checkbox>

                    </input-icon>

                    <input-text size="small"
                        placeholder="Unique ID"
                        :readonly="!is_edit_unique_id"
                        :disabled="!!editPropertie"
                        v-model="attributes.unique_id"
                        class="w-100"
                        @click="delete errors.unique_id"></input-text>

                </icon-field>

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.unique_id?.length">
                    {{ errors.unique_id[0] }}
                </span>

            </div>

            <div v-if="editPropertie"
                class="mb-2">

                <label class="mb-1 fs-16px text-head">
                    Move property
                </label>

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

                <span class="fs-14px text-danger py-1 w-100 d-block"
                    v-if="errors?.pipeline_id?.length">
                    {{ errors.pipeline_id[0] }}
                </span>

            </div>

            <div class="mt-2">
                <label class="mb-1 fs-16px text-head d-block">Visibility:</label>
                <ToggleSwitch severity="success"
                    v-model="attributes.visibility" />
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
<style scoped
    lang="scss">
    .toggle-unique-id {
        margin-top: -11px;
        margin-left: -12px;
    }
</style>