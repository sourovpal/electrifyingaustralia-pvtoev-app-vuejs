<template>
	<div>
		<template v-if="!toggleInput">
			<div class="d-flex gap-2 align-items-center">
                <template v-if="inputType !== 'select'">
				    <p class="fs-14px mb-0 text-black" v-if="amountFormatter">{{ amountFormatter(modelValue) }}</p>
				    <p class="fs-14px mb-0 text-black" v-else>{{ modelValue }}</p>
                </template>

                <template v-else>
				    <p class="fs-14px mb-0 text-black" :key="toggleInput">{{ selectedOption }}</p>
                </template>
				<button
					class="btn btn-sm toggle-btn rounded-circle btn-light"
					@click="handlePenClick"
				>
					<font-awesome-icon
						class="text-secondary cursor-pointer"
						icon="fas fa-pen"
					/>
				</button>
			</div>
		</template>
		<template v-else>
			<div class="d-flex align-items-center gap-2">
                <template v-if="inputType !== 'select'">
				    <input
					    id="saveable-input-input"
					    type="text"
					    class="form-control"
				        @keyup.enter="handleSave"
					    v-model="inputValue"
				    />
                </template>
                <template v-else>
                    <div class="settings-group-item">
                        <div class="select-box">
                            <select class="form-control">
                                <option 
                                    v-for="selectListItem in selectList " 
                                    :selected="selectListItem?.id?.toString() === inputValue?.toString()"
                                    @click="handleSelectListOptionClick(selectListItem)"
                                    :value="selectListItem.id"
                                >
                                    {{ selectListItem.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </template>
				<button
					class="btn btn-sm rounded btn-primary"
					@click="handleSave"
				>
					Save
				</button>
				<button
					class="btn btn-sm toggle-btn rounded-circle btn-light"
					@click="handlePenClick"
				>
					<font-awesome-icon
						class="text-secondary cursor-pointer"
						icon="fas fa-xmark"
					/>
				</button>
			</div>
		</template>
	</div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'

const props = defineProps([
    'modelValue',
    'amountFormatter',
    'inputType', // number | text | select
    'optionList' // { id: number|string, label: '' }
]);

onMounted(() => {
    if (props.inputType !== 'select') return;
    if (props.optionList?.length) return;

    console.warn('Missing optionList prop');
});

const emit = defineEmits(['update:modelValue'])

const toggleInput = ref(false)
const handlePenClick = () => (toggleInput.value = !toggleInput.value)

const inputValue = ref(props.modelValue)
const handleSave = () => {
	emit('update:modelValue', inputValue.value)
	toggleInput.value = false
}

const selectList = ref(
    props?.optionList?.length ?
        props.optionList : 
        [{id: 1, label: 'Option 1'}]
);

const selectedOption = computed(() => {
    const selectedValue = selectList.value?.find(
        item => item.id === props.modelValue
    )

    if (!selectedValue) return null;
    return selectedValue.label
});

const handleSelectListOptionClick = (optionListItem) => inputValue.value = optionListItem.id;

</script>

<style lang="scss" scoped>
#saveable-input-input {
	width: 4rem !important;
	padding: 0.25rem 0.5rem;
}

.toggle-btn {
	$close-btn-dimension: 2rem;
	width: $close-btn-dimension;
	height: $close-btn-dimension;
	padding: 0;
}
</style>
