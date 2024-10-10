<template>
	<div
	    @click="handleMenuItemClick"
		:class="`
        ${projectId.toString() === project.id.toString() ? 'active-border' : '' }
        library-menu-item
        px-4
        cursor-pointer
        border-bottom
        d-flex
        flex-column
        justify-content-between
        position-relative
        overflow-hidden
    `"
	>
		<Skeletor
			class="my-2"
			width="70%"
			v-if="isLoading"
		/>
		<p
			v-else
			class="mb-0 overflow-hidden fs-16px project-name"
		>
			{{ project.address }}
		</p>


		<Skeletor
		    class="mb-2"
		    v-if="isLoading"
            height="0.65rem"
            style="border-radius: 2rem;"
		    width="50%"
		/>
		<small v-else class="text-secondary mb-0 d-block">75.68kW TW</small>

        <Skeletor 
            height="0.65rem" 
            class="mb-2"
            v-if="isLoading" 
            style="border-radius: 2rem;" 
        />
        <template v-else>
		    <small class="text-secondary fs-12px">
			    Created at Jul 1, 2024
		    </small>
		    <div class="position-absolute item-control-wrapper">
			    <div class="item-control sold-btn">
				    <font-awesome-icon
				    class="text-secondary"
				    icon="fas fa-check"
				    />
			    </div>

			    <div class="item-control archive-btn">
				    <font-awesome-icon
				    class="text-secondary"
				    icon="fas fa-box-archive"
				    />
			    </div>
		    </div>
        </template>

	</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { Skeletor } from 'vue-skeletor'
import { useProjectStore } from '../../stores/project';

const props = defineProps(['project']);
const router = useRouter();
const projectStore = useProjectStore();

const projectId = computed(() => projectStore.getProjectId ?? '');

onMounted(() => {
	simulateApiCall()
})
const isLoading = ref(false)


const handleMenuItemClick = () => {
    router.push(`/library/proposals/${props.project.id}`); 
}

const simulateApiCall = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
	}, 1500)
}
</script>

<style lang="scss" scoped>
$item-control-wrapper-width: 2.15rem;

.active-border { border-left: 2px solid #007ee5; }
.bottom-border { border-bottom: 1px solid #999 !important; }

.item-control-wrapper {
	height: 100%;
	right: -$item-control-wrapper-width;
	transition: 250ms;

	.item-control {
		height: 50%;
		width: $item-control-wrapper-width;
		display: grid;
		place-items: center;
		cursor: pointer;
		background-color: #f1f1f1;

		&.sold-btn:hover,
		&.archive-btn:hover {
			svg { color: #ffffff !important; }
		}

		&.sold-btn:hover { background-color: #14a44d; }
		&.archive-btn:hover { background-color: #dc4c64; }
	}
}

.project-name {
	text-overflow: ellipsis;
	white-space: nowrap; // comment this for 2 lines
	text-overflow: ellipsis;
	overflow: hidden;
	// Uncomment these for 2 lines
	// display: -webkit-box;
	// -webkit-line-clamp: 2;
	// -webkit-box-orient: vertical;
	// line-height: 1.15rem;
}

.library-menu-item:hover .item-control-wrapper { right: 0; }
</style>
