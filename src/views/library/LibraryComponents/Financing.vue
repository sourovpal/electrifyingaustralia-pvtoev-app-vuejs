<template>
	<div>
		<div class="row align-items-center mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Total amount
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$27,990.00</p>
					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-pen"
					/>
					<p class="text-info mb-0 fs-12px fw-bold">
						Use project total price
					</p>
				</div>
				<p class="fs-12px">
					What is the total cash amount of the project? Incl. GST
				</p>
			</div>
		</div>

		<div class="row align-items-center">
			<p class="text-end fs-14px col-md-4 text-secondary">Deposit</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-pen"
					/>
					<p class="text-info mb-0 fs-12px fw-bold">
						Use project total price
					</p>
				</div>
				<p class="fs-12px">
					How much does the customer need to finance?
				</p>
			</div>
		</div>

		<div class="row align-items-center">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Financed Amount
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">$27,990.00</p>
				</div>
				<p class="fs-12px">
					How much does the customer need to finance?
				</p>
			</div>
		</div>
		<hr />
		<div class="row align-items-center mb-3">
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
		<div class="row align-items-center">
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
		<div class="row align-items-center mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Rate</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
				<p class="mb-0 fs-12px">Interest rate per annum</p>
			</div>
		</div>

		<div class="row align-items-center mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Other fees</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
			</div>
		</div>

		<div class="row align-items-center mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Est. monthly repayments</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">-</p>
				</div>
			</div>
		</div>

        <div class="row align-items-center">
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

<script setup></script>

<style lang="scss" scoped></style>
