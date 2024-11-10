<script setup>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';
    import { ref, watch, onMounted, nextTick, onUnmounted, watchEffect } from 'vue';
    import LogMessage from '../events/LogMessage.vue';
    import MessageBox from './MessageBox.vue';
    import { usePlatformStore } from "@stores";
    import { useApiRequest } from "@actions/api";
    import { useRoute } from 'vue-router';
    import moment from 'moment';
    import { $toast } from '@config';
    import { mergeTimelineLogs } from '@helpers';
    import ScrollBottomPosition from './ScrollBottomPosition.vue';

    const platformStore = usePlatformStore();

    const timelineLogs = ref([]);

    const route = useRoute();

    const nextId = ref(0);
    const lastId = ref(0);

    const leadId = ref(null);
    const latestId = ref(null);

    const scrollBottomPanel = ref(null);

    async function fetchTimelineLogsHandler({ scrollBottom, scrollPosition, complete, loading, latest }) {

        var $leadId = leadId.value ?? route.params.id;

        var payload = {
            next_id: nextId.value,
            limit: 10
        };

        if (latest) {
            payload['latest_id'] = latestId.value;
            delete payload['next_id'];
        }

        await useApiRequest({
            url: `/platform/timeline/${$leadId}/history`,
            payload
        }).then(async res => {

            const { success, message, timeline_logs, next_id, latest_id } = res;

            if (success) {

                nextId.value = next_id;

                latestId.value = latest_id;

                timelineLogs.value = await mergeTimelineLogs(timelineLogs.value, timeline_logs, !!latest);

                await nextTick();

                if (!nextId.value) await complete();

                if (latest) await scrollBottom();

                else await scrollPosition();

                return;
            }

            $toast[message.type](message.text);

        }).catch(error => {
            complete();
            $toast.error(error.message);
        });

    }

    onMounted(() => platformStore.setFetchTimelineLogs(scrollBottomPanel.value?.loadLatest));

</script>

<template>
    <div class="col-left"
        :class="{'is-pipeline-lead':platformStore.isPipelineLead}">

        <scroll-bottom-position ref="scrollBottomPanel"
            @infinite="fetchTimelineLogsHandler">

            <template v-for="(group_logs, created_date) in timelineLogs"
                :key="created_date">

                <div class="text-center mb-1 mt-2 feed-updated-date">
                    <span class="text-head updated-date">{{ moment(created_date).format('DD MMM, yyyy') }}</span>
                </div>

                <log-message v-for="(message) in group_logs"
                    :key="message.timeline_id"
                    :message="message"></log-message>

            </template>

        </scroll-bottom-position>

        <message-box></message-box>

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
        border-right: 1px solid #dddddd;
        width: calc(100% - 24rem);
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: calc(89.8vh);

        &.is-pipeline-lead {
            height: calc(83.5vh);
        }

        @media only screen and (max-width:768.99px) {
            height: calc(77vh) !important;
        }

        @media only screen and (max-width:991.99px) {
            width: 100% !important;
        }


        &:deep(.history-logs) {
            background-color: #e8ebef;
            overflow: hidden;
            flex: 1;

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