<script setup>
    import { VueDraggableNext } from 'vue-draggable-next';
    import { ref } from 'vue';
    const colors = ref([
        { name: 'No colour', code: 'white' },
        { name: 'Sky Blue', code: 'rgb(0, 126, 229)' },
        { name: 'Dark Blue', code: 'rgb(76, 59, 207)' },
        { name: 'Light Green', code: 'rgb(46, 204, 113)' },
        { name: 'Silicon Grey', code: 'rgb(66, 66, 66)' },
        { name: 'Sunflower Gold', code: 'rgb(255, 204, 4)' },
        { name: 'Hotspot Red', code: 'rgb(207, 17, 36)' },
        { name: 'Dark Red', code: 'rgb(135, 35, 65)' },
        { name: 'Ember Orange', code: 'rgb(255, 87, 34)' },
        { name: 'Plasma Pink', code: 'rgb(236, 64, 122)' },
    ]);
    const props = defineProps({
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        stages: {
            type: Array,
            default: [],
        },
        demo: {
            type: Array,
            default: [],
        },
        addNew: {
            type: Object,
            default: {},
        }
    });
    const emits = defineEmits(['handleDelete']);
</script>

<template>

    <div class="row">

        <div class="col-lg-12 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>{{ title }}</h2>
            </div>
        </div>

        <div class="col-lg-4 col-12">

            <p class="mb-3 fs-14px">{{ description }}</p>

            <div class="list-group ">

                <vue-draggable-next class="lead-status-list"
                    tag="div"
                    :list="stages"
                    handle=".handle">

                    <div v-for="(item, index) in stages.length?stages:demo"
                        :key="index">

                        <div class="list-group-item py-0 border-bottom-0 border-top">

                            <div class="box-info d-flex justify-content-start align-items-center">

                                <div class="handle">
                                    <i class="pi pi-sort-alt fs-14px text-soft"></i>
                                </div>

                                <div class="action-dropdown">

                                    <div data-mdb-toggle="dropdown"
                                        aria-expanded="false">

                                        <span class="color-show me-2 ms-2"
                                            :style="`background:${item.color};border-color:${item.color==='white'?'#000000':item.color};`"></span>
                                    </div>

                                    <ul class="dropdown-menu dropdown-menu-start">

                                        <li v-for="(color, index) in colors"
                                            :key="index">

                                            <a @click="item.color=color.code"
                                                class="dropdown-item delete-item d-flex justify-content-start align-items-center">
                                                <span class="color-show me-2"
                                                    :style="`background:${color.code};border-color:${color.code==='white'?'#000000':color.code};`"></span>
                                                <span>{{ color.name }}</span>
                                            </a>

                                        </li>

                                    </ul>

                                </div>

                                <input class="form-control form-control-lg ps-1"
                                    type="text"
                                    :value="item.name"
                                    :readonly="!stages.length"
                                    @change="(input)=>{item.name=input.target.value}">

                                <div v-if="item.stage_id"
                                    class="action-dropdown">

                                    <div class="action px-2" @click="emits('handleDelete', item)">
                                        <i class="pi pi-trash text-danger fs-14px text-soft"></i>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </vue-draggable-next>

                <div class="list-group-item bg-light text-center add-new-lead-status"
                    @click="stages.push({...addNew})">
                    Add New
                </div>

            </div>
        </div>
    </div>

</template>

<style scoped
    lang="scss">
    [readonly] {
        cursor: no-drop;
    }

    .lead-status-list {
        .list-group-item:first-child {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }

        .list-group-item {
            position: relative;
            transition: all 0s !important;
            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: #f1f5f9;
            }

            &.is-lost {
                padding-right: 50px;
            }

            .box-info {
                .handle {
                    position: absolute;
                    left: 5px;
                    top: 47%;
                    transform: translateY(-50%);
                    cursor: move;
                    opacity: 0;
                    visibility: hidden;
                }

                .form-control {
                    border: none;
                    background-color: transparent !important;
                    padding-top: 8px;
                    padding-bottom: 8px;
                    border-radius: 0px;
                    font-weight: bold;
                    font-size: 14px;
                    outline: none !important;
                    box-shadow: none !important;
                }

                .lost-status {
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);

                    svg {
                        width: 18px;
                        height: 18px;
                        fill: #878787;
                    }
                }

                .action {
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0;
                    visibility: hidden;
                    cursor: pointer;
                }
            }



            &:hover {

                .handle,
                .action {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .add-new-lead-status {
        font-weight: bold;
        font-size: 14px;
        padding: 12px 8px;
        cursor: pointer;
        border-bottom-left-radius: 3px !important;
        border-bottom-right-radius: 3px !important;

        &:hover {
            border-color: var(--crm-color-6);
            background-color: var(--crm-color-1);
            color: var(--crm-color);
        }
    }

    .color-show {
        width: 1rem;
        height: 1rem;
        border-radius: 2px;
        display: block;
        background-color: #ffffff;
        border: 1px solid transparent;
    }

    .dropdown-menu.dropdown-menu-start {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
        border-radius: 3px !important;

        &::before {
            content: "";
            position: absolute;
            top: -7px;
            left: 10px;
            border: 7px solid #dedede;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }

        &::after {
            content: "";
            position: absolute;
            top: -6px;
            left: 10px;
            border: 7px solid white;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
</style>