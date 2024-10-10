<template>
    <div class="p-4">
        <div class="header d-flex align-items-center gap-2">
            <p class="mb-0 lead text-black fw-bold fs-18px">Select a design to install</p>
        </div>

        <div class="project-list-wrapper mt-3 mb-5 content content-y-100vh" style="height: 40rem !important;">
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
        <div class="content-footer d-flex justify-content-end">
            <button class="btn btn-primary fw-bold rounded shadow">Create Job Sheet</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
