<template>
    <div class="dropdown p-0">
        <template v-if="list?.length">
            <button
                class="fw-bold cursor-pointer btn btn-sm btn-light"
                data-mdb-toggle="dropdown"
            >
                <span class="me-3">
                    <template v-if="selectedValue">{{ selectedValue[displayKey] ?? '-' }}</template>
                </span>

                <font-awesome-icon :icon="`fas ${props.icon}`"/>
            </button>
        </template>
        <template v-else>Nothing to show</template>
        <ul class="dropdown-menu">
            <li
                v-for="listItem in list"
                class="dropdown-item cursor-pointer"
                @click="handleOptionClick(listItem.id)"
            >
                {{ listItem[displayKey] }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'

interface ListItem {
    id: string | number
    [key: string]: any
}

const props = withDefaults(
    defineProps<{
        list: ListItem[]
        modelValue: string | number
        displayKey?: string
        icon?: string
    }>(),
    {
        displayKey: 'value',
        icon: 'fa-caret-down',
    }
)

const emit = defineEmits(['update:modelValue'])

const handleEdgeCases = (): void => {
    if (!props.list) 
        return

    const listKeys: Array<string>[] = props.list.map((listItem: ListItem) =>
        Object.keys(listItem)
    )

    const idInAllListItems: boolean = listKeys.every((listKeySet: string[]) =>
        listKeySet.includes('id')
    )

    const displayKeyInAllListItems: boolean = listKeys.every(
        (listKeySet: string[]) => listKeySet.includes(props.displayKey)
    )

    // Non existent id
    if (!idInAllListItems)
        console.warn(`Missing 'id' key from one or more list item objects`)

    // Non existent display-key
    if (!displayKeyInAllListItems)
        console.warn(`Missing 'display-key' from one or more list item objects`)
}

const selectedValue = computed<ListItem | null>(() => {
    if (!props.list) return null
    if (!props.modelValue) return null

    const selectedListItem: ListItem | undefined = props.list.find(
        (listItem: ListItem) =>
            listItem.id.toString() === props.modelValue.toString()
    )

    if (!selectedListItem) return null

    return selectedListItem
})

const handleOptionClick = (listItemId: string | number): void => {
    emit('update:modelValue', listItemId)
}

onMounted(() => {
    handleEdgeCases()
})
</script>

<style lang="scss" scoped>
.dropdown .dropdown-menu {
    height: 15rem;
    overflow-y: scroll;
}
</style>
