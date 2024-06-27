<template>
    <div class="tab-display">
        <div class="tab-navigation d-flex gap-3">
            <button
                :class="`mb-0 bg-transparent border-0 fs-6 text-secondary fw-bold ${activeTab === tab.component ? 'text-info' : ''}`" 
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

const activeTab = ref('TempComponent1');
const componentClass = ref('');
const transitionDuration = ref(250);
const handleTabClick = ({component}) => {
    componentClass.value = 'fade-in-out';

    setTimeout(() => {
        activeTab.value = component;
        componentClass.value = '';
    }, transitionDuration.value)
}

</script>

<style lang="scss" scoped>
.tab-display {
    // temporary
    width: 30rem;
}

.fade-in-out {
    opacity: 0;
}

.left-fade-out {
    opacity: 0;
    transform: translateX(-50%);
}
.right-fade-out {
    opacity: 0;
    transform: translateX(50%);
}

.left-fade-in {
    opacity: 0;
    transform: translateX(-50%);
}
.right-fade-out {
    opacity: 0;
    transform: translateX(50%);
}

</style>

