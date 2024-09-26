<script setup>
    import { reactive, ref, onMounted } from 'vue';
    import MessageEditor from './components/MessageEditor.vue';
    const activeTab = ref('message');

    function handleToggleTab(tab) {
        activeTab.value = tab;
    }

</script>

<template>
    <div class="message-box">
        <div class="tab-area border h-100 rounded d-flex flex-column">
            <div class="tab-menu px-2 mb-3">
                <ul class="nav nav-tabs mb-0">
                    <li class="nav-item">
                        <button @click="handleToggleTab('message')"
                            class="nav-link fs-14px py-2 fw-bold text-capitalize"
                            :class="{active:(activeTab=='message')}">Message</button>
                    </li>
                    <li class="nav-item">
                        <button @click="handleToggleTab('send-message')"
                            class="nav-link fs-14px fw-bold text-capitalize py-2"
                            :class="{active:(activeTab=='send-message')}">Send email</button>
                    </li>
                    <li class="nav-item">
                        <button @click="handleToggleTab('send-sms')"
                            class="nav-link fs-14px fw-bold text-capitalize py-2"
                            :class="{active:(activeTab=='send-sms')}">Send SMS</button>
                    </li>
                </ul>
            </div>
            <message-editor v-if="activeTab == 'message'"></message-editor>
            <div v-else-if="activeTab == 'send-message'"
                class="tab-content flex-grow-1 d-flex flex-column">
                Send Message
            </div>
            <div v-else-if="activeTab == 'send-sms'"
                class="tab-content flex-grow-1 d-flex flex-column">
                Send SMS
            </div>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .message-box {
        position: absolute;
        bottom: 0;
        width: 100%;
        min-height: 12rem;
        padding: .7rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;

        .tab-area {
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            border-color: #007ee5 !important;
            position: relative;
            flex-grow: 1;
        }

        &:deep(.tab-content) {
            .ql-editor {
                max-height: 20rem;
                overflow: auto;
                padding-top: 0px !important;
                padding-bottom: 0px !important;
            }
        }
    }
</style>