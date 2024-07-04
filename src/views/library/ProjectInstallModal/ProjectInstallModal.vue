<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'

const emit = defineEmits(['close']);
const shareModal = ref(null)
let myModal = null

onMounted(() => {
	myModal = new Modal(shareModal.value, {
		keyboard: false,
		backdrop: 'static',
	})
	myModal.show()
})

onBeforeUnmount(() => {
    myModal.hide();
});

const activeTab = ref('');
const handleModalClose = () => {
    myModal.hide() 
    emit('close');
};
const handleTabClick = (tabName) => {
    activeTab.value = tabName;
}
</script>

<template>
	<div class="modal fade" tabindex="-1" ref="shareModal">
		<div class="modal-dialog modal-lg modal-dialog-centered custom-radius share-modal-dialog">
			<div class="modal-content">
				<div class="modal-body p-0 row g-0 p-4" id="modal-body">

                    <!-- To be abstracted away to another component  -->
                    <div class="header d-flex align-items-center gap-2">
                        <p class="mb-0 lead text-black fw-bold fs-18px">Select a design to install</p>
                    </div>

                    <div class="project-list-wrapper mt-3">
                        <ul class="list-unstyled">
                            <li>
                                <div class="project shadow d-flex">
                                    <img 
                                        style="width: 14.25rem; height: 8rem;"
                                        alt="Solar panel image"
                                        src="https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg" 
                                    />
                                    <div class="project-info flex-grow-1 p-3 d-flex justify-content-between">
                                        <div class="d-flex flex-column ">
                                            <p class="text-black fw-bold ">99kW</p>
                                            <p class="fw-bold mb-0 fs-14px">System</p>
                                            <small class="text-black">180xJinko Solar Tiger Pro</small>
                                            <small class="text-black">1 × GE GEP 73-136kW Three Phase Series 99990W</small>
                                        </div>

                                        <div class="d-flex flex-column justify-content-between align-items-end">
				                            <font-awesome-icon
				                                class="text-success fs-20px"
				                                icon="fas fa-check-circle"
				                            />

				                            <div class="price text-end">
				                                <small class="text-secondary">Price</small>
				                                <p class="mb-0 text-black fs-18px fw-bold"> $95,000 </p>
				                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.custom-radius {
    border-radius: 1rem;
    overflow: hidden;
}

.project {
    border: 2px solid blue;
    border-radius: 0.5rem;
    overflow: hidden;

    &-info {
        background: #e5f4ff;
    }
}

</style>
