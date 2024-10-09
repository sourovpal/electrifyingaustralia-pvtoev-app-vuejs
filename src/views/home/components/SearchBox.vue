<script setup>
import { ref, watchEffect, watch } from "vue";
import { onClickOutside } from '@vueuse/core'
import axios from "axios";

const accessToken = ref(
  "pk.eyJ1IjoiZGFuaWVsLXB5bG9uIiwiYSI6ImNqMGx6c3hjbDAwMjczM3A5aWx6aHhmM3MifQ.cA-6ahyjexJyGrc4xpCO8w"
);
const toggleSearchbox = ref(false);
const searchResult = ref([]);
const searchBoxRef = ref(null);
// const searchLocation = ref([]);

async function searchLocation(event) {
  const res = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${accessToken.value}&proximity=90.4093,23.7272&types=address,locality,postcode&limit=5&language=en`
  );
  const { features } = res.data;
  if (Array.isArray(features)) {
    searchResult.value = features;
  }
}

onClickOutside(searchBoxRef, ()=>{
    toggleSearchbox.value = false;
})

</script>
<template>
  <div class="row d-none d-md-flex">
    <div class="col-lg-7 mx-auto position-relative">
      <div class="search-row">
        <div
          ref="searchBoxRef"
          class="search-area pb-0"
          :class="{ show: toggleSearchbox }"
        >
          <div class="search-box">
            <input
              @input="searchLocation"
              @focus="toggleSearchbox = true"
              class="form-control form-control-lg"
              type="text"
              placeholder="Search for an address or existing projects"
            />
            <button class="search-icon">
              <font-awesome-icon
                class="fs-16px text-soft"
                icon="fa-solid fa-magnifying-glass-location"
              ></font-awesome-icon>
            </button>
          </div>
          <div @click.stop="" class="search-output" style="overflow: auto; height: 67vh">
            <label class="output-label text-base mb-2">Existing projects</label>
            <ul class="project-list">
              <li class="list-item" v-for="(_, index) in 5" :key="index">
                <a class="item-link" href="">
                  <div class="search-result">
                    <div class="search-item text-base">
                      <span>215 Carrolls Road</span>
                      <span>Menangle</span>
                      <span>New South Wales</span>
                      <span>2568</span>
                      <div class="icon">
                        <font-awesome-icon
                          icon="fas fa-arrow-right"
                          class="fs-16px text-soft"
                        ></font-awesome-icon>
                      </div>
                    </div>
                    <div class="search-item-details soft-text">
                      <span>Mr. Stephen Brennan</span> ·
                      <span>0417 668 568</span> ·<span
                        >sbrennan@<em>d</em>ealerdirectfinance.com.au</span
                      >
                      <span>· ###-0000-0267</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <div class="not-found-result soft-text" v-if="false">
              No existing projects are available.
            </div>
            <label class="output-label text-base mb-2"
              >Start a new project</label
            >
            <ul class="project-list">
              <li
                class="list-item mb-1"
                v-for="(item, index) in searchResult"
                :key="index"
              >
                <router-link
                  class="item-link"
                  :to="{
                    path: '/map',
                    query: { lat: item.center[1], lon: item.center[0] },
                  }"
                >
                  <div class="search-result map-result">
                    <div class="search-item text-base">
                      <span>{{ item.place_name }}</span>
                      <div class="icon map-icon">
                        <font-awesome-icon
                          icon="fas fa-location-dot"
                        ></font-awesome-icon>
                      </div>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
            <div class="not-found-result soft-text" v-if="!searchResult.length">
              No location found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>