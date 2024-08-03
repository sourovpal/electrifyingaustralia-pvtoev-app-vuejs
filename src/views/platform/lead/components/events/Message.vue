<script setup>
    import EventByUser from './EventByUser.vue';
    import UpdateLeadStatusEvent from './UpdateLeadStatusEvent.vue';
    import ChangeLeadOwnerEvent from './ChangeLeadOwnerEvent.vue';
    import UpdateCustomPropertie from './UpdateCustomPropertie.vue';

    import { defineProps, computed } from 'vue';
    const props = defineProps({
        logs: {
            type: Array,
            default: [],
        },
    });

    const user = computed(() => {
        if (props.logs.length) {
            return props.logs[0].user ?? {};
        }
    });
    const createdAt = computed(() => {
        if (props.logs.length) {
            return props.logs[0].created_at;
        }
        return new Date();
    });
</script>

<template>
    <event-by-user :user="user"
        :event-date-time="createdAt">
        <div v-for="(log, index) in logs"
            :key="index">
            <UpdateLeadStatusEvent
                v-if="log.event_type == 'update-lead-status' || log.event_type == 'added-lead-status' || log.event_type == 'remove-lead-status'"
                :log="log" />

            <ChangeLeadOwnerEvent
                v-else-if="log.event_type == 'update-lead-owner' || log.event_type == 'added-lead-owner' || log.event_type == 'remove-lead-owner'"
                :log="log" />

            <UpdateCustomPropertie 
            v-else-if="log.event_type == 'update-lead-propertie' || log.event_type == 'remove-lead-propertie'"
            :log="log" />
        </div>
        <!-- <div class="d-block">
            <div class="fs-14px fw-bold feed-wrap mb-1">
                <a class="feed-badge mx-0"
                    href="">Screenshot_89.png</a>
                <br>
                You updated the deal's quarter bill amount, appointment date
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </div>
        </div>
        <div class="d-block">
            <div class="fs-14px fw-bold feed-wrap mb-1">
                You converted the deal from <a class="feed-badge mx-0"
                    href="">New</a> to <a class="feed-badge mx-0"
                    href="">Newly qualified</a>
            </div>
        </div>
        <div class="d-block">
            <div class="fs-14px fw-bold feed-wrap mb-1">
                <a class="feed-badge mx-0"
                    href="">@Sourov Pal</a>
            </div>
        </div>
        <div class="d-block">
            <div class="fs-14px fw-bold feed-wrap mb-1">
                <a class="feed-badge mx-0"
                    href="">@Sourov Pal</a>
            </div>
        </div> -->
    </event-by-user>

    <!-- <div class="lead-feed-row d-flex justify-content-between py-1">
        <div class="left-feed-col d-flex">
            <div class="me-2">
                <div class="circle-avatar">
                    <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`"
                        alt="">
                </div>
            </div>
            <div class="">
                <div>
                    <span class="fs-14px fw-bold text-head d-inline-flex">You</span>
                    <span class="feed-time fs-12px text-head ms-3">16:26 am</span>
                </div>
                <div class="d-block">
                    <div class="fs-14px fw-bold feed-wrap mb-1">
                        You converted the deal from <a class="feed-badge mx-0"
                            href="">New</a> to <a class="feed-badge mx-0"
                            href="">Newly qualified</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-feed-col">
        </div>
    </div> -->


    <!-- <div class="lead-feed-row d-flex justify-content-between py-1">
        <div class="left-feed-col d-flex">
            <div class="me-2">
                <div class="circle-avatar">
                    <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`"
                        alt="">
                </div>
            </div>
            <div class="">
                <div>
                    <span class="fs-14px fw-bold text-head d-inline-flex">Bijoy Chowdhury</span>
                    <span class="feed-time fs-12px text-head ms-3">16:26 am</span>
                </div>
                <div class="d-block">
                    <div class="fs-14px fw-bold feed-wrap mb-1">
                        You uploaded files
                        <div class="grid-container mt-1"
                            style="grid-template-columns: repeat(2, 1fr);">
                            <div class="grid-item"><img
                                    src="https://economictimes.indiatimes.com/thumb/msid-69130611,width-1200,height-900,resizemode-4,imgsize-472342/polycrystalline-solar-panels-cheap-yet-efficient-long-lasting-solar-panels.jpg?from=mdr"
                                    alt="Image 1"></div>
                            <div class="grid-item"><img
                                    src="https://www.energymonitor.ai/wp-content/uploads/sites/2/2023/08/shutterstock_2142628905-1.jpg"
                                    alt="Image 2"></div>
                            <div class="grid-item"><img
                                    src="https://economictimes.indiatimes.com/thumb/msid-69130611,width-1200,height-900,resizemode-4,imgsize-472342/polycrystalline-solar-panels-cheap-yet-efficient-long-lasting-solar-panels.jpg?from=mdr"
                                    alt="Image 3"></div>
                            <div class="grid-item"><img
                                    src="https://economictimes.indiatimes.com/thumb/msid-69130611,width-1200,height-900,resizemode-4,imgsize-472342/polycrystalline-solar-panels-cheap-yet-efficient-long-lasting-solar-panels.jpg?from=mdr"
                                    alt="Image 4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-feed-col">
        </div>
    </div> -->

</template>
<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .grid-item {
        width: 100px;
        overflow: hidden;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border-radius: 8px;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        border: 1px solid #b9c1c7;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .grid-item img {
        width: 100%;
        height: auto;
    }
</style>