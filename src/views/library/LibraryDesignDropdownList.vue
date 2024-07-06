<script setup>
import {VueDraggableNext} from 'vue-draggable-next'
// import { Tooltip } from 'bootstrap';
import {onMounted} from 'vue'

onMounted(() => {
	// [].slice
	//     .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	//     .map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
})
</script>

<template>
	<div class="dropdown">
		<div
			class="d-flex new-design-btn cursor-pointer align-items-center p-2 gap-5 rounded dropdown-toggle"
			id="design-list-dropdown"
			data-bs-toggle="dropdown"
			data-mdb-toggle="dropdown"
		>
			<small>7.2kW·<span class="text-secondary">$5340</span></small>
			<div class="d-flex gap-2">
				<font-awesome-icon
					class="text-success"
					icon="fas fa-circle-check"
				/>
				<font-awesome-icon
					class="text-secondary"
					icon="fas fa-caret-down"
				/>
			</div>
		</div>

		<ul
			class="dropdown-menu py-2 border content content-y-100vh"
			aria-labelledby="design-list-dropdown"
		>
			<vue-draggable-next>
				<li
					v-for="item in 20"
					class="border-bottom"
				>
					<div
						class="design-item-wrapper position-relative d-flex align-items-center justify-content-between pe-3 py-2"
					>
						<div class="handle cursor-move position-absolute">
							<font-awesome-icon
								class="text-secondary fs-14px"
								icon="fas fa-grip-vertical"
							/>
						</div>

						<div>
							<p class="mb-0 fs-16px">$4990.00</p>
							<p class="mb-0 text-black fw-bold fs-14px">
								Mid range system
							</p>

							<p class="mb-0 fs-13px text-muted">
								<span class="fw-bold text-black"
									>Jink Solar</span
								>
								Tiger Neo 475W x 14
							</p>
							<p class="mb-0 fs-13px text-muted">
								<span class="fw-bold text-black"
									>GoodWe</span
								>
								GW5K-DT x 1
							</p>
						</div>

						<div
							class="d-flex flex-column align-items-end justify-content-between"
						>
							<div class="d-flex gap-3 mb-5">
								<div
									class="hover-icons d-flex gap-3 pe-3"
								>
									<font-awesome-icon
										class="fs-17px text-danger fs-17px"
										icon="fas fa-trash"
										v-tippy="{
											content: 'Delete',
											placement: 'top',
										}"
									/>

									<font-awesome-icon
										class="fs-17px text-secondary"
										icon="fas fa-copy"
										v-tippy="{
											content: 'Duplicate design',
											placement: 'top',
										}"
									/>
								</div>

								<font-awesome-icon
									class="fs-17px text-secondary"
									v-tippy="{
										content: 'Mark as recommended design',
										placement: 'top',
									}"
									icon="fas fa-thumbs-up"
								/>

								<font-awesome-icon
									class="fs-17px text-success"
									style="transform: scaleX(-1)"
									v-tippy="{
										content: 'Remove design from comparison page',
										placement: 'top',
									}"
									icon="fas fa-arrow-right-arrow-left"
								/>

								<font-awesome-icon
									class="fs-17px text-secondary"
									v-tippy="{
										content: 'Mark as primary design ',
										placement: 'top',
									}"
									icon="fas fa-circle-check"
								/>
							</div>
							<div class="design-info d-flex gap-3">
								<div
									class="info-cell d-flex align-items-center gap-2"
								>
									<font-awesome-icon
										class="fs-12px text-secondary"
										icon="fas fa-solar-panel"
									/>
									<span>6.65kW</span>
								</div>
								<div
									class="info-cell d-flex align-items-center gap-2"
								>
									<font-awesome-icon
										class="fs-12px text-secondary"
										icon="fas fa-tablet"
									/>
									<span>5.5kW</span>
								</div>
								<div
									class="info-cell d-flex align-items-center gap-2"
								>
									<font-awesome-icon
										class="fs-12px text-secondary"
										style="
											transform: rotate(
												-90deg
											);
										"
										icon="fas fa-battery-three-quarters"
									/>
									<span>0kWh</span>
								</div>
							</div>
						</div>
					</div>
				</li>
			</vue-draggable-next>
			<li>
			    <div class="d-flex design-item-wrapper align-items-baseline gap-2 px-2 py-4">
				    <font-awesome-icon
				        class="text-muted"
				        icon="fas fa-plus"
				    />

				    <p class="mb-0 fw-bold fs-16px"> Start a new design <span class="text-secondary">(3/5)</span></p>
			    </div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
.dropdown-toggle::after {
	display: none;
}
.dropdown-menu {
	width: 36rem;
	overflow: hidden;
    inset: auto !important;
    left: auto !important;
    right: 0 !important;
    transform: none !important;

	&.content.content-y-100vh { 
	    height: 20rem !important; 
	    max-height: 50vh !important; 
	}
}

.design-item-wrapper {
	padding-left: 2rem;
	border-left: 2px solid #ffffff;

	.hover-icons {
		opacity: 0;
		border-right: 1px solid #adadad;
	}

	.handle {
		top: 0.65rem;
		left: 0.65rem;
		opacity: 0;
		cursor: grab;
	}

	&.active { border-left: 3px solid #0275d8; }

	&:hover {
		background-color: #f5f7fa;
	    border-left: 2px solid #f5f7fa;
		cursor: pointer;

	    &.active { border-left: 3px solid #0275d8; }
		.hover-icons, .handle { opacity: 1; }
	}
}
</style>
