<template>
	<Page>
	    <div class="row first-row">
            <!-- First column -->
	        <div class="first-column col-4">
	            <p class="lead mb-0 fw-bold text-black">
	                Assumed values <br>
	                -
	            </p>
	        </div>

            <!-- Second column -->
	        <div class="second-column col-4 fs-14px">
                <div class="mb-3">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-black pe-2">DC Array Power</th>
                                <th class="text-black pe-2">Tilt</th>
                                <th class="text-black pe-2">Azimuth</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <!-- <td class="small">7.48kW</td> -->
                                <!-- <td class="small">20°</td> -->
                                <!-- <td class="small"> 98° </td> -->

                                <td class="small">-</td>
                                <td class="small">-</td>
                                <td class="small">-</td>
                            </tr>
                        </tbody>
                    </table>
                    <small> Azimuth measured clockwise from North </small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">System efficiency <sub>2</sub></p>
                    <small>{{ systemEfficiency }}</small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">AC System size</p>
                    <small>?</small>
                </div>

                <div v-if="exportLimit">
                    <p class="fw-bold mb-0 text-black">Export limit</p>
                    <small> {{ exportLimit }} kW <span class="text-secondary">(non-simulated)</span></small>
                </div>

	        </div>

            <!-- Third column -->
	        <div class="third-column col-4 fs-14px">
                <div>
                    <p class="fw-bold mb-0 text-black">Quarterly electricity bills</p>
                    <small>$ {{ Formatter.toIntlFormat(quarterlyAmount)}}</small>
                </div>

                <!-- <div> -->
                <!--     <p class="fw-bold mb-0 text-black">Utility rate inflation</p> -->
                <!--     <small>3.79% per annum</small> -->
                <!-- </div> -->

                <div>
                    <p class="fw-bold mb-0 text-black">Self consumption rate</p>
                    <small>{{selfConsumption}}%</small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">Daily supply charge</p>
                    <small>$ {{dailySupplyCharge}}</small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">Current electricity price</p>
                    <small>$ {{currentElectricityRate}}</small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">Feed in tariff</p>
                    <small>$ {{feedInTariff}}</small>
                </div>
	        </div>
	    </div>

        <div class="row second-row fs-14px">
            <div class="first-column pt-3 mt-5 col-4 offset-4 gx-0">
                <div>
                    <p class="fw-bold mb-0 text-black">System lifetime</p>
                    <small> {{ systemLifetime }} year{{systemLifetime > 1 ? 's' : ''}}</small>
                </div>

                <div>
                    <p class="fw-bold mb-0 text-black">Inflation rate</p>
                    <small>{{ inflationRate }}% per annum</small>
                </div>
            </div>

            <div class="second-column pt-3 mt-5 col-4">
                <div class="lh-sm">
                    <p class="fw-bold mb-0 text-black">PV degradation</p>
                    <small>Jinko Solar Tiger Neo Bold</small>
                    <small class="text-secondary">JKM440N-54HL4R-BDV</small>
                    <small>99% for the first year</small>
                    <small>-0.4% per year to year 30</small>
                </div>

                <div class="text-black">
                    <p class="fw-bold mb-0">Estimated DC shading loss</p>
                    <table class="w-100">
                        <tbody>
                            <tr>
                                <th class="small">Jan
                                </th><td class="small">0%</td>
                                <th class="small">Feb
                                </th><td class="small">0%</td>
                            </tr>
                            <tr>
                                <th class="small">Mar
                                </th><td class="small">0%</td>
                                <th class="small">Apr
                                </th><td class="small">0.9%</td>
                            </tr>
                            <tr>
                                <th class="small">May
                                </th><td class="small">8.5%</td>
                                <th class="small">Jun
                                </th><td class="small">21.3%</td>
                            </tr>
                            <tr>
                                <th class="small">Jul
                                </th><td class="small">18.4%</td>
                                <th class="small">Aug
                                </th><td class="small">4.4%</td>
                            </tr>
                            <tr>
                                <th class="small">Sep
                                </th><td class="small">0%</td>
                                <th class="small">Oct
                                </th><td class="small">0%</td>
                            </tr>
                            <tr>
                                <th class="small">Nov
                                </th><td class="small">0%</td>
                                <th class="small">Dec
                                </th><td class="small">0%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- <div class="second-column pt-3 mt-5 col-4 offset-4 gx-0"> -->
            <!--     <div> -->
            <!--         <p class="fw-bold mb-0 text-black">Nominal storage capacity</p> -->
            <!--         <small>13.5 kWh</small> -->
            <!--     </div> -->
            <!---->
            <!--     <div> -->
            <!--         <p class="fw-bold mb-0 text-black">Maximum depth of discharge</p> -->
            <!--         <small>2.1% per annum</small> -->
            <!--     </div> -->
            <!---->
            <!--     <div> -->
            <!--         <p class="fw-bold mb-0 text-black">Power</p> -->
            <!--         <small>7kW peak / 5kW continuous</small> -->
            <!--     </div> -->
            <!---->
            <!--     <div> -->
            <!--         <p class="fw-bold mb-0 text-black"> Round trip efficiency </p> -->
            <!--         <small>90%</small> -->
            <!--     </div> -->
            <!-- </div> -->
        </div>
	</Page>
</template>

<script setup>
import { computed } from 'vue';
import Page from './Page.vue'
import { useProjectStore } from '../../../stores/project';
import Formatter from '../../../helpers/Formatter';

const projectStore = useProjectStore();
const systemEfficiency = computed(() => projectStore.getCustomSettings?.system_efficiency ? projectStore.getCustomSettings?.system_efficiency + '%' : '-')

const exportLimit = computed(() => projectStore?.project?.export_limit_in_kw);
const selfConsumption = computed(() => projectStore?.project?.load_profile?.self_consumption_rate);

const quarterlyAmount = computed(() => projectStore?.getCurrentBills?.total_amount);
const dailySupplyCharge = computed(() => projectStore?.getCurrentBills?.daily_supply_charge);
const currentElectricityRate = computed(() => projectStore?.getCurrentBills?.electricity_charge_per_kwh);
const feedInTariff = computed(() => projectStore?.getCurrentBills?.tariff_feed_per_kwh);

const systemLifetime = computed(() => projectStore?.getTermSettings?.term_in_years);
const inflationRate = computed(() => projectStore?.getTermSettings?.inflation_rate);

</script>

<style lang="scss" scoped>
.first-row .second-column > div,
.first-row .third-column > div,
.second-row .first-column > div,
.second-row .second-column > div 
{
    margin-bottom: 1rem;
    line-height: 1rem;
}

.second-row .first-column,
.second-row .second-column {
    border-top: 1px solid #000000;
}

</style>
