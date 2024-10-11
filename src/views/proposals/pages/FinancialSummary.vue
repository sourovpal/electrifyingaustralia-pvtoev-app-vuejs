<template>
	<Page>
	    <h3 class="text-black fw-bold heading">
	        25 year financial summary
	    </h3>

	    <div class="row mt-5 text-black">
	        <div class="first-column col-6">
	            <p class="mb-3 fs-10px lh-sm">
                    Your historical electricity bills were used to help size your solar system.
                    Based upon the system size suggested, the expected electricity bill savings over a 25 year period are provided below. 
	            </p>

	        </div>

	        <div class="second-column col-6">
	            <p class="mb-3 fs-10px lh-sm">
                    Your historical electricity bills were used to help size your solar system.
                    Based upon the system size suggested, the expected electricity bill savings over a 25 year period are provided below. 
	            </p>

	        </div>
	    </div>

	    <div class="summary-card-display">
	        <div class="summary-card card text-white p-4">
                <p class="fs-24px mb-0 fw-bold">${{ Formatter.toIntlFormat(projectStore.getNetPresentValue) }}</p> 
                <p class="fs-20px mb-2">Net present value of investment</p> 

                <p class="mt-3 fs-11px lh-sm">
                    The Net Present Value (NPV) is the present day value of all future cash inflows minus the outflows.
                    Since money is worth more in the present day than in the future, all future cashflows need to be discounted by inflation.
                    A positive NPV indicates a good investment.
                </p> 
	        </div>

	        <div class="summary-card card text-white p-4">
                <p class="fs-24px mb-0 fw-bold">{{ Formatter.toIntlFormat(projectStore.getReturnOfInvestment) }}%</p> 
                <p class="fs-20px mb-2">Total return on investment</p> 

                <p class="mt-3 fs-11px lh-sm">
                    The Return on Investment (ROI) is another measure of the efficiency of your solar investment.
                    Imagine you invested $100.00 today and received $300.00 in return.
                    The ROI would be 200%. 
                </p> 
	        </div>

	        <div class="summary-card card text-white p-4">
                <p class="fs-24px mb-0 fw-bold">{{ projectStore.getDiscountedPayback }} years</p> 
                <p class="fs-20px mb-2"> Discounted payback period<sub>4</sub> </p> 

                <p class="mt-3 fs-11px lh-sm">
                    Similarly, the Discounted Payback Period also accounts for all discounted future cashflows.
                    The resulting period will typically be longer than a "simple payback period" calculation. 
                </p> 
	        </div>
	    </div>
	    <div class="quote-wrapper bg-white border shadow mt-5">
	        <div class="heart-icon-wrapper">
                <font-awesome-icon
					class="text-white fs-24px"
					icon="fas fa-heart"
				/>
	        </div>

	        <div class="quote text-end">
                <p class="mb-0 text-black">
                    “Energy-efficient homes can sell for as much as 10 per cent more” <br>
                    <i>— Dr Daniel Daly</i> <br>
                    <a class="text-info" href="#">Read more »</a>
                </p>
                <p class="mb-0"></p>
                <span class="text-info"></span>
	        </div>
	    </div>
	</Page>

</template>

<script setup>
import Formatter from '../../../helpers/Formatter';
import { useProjectStore } from '../../../stores/project';
import Page from './Page.vue'

const projectStore = useProjectStore();


</script>

<style lang="scss" scoped>

.heading { margin-top: 5rem; }
.summary-card { background: #007ee5; }

.quote-wrapper {
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
}

.heart-icon-wrapper {
    background: #007ee5;
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}

.summary-card-display {
    display: grid;
    grid-gap: 1rem;

    grid-template: {
        columns: 1fr 1fr;
        row: 5rem 5rem;
    }

    .summary-card:nth-child(3) {
        grid-column: {
            start: 1;
            end: 3;
        }
    }
}

</style>
