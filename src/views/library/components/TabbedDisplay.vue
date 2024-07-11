<template>
	<div class="tab-display">
		<div class="d-flex justify-content-between align-items-center">
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
                        ${activeTab === tab.component ? 'text-primary' : 'text-secondary'}
                    `"
					@click="handleTabClick(tab)"
					v-for="(tab, i) in tabsToLeft"
					:key="i"
				>
					<template v-if="tab.icon">
						<span>{{ tab.label }}</span>
						<font-awesome-icon
							:class="tab.icon.toRight ? 'order-1' : ''"
							:icon="`fas ${tab?.icon?.name}`"
						/>
					</template>
					<template v-else>
						{{ tab.label }}
					</template>
				</button>
			</div>
			<div class="tab-navigation gap-3">
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
                        ${activeTab === tab.component ? 'text-primary' : 'text-secondary'}
                    `"
					@click="handleTabClick(tab)"
					v-for="(tab, i) in tabsToRight"
					:key="i"
				>
					<template v-if="tab.icon">
						<span>{{ tab.label }}</span>
						<font-awesome-icon
							:class="tab.icon.toRight ? 'order-1' : ''"
							:icon="`fas ${tab?.icon?.name}`"
						/>
					</template>
					<template v-else>
						{{ tab.label }}
					</template>
				</button>
			</div>
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
import {computed, ref} from 'vue'

/* *
Example props

components: {
    name: <component>
}

tabs: [
    {
        label: 'string',
        component: 'string' // pointing to the name key in the components object  
        icon: { name: 'fa-pen', toRight: false } // will show next to he tab name
    },
    ...
]

component-class: 'bg-secondary'
*/

const props = defineProps(['tabs', 'components', 'component-class'])

const tabsToLeft = computed(() =>
	props.tabs.filter((tab) => !Boolean(tab.toRight))
)
const tabsToRight = computed(
    () => props.tabs.filter((tab) => tab.toRight)
)

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
