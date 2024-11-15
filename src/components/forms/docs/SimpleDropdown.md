# Simple dropdown

This component allows you to select values from a dropdown and is two way bounded, i.e: can be `v-model`-ed.

<br>

### Basic Usage:

```vue
<script setup>
const optionList = ref([
    // An `id` key with a truthy value is required on all objects
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
    { id: 4, value: 'Option 4' },
]);

const selectedOptionId = ref(1); // Corresponds to the `id` key
</script>

<template>
    <div>
        <SimpleDropdown
            :list="optionList"
            v-model="selectedOptionId"
            icon="fa-caret-down"
        />
    </div>
</template>
```

<br>

#### Props

| Name         | Required | Type                   | Default           | Description                                                                 |
| ------------ | -------- | ---------------------- | ----------------- | --------------------------------------------------------------------------- |
| `list`       | yes      | `ListItem[]`           | -                 | An array of `ListItem` objects that contain the data to show as list items. |
| `modelValue` | yes      | `string` \|\| `number` | -                 | `v-model` ref/reactive object.                                              |
| `icon`       | no       | `string`               | `"fa-caret-down"` | The icon to show in the dropdown menu.                                      |
| `displayKey` | no       | `string`               | `"value"`         | The key to show from the list item object.                                  |


<br>

#### Types:

```ts
interface ListItem {
    id: string | number
    [key: string]: any
}
```
