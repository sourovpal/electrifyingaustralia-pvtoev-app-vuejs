<script setup>
    import { ref, watch } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import { useApiRequest } from '@actions';
    import { formatLeadAddress } from '@helpers';

    const searchBoxRef = ref(null);
    const searchInput = ref(null);
    const isOpen = ref(false);
    const isLoading = ref(false);
    const results = ref([]);

    onClickOutside(searchBoxRef, () => {
        if (isOpen.value) {
            isOpen.value = false;
        }
    });

    watch(searchInput, (value) => {
        searchLocation(value)
    });

    async function searchLocation(query) {
        isLoading.value = true;
        useApiRequest({
            url: `/leads/search?query=${query}&limit=5`
        }).then(res => {
            const { success, leads } = res;
            if (success) results.value = leads;
        }).catch(error => { });
    }



</script>

<template>
    <section class="search-bar px-3 d-flex justify-content-between align-items-center">
        <div ref="searchBoxRef"
            class="search-box"
            :class="{active:(isOpen && searchInput?.length)}">
            <input class="form-control search-input py-2"
                v-model="searchInput"
                @focus="isOpen = true"
                type="text"
                placeholder="Search for a lead's or deal's">
            <div class="search-output mt-1"
                v-if="results?.length && isOpen">
                <ul class="project-list p-0 m-0">
                    <li class="dropdown-item px-2 py-2"
                        v-for="(project, index) in results"
                        :key="index">
                        <router-link :to="{path:`/platform/${project.pipeline?'deals':'leads'}/${project.lead_id}`}"
                            class="item-link">
                            <div class="search-result d-flex justify-content-between align-items-center">
                                <div class="">
                                    <div class="search-item text-base">
                                        <span>
                                            {{ formatLeadAddress(project,
                                            project.lead_title??project.primary_contact?.full_name??`Address not added
                                            yet.`)}}
                                        </span>
                                    </div>
                                    <div v-if="project.primary_contact"
                                        class="search-item-details soft-text">
                                        <span v-if="project.primary_contact.full_name">
                                            {{ project.primary_contact.full_name }}&nbsp;•&nbsp;
                                        </span>
                                        <span v-if="project.primary_contact.phone_number">
                                            {{ project.primary_contact.phone_number}}&nbsp;•&nbsp;
                                        </span>
                                        <span v-if="project.primary_contact.email">
                                            {{ project.primary_contact.email}}&nbsp;•&nbsp;
                                        </span>
                                        <span>###-0000-0267</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                                        :class="{'btn-success':(project.status.is_lost == 0), 'btn-danger':(project.status.is_lost == 1)}"
                                        v-if="project.status">{{ project.status.name }}</span>
                                    <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                                        :class="{'btn-success':(project.pipeline_stage.status == 'success'), 'btn-danger':(project.pipeline_stage.status == 'lost') , 'btn-primary':(project.pipeline_stage.status == 'primary')}"
                                        v-if="project.pipeline && project.pipeline_stage">  {{ project.pipeline.title }} /
                                        {{ project.pipeline_stage.name }}</span>
                                    <div class="icon ms-3">
                                        <font-awesome-icon icon="fas fa-arrow-right"
                                            class="fs-16px text-soft"></font-awesome-icon>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="">

        </div>
    </section>
</template>

<style lang="scss"
    scoped>
    .search-bar {
        height: 3.5rem;
        border-bottom: 1px solid var(--layout-border-color);

        .search-box {
            width: 30rem;

            &.active {
                position: fixed;
                top: 6px;
                background-color: #ffffff;
                box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
                border-radius: 3px;
                z-index: 99;

                .search-output {
                    height: 30rem;
                }

                .search-input {
                    box-shadow: none !important;
                }
            }

            .search-input {
                border: none;
                outline: none;
                background: #f4f6f6;
                width: 100%;
                border-radius: 3px;
            }

        }
    }
</style>