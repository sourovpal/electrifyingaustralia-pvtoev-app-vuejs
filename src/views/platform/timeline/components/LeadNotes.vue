<script setup>
    import { ref, computed } from 'vue';
    import SlideUpDown from "vue-slide-up-down";
    import { usePlatformStore } from '@stores';
    import { useApiRequest } from '@actions';
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

    const handleOnUpdateNotes = useDebounceFn(() => handleOnUpdateNotesFast(), 2000);

    const handleOnUpdateNotesFast = (save = false) => {

        $toast.clear();

        useApiRequest({
            url: `leads/${editLeadId.value}/notes`,
            method: 'POST',
            payload: { notes: leadNotes.value, save }
        }).then(res => {

            const { success, message, errors } = res;

            if (!success)
                $toast.error(message.text);

        }).catch(error => {
            $toast.clear();
            $toast.error(error.message);
        })

    };

</script>
<template>
    <div class="mt-0">
        <label class="fs-12px text-soft mb-0">Notes</label>
    </div>
    <div class="position-relative hover">

        <div class="lead-timeline-notes">
            <textarea class="notes"
                @keyup="handleOnUpdateNotes"
                v-model="leadNotes"
                rows="6"></textarea>
        </div>
        <div class="d-flex justify-content-end py-2 save-btn">
            <button @click="handleOnUpdateNotesFast(true)"
                class="btn btn-warning btn-warning-outlat btn-sm">Save change</button>
        </div>
    </div>
</template>

<style scoped
    lang="scss">
    .hover {
        .save-btn {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s linear;
        }

        &:hover .save-btn {
            opacity: 1;
            visibility: visible;
        }
    }

    .lead-timeline-notes {
        background-color: #fff3c4 !important;
        position: relative;
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

    .save-btn {
        position: absolute;
        bottom: 0;
        right: 8px;
    }
</style>