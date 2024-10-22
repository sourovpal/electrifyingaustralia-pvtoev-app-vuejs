<script setup>
    import { ref, computed } from 'vue';
    import SlideUpDown from "vue-slide-up-down";
    import { usePlatformStore } from '@stores';
    import { useApiRequest } from '@actions/api';
    import { useDebounceFn } from '@vueuse/core';
    import { $toast } from '@config';

    const platformStore = usePlatformStore();
    const toggle = ref(true);
    const editLead = computed(() => platformStore.getEditLead);
    const editLeadId = computed(() => platformStore.getEditLeadId);
    const leadNotes = computed({
        get() {
            return platformStore.getEditLead.notes;
        },
        set(notes) {
            return platformStore.getEditLead.notes = notes;
        }
    });

    function handleDropdownToggle() {
        toggle.value = !toggle.value;
    }

    const handleOnUpdateNotes = useDebounceFn(() => {
        $toast.clear();
        useApiRequest({
            url: `leads/${editLeadId.value}/notes`,
            method: 'POST',
            payload: { notes: leadNotes.value }
        }).then(res => {
            const { success, message, errors } = res;
            if (!success) {
                $toast.error(message.text);
            }
        }).catch(error => {

        })
    }, 2000);

</script>
<template>
    <div class="dropdown-box border-bottom">
        <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
            :class="{show:toggle}">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Notes</span>
            <div class="">
                <button @click="handleDropdownToggle"
                    :class="{toggler:toggle}"
                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                    <font-awesome-icon class="text-soft fs-14px"
                        icon="fa fa-chevron-up" />
                </button>
            </div>
        </div>
        <slide-up-down :active="toggle"
            :duration="500">
            <div class="dropdown-body">
                <div class="lead-timeline-notes">
                    <textarea class="notes"
                        @keyup="handleOnUpdateNotes"
                        v-model="leadNotes"
                        rows="6"></textarea>
                </div>
            </div>
        </slide-up-down>
    </div>
</template>

<style scoped
    lang="scss">
    button {
        transition: transform 0.3s ease-in-out;
    }

    .show {
        button.toggler {
            transform: rotate(-180deg);
        }
    }

    .lead-timeline-notes {
        background-color: #fff3c4 !important;
        position: relative;
        margin: 0px 14px 14px 14px;
        border: 2px solid #f2de8f;
        border-radius: 5px;

        .notes {
            color: #8d2b0b !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            width: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            background: transparent;
            padding: 8px;
            resize: none;
            overflow: auto;
            scrollbar-width: none;
        }
    }
</style>