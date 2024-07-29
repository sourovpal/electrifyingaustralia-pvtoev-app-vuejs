<script setup>
import { useTabs } from './useTabs';

const emit = defineEmits(['tab-click', 'close']);

const {
    tabs,
    activeTab,
    handleTabClick,
    handleShareBtnClick
} = useTabs(emit);

</script>

<template>
    <div class="px-4 pt-4">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-1">
                <button class="share-modal-back-btn rounded-circle btn btn-light">
                    <font-awesome-icon
                        @click="emit('close')"
                        class="fs-18px" 
                        icon="fa-solid fa-arrow-right" 
                        style="transform: scaleX(-1);" 
                    />
                </button>
                <p class="fw-bold fs-22px mb-0">Share</p>
            </div>

            <div class="calls-to-action d-flex align-items-center justify-content-between gap-4">
			    <font-awesome-icon
			        @click="handleShareBtnClick"
				    icon="fas fa-clock-rotate-left"
                    class="fs-20px cursor-pointer"
			    />

                <div class="dropdown d-md-none">
				    <button
                        class="cursor-pointer btn btn-light"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
				    >
                        <font-awesome-icon icon="fas fa-ellipsis-vertical"/>
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                            <a class="dropdown-item fs-14px" href="#">
					            <font-awesome-icon icon="fas fa-up-right-from-square" />
                                <span class="ms-2">Web proposal</span>
                            </a>
                        </li>

                        <li>
                            <a class="dropdown-item fs-14px" href="#">
					            <font-awesome-icon icon="fas fa-up-right-from-square" />
                                <span class="ms-2">Comparison page</span>
                            </a>
                        </li>

                        <li>
                            <a class="dropdown-item fs-14px" href="#">
					            <font-awesome-icon icon="fas fa-download" />
                                <span class="ms-2">Download PDF</span>
                            </a>
                        </li>
                    </ul>
			    </div>
            </div>
        </div>

        <div class="tab-bar d-flex flex-wrap align-items-center gap-3 mt-4">
            <button
				v-for="tab in tabs"
				@click="handleTabClick(tab.name)"
                :class="`btn rounded btn-sm fs-12px ${activeTab === tab.name ? 'btn-dark' : 'rounded border'}`"
            >{{ tab.label }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.share-modal-back-btn {
    $btn-dimension: 2rem;

    display: grid;
    place-items: center;
    border: none;
    padding: 0;
    width: $btn-dimension;
    height: $btn-dimension;
}
</style>
