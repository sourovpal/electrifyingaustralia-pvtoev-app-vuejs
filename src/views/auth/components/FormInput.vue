<script setup>

    const props = defineProps({
        label: { type: String, default: null },
        errors: { type: Object, default: null },
        errorLabel: { type: String, default: null },
    });

    function handleFocus() {

        if (!props.errors || !props.errorLabel) return;

        delete props.errors[props.errorLabel];
    }


</script>

<template>
    <div class="mb-3">

        <label v-if="label"
            class="fs-16px mb-1 text-head">
            {{ label }}
        </label>

        <input-text class="w-100"
            size="small"
            v-bind="$attrs"
            @focus="handleFocus"></input-text>

        <span v-if="errorLabel && errors && errors[errorLabel] && errors[errorLabel].length"
            class="d-block py-1 fs-14px text-danger">
            {{ errors[errorLabel][0] }}
        </span>

    </div>
</template>