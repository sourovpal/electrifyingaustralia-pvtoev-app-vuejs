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
				<font-awesome-icon class="text-success" icon="fas fa-circle-check"/>
				<font-awesome-icon
				class="text-secondary"
				icon="fas fa-caret-down"
				/>
			</div>
		</div>

        <ul class="dropdown-menu py-2 border" aria-labelledby="design-list-dropdown">
            <li v-for="item in 10" class="border-bottom">
                <div class="design-item-wrapper d-flex align-items-center justify-content-between px-3 py-2">
                    <div>
                        <p class="mb-0 fs-16px">$4990.00</p>
                        <p class="mb-0 text-black fw-bold fs-14px">Mid range system</p>

                        <p class="mb-0 fs-13px text-muted"> <span class="fw-bold text-black">Jink Solar</span> Tiger Neo 475W x 14 </p>
                        <p class="mb-0 fs-13px text-muted"> <span class="fw-bold text-black">GoodWe</span> GW5K-DT x 1 </p>
                        <!-- <p class="mb-0 fs-13px"> GoodWe <span>GW5K-DT x 1</span> </p> -->
                    </div>

                    <div class="d-flex flex-column align-items-end justify-content-between">
                        <div class="d-flex gap-3 mb-5">
						    <div class="hover-icons d-flex gap-3 pe-3">
					            <font-awesome-icon
						            class="fs-17px text-danger fs-17px"
						            icon="fas fa-trash"
					            />

						        <font-awesome-icon
						            class="fs-17px text-secondary"
						            icon="fas fa-copy"
						        />
						    </div>

				            <font-awesome-icon
						        class="fs-17px text-secondary"
				                icon="fas fa-thumbs-up" 
				            />

						    <font-awesome-icon
						        class="fs-17px text-success"
						        style="transform: scaleX(-1);"
						        icon="fas fa-arrow-right-arrow-left"
						    />

				            <font-awesome-icon
				                class="fs-17px text-secondary" 
				                icon="fas fa-circle-check"
				            />
                        </div>
                        <div class="design-info d-flex gap-3">
                            <div class="info-cell d-flex align-items-center gap-2">
				                <font-awesome-icon
						            class="fs-12px text-secondary"
				                    icon="fas fa-solar-panel" 
				                />
				                <span>6.65kW</span>
                            </div>
                            <div class="info-cell d-flex align-items-center gap-2">
				                <font-awesome-icon
						            class="fs-12px text-secondary"
				                    icon="fas fa-solar-panel" 
				                />
				                <span>5.5kW</span>
                            </div>
                            <div class="info-cell d-flex align-items-center gap-2">
				                <font-awesome-icon
						            class="fs-12px text-secondary"
						        style="transform: rotate(-90deg);"
				                    icon="fas fa-battery-three-quarters" 
				                />
				                <span>0kWh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.dropdown-menu {
    width: 36rem;
}

.design-item-wrapper {
    .hover-icons {
        opacity: 0;
        border-right: 1px solid #adadad;
    }

    &:hover {
        background-color: #f5f7fa;
        cursor: pointer;

        .hover-icons {
            opacity: 1;
        }
    } 
}


</style>
