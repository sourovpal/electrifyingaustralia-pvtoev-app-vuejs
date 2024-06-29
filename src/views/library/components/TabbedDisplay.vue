<template>
	<div class="tab-display">
		<div class="tab-navigation d-flex gap-3">
			<button
				:class="`
                    mb-0
                    bg-transparent
                    d-flex
                    align-items-center
                    gap-2
                    border-0
                    fs-14px
                    fw-bold 
                    ${activeTab === tab.component ? 'text-primary' : 'text-secondary'}`"
				@click="handleTabClick(tab)"
				v-for="(tab, i) in tabs"
			>
				<template v-if="tab.icon">
					<span>{{ tab.label }}</span>
					<font-awesome-icon :icon="`fas ${tab.icon}`" />
				</template>
				<template v-else>
					{{ tab.label }}
				</template>
			</button>
		</div>
		<div
			:class="`component-display rounded ${fade ? 'fade-in-out' : ''} ${componentClass}`"
			:style="`transition: ${transitionDuration}ms;`"
		>
			<component :is="components[activeTab]" />
		</div>
	</div>
</template>

<script setup>
import {ref} from 'vue'

/* *
Example props

components: {
    name: <component>
}

tabs: [
    {
        label: 'string',
        component: 'string' // pointing to the name key in the components object  
        icon: 'fa-pen' // will show next to he tab name
    },
    ...
]

component-class: 'bg-secondary'
*/

const props = defineProps(['tabs', 'components', 'component-class'])

const activeTab = ref(props.tabs[0].component)
const fade = ref(false)
const transitionDuration = ref(150)
const handleTabClick = ({component}) => {
	fade.value = true

	setTimeout(() => {
		activeTab.value = component
		fade.value = false
	}, transitionDuration.value)
}
</script>

<style lang="scss" scoped>
.fade-in-out {
	opacity: 0;
}
</style>
