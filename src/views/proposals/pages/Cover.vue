<template>
    <div class="cover-page shadow">
        <div class="logo-container">
		    <img
		        class="w-100"
		        src="https://static.getpylon.com/images/companies/75f4y39ZU4yxjAq0eqAzZxlYWKYqcVWj46tmX4Eo.png.png"
		        alt="company logo"
		    />
        </div>

        <div class="project-info-container">
            <p class="fw-bold text-black lh-sm display-5 mb-0 project-title lh-sm"> {{ projectStore.getSystemSize }}kWh System size</p>
            <p class="fs-12px text-black mt-5">
                Addressed to:<br/>
                {{projectStore?.project?.address ?? '-'}}
            </p>
        </div>

        <div class="cover-footer text-white px-5 fs-12px">
            <span class="fw-bold">Electrifying Australia (ABN: 16665322967)</span> <br>
            Email: <span class="fw-bold">jevan@electrifyingaustralia.com.au</span> 
            Website: <span class="fw-bold">http://www.electrifyingaustralia.com.au</span> 
            Mobile: <span class="fw-bold"> 0416572462 </span>  <br>
            Office: <span class="fw-bold">0411331117</span>
            Address: <span class="fw-bold">142 Gipps road Smithfield NSW 2164</span> 

        </div>
    </div>
</template>

<script setup>
import { useProjectStore } from '../../../stores/project';

const projectStore = useProjectStore();
</script>

<style lang="scss" scoped>
.cover-page {
	width: 210mm;
	height: 297mm;
	position: relative;
    background-color: #007ee5;
}

.logo-container {
    width:  20.5rem;
    padding: 1rem;
    background-color: #ffffff;
    position: absolute;
    top: 4rem;
    left: 8rem;
}

.project-info-container {
    width: 32rem;
    background-color: #ffffff;
    position: absolute;
    top: 16rem;
    left: 0;
    padding: 3rem;


    .project-title {
        width: 2rem;
    }

    .project-subtitle {
        font-size: 1.8rem;
        color: #222222;
    }
}

.cover-footer {
    margin-top: 65rem;
}

</style>
