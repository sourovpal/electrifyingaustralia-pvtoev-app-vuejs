<script setup>
    import AttachmentsFiles from './AttachmentsFiles.vue';
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
    <Transition>

        <div>

            <attachments-files v-if="message.event_type === 'attachments'"
                :load="`${message.files}_attachments_${message.timeline_id}`"
                :event="message"></attachments-files>

            <lead-event v-else
                :event="message"></lead-event>

            <template v-if="message.groups_message?.length">
                <Events v-for="(childMessage) in message.groups_message"
                    :key="childMessage.timeline_id"
                    :message="childMessage"
                    :user="user"></Events>
            </template>

        </div>

    </Transition>

</template>
