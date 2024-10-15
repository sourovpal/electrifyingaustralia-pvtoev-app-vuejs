<template>
    <div class="menu">
        <div class="text-black custom-badge shadow">
			<div class="inner-circle">
			    <font-awesome-icon icon="fas fa-check" />
			</div>
            <p class="fw-bold mb-0">Approved seller</p>
        </div>

        <div class="info-bg shadow rounded">
            <div class="menu-heading lh-sm mb-3">
                <p class="mb-0 text-secondary fs-14px"> Electrifying Australia </p>
                <p class="fw-bold fs-20px mb-0">System summary</p>
            </div>

            <p class="mb-0 fs-14px d-flex justify-content-between">
                <span>Subtotal <template v-if="activeTaxSlug !== 'no-tax'">{{activeTaxSlug === 'included' ? 'incl.' : 'excl.'}} GST</template> </span>
                <span class="text-end">$ {{ Formatter.toIntlFormat(total) }} </span>
            </p>

            <p class="mb-0 fs-14px d-flex justify-content-between" v-if="activeTaxSlug !== 'no-tax'">
                <span> {{ activeTaxSlug === 'included' ? 'Included' : '' }} GST </span>
                <span class="text-end">$ {{ Formatter.toIntlFormat(gst) }}</span>
            </p>

            <hr>

            <p class="text-black fw-bold lead mb-0 d-flex justify-content-between">
                <span>Total</span>
                <span class="text-end">$ {{ Formatter.toIntlFormat(totalAmountAfterStcDiscount) }}</span>
            </p>

            <p class="mb-0 fs-14px">Total incl. GST</p>

            <button class="text-uppercase btn btn-success w-100 p-2 fw-bold fs-18px mt-3" @click="handleAcceptClick">
                Accept & Sign
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Formatter from '../../helpers/Formatter';
import usePricingCalculations from '../library/LibraryComponents/composables/usePricingCalculations';
import { useProjectStore } from '../../stores/project';

const projectStore = useProjectStore();
const activeTaxSlug = computed(() => projectStore.getTaxType);
const pricings = computed(() => projectStore.getPricings);

const emit = defineEmits(['print']);
const handleAcceptClick = () => emit('print');

const {
    total,
    gst,
    totalAmountAfterStcDiscount
} = usePricingCalculations(pricings, activeTaxSlug);

</script>

<style lang="scss" scoped>
.info-bg {
    padding: 1rem;
    padding-top: 4rem;
    width: 18rem;
    transform: translateY(-15%);
    background: #ffffff;
    border: 1px solid #dddddd;
}

.custom-badge {
    $dimension: 5.5rem;

    z-index: 99;
    background-color: #00b8f1;
    width: $dimension;
    height: $dimension;
    border: 1px solid #000000;
    border-radius: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 50%;
    transform: translate(-50%);

    &::before {
        content: '';
        display: block;
        border-radius: 50%;
        border: 3px solid #ffffff;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .inner-circle {
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
        background-color: #ffffff;
        display: grid;
        place-items: center;
        margin-bottom: 0.45rem;
    }

    p {
        font-size: 0.95rem;
        line-height: 1rem;
    }
}

</style>
