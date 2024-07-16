<script>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';
    import Message from './events/Message.vue';
    import GroupByDateEvent from './events/GroupByDateEvent.vue';

    export default {
        components: {
            CustomScrollbar,
            QuillEditor,
            Message,
            GroupByDateEvent,
        },
        data() {
            return {
                counter: 5,
                messages: {
                    "2024-07-16 00:00:00": {
                        "2": [
                            {
                                "created_at": "2024-07-16T00:00:00.000000Z",
                                "id": 1,
                                "user_id": 2,
                                "timeline_id": 1,
                                "message": null,
                                "event_type": "created-new-lead",
                                "event_data": null
                            }
                        ]
                    },
                    "2024-07-17 00:00:00": {
                        "2": [
                            {
                                "created_at": "2024-07-17T00:00:00.000000Z",
                                "id": 2,
                                "user_id": 2,
                                "timeline_id": 1,
                                "message": null,
                                "event_type": "added-lead-source",
                                "event_data": null
                            }
                        ]
                    }
                },
            }
        },
        computed: {
            reversedMessages() {
                // return this.messages.slice().reverse();
            }
        },
        methods: {
            timelineScrollBarBottomHandler(time = 0) {
                try {
                    var scroll = this.$refs['leadTimelineHistoryScrollBar'];
                    if (scroll) {
                        var ele = scroll.scrollEl;
                        if (ele) {
                            setTimeout(() => {
                                //behavior:'smooth'
                                ele.scroll({ top: ele.scrollHeight });
                            }, time);
                        }
                    }
                } catch (error) { }
            }
        },
        mounted() {
            this.timelineScrollBarBottomHandler();
            console.log(this.reversedMessages);
        },
    }
</script>

<template>
    <div class="col-left">
        <div class="history-logs">
            <CustomScrollbar ref="leadTimelineHistoryScrollBar">
                <div class="history-area">
                    <div class="text-center mb-1 mt-2">
                        <span class="text-soft">No older activity to display.</span>
                    </div>
                    <div class="history-row"
                        v-for="(item, index) in Object.keys(messages)"
                        :key="index">
                        <group-by-date-event :group="messages[item]" />
                    </div>
                </div>
            </CustomScrollbar>
        </div>
        <div class="message-box">
            <div class="tab-area border h-100 rounded">
                <div class="tab-menu px-2">
                    <ul class="nav nav-tabs mb-3"
                        id="myTab0"
                        role="tablist">
                        <li class="nav-item"
                            role="presentation">
                            <button class="nav-link fs-14px py-2 fw-bold text-capitalize active">Comment</button>
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
        height: 100vh;

        @media only screen and (max-width:991.99px) {
            width: 100% !important;
        }

        &:deep(.history-logs) {
            .scrollbar__scroller {
                background-color: #e8ebef;
            }

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
                        background: #f5f7fa;
                        border: 1px solid #e4e7eb;
                        -webkit-border-radius: .75rem;
                        border-radius: .75rem;
                        font-size: .8125rem;
                        font-weight: 600;
                        padding: .125rem .5rem;
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
            position: absolute;
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