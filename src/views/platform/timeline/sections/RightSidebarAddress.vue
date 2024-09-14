<script setup>
    import { defineProps, computed, watchEffect, ref } from 'vue';
    import { Skeletor } from "vue-skeletor";
    import StarRating from "vue-star-rating";
    import CustomModal from '@components/modals/CustomModal.vue';
    import { useApiRequest } from '@actions';
    import { useClipboard } from '@vueuse/core';
    import { useLeadStore } from "@stores";
    import { $toast } from '@config';

    const leadStore = useLeadStore();
    const isFirstLoading = computed(() => leadStore.getIsFirstLoading);
    const editLead = computed(() => leadStore.getEditLead);
    const address = ref(null);

    const leadStarRating = ref(0);
    watchEffect(() => {
        address.value = null;
        const { address_line_one, address_line_two, city, state, post_code, confidence } = editLead.value;
        leadStarRating.value = confidence;
        var temp = "";
        if (address_line_two) {
            temp += address_line_two;
            if (address_line_one) {
                temp += "/" + address_line_one;
            }
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
                lead: editLead.value.lead_id,
                confidence: leadStarRating.value,
            }
        }).then(res => {
            const { success, message } = res;
            if (!success) {
                $toast.error(message.text);
                leadStarRating.value = editLead.value.confidence;
                return;
            }
        }).catch(error => {
            console
            $toast.error("Oops, something went wrong");
        });
    }
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
            <div class="fs-12px text-soft mb-0">Value</div>
            <div class="d-flex">
                <div v-if="!isFirstLoading"
                    class="fs-14px fw-bold text-head mb-0">
                    ${{ editLead?.estimated_value ?? "0.00" }}
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