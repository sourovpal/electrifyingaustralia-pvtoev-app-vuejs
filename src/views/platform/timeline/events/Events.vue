<script setup>
    import EventByUser from './EventByUser.vue';
    import LeadStatusEvent from './LeadStatusEvent.vue';
    import LeadOwnerEvent from './LeadOwnerEvent.vue';
    import UpdateCustomPropertie from './UpdateCustomPropertie.vue';
    import LeadSubscriberEvent from './LeadSubscriberEvent.vue';
    import LeadQualifyEvent from './LeadQualifyEvent.vue';
    import AddedRatingEvent from './AddedRatingEvent.vue';
    import LeadFilesEvent from './LeadFilesEvent.vue';
    import LeadContactEvent from './LeadContactEvent.vue';
    import EstimatedValueEvent from './EstimatedValueEvent.vue';
    import MessageEvent from './MessageEvent.vue';

    import {   computed } from 'vue';
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
    <lead-status-event
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
        :message="message" />
    <template v-if="message.groups_message?.length"
        v-for="(childMessage, index) in message.groups_message"
        :key="childMessage.timeline_id">
        <Events :message="childMessage"
            :user="user"></Events>
    </template>
</template>