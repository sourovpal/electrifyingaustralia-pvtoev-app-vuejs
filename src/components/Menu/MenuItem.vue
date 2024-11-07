<script setup>
    import {   onMounted, computed, ref, watch } from 'vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import SlideUpDown from 'vue-slide-up-down';
    import { useRoute } from 'vue-router';

    const props = defineProps({
        item: {
            type: Object,
            default: {},
        },
        label: {
            type: String,
            default: "This is Sub Menu",
        },
        path: {
            type: String,
            default: '/',
        },
        icon: {
            type: String,
            default: 'fas fa-plus',
        },
        children: {
            type: Array,
            default: [],
        },
    });

    const route = useRoute();
    const isActiveMenu = ref(false);
    const isActiveChildMenu = ref(false);

    function isActiveRoute(search = '') {
        var routeFullPath = route.fullPath;
        var temp = (routeFullPath.search(search) > -1) ? true : false;
        return temp;
    }

    function isActiveChildRoute(path, query = {}) {
        var isUrl = isActiveRoute(path);
        var query = new URLSearchParams(query);
        var urlQuery = new URLSearchParams(route.query);
        if (isUrl && query.toString() == urlQuery.toString()) {
            return true;
        }
    }

    watch(route, () => {
        isActiveMenu.value = isActiveRoute(props.path);
    }, {
        deep: true
    });


    onMounted(() => {
        isActiveMenu.value = isActiveRoute(props.path);
    });

</script>
<template>
    <div class="nav-list mx-2 px-1">
        <router-link class="nav-link nav-toggler mb-1"
            :class="{'is-active':isActiveMenu}"
            @click="isActiveMenu=!isActiveMenu"
            :to="{path:path}">
            <span class="nav-icon">
                <font-awesome-icon :style="{'height':'18px', 'width':'18px',}"
                    :icon="icon" />
            </span>
            <span class="nav-title ms-2">{{ label }}</span>
            <span v-if="children.length"
                class="nav-icon ms-auto">
                <font-awesome-icon :style="{'height':'14px', 'width':'14px',}"
                    :icon="`fas fa-angle-down`" />
            </span>
        </router-link>
        <slide-up-down v-if="isActiveMenu"
            :active="isActiveMenu">
            <div class="nav-item"
                v-for="(childMenu, index) in children"
                :key="index">
                <router-link class="nav-link mb-1"
                    exact
                    :class="{'is-active':isActiveChildRoute(childMenu.path, childMenu.query)}"
                    :to="{path:childMenu.path, query:childMenu.query??{}}">
                    <span class="nav-icon">
                        <font-awesome-icon :style="{'height':'10px', 'width':'10px',}"
                            :icon="`fas fa-circle-dot`" />
                    </span>
                    <span class="nav-title ms-2">{{ childMenu.label }}</span>
                    <span class="nav-icon ms-auto"
                        v-if="childMenu.icon">
                        <font-awesome-icon :style="{'height':'14px', 'width':'14px',}"
                            :icon="childMenu.icon" />
                    </span>
                </router-link>
            </div>
        </slide-up-down>
    </div>
</template>

<style scoped
    lang="scss">
    .nav-link {
        --nav-bg-color: #f4f6f6;
        --nav-icon-color: #6b7c92;
        --nav-active-color: var(--crm-color);
        --nav-text-color: #8094ae;

        &.is-active {
            --nav-bg-color: transparent !important;
            --nav-active-color: var(--crm-color) !important;
            --nav-icon-color: var(--crm-color) !important;
            --nav-text-color: var(--crm-color) !important;
        }

        transition: all 0.3s;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 6px 8px;
        border-radius: 8px;
        line-height: 20px;

        &:hover,
        &.is-active {
            background-color: #f4f6f6;
        }

        .nav-icon {
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--nav-text-color) !important;
        }

        .nav-title {
            color: var(--nav-text-color);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>