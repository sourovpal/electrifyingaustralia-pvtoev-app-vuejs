<script setup>
    import { ref, computed, watch } from 'vue';
    import SlideUpDown from "vue-slide-up-down";
    import { usePlatformStore } from '@stores';
    import Http from '@http';
    import { useDebounceFn } from '@vueuse/core';
    import { $toast } from '@config';

    const platformStore = usePlatformStore();

    const editLead = computed(() => platformStore.getEditLead);

    const editLeadId = computed(() => platformStore.getEditLeadId);

    const lead_notes = ref(null);

    watch(editLead, () => lead_notes.value = editLead.value.notes);

    const handleOnUpdateNotes = useDebounceFn(() => handleOnUpdateNotesFast(), 2000);

    const handleOnUpdateNotesFast = (save = false) => {

        if (lead_notes.value == editLead.value.notes) return;

        $toast.clear();

        Http
            .leads
            .updateNote(
                {
                    notes: lead_notes.value,
                    save: save
                },
                {
                    lead_id: editLeadId.value

                }
            ).then(({ data: { success, message } }) => {

                if (!success) return $toast.error(message.text);

                if (!save) return;

                platformStore.callFetchTimelineLogs();
                $toast.success('Your notes have been saved successfully.');
                editLead.value.notes = lead_notes;

            }).catch(error => {

                const { message } = Http.error(error);
                $toast.error(message.text);

            });
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
                v-model="lead_notes"
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