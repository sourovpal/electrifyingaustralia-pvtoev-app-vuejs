<script setup>
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import RightSidebarAddress from './RightSidebarAddress.vue';
    import RightSidebarProperties from "./RightSidebarProperties.vue";
    import LeadTasks from './LeadTasks.vue';
    import LeadNotes from './LeadNotes.vue';
    import TimelineMedia from './TimelineMedia.vue';
    import { ref, computed } from 'vue';
    import { usePlatformStore } from '@stores';

    const platformStore = usePlatformStore();
    
    const editLeadId = computed(() => platformStore.getEditLeadId);
    const fileIsLoading = ref(false);
    const uploadedFiles = computed(() => platformStore.getLeadFiles);


    function fetchLeadFiles() {
        if (!uploadedFiles.value.length)
            platformStore.callFetchFiles(editLeadId.value, ({ loading, files }) => {
                fileIsLoading.value = loading;
            });
    }



</script>
<template>
    <Tabs value="0">
        <TabList>
            <Tab class="py-1"
                value="0">General</Tab>
            <Tab class="py-1"
                value="1">Tasks</Tab>
            <Tab @click="fetchLeadFiles"
                class="py-1"
                value="2">Media</Tab>
            <Tab class="py-1"
                value="3">Project</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">
                <RightSidebarAddress></RightSidebarAddress>
                <RightSidebarProperties></RightSidebarProperties>
                <LeadNotes></LeadNotes>
            </TabPanel>
            <TabPanel value="1">
                <LeadTasks></LeadTasks>
            </TabPanel>
            <TabPanel value="2">
                <TimelineMedia :loading="fileIsLoading"></TimelineMedia>
            </TabPanel>
            <TabPanel value="3">
                <TimelineMedia></TimelineMedia>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>