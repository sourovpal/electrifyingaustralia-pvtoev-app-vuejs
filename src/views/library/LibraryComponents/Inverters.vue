<template>
    <div class="overflow-x-hidden">
 	    <div class="row align-items-baseline border-bottom py-3 px-4">
		    <p class="text-end fs-14px col-md-4 mb-0 text-secondary">Add an inverter</p>
		    <div class="col-md-8">
                <input class="form-control" placeholder="Search for inverter models" />
		    </div>
	    </div>
	    <div v-if="invertersInInventory" class="graphic d-flex flex-column align-items-center">
	        <img src="https://static-pylon.imgix.net/images/app/ui/empty/empty_inverter.png?auto=format" alt="">
	        <p class="text-muted mb-0">Search to add an inverter</p>
	    </div>
	    <div class="position-relative" v-else>
			<div class="inverter-control position-absolute text-end d-inline-flex align-items-center gap-3">
		        <font-awesome-icon
			        class="fs-13px text-secondary"
			        icon="fas fa-trash"
		        />

				<font-awesome-icon
				    class="text-secondary fs-14px"
				    style="transform: rotate(-90deg);"
				    icon="fas fa-chevron-right"
				/>
			</div>
            <div class="row mt-4">
			    <p class="text-end fs-14px col-md-4 text-secondary">
				    Inverter model
			    </p>
			    <div class="col-md-8">
				    <p class="text-black fs-14px mb-0"> GE GEP10-3-10 (AS4777-2 2020) · 10,000 VA </p>
                    <small class="text-secondary fs-12px">GEP 4-20KW Three Phase Series · Three-phase · PV-only Inverter · AU</small>
			    </div>
		    </div>

            <div class="row mt-4">
			    <p class="text-end fs-14px col-md-4 text-secondary">
				    Quantity
			    </p>
			    <div class="col-md-8">
				    <div class="d-flex align-items-center gap-3">
				        <p class="text-black fs-14px mb-0">1</p>
		                <font-awesome-icon
			                class="fs-13px text-secondary"
			                icon="fas fa-pen"
		                />
				    </div>

		            <div class="info-table d-flex align-items-center" style="gap: 7rem;">
		                <div class="column-1">
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">MPPT:</span> 1
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max. input current </span> 30/15
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">DC input voltage</span> 1,100 V
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max DC power</span> 20000 W
		                    </p>
		                </div>

		                <div class="column-2">
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">AC apparent output:</span> 1
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max. input current </span> 30/15
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">DC input voltage</span> 1,100 V
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max DC power</span> 20000 W
		                    </p>
		                </div>
		            </div>
			    </div>
		    </div>

            <div class="row mt-4 position-relative">
			    <p class="text-end fs-14px col-md-4 text-secondary">
				    AC Output limit
			    </p>
			    <div class="col-md-8 d-flex align-items-center gap-3">
				    <p class="fs-14px mb-0">10,000 VA</p>
		            <font-awesome-icon
			            class="fs-12px text-secondary"
			            icon="fas fa-pen"
		            />
		            <small class="text-primary fs-12px fw-bold">Maximise AC Output</small>
			    </div>
		    </div>
	    </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

const invertersInInventory = ref(false);

</script>

<style lang="scss" scoped>
.inverter-control {
    top: 0;
    right: 2rem;
}
</style>
