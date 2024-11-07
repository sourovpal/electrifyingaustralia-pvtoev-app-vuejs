<script setup>
    import { reactive, ref, onMounted } from 'vue';
    import MessageEditor from './MessageEditor.vue';

    function handleToggleTab(tab) {
        activeTab.value = tab;
    }

</script>

<template>
    <div class="message-box">
        <div class="tab-area h-100 crm-border h-100 rounded-2 flex-column py-1">
            <Tabs class="h-100" value="0">
                <TabList>
                    <Tab class="py-1 fs-14px"
                        value="0">Message</Tab>
                    <Tab class="py-1 fs-14px"
                        value="1">Send mail</Tab>
                    <Tab class="py-1 fs-14px"
                        value="2">Send SMS</Tab>
                </TabList>
                <TabPanels class="px-0 py-1 h-100">

                    <TabPanel class="h-100" value="0">
                        <message-editor></message-editor>
                    </TabPanel>

                    <TabPanel value="1">
                        <h1>Send Mail</h1>
                    </TabPanel>

                    <TabPanel value="2">

                    </TabPanel>
                    
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<style lang="scss"
    scoped>
    .message-box {
        width: 100%;
        min-height: 12rem;
        padding: .7rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;

        .tab-area {
            border: 1px solid transparent;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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