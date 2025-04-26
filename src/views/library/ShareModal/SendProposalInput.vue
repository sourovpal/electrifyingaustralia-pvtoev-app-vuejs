<template>
    <div class="content-body">
        <div class="header d-none d-lg-flex align-items-center gap-2">
            <p class="mb-0 lead text-black fw-bold fs-18px">Send proposal</p>
        </div>
        <div class="message-composer mt-3 p-2" style="background-color: #f5f7fa">
            <div class="recipients border-bottom d-flex align-items-baseline gap-2">
                <small>To</small>
                <ul class="list-unstyled d-flex mb-1">
                    <li class="recipient text-black fw-bold fs-12px border d-flex align-items-center gap-2">
                        <small>Will Lewis (wsclewis@gmail.com)</small>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </li>
                </ul>
            </div>
            <div class="recipients border-bottom d-flex align-items-center justify-content-between gap-2 py-2">
                <small>Your solar proposal from Electrifying Australia</small>
                <div class="e-signature-request-input">
                    <div class="dropdown">
                        <button 
                            class="btn btn-sm btn-light text-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false">
                            Standard template
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Standard template</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div>
            <QuillEditor
            theme="snow"
            placeholder="Insert text here ..." 
            v-model:content="content" 
            contentType="html" 
        />
        </div>
        <div class="compose-control w-100 d-flex align-items-center justify-content-between">
            <button class="btn btn-light">Reset</button>
            <button class="btn btn-primary d-flex align-items-center gap-2">
                <span>Send</span>
                <font-awesome-icon icon="fas fa-paper-plane" />
            </button>
        </div>
        </div>
</template>

<script setup>
import {ref} from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const content = ref('Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.');
</script>

<style lang="scss" scoped>

</style>
