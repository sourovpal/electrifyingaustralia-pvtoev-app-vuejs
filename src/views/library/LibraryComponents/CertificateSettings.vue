<script setup>
import CustomCheckbox from '../../../components/forms/CustomCheckbox.vue'

</script>

<template>
	<div class="pb-2">
		<div class="row mb-3 align-items-center">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">
				RET certificate type
			</p>
			<div class="col-md-8">
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
				        data-mdb-toggle="dropdown"
						aria-expanded="false"
					>
						Automatic (STCs)
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-caret-down"
				        />
					</button>
					<div
						class="dropdown-menu border"
						aria-labelledby="dropdownMenuButton"
					>
						<a class="dropdown-item" href="#">Automatic</a>
						<a class="dropdown-item" href="#">Force STCs for this design</a>
						<a class="dropdown-item" href="#" >Force LGCs for this design</a>
						<a class="dropdown-item" href="#" >No certificates</a>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">LGC price</p>
			<div class="col-md-8">
				<p class="fs-14px mb-1 text-black">$0.00</p>
				<p class="fs-12px"> Excluding GST </p>
			</div>
		</div>

        <div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary">
				STC price
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$27,990.00</p>
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-pen"
					/>
				</div>
				<p class="fs-12px text-secondary">
				    Excluding GST
				</p>
			</div>
		</div>

        <div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Customer keeps STCs</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
                    <CustomCheckbox />
				</div>
			</div>
		</div>

		<hr />

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">
				Deposit amount
			</p>
			<div class="col-md-8 d-flex align-items-center justify-content-between" style="padding-right: 2.5rem;">
                <div>
                    <div class="btn-group me-3 mb-2">
                        <button class="btn btn-light btn-sm">No deposit</button>
                        <button class="btn btn-primary btn-sm px-2">Percentage</button>
                        <button class="btn btn-light btn-sm px-2">Fixed amount</button>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
					    <p class="fs-14px mb-0">10%</p>
					    <font-awesome-icon
					        class="text-secondary fs-14px"
					        icon="fas fa-pen"
					    />
				    </div>
					<small class="fs-12px">This percentage of total price</small>
                </div>

                <div class="reset d-flex align-items-center gap-2">
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-arrow-rotate-right"
					/>
					<p class="mb-0 fs-14px">Reset</p>
                </div>
			</div>
		</div>

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Customer is GST registered</p>
			<div class="col-md-8">
			    <CustomCheckbox />
			</div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Component line items</p>
			<div class="col-md-8">
			    <CustomCheckbox :active="true" />
			</div>
		</div>
		<hr>
		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Tax rate</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">GST 10.00%</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
