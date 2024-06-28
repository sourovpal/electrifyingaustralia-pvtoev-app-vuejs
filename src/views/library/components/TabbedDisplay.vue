<template>
    <div class="tab-display">
        <div class="tab-navigation d-flex gap-3">
            <button
                :class="`mb-0 bg-transparent border-0 fs-14px text-secondary fw-bold ${activeTab === tab.component ? 'text-info' : ''}`" 
                @click="handleTabClick(tab)"
                v-for="(tab, i) in tabs"
            >
                {{tab.label}}
            </button>
        </div>
        <div 
            :class="componentClass" 
            class="component-display shadow-sm rounded" 
            :style="`transition: ${transitionDuration}ms;`"
        >
            <component :is="components[activeTab]" />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['tabs', 'components']);

const activeTab = ref(props.tabs[0].component);
const componentClass = ref('');
const transitionDuration = ref(150);
const handleTabClick = ({component}) => {
    componentClass.value = 'fade-in-out';

    setTimeout(() => {
        activeTab.value = component;
        componentClass.value = '';
    }, transitionDuration.value)
}

</script>

<style lang="scss" scoped>
.fade-in-out {
    opacity: 0;
}
</style>

