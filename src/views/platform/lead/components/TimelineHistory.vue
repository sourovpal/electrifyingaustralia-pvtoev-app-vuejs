<script>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';
    import Message from './events/Message.vue';
    import GroupByDateEvent from './events/GroupByDateEvent.vue';
    import { FetchTimelineLogs } from '../../../../actions/TimelineLogAction';
    import { ref, watch } from 'vue';
    import { useInfiniteScroll } from '@vueuse/core'
    export default {
        components: {
            CustomScrollbar,
            QuillEditor,
            Message,
            GroupByDateEvent,
        },
        setup(props) {
            const timelineScrollBar = ref(null);
            return { timelineScrollBar };
        },
        data() {
            return {
                counter: 5,
                timelineLogs: {},
                timelinelogsDate: [],
                isLoading: false,
                isScrolling: false,
                isInfiniteFetch: false,
                total: 0,
                isMounted: false,
                scrollPosition: 0,
            }
        },
        methods: {
            async fetchTimelineLogsHandler(payload = {}) {
                this.isLoading = true;
                payload['lead_id'] = this.$route.params.id;
                const res = await FetchTimelineLogs(payload);

                this.total = res.total;
                var logs = res?.logs ?? {};

                Object.keys(logs).forEach(key => {
                    if (Object.keys(this.timelineLogs).includes(key)) {
                        this.timelineLogs[key] = logs[key].concat(this.timelineLogs[key]);
                    } else {
                        this.timelineLogs[key] = logs[key];
                    }
                });

                this.timelinelogsDate = Object.keys(this.timelineLogs).sort();
                this.isLoading = false;
                this.isInfiniteFetch = true;
                this.timelineScrollPositionBottom();
                if(this.isMounted){
                    this.isMounted = false;
                }
            },
            infiniteLoadedTimeline(event) {
                this.$nextTick(()=>{
                    var position = null;
                    this.scrollPosition = event.target.scrollHeight;
                    if (event) {
                        position = (100 / event.target.scrollHeight) * (event.target.scrollTop);
                        if(position < 20 && this.isInfiniteFetch && this.total){
                            this.isInfiniteFetch = false;
                            this.fetchTimelineLogsHandler({total:this.total});
                        }
                    }
                });
            },
            timelineScrollPositionBottom() {
                this.$nextTick(()=>{
                    var scroll = this.timelineScrollBar;
                    if(scroll && !this.isScrolling){
                        this.scrollPosition = scroll.scrollHeight - this.scrollPosition;
                        console.log(this.scrollPosition)
                        scroll.scrollTop = this.scrollPosition;
                    }
                });
            },
        },
        mounted() {
            this.isMounted = true;
            this.fetchTimelineLogsHandler()
            // console.log(this.reversedMessages);
        },
    }
</script>

<template>
    <div class="col-left">
        <div class="history-logs"
            @scroll="infiniteLoadedTimeline"
            ref="timelineScrollBar">
            <div class="history-area">
                <div class="text-center mb-1 mt-2">
                    <span class="text-soft">No older activity to display. {{ isScrolling }}</span>
                </div>
                <div class="history-row"
                    v-for="(log_date, index) in timelinelogsDate"
                    :key="index">
                    <group-by-date-event :logs-group="timelineLogs[log_date]"
                        :event-date="log_date" />
                </div>
            </div>
        </div>
        <div class="message-box">
            <div class="tab-area border h-100 rounded">
                <div class="tab-menu px-2">
                    <ul class="nav nav-tabs mb-3"
                        id="myTab0"
                        role="tablist">
                        <li class="nav-item"
                            role="presentation">
                            <button @click="timelineScrollPositionBottom"
                                class="nav-link fs-14px py-2 fw-bold text-capitalize active">Comment</button>
                        </li>
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send email</button>
                        </li>
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send SMS</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .col-left {
        flex-grow: 1;
        border-right: 1px solid #dddddd;
        width: calc(100% - 24rem);
        position: relative;
        display: flex;
        flex-direction: column;
        /* height: 100vh; */

        @media only screen and (max-width:991.99px) {
            width: 100% !important;
        }

        &:deep(.history-logs) {

            background-color: #e8ebef;
            overflow: auto;
            max-height: 70vh;
            overflow: auto;
            /* .timeline-logs {
                background-color: #e8ebef;
                overflow: auto;
                max-height: 70vh;
                overflow: auto;
            } */

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

            .history-area {
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

        .message-box {
            /* position: absolute; */
            width: 100%;
            min-height: 12rem;
            bottom: 100px;
            padding: 1rem;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;

            .tab-area {
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                border-color: #007ee5 !important;
                position: relative;
                flex-grow: 1;
            }
        }
    }
</style>