<script>
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';
    export default {
        components: {
            CustomScrollbar,
            QuillEditor
        },
        data() {
            return {
                counter: 5,
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
        },
    }
</script>

<template>
    <div class="col-left">
        <CustomScrollbar ref="leadTimelineHistoryScrollBar">
            <div class="history-area">
                <div class="text-center mb-1 mt-2">
                    <span class="text-soft">No older activity to display.</span>
                </div>
                <div class="history-row"
                    v-for="(item, index) in counter"
                    :key="index">

                    <div class="text-center mb-1 mt-2 feed-updated-date">
                        <span class="text-head updated-date"
                            @click="timelineScrollBarBottomHandler()"> {{ item%2 == 0?"Mon":"Sun" }} Nov, {{
                            Math.floor((Math.random()*100)+1) }} 2024</span>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between">
                        <div class="left-feed-col">
                            <span class="fs-12px text-soft">You created the lead</span>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between">
                        <div class="left-feed-col">
                            <span class="fs-12px text-soft">You updated the deal's quarter bill amount, appointment date
                                time</span>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between">
                        <div class="left-feed-col">
                            <span class="fs-12px text-soft">You updated the deal's notes</span>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between">
                        <div class="left-feed-col">
                            <span class="fs-12px text-soft">
                                You converted the deal from <a class="feed-badge"
                                    href="">New</a> to <a class="feed-badge"
                                    href="">Newly qualified</a>
                            </span>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between py-1">
                        <div class="left-feed-col d-flex">
                            <div class="me-2">
                                <div class="circle-avatar">
                                    <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`"
                                        alt="">
                                </div>
                            </div>
                            <div class="">
                                <span class="fs-14px fw-bold text-head">Bijoy Chowdhury <a class="feed-badge"
                                        href="">Screenshot_89.png</a> </span>
                                <div class="fs-14px fw-bold">CALLED NO ANSWER, WILL TRY AAGAIN LATER</div>
                            </div>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between py-1">
                        <div class="left-feed-col d-flex">
                            <div class="me-2">
                                <div class="circle-avatar">
                                    <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`"
                                        alt="">
                                </div>
                            </div>
                            <div class="">
                                <span class="fs-14px fw-bold text-head">Bijoy Chowdhury</span>
                                <div>
                                    <a class="feed-badge fw-bold"
                                        href="">@Ali Hosan</a>
                                </div>
                            </div>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>

                    <div class="lead-feed-row d-flex justify-content-between py-1">
                        <div class="left-feed-col d-flex">
                            <div class="me-2">
                                <div class="circle-avatar">
                                    <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`"
                                        alt="">
                                </div>
                            </div>
                            <div class="">
                                <span class="fs-14px fw-bold text-head">Bijoy Chowdhury</span>
                                <div class="fs-14px fw-bold">
                                    <div>
                                        <strong>11/20/2023&nbsp;</strong>
                                    </div>
                                    <div>
                                        <strong>11:52:49</strong>
                                    </div>
                                    <div>
                                        <strong>Physical Appointment</strong>
                                    </div>
                                    <div>
                                        <strong>Ms Fennelly </strong>
                                    </div>
                                    <div>
                                        <strong>61296044092</strong>
                                    </div>
                                    <div>
                                        <strong>11 Stromlo St Bossley Park NSW 2176 </strong>
                                    </div>
                                    <div>
                                        <strong>83 </strong>
                                    </div>
                                    <div>
                                        <strong>$300</strong>
                                    </div>
                                    <div>
                                        <strong>Ms.Fennelly is the property owner and the decision-maker. She paid $300
                                            for her last bill, and before that, she paid $400 per quarter. Now she is
                                            willing to go for a solar system at a good price.&nbsp;So she needs someone
                                            to give her a visit and explain her in detail.She has a fresh roof.
                                        </strong>
                                    </div>
                                    <div>
                                        <strong>http://154.26.153.172/RECORDINGS/MP3/20231120-151925_61296044092-all.mp3
                                            / http://154.26.153.172/RECORDINGS/MP3/20231120-151925_61296044092-all.mp3
                                        </strong>
                                    </div>
                                    <div>
                                        <strong>Eric Logan </strong>
                                    </div>
                                    <div>
                                        <strong>21-11-2023 </strong>
                                    </div>
                                    <div>
                                        <strong>12:00:00 PM</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-feed-col">
                            <span class="feed-time fs-12px text-head">16:26 am</span>
                        </div>
                    </div>


                </div>
            </div>
        </CustomScrollbar>
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
                background-color: whitesmoke;
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
            }

            .right-feed-col {
                padding: 0px 14px 0px 0px;
                width: 6rem;
                text-align: right;

                .feed-time {}
            }
        }
    }
</style>