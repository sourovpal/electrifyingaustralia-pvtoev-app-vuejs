<script setup></script>

<template>
	<div class="content-body">
		<div class="header d-flex align-items-center gap-2 mb-3">
			<p class="mb-0 lead text-black fw-bold fs-18px">Share history</p>
		</div>

		<div class="row g-0">
			<div class="col-md-8 --p-2 rounded">
				<div class="info-card active-info-card p-2 d-flex rounded gap-2 mb-3" style="width: 98%;">
					<div class="icon-wrapper">
						<svg
							data-v-289205c8=""
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 0 24 24"
							width="24px"
							fill="#3ebd93"
							class="signature-details__icon"
						>
							<path
								data-v-289205c8=""
								d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"
							></path>
							<path
								data-v-289205c8=""
								d="M0 0h24v24H0z"
								fill="none"
							></path>
						</svg>
					</div>
					<div class="d-flex flex-column">
					    <small class="text-black fw-bold">Signed 25 Jun 2:07PM</small>
					    <small>William Lewis</small>
					    <small>wsclewis@gmail.com</small>

                        <span class="d-flex align-items-center mt-2">
						    <small class="text-primary fw-bold me-3">Download signed PDf</small>
						    <font-awesome-icon
						        class="text-primary fs-12px"
						        icon="fas fa-download"
						    />
                        </span>
					</div>
				</div>

                <div class="info-card p-2 d-flex rounded gap-2" style="width: 98%;">
					<div class="icon-wrapper">
					    <font-awesome-icon
					        class="text-secondary fs-20px"
					        icon="fas fa-file-lines"
					    />
					</div>
					<div class="d-flex flex-column">
			            <p style="margin-bottom: 0.5rem;" class="text-black fw-bold">$9,500</p>
			            <p>10.45kW Solar system</p>
			            <small>Jinko Solar Tiger Neo × 22</small>
			            <small> GE GEP Single-phase GEP8.5-1-10 (9.35kW) × 1 </small>
					</div>
				</div>
			</div>
			<div class="col-md-4">second column</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.info-card {
    border: 1px solid rgb(203, 210, 217);
    background-color: #f5f7fa;

    &.active-info-card {
        border: 1px solid #3ebd93;
        background-color: #ffffff;
    }
}
</style>
