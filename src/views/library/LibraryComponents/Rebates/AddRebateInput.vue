<template>
    <div class="row gx-0 px-4 py-2 align-items-center">
        <div class="col-6">
            <input
                v-model="formData.description" 
                @keyup.enter="handleCreateClick"
                placeholder="Enter description" 
                class="form-control p-1 ps-2" 
                style="width: 10rem;" 
                type="text" 
            />
        </div>

        <div class="col-2">
            <input
                placeholder="Amount"
                :min="0"
                :disabled="!formData.description"
                v-model.number="formData.amount"
                @keyup.enter="handleCreateClick"
                :class="`form-control text-end p-1 ${ formData.quantity < 0 ? 'invalid-input' : '' }`"
                type="number"
            />
        </div>

        <div class="col-md-3">
            <RebateTypeSelector v-model="formData.rebate_type_id" />
        </div>

        <div class="col-1" style="transform: translateX(0.5rem);">
			<div
				class="fw-bold cursor-pointer d-flex gap-2 gap-xxl-3 justify-content-end d-none d-xxl-flex"
				aria-expanded="false"
			>
			    <font-awesome-icon
			        class="cursor-pointer create-rebate-btn text-secondary"
                    v-tippy="{ content: 'Create rebate', placement: 'top' }"
				    icon="fas fa-circle-check"
				    @click="handleCreateClick"
			    />

                <font-awesome-icon
			        class="cursor-pointer discard-rebate-btn text-secondary"
                    v-tippy="{ content: 'Cancel', placement: 'top' }"
				    icon="fas fa-circle-xmark"
				    @click="handleCancelClick"
			    />
			</div>
            <div class="dropdown text-end p-0 d-block d-xxl-none">
				<div
					class="fw-bold cursor-pointer rebate-type-menu"
					style="display: grid; place-items: center;"
					data-mdb-toggle="dropdown"
					aria-expanded="false"
				>
					<font-awesome-icon
					    class="fs-14px"
					    icon="fas fa-ellipsis-vertical"
					/>
				</div>
				<ul
					class="dropdown-menu shadow"
					aria-labelledby="dropdownMenuLink"
				>
                    <li class="py-2 px-3 text-success overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4">
						<span class="text-success">Create</span>
			            <font-awesome-icon
			                class="cursor-pointer text-success"
                            v-tippy="{ content: 'Create rebate', placement: 'top' }"
				            icon="fas fa-plus"
				            @click="handleCreateClick"
			            />
					</li>

                    <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4 text-danger">
						<span class="text-danger">Cancel</span>
                        <font-awesome-icon
			                class="cursor-pointer text-danger"
				            icon="fas fa-trash"
                            v-tippy="{ content: 'Cancel', placement: 'top' }"
				            @click="handleCancelClick"
			            />
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script setup>
import RebateTypeSelector from './RebateTypeSelector.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import  axios from '../../../../actions/api.js';
import { useProjectStore } from '../../../../stores/project.js';

const projectStore = useProjectStore()

const emit = defineEmits(['created', 'cancel'])
const props = defineProps(['rebate', 'lastRebateRecordOrder'])
const toast = useToast();

const loading = ref(false);
const formData = ref({
    description: props.rebate?.description ?? '',
    amount: props.rebate?.amount ?? 0,
    rebate_type_id: props.rebate?.rebate_type_id ?? projectStore.getDefaultRebateType,
    order: props.lastRebateRecordOrder
})

const handleCreateClick = async () => {
    if (!formData.value.description)
        return;

    if (typeof formData.value.amount !== 'number')
        return;

    loading.value = true;

    const projectId = projectStore.getProjectId;
    const payload = {
        description: formData.value.description,
        amount: formData.value.amount,
        rebate_type_id: formData.value.rebate_type_id,
        order: formData.value.order + 1
    }

    if (!props.rebate) {
        try {
            await axios.post(`projects/${projectId}/rebates`, payload)
        } catch (error) {
            toast.error(error?.response?.data?.message ?? 'Something went wrong, please check your inputs');
        } finally {
            loading.value = false;
        }
        return emit('created');
    }

    try {
        await axios.put(`projects/${projectId}/rebate/${props.rebate.id}`, payload)
    } catch (error) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong, please check your inputs');
    } finally {
        loading.value = false;
    }
    
    emit('updated');
}

const handleCancelClick = () => {
    emit('cancel');
}

</script>


<style lang="scss" scoped>
$scale-factor: 1.25;

.rebate-control svg {
    color: #adadad;
    transition: 100ms;
}

.invalid-input {
    color: #dc4c64;
    border: 2px solid;
}

.create-rebate-btn, .discard-rebate-btn {
    transition: 100ms;
}

.create-rebate-btn {
    &:hover { 
        transform: scale($scale-factor); 
        color: #14a44d !important;
    }

    &.disabled {
        pointer-events: none !important;
        opacity: 0.5;
    }
}

.discard-rebate-btn:hover { 
    transform: scale($scale-factor); 
    color: #dc4c64 !important;
}


</style>
