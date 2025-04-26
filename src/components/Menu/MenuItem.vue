<script setup>
    import { onMounted, computed, ref, watch, nextTick } from 'vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import SubMenuItem from './SubMenuItem.vue';
    import SlideUpDown from 'vue-slide-up-down';
    import { useRoute } from 'vue-router';

    defineOptions({
        inheritAttrs: false,
    });

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

    const duration = ref(0);
    const is_active = ref(false);
    const is_active_index = ref(0);
    const route = useRoute();

    async function toggleDropdown(e) {
        is_active.value = !is_active.value;
    }

    onMounted(async () => {
        if (route.path === props.path) is_active.value = true;
        await nextTick();
        duration.value = 500;
    });

</script>
<template>
    <div class="nav-item">
        <!-- <Avatar size="small"> -->

        <router-link :to="{ path }"
            @click="toggleDropdown"
            class="nav-header d-flex justify-content-start align-items-center py-2 px-3 text-soft">

            <material-icon :name="icon"
                size="20"
                class="text-soft">
            </material-icon>

            <span class="nav-label fs-16px ms-2">
                {{ label }}
            </span>

            <material-icon v-if="children.length"
                :name="`${is_active?'keyboard_arrow_up':'keyboard_arrow_down'}`"
                size="24"
                class="text-soft ms-auto">
            </material-icon>

        </router-link>


        <!-- </Avatar> -->
        <SlideUpDown :active="is_active"
            :duration="duration">

            <div class="sub-menu">

                <ul class="list-unstyled p-0 m-0">

                    <li class=" py-2 ps-3"
                        v-for="(child, index) in children"
                        :key="index">

                        <router-link :to="{path:child.path, query:child.query??{}}"
                            custom
                            v-slot="{ href, isActive, navigate }">

                            <SubMenuItem :href="href"
                                :query="child.query"
                                @navigate="navigate"
                                @active="is_active_index = index"
                                :class="{'active-sub-menu':(isActive && is_active_index === index)}">

                                <material-icon name="my_location"
                                    size="14"
                                    class="text-soft ms-1">
                                </material-icon>

                                <span class="nav-label fs-16px ms-1 ps-2 text-soft">
                                    {{ child.label }}
                                </span>

                            </SubMenuItem>

                        </router-link>

                    </li>

                </ul>

            </div>
        </SlideUpDown>
    </div>

</template>

<style scoped
    lang="scss">
    .nav-header {
        &:hover {
            background: #f4f4f4;
        }

        &.router-link-exact-active {
            background-color:#f4f4f4;
            color: var(--crm-color) !important;
        }
    }

    .active-sub-menu {
        .nav-label{
            color: var(--crm-color) !important;
        }
    }
</style>