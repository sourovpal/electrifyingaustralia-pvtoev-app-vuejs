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
				Financed provider
			</p>
			<div class="col-md-8">
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Select a financier
					</button>
					<div
						class="dropdown-menu"
						aria-labelledby="dropdownMenuButton"
					>
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#"
							>Another action</a
						>
						<a class="dropdown-item" href="#"
							>Something else here</a
						>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Term</p>
			<div class="col-md-8">
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Select a term
					</button>
					<div
						class="dropdown-menu"
						aria-labelledby="dropdownMenuButton"
					>
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#"
							>Another action</a
						>
						<a class="dropdown-item" href="#"
							>Something else here</a
						>
					</div>
				</div>
				<small class="text-muted fs-12px"
					>How long will the loan take to pay off?</small
				>
			</div>
		</div>

		<hr>

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Rate</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
				<p class="mb-0 fs-12px">Interest rate per annum</p>
			</div>
		</div>

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Other fees</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
			</div>
		</div>

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Est. monthly repayments</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
			</div>
		</div>

        <div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Include in proposal?</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
                    <svg class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
				</div>
                

				<small class="text-muted fs-12px">Pylon is not a financial adviser. <span>Read more</span></small>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
