<script setup>
import {onMounted, ref} from 'vue'
import { useTabs } from './useTabs';

const emit = defineEmits('tab-click')

const {
    tabs,
    activeTab,
    handleTabClick,
    handleShareBtnClick
} = useTabs(emit);

const comparisonInputValue = ref(
	'https://app.getpylon.com/proposals/JUf91oOcWd'
)
const webProposalValue = ref('https://app.getpylon.com/proposals/JUf91oOcWd')
</script>

<template>
	<div class="sidebar py-4 col-md-3" style="background-color: #f5f7fa;">
	<!-- <div class="sidebar py-4 col-md-3" style="background-color: #bada55"> -->
		<div class="tabs border-bottom mb-4">
			<ul class="list-unstyled">
				<li
					v-for="tab in tabs"
					:class="`py-3 tab cursor-pointer ${activeTab === tab.name ? 'active-tab' : ''} text-black fw-bold ps-4`"
					@click="handleTabClick(tab.name)"
				>
					{{ tab.label }}
				</li>
			</ul>
		</div>

		<div class="share-history-wrapper d-flex flex-column">
			<div 
			    @click="handleShareBtnClick" 
			    :class="`heading d-flex tab ${ activeTab === 'share-history' ? 'active-tab' : '' } px-4 py-3 align-items-center gap-2`"
			    style="margin-bottom: 15rem;"
			>
				<font-awesome-icon
					icon="fas fa-clock-rotate-left"
				/>
				<p class="mb-0 fw-bold cursor-pointer text-black">Share history</p>
			</div>
			<div class="px-4">
				<div class="link-input-wrapper mb-4">
					<label
						for="web-proposal-input"
						class="d-flex align-items-center gap-2"
					>
						<p class="mb-0 fw-bold text-black">
							Web proposal
						</p>
						<font-awesome-icon
							class="text-secondary"
							icon="fas fa-circle-question"
						/>
					</label>

					<div class="link-input position-relative">
						<input
							v-model="webProposalValue"
							id="web-proposal-input"
							type="text"
							class="border rounded"
						/>
						<div
							class="input-control d-flex align-items-center --gap-3 position-absolute"
						>
							<button class="btn btn-light btn-floating">
								<font-awesome-icon
									icon="fas fa-up-right-from-square"
									class="text-secondary cursor-pointer"
								/>
							</button>

							<button class="btn btn-light btn-floating">
								<font-awesome-icon
									class="text-secondary cursor-pointer"
									icon="fas fa-copy"
								/>
							</button>
						</div>
					</div>
				</div>

				<div class="link-input-wrapper mb-4">
					<label
						for="comparison-page-input"
						class="d-flex align-items-center gap-2"
					>
						<p class="mb-0 fw-bold text-black">
							Comparison page
						</p>
					</label>

					<!--       <div class="link-input position-relative"> -->
					<!--           <input v-model="comparisonInputValue" id="comparison-page-input" type="text" class="border rounded" /> -->
					<!--           <div class="input-control d-flex align-items-center --gap-3 position-absolute"> -->
					<!--               <button class="btn btn-light btn-floating"> -->
					<!--                <font-awesome-icon -->
					<!--                icon="fas fa-up-right-from-square"  -->
					<!-- class="text-secondary cursor-pointer" -->
					<!--                /> -->
					<!--               </button> -->
					<!---->
					<!--               <button class="btn btn-light btn-floating"> -->
					<!--                <font-awesome-icon -->
					<!--                class="text-secondary cursor-pointer" -->
					<!--                icon="fas fa-copy" -->
					<!--                /> -->
					<!--               </button> -->
					<!--           </div> -->
					<!--       </div> -->
					<div
						class="bg-white border rounded"
						style="padding: 0.75rem"
					>
						<p
							class="text-secondary lh-sm fs-12px mb-0 fst-italic"
						>
							Please mark 2 or more designs as comparable
							to view the comparison page
						</p>
					</div>
				</div>

				<div class="pdf-download-wrapper">
					<div class="d-flex align-items-center gap-2">
						<p class="mb-0 fw-bold text-black">Download</p>
						<font-awesome-icon
							class="text-secondary"
							icon="fas fa-circle-question"
						/>
					</div>
					<button
						class="btn btn-outline-primary text-center rounded w-100"
					>
						<span class="text-primary fw-bold me-3"
							>Download</span
						>
						<font-awesome-icon
							class="text-primary"
							icon="fas fa-download"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tab {
	border-left: 3px solid #f5f7fa;

	&.active-tab {
		background-color: #e5f4ff;
		border-left: 3px solid #007ee5;
	}
}

</style>
