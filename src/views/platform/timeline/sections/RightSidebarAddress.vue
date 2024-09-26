<script setup>
    import { defineProps, computed, watchEffect, ref, nextTick } from 'vue';
    import { Skeletor } from "vue-skeletor";
    import StarRating from "vue-star-rating";
    import CustomModal from '@components/modals/CustomModal.vue';
    import { useApiRequest } from '@actions';
    import { useClipboard } from '@vueuse/core';
    import { useLeadStore } from "@stores";
    import { $toast } from '@config';
    import { onClickOutside } from '@vueuse/core';

    const leadStore = useLeadStore();
    const isFirstLoading = computed(() => leadStore.getIsFirstLoading);
    const editLead = computed(() => leadStore.getEditLead);
    const editLeadId = computed(() => leadStore.getEditLeadId);
    const address = ref(null);
    const leadStarRating = ref(0);
    const isEditEstimatedValue = ref(false);
    const editEstimatedValue = ref(0.00);
    const targetEstimatedValueInput = ref(null);

    watchEffect(() => {
        const { address_line_one, address_line_two, city, state, post_code, confidence } = editLead.value;
        address.value = null;
        leadStarRating.value = confidence;
        var temp = "";
        if (address_line_two) {
            temp += address_line_two;
            if (address_line_one) { temp += "/" + address_line_one; }
        }
        else if (address_line_one) { temp += address_line_one; }
        if (city || state || post_code) { temp += ", "; }
        if (city) { temp += city + " "; }
        if (state) { temp += state + " "; }
        if (post_code) { temp += post_code; }
        if (temp != "") { address.value = temp; }
    });

    function confidenceUpdateHandler() {
        useApiRequest({
            url: '/leads/confidence',
            method: 'post',
            payload: {
                lead_id: editLeadId.value,
                confidence: leadStarRating.value,
            }
        }).then(res => {
            const { success, message } = res;
            if (!success) {
                $toast.error(message.text);
                leadStarRating.value = editLead.value.confidence;
                return;
            }
            leadStore.callFetchTimelineLogs();
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        });
    }



    async function handleEditEstimatedValue() {
        isEditEstimatedValue.value = true;
        editEstimatedValue.value = editLead.value.estimated_value;
        await nextTick();
        targetEstimatedValueInput.value.$el.focus()
    }

    function handleUpdateEstimatedValue() {
        isEditEstimatedValue.value = false;
        if (editEstimatedValue.value == editLead.value.estimated_value) {
            return;
        } else if (!editEstimatedValue.value) {
            editEstimatedValue.value = 0.00;
        }
        useApiRequest({
            url: `/leads/${editLeadId.value}/estimated-value`,
            method: 'post',
            payload: {
                estimated_value: editEstimatedValue.value,
            }
        }).then(res => {
            const { success, message, estimated_value } = res;
            if (success) {
                editLead.value.estimated_value = estimated_value;
                leadStore.callFetchTimelineLogs();
                return;
            }
            $toast.error(message.text);
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        });
    }
    onClickOutside(targetEstimatedValueInput, handleUpdateEstimatedValue);

</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-1">
            <div class="fs-14px fw-bold text-head mb-0 text-uppercase">
                lead Properties
            </div>
            <button @click="leadStore.toggleLeadEditModal(true)"
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <font-awesome-icon icon="fas fa-pen"
                    class="text-soft fs-14px" />
            </button>
        </div>
        <div class="mb-1">
            <div class="fs-12px text-soft mb-0">Address</div>
            <div class="d-flex">
                <div v-if="!isFirstLoading"
                    class="fs-14px fw-bold text-head mb-0">
                    {{ address ?? " — " }}
                </div>

                <Skeletor style="width:50%; height:0.6rem;"
                    v-else></Skeletor>

                <a target="_blank"
                    v-if="address"
                    :href="`https://www.google.com/maps/search/${address}`"
                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto">
                    <font-awesome-icon icon="fa-arrow-up-right-from-square"
                        class="text-soft fs-14px" />
                </a>
            </div>
        </div>
        <div class="mb-1">
            <div class="fs-12px text-soft mb-0">Estimated value</div>
            <div class="d-flex">
                <div v-if="!isFirstLoading"
                    class="fs-14px fw-bold text-head mb-0">
                    <span class="cursor-pointer"
                        @click="handleEditEstimatedValue()"
                        v-if="!isEditEstimatedValue">${{ editLead?.estimated_value }}</span>
                    <vue-number v-else
                        ref="targetEstimatedValueInput"
                        class="w-50 form-control form-control-sm py-1 px-2 fs-16px text-head fw-bold"
                        v-model="editEstimatedValue"
                        @blur="handleUpdateEstimatedValue"
                        v-bind="{
                            decimal: '.',
                            separator: ',',
                            prefix: '$ ',
                            precision: 2,
                            masked: false,
                          }"></vue-number>
                </div>
                <Skeletor style="width:50%; height:0.6rem;"
                    v-else></Skeletor>
            </div>
        </div>
        <div class="mb-1">
            <div class="fs-12px text-soft mb-0">Source</div>
            <div class="d-flex">
                <div v-if="!isFirstLoading"
                    class="fs-14px fw-bold text-head mb-0">
                    {{ editLead?.source?.title ?? " — " }}
                </div>
                <Skeletor style="width:50%; height:0.6rem;"
                    v-else></Skeletor>
            </div>
        </div>

        <div class="mb-1">
            <div class="fs-12px text-soft mb-0">Confidence</div>
            <div class="d-flex">
                <div class="mb-2">
                    <star-rating style="line-height: 20px"
                        :star-size="16"
                        :rounded-corners="true"
                        :border-width="2"
                        inactive-color="#F8F9F9"
                        active-color="#FF9529"
                        border-color="#AEB6BF"
                        active-border-color="#FF9529"
                        :increment="0.5"
                        v-model:rating="leadStarRating"
                        @click="confidenceUpdateHandler"
                        :show-rating="false" />
                </div>
            </div>
        </div>
    </div>
</template>