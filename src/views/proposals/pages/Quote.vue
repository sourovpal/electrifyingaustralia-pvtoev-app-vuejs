<template>
	<Page>
		<div
			class="content-header d-flex align-items-center justify-content-between mb-5"
		>
			<h3 class="fw-bold text-black">Quote</h3>
			<img
				class="w-25"
				src="https://static.getpylon.com/images/companies/75f4y39ZU4yxjAq0eqAzZxlYWKYqcVWj46tmX4Eo.png.png"
				alt="company logo"
			/>
		</div>

		<div class="participant-details d-flex">
			<div class="sender-details w-50">
				<div class="row mb-2">
					<p class="label mb-0 fw-bold col-6">To</p>
					<div class="value col-6">
						<small class="d-block">Test Proposal</small>
						<small class="text-info d-block"
							>fahimalemroz@gmail.com</small
						>
					</div>
				</div>

				<div class="row">
					<p class="label mb-0 fw-bold col-6 ">Address</p>
					<div class="value col-6">
						{{address}}
					</div>
				</div>
			</div>

			<div class="recipient-details">
				<div class="row gx-0">
					<p class="label mb-0 fw-bold col-4">From</p>
					<div class="value col-8">
						<small class="d-block fw-bold"
							>Electrifying Australia</small
						>
						<small class="d-block">
							ABN: 16665322967 142 Gipps road Smithfield
							NSW 2164
						</small>
					</div>
				</div>
				<div class="row gx-0">
					<p class="label mb-0 fw-bold col-4">Reference #</p>
					<small class="value mb-0 col-8">
						##-0000-0129-1
					</small>
				</div>
				<div class="row gx-0">
					<p class="label mb-0 fw-bold col-4">Prepared on #</p>
					<small class="value mb-0 col-8">{{ preparedOn }}</small>
				</div>
				<div class="row gx-0">
					<p class="label mb-0 fw-bold col-4">
						Est. Install date
					</p>
					<small class="value mb-0 col-8">
						<!-- 2023-06-30 16:16:37 -->
						-
					</small>
				</div>
				<div class="row gx-0">
					<p class="label mb-0 fw-bold col-4">Expiry date</p>
					<small class="value mb-0 col-8"> - </small>
				</div>
			</div>
		</div>

		<div class="project-items-display mt-5">
			<!-- header -->
			<div class="header row gx-0 text-black fw-bold py-2 mb-2">
				<p class="mb-0 col-8">Description</p>
				<p class="mb-0 col-1">Quantity</p>
				<p class="mb-0 col-1">Price</p>
				<p class="mb-0 col-2 text-end">Total</p>
			</div>

			<div class="row project-item gx-0 py-1" v-for="pricing in pricings">
				<p class="mb-0 col-8"> {{ pricing.description }} </p>
				<p class="mb-0 col-1"> {{ pricing.quantity ?? '-' }} </p>
				<p class="mb-0 col-1"> {{ pricing.unit_price ? '$ ' + Formatter.toIntlFormat(pricing.unit_price) : '-' }} </p>
				<p class="mb-0 col-2 text-end"> {{ pricing.total ? '$ ' + Formatter.toIntlFormat(pricing.total) : '-' }} </p>
			</div>

			<div class="row project-summary gx-0 py-1 mt-3 text-black fs-11px">
				<div class="col-3 mb-2 offset-9 row gx-0 align-items-center">
					<span class="col-8 fs-10px">Subtotal 
			            <template v-if="activeTaxSlug !== 'no-tax'">
			                {{activeTaxSlug === 'included' ? 'incl.GST' : 'excl.GST'}}
			            </template>
					</span>
					<span class="col-4 text-end">$ {{ Formatter.toIntlFormat(total) }}</span>
				</div>

				<div
					class="col-3 gst-figure-wrapper mb-2 offset-9 row gx-0 align-items-center"
                    v-if="activeTaxSlug !== 'no-tax'"
				>
					<span class="col-8" :key="activeTaxSlug">
			            {{ activeTaxSlug === 'included' ? 'Included GST' : 'Excluded GST' }}
			        </span>
					<span class="col-4 text-end">
					    $ {{ Formatter.toIntlFormat(gst) }}
					</span>
				</div>

				<div
					class="col-3 total-figure-wrapper mb-2 fw-bold offset-9 row gx-0 align-items-center"
				>
					<span class="col-8">Total incl. GST</span>
					<span class="col-4 text-end">
					    $ {{ Formatter.toIntlFormat(totalAmountAfterStcDiscount) }}
					</span>
				</div>
			</div>
		</div>

		<div class="acceptance-wrapper fs-12px text-black row mb-5">
			<p class="mb-0 fw-bold col-2">
				Acceptance <br />
				-
			</p>
			<p class="mb-0 col-10">
				Please sign and return to Electrifying Australia. Be sure to
				keep a copy for your own records. A 10% ($1,000.00) deposit
				is required to initiate the process. Final payments are to
				be made upon full completion of installation.
				<strong>Offer valid until 7th Aug 2024</strong>
			</p>
		</div>

		<div class="payment-wrapper fs-12px text-black row">
			<p class="mb-0 fw-bold col-2">
				Payment <br />
				-
			</p>
			<div class="col-10 row">
				<p class="mb-0 col-8">
					BSB: 062692<br />
					Account no. 75036426<br />
					Electrifying Australia<br />
					Commomwealth Bank<br />
					Reference #: ##-0000-0129-1 <br />
				</p>

				<div class="col-4">
					<p class="fw-bold mb-5 fs-14px signatory ps-2">
						Client name
					</p>
					<p class="fw-bold mb-0 fs-14px signatory ps-2">
						Client Signature
					</p>
				</div>
			</div>
		</div>
	</Page>
</template>

<script setup>
import Formatter from '../../../helpers/Formatter'
import { computed } from 'vue';
import { useProjectStore } from '../../../stores/project';
import Page from './Page.vue'
import usePricingCalculations from '../../library/LibraryComponents/composables/usePricingCalculations';

const projectStore = useProjectStore();
const pricings = computed(() => projectStore.getPricings);
const activeTaxSlug = computed(() => projectStore.getTaxType);
const address = computed(() => projectStore.project?.address)
const preparedOn = computed(() => projectStore.project?.prepared_on)

const {
    total,
    gst,
    totalAmountAfterStcDiscount
} = usePricingCalculations(pricings, activeTaxSlug);

</script>

<style lang="scss" scoped></style>
