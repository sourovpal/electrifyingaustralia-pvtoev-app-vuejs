<script setup>
    import { defineProps, defineOptions } from 'vue';
    import { formatLeadAddress } from '@helpers';
    defineOptions({
        inheritAttrs: false
    });
    const props = defineProps({
        lead: { type: Object, default: {} }
    });

</script>

<template>
    <router-link draggable="true"
        :to="`/platform/deals/${lead.lead_id}`">
        <div class="pip-item">
            <h5 class="pip-title"
                v-html="formatLeadAddress(lead, `<i class='text-soft'>Address not added yet.</i>`)"></h5>
            <p class="pip-sub-title">{{ lead.lead_title??lead.primary_contact?.full_name??'Title not added yet.' }}</p>
            <div class="pip-user d-flex justify-content-between align-items-center">
                <div>
                    <img class="pip-user-avatar"
                        :src="lead?.owner?.profile_avatar">
                    <span class="pip-value">${{ lead?.estimated_value }}</span>
                </div>
                <div class="fs-16px star-value d-flex justify-content-start align-items-center" :class="{'text-soft':!lead.confidence}">
                    <span class="me-1">{{ lead.confidence }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 0 24 24"
                        width="16px"
                        :fill="`#${lead.confidence?'de911d':'8094ae'}`"
                        class="icon icon--star icon--inline">
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="pip-source text-soft">{{ lead?.source?.title??'Not added yet' }}</div>
        </div>
    </router-link>

</template>

<style scoped
    lang="scss">
    .pip-item {
        background-color: #ffffff;
        border-radius: 4px;
        margin: 15px 0px;
        padding: 13px;
        height: 125px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

        .pip-title {
            font-size: 16px;
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
            margin-bottom: 5px;
            color: #007ee5;
        }

        .pip-sub-title {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 3px;
            min-height: 36px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .pip-user {
            line-height: 18px;

            .pip-user-avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #f1f1f1;
                object-fit: cover;
            }

            .pip-value {
                color: #1f2933;
                font-size: .875rem;
                font-weight: 700;
                line-height: 1.5rem;
                margin-left: .5rem;
            }

            .star-value {
                color: #de911d;
            }
        }

        .pip-source {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
        }
    }
</style>