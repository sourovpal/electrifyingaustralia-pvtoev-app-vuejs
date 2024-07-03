<template>
    <div class="content-body">
        <div class="header d-flex align-items-center gap-2">
            <p class="mb-0 lead text-black fw-bold fs-18px">Send e-signature</p>
            <font-awesome-icon
			class="text-secondary"
			icon="fas fa-circle-question"
			/>
        </div>
        <div class="message-composer mt-3 p-2" style="background-color: #f5f7faviw">
            <div class="recipients border-bottom d-flex align-items-baseline gap-2">
                <small>To</small>
                <ul class="list-unstyled d-flex mb-1">
                    <li class="recipient text-black fw-bold fs-12px border d-flex align-items-center gap-2">
                        <small>Soror Nazari (sororazarisobbi@gmail.com)</small>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </li>
                </ul>
            </div>
            <div class="recipients border-bottom d-flex align-items-center justify-content-between gap-2 py-2">
                <small>Your solar proposal</small>
                <div class="e-signature-request-input">
                    <div class="dropdown">
                        <button 
                            class="btn btn-sm btn-light text-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            E-signature request
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
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
                <img
                class="me-1"
                src="https://app.getpylon.com/img/gem.png"
                alt="gemstone" 
            />
                <span class="count">0</span>
                <font-awesome-icon
			    icon="fas fa-paper-plane"
			    />
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
