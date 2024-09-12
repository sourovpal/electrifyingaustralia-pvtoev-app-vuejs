<script setup>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';
    import { ref, watch, onMounted, nextTick, onUnmounted, watchEffect } from 'vue';
    import { useInfiniteScroll } from '@vueuse/core';
    import LogMessage from '../events/LogMessage.vue';
    import MessageBox from './MessageBox.vue';
    import { useLeadStore } from "@stores/lead";
    import { useApiRequest } from "@actions/api";
    import { useRoute } from 'vue-router';
    import moment from 'moment';
    import { $toast } from '@config';
    import { mergeTimelineLogs } from '@helpers';
    import ScrollBottomPosition from '@components/ScrollBottomPosition.vue';

    const leadStore = useLeadStore();
    const timelineLogs = ref({});
    const route = useRoute();
    const startId = ref(0);
    const lastId = ref(0);
    const leadId = ref(null);

    const scrollBottomPositionRef = ref(null);
    async function fetchTimelineLogsHandler($state = null) {
        if (!$state.isReset) {
            $state.loading();
        }
        var payload = {
            lead_id: leadId.value ?? route.params.id,
            start_id: startId.value,
            limit: 30
        };
        useApiRequest({
            url: '/timelines',
            method: 'get',
            payload
        }).then(async res => {
            const { success, message, timeline_logs, start_id, last_id } = res;
            if (success) {
                startId.value = start_id;
                lastId.value = last_id;
                if ($state.isReset) {
                    timelineLogs.value = {};
                }
                timelineLogs.value = await mergeTimelineLogs(timelineLogs.value, timeline_logs);
                await new Promise(resolve => setTimeout(resolve, 10));
                await $state.loaded();
                if (!startId.value) $state.complete();
                return;
            }
            $toast[message.type](message.text);
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        });
    }

    async function resetTimelineLogs(isNew = false, $leadId = null) {
        lastId.value = 0;
        startId.value = 0;
        if (isNew && $leadId) {
            leadId.value = $leadId;
            timelineLogs.value = {};
            await nextTick();
            scrollBottomPositionRef.value.firstload();
            return;
        }
        scrollBottomPositionRef.value.reset();
    }

    onMounted(() => {
        leadStore.setFetchTimelineLogs(resetTimelineLogs);
    });

</script>

<template>
    <div class="col-left"
        :class="{'is-pipeline-lead':leadStore.isPipelineLead}">
        <scroll-bottom-position ref="scrollBottomPositionRef"
            @infinite="fetchTimelineLogsHandler">
            <template v-for="(groupLogs, log_date) in timelineLogs"
                :key="log_date">
                <div class="text-center mb-1 mt-2 feed-updated-date">
                    <span class="text-head updated-date">{{ moment(log_date).format('DD MMM, yyyy') }}</span>
                </div>
                <log-message v-for="(logs, groupId) in groupLogs"
                    :logs="logs"
                    :key="groupId">
                </log-message>
            </template>
        </scroll-bottom-position>
        <message-box />
    </div>
</template>

<style lang="scss"
    scoped>
    .loader {
        opacity: 0;
        width: 1px;
        height: 1px;
    }

    .col-left {
        flex-grow: 1;
        border-right: 1px solid #dddddd;
        width: calc(100% - 24rem);
        position: relative;
        display: flex;
        flex-direction: column;
        height: calc(90vh - 7px);

        &.is-pipeline-lead {
            height: calc(84vh - 5px);
        }

        @media only screen and (max-width:991.99px) {
            width: 100% !important;
        }

        &:deep(.history-logs) {
            height: calc(100% - 192px);
            background-color: #e8ebef;
            overflow: auto;

            .circle-avatar {
                background-color: transparent;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                &.shadow-border::before {
                    position: absolute;
                    content: "";
                    width: 35px;
                    height: 2px;
                    background-color: #0275d8;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                }

                &,
                &>* {
                    font-size: 16px;
                    font-weight: bold;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                &>img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }

            .feed-updated-date {
                position: sticky;
                top: 2px;

                .updated-date {
                    background: #ffffff;
                    border: 1px solid #cacaca;
                    -webkit-border-radius: 0.75rem;
                    border-radius: 0.75rem;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    padding: 0.125rem 1rem;
                    pointer-events: all;
                }
            }

            .lead-feed-row {
                margin-bottom: 3px;

                &:hover {
                    /* background-color: whitesmoke; */
                }

                .feed-badge {
                    background-color: #e5f4ff;
                    -webkit-border-radius: .25rem;
                    border-radius: .25rem;
                    padding: .125rem .375rem;
                    transition: background-color .2s ease, color .2s ease;
                    will-change: background-color;
                    color: #0275d8;
                    margin: 0px 5px;
                    letter-spacing: 0.5px;
                    font-size: 12px;

                    &:hover {
                        color: #003299;
                        background-color: #b3ddff;
                    }
                }

                .feed-badge-danger {
                    background-color: #ffcfd8;
                    -webkit-border-radius: .25rem;
                    border-radius: .25rem;
                    padding: .125rem .375rem;
                    transition: background-color .2s ease, color .2s ease;
                    will-change: background-color;
                    color: #dc244f;
                    margin: 0px 5px;
                    letter-spacing: 0.5px;
                    font-size: 12px;

                    &:hover {
                        color: #b00326;
                        background-color: #f4a0b1;
                    }
                }

                .feed-badge-success {
                    background-color: #d3ffe5;
                    -webkit-border-radius: .25rem;
                    border-radius: .25rem;
                    padding: .125rem .375rem;
                    transition: background-color .2s ease, color .2s ease;
                    will-change: background-color;
                    color: #14a44d;
                    margin: 0px 5px;
                    letter-spacing: 0.5px;
                    font-size: 12px;

                    &:hover {
                        color: #099e45;
                        background-color: #b7ffd5;
                    }
                }

                .left-feed-col {
                    padding: 0px 0px 0px 14px;
                    width: calc(100% - 6rem);

                    .feed-wrap {
                        padding: 6px 8px;
                        background: white;
                        border-radius: 15px;
                        border-top-left-radius: 0px;
                        box-shadow: rgb(50 50 93 / 8%) 0px 2px 5px -1px, rgb(0 0 0 / 17%) 0px 1px 3px -1px;
                        display: inline-block;

                        .show-image {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 5px;
                            overflow: hidden;
                        }
                    }
                }

                .right-feed-col {
                    padding: 0px 14px 0px 0px;
                    width: 6rem;
                    text-align: right;

                    .feed-time {}
                }
            }
        }
    }
</style>