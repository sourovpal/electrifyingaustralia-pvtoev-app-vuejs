<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue';
export default {

    data() {
        return {
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false,
                wheelSpeed:0.4,
            }
        }
    },
    components:{
        vueCustomScrollbar
    },
    methods: {
        optionToggle(event){
            var optionHeader = event.target.closest('.option-header');
            var optionBody   = optionHeader.nextSibling;
            if(optionHeader && optionBody){
                optionHeader.classList.toggle('active');
                optionBody.classList.toggle("active");
            }
        }
    },

}
    
</script>

<template>
    <div id="right-filter-bar">
        <div class="header d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
                <div class="icon">
                    <svg class="svg-5"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                </div>
                <h1 class="title">Filter</h1>
            </div>
            <div class="close" @click="$emit('toggle-filter', false);">
                <svg class="svg-5"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </div>
        </div>
        <vue-custom-scrollbar class="filter" :settings="settings" >
            <div class="filter-options">
                <!-- Owner -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click.prevent="optionToggle($event)">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g> <g><g><circle cx="10" cy="8" r="4"></circle> <path d="M10.35,14.01C7.62,13.91,2,15.27,2,18v2h9.54C9.07,17.24,10.31,14.11,10.35,14.01z"></path> <path d="M19.43,18.02C19.79,17.43,20,16.74,20,16c0-2.21-1.79-4-4-4s-4,1.79-4,4c0,2.21,1.79,4,4,4c0.74,0,1.43-0.22,2.02-0.57 L20.59,22L22,20.59L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z"></path></g></g></svg>
                            </div>
                            <div class="title">Owner</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Lead source</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">Bijoy Chowdhury</span>
                        </label>
                        <label class="d-flex justify-content-start align-item-start py-2 check-label-propertis">
                            <input class="form-check-input" type="checkbox" value="" aria-label="..." />
                            <span class="fs-14px ms-1">John Gosper</span>
                        </label>
                    </div>
                </div>
                <!-- Owner End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->
                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->
                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->
                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->
                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <input class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                
            </div>
        </vue-custom-scrollbar>

    </div>
</template>
<style>
#right-filter-bar.show{
    right: 0px !important;
}
</style>
<style lang="scss" scoped>
#right-filter-bar{
    position: fixed;
    width: 288px;
    height: 100%;
    background: #f5f5f5;
    right: -20rem;
    z-index: 999999999;
    box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
    user-select: none;
    transition: right 0.3s ease-in-out;
    .close{
        cursor: pointer;
    }
    .header{
        padding: 15px 12px;
        border-bottom: 2px solid #007ee5;
        background-color: #ffffff;
        .icon{
            margin-right:10px;
        }
        .title{
            font-size:20px;
            font-weight: bold;
            margin-bottom:0px;
        }
    }
    .filter{
        height:100%;
        .filter-options{
            padding-bottom:200px;
            .filter-option{
                .option-header{
                    background: #f5f7fa;
                    border-bottom: 1px solid #e4e7eb;
                    padding: 15px 12px;
                    cursor: pointer;
                    .icon{
                        margin-right:10px;
                        svg{
                            height: 18px;
                            width: 18px;
                        }
                    }
                    .title{
                        font-size: 14px;
                    }
                    .right-icon{
                        transition:transform 0.3s ;
                        svg{
                            height: 18px;
                            width: 18px;
                        }
                    }
                    &.active{
                        .right-icon{
                            transform: rotate(45deg);
                        }
                    }
                }
                .option-body{
                    background-color: #ffffff;
                    padding: 15px 12px;
                    display:none;
                    &.active{
                        display: block;
                    }
                }
            }
        }
    }
}
</style>