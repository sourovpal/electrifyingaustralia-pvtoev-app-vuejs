<script setup>
    import Attachments from './Attachments.vue';
    import LeadEvent from './LeadEvent.vue';

    import { computed } from 'vue';
    const props = defineProps({
        message: {
            type: Object,
            default: {},
        },
        user: {
            type: Object,
            default: null,
        }
    });
</script>

<template>

    <Attachments v-if="message.event_type === 'attachments'"
        :key="`${message.files}_attachments_${message.timeline_id}`"
        :event="message"></Attachments>

    <lead-event v-else
        :event="message"></lead-event>

    <!-- <lead-status-event
        v-if="message.event_type == 'change-status' || message.event_type == 'assign-status' || message.event_type == 'remove-status'"
        :message="message" />

    <lead-owner-event
        v-else-if="message.event_type == 'assign-owner' || message.event_type == 'remove-owner' || message.event_type == 'change-owner'"
        :message="message" />

    <lead-subscriber-event v-else-if="message.event_type == 'assign-subscribers'"
        :message="message" />

    <UpdateCustomPropertie
        v-else-if="message.event_type == 'update-propertie' || message.event_type == 'added-propertie'"
        :message="message" />

    <LeadQualifyEvent v-else-if="message.event_type == 'confirm-qualify'"
        :message="message" />

    <AddedRatingEvent v-else-if="message.event_type == 'added-rating'"
        :message="message" />

    <LeadFilesEvent v-else-if="message.event_type == 'files'"
        :message="message"
        :key="message" />

    <LeadContactEvent
        v-else-if="message.event_type == 'contact-create' || message.event_type == 'contact-update' || message.event_type == 'contact-delete'"
        :message="message" />

    <EstimatedValueEvent v-else-if="message.event_type == 'estimated-value'"
        :message="message" />

    <MessageEvent v-else-if="message.event_type == 'message'"
        :message="message" /> -->

    <template v-if="message.groups_message?.length"
        v-for="(childMessage, index) in message.groups_message"
        :key="childMessage.timeline_id">
        <Events :message="childMessage"
            :user="user"></Events>
    </template>

</template>