<script>
import {headers} from './data';
export default {
    props:['toggleHeaderProperties', 'customHeaderColumns', 'disabledHeaderColumns'],
    data() {
        return {
            headers:[],
        }
    },
    mounted() {
        this.headers = headers;
    },
}
</script>

<template>
    <div class="dropdown-menu" id="table_header_properties" @click="(e)=>e.stopPropagation()">
        <div class="row pb-2">
            <div class="col-6 pe-0">
                <div class="pb-2 pt-2 ps-3 pe-3">
                    <h6 class="fs-16px fw-bold mb-0 border-bottom pb-2 text-center">Lead properties</h6>
                </div>
                <div class="properties-list slim-scrollbar">
                    <label
                    v-for="(header, index) in headers" :key="index" 
                    @click="toggleHeaderProperties(header.unique_id)"
                    class="d-flex justify-content-start align-items-center ps-2 pe-3 py-2 check-label-propertis">
                        <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                            <svg v-if="disabledHeaderColumns.includes(header.unique_id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                            <svg v-if="!disabledHeaderColumns.includes(header.unique_id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        </span>
                        <span class="fs-14px fw-bold">{{ header.title }}</span>
                    </label>
                </div>
            </div>
            <div class="col-6 ps-0">
                <div class="pb-2 pt-2 ps-2 pe-3">
                    <h6 class="fs-16px fw-bold mb-0 border-bottom pb-2 text-center">Custom properties</h6>
                </div>
                <div class="properties-list slim-scrollbar">
                    <label 
                    v-for="(header, index) in customHeaderColumns" 
                    @click="toggleHeaderProperties(header.unique_id)"
                    :key="index" 
                    class="d-flex justify-content-start align-items-center ps-2 pe-3 py-2 check-label-propertis">
                        <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                            <svg v-if="disabledHeaderColumns.includes(header.unique_id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                            <svg v-if="!disabledHeaderColumns.includes(header.unique_id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        </span>
                        <span class="fs-14px fw-bold">{{ header.label }}</span> 
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #table_header_properties{
        width:408px;
        min-height:300px;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        border-radius:3px !important;
        &::before{
            content: "";
            position: absolute;
            top: -6px;
            right: 20px;
            border: 7px solid rgb(203 209 215);
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
            
        }
        &::after{
            content: "";
            position: absolute;
            top: -6px;
            right: 20px;
            border: 7px solid white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;

        }
        .check-label-propertis{
            cursor: pointer;
            &:hover{
                background-color: #f1f3f9;
            }
            span{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .properties-list{
            height:450px;
            overflow:auto;
        }
    }
</style>