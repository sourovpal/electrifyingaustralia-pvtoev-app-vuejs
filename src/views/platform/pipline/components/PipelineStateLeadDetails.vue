<script setup>
    const props = defineProps(['data', 'isRow'])
    defineOptions({
        inheritAttrs: false
    });

    function getLeadTitleFormat(lead) {
        var temp = '';
        if (lead?.address_line_two) {
            temp += lead?.address_line_two;
            if (lead?.address_line_one) {
                temp += '/' + lead?.address_line_one;
            }
        } else if (lead?.address_line_one) {
            temp += lead?.address_line_one;
        }

        if (lead?.city || lead?.state || lead?.post_code) {
            temp += ", ";
        }

        if (lead?.city) {
            temp += lead?.city + " ";
        }

        if (lead?.state) {
            temp += lead?.state + " ";
        }

        if (lead?.post_code) {
            temp += lead?.post_code;
        }
        console.log(temp);
        if (temp != '') {
            return temp;
        }
        if (lead?.lead_title) {
            return lead?.lead_title;
        }
        return '<i class="text-secondary">Untitled deal</i>'
    }
    function getSubTitle(lead) {

        var title = '';

        if (lead?.primary_contact?.full_name) {
            title += lead?.primary_contact?.full_name;
        }

        if (lead?.lead_title) {
            title += " · " + lead?.primary_contact?.full_name;
        }
        return title;
    }

</script>

<template>


    <router-link v-if="isRow"
        v-for="(item, index) in data??[]"
        :key="index"
        :to="`/platform/leads/${item.id}`"
        class="row border border-top-0">
        <div class="col-4 text-head py-1">
            <a href="">
                <div class="fs-14px text-head text-overflow-ellipsis line-height-15px"> {{
                    item?.primary_contact?.full_name }}</div>
                <p class="mb-0 fs-12px text-soft text-overflow-ellipsis">Mr. SHANE ALEXANDER GROSMAN · Mr. SHANE
                    ALEXANDER GROSMAN 2147 NSW 21/02/11:00 AM Phone(IN)</p>
            </a>
        </div>
        <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center"></div>
        <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">Sat, Feb
            17th</div>
        <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">Sat, Feb
            17th</div>
        <div class="col-2 text-head fs-14px py-1 d-flex flex-column align-items-start justify-content-center">
            <div class="settings-group-item owner-list-dropdown">
                <button class="owner-dropdown-toggler"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false">
                    <div class="icon">
                        <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&d=mm&r=PG"
                            alt="">
                    </div>
                </button>
                <div class="dropdown-menu dropdown-menu-end"
                    @click="(e)=>{e.stopPropagation()}">
                    <!---->
                    <div>
                        <div class="dropdown-body">

                            <div class="dropdown-input">
                                <input type="text"
                                    placeholder="Filter for team members"
                                    class="project-owner-filter form-control" />
                            </div>

                            <div class="dropdown-header">
                                Owner
                            </div>

                            <div class="dropdown-item noselect">
                                <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG"
                                    draggable="false"
                                    alt="No Owner's avatar"
                                    class="project-owner__profile-photo" />
                                <span class="fs-14px fw-bold">
                                    No Owner
                                    <div class="project-owner-email text-muted fs-12px"></div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </router-link>


    <router-link v-if="!isRow"
        v-for="(item, index) in data??[]"
        draggable="true"
        :key="index"
        :to="`/platform/leads/${item.id}`">
        <div class="pip-item">
            <h5 class="pip-title"
                v-html="getLeadTitleFormat(item)"></h5>
            <p class="pip-sub-title"
                v-html="getSubTitle(item)"></p>
            <div class="pip-user d-flex justify-content-between align-items-center">
                <div>
                    <img v-if="item.owner"
                        class="pip-user-avatar"
                        :src="item?.owner?.profile_avatar"
                        alt="">
                    <img v-else
                        class="pip-user-avatar"
                        src="https://www.gravatar.com/avatar/31abcedd82c87dd621142af7f4dbe722?s=64&d=mp&r=PG"
                        alt="">
                    <span class="pip-value">${{ item?.estimated_value }}</span>
                </div>
                <div class="fs-16px star-value d-flex justify-content-start align-items-center">
                    <span class="me-1">{{ item.confidence }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 0 24 24"
                        width="16px"
                        fill="#de911d"
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
            <div class="pip-source text-soft">{{ item?.source?.title??'Not added yet' }}</div>
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