<script setup>
  import { ref, watchEffect, watch } from "vue";
  import { onClickOutside } from '@vueuse/core'
  import axios from "axios";
  import api from "@actions/api";
  import { formatLeadAddress } from '@helpers';
  import { useRouter } from 'vue-router';
  import {$toast} from '@config';


  const accessToken = ref(
    "pk.eyJ1IjoiZGFuaWVsLXB5bG9uIiwiYSI6ImNqMGx6c3hjbDAwMjczM3A5aWx6aHhmM3MifQ.cA-6ahyjexJyGrc4xpCO8w"
  );

  const router = useRouter();
  const toggleSearchbox = ref(false);
  const searchResults = ref([]);
  const searchBoxRef = ref(null);
  const searchProjects = ref([]);
  const isLoading = ref(false);

  async function searchLocation(event) {
    const query = event.target.value;

    isLoading.value = true;

    const requests = [
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken.value}&proximity=90.4093,23.7272&types=address&limit=5&language=en`),
      api.get(`/leads/search?query=${query}&limit=5`)
    ];

    try {

      const responses = await axios.all(requests);
      const results = responses.flatMap(response => response.data);
      searchResults.value = results[0]?.features;
      searchProjects.value = results[1]?.leads;
      isLoading.value = false;

    } catch (error) {

      isLoading.value = false;
      console.error("Error fetching locations:", error);

    }
  }

  function handleSearchBarToggle(event) {

    const query = event.target.value;

    if (query?.length) return toggleSearchbox.value = true;

    toggleSearchbox.value = false;

  }

  onClickOutside(searchBoxRef, () => {
    toggleSearchbox.value = false;
  });

  const handleLocationClick = async (item) => {

    await api.post('/projects', { address: item.place_name_en, owner_id: 'jR' })
      .then(res => {
        const projectId = res?.data?.project_id;
        router.push({ path: `/library/proposals/${projectId}` });
      })
      .catch(e => {
        $toast.error('Oops, something went wrong');
      })
  }



</script>
<template>
  <div class="row d-none d-md-flex">
    <div class="col-lg-7 mx-auto position-relative">
      <div class="search-row">
        <div ref="searchBoxRef"
          class="search-area pb-0"
          :class="{ show: toggleSearchbox }">

          <div class="search-box">

            <input @input="searchLocation"
              @keyup="handleSearchBarToggle"
              @focus="handleSearchBarToggle"
              class="form-control form-control-lg"
              type="text"
              placeholder="Search for an address or existing projects" />

            <button class="search-icon">
              <font-awesome-icon class="fs-16px text-soft"
                icon="fa-solid fa-search"></font-awesome-icon>
            </button>

          </div>

          <div @click.stop=""
            class="search-output"
            style="overflow: auto; max-height: 67vh">
            <label class="output-label text-base mb-2">Existing projects</label>

            <div class="not-found-result soft-text"
              v-if="!searchProjects.length || isLoading">
              <svg-custom-icon v-if="isLoading"
                icon="spinner-icon" />
              <span v-else>Existing projects are not available.</span>
            </div>

            <ul class="project-list">

              <li class="list-item"
                v-for="(project, index) in searchProjects"
                :key="index">

                <router-link :to="{path:`/platform/${project.pipeline?'deals':'leads'}/${project.lead_id}`}"
                  class="item-link">
                  <div class="search-result d-flex justify-content-between align-items-center">

                    <div class="">

                      <div class="search-item text-base">
                        <span>
                          {{ formatLeadAddress(project,
                          project.lead_title??project.primary_contact?.full_name??'Address not added yet.')}}
                        </span>
                      </div>

                      <div v-if="project.primary_contact"
                        class="search-item-details soft-text">

                        <span v-if="project.primary_contact.full_name">
                          {{ project.primary_contact.full_name }}&nbsp;•&nbsp;
                        </span>

                        <span v-if="project.primary_contact.phone_number">
                          {{ project.primary_contact.phone_number}}&nbsp;•&nbsp;
                        </span>

                        <span v-if="project.primary_contact.email">
                          {{ project.primary_contact.email}}&nbsp;•&nbsp;
                        </span>

                      </div>

                    </div>

                    <div class="d-flex justify-content-between align-items-center">

                      <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                        :class="{'btn-success':(project.status.is_lost == 0), 'btn-danger':(project.status.is_lost == 1)}"
                        v-if="project.status">{{ project.status.name }}</span>

                      <span class="text-overflow-ellipsis btn btn-sm py-0 px-2 shadow-0"
                        :class="{'btn-success':(project.pipeline_stage.status == 'success'), 'btn-danger':(project.pipeline_stage.status == 'lost') , 'btn-primary':(project.pipeline_stage.status == 'primary')}"
                        v-if="project.pipeline && project.pipeline_stage">{{ project.pipeline.title }} / {{
                        project.pipeline_stage.name }}</span>

                      <div class="icon ms-3">
                        <font-awesome-icon icon="fas fa-arrow-right"
                          class="fs-16px text-soft"></font-awesome-icon>
                      </div>

                    </div>
                  </div>

                </router-link>

              </li>

            </ul>

            <div class="not-found-result soft-text"
              v-if="false">
              No existing projects are available.
            </div>

            <label class="output-label text-base mb-2">Start a new project</label>

            <div class="not-found-result soft-text"
              v-if="!searchResults.length && !isLoading">
              No location found.
            </div>

            <ul v-else
              class="project-list">

              <li class="list-item mb-1"
                v-for="(location, index) in searchResults"
                :key="index">

                <div @click="handleLocationClick(location)"
                  class="item-link">
                  <!-- <router-link class="item-link"
                  :to="{path: '/map', query: { lat: location?.center[1], lon: location?.center[0] }}"> -->

                  <div class="search-result map-result d-flex justify-content-between align-items-center">

                    <div class="search-item text-base">
                      <span>{{ location.place_name }}</span>
                    </div>

                    <div class="icon map-icon">
                      <font-awesome-icon icon="fas fa-location-dot"
                        class="fs-16px text-soft"></font-awesome-icon>
                    </div>

                  </div>

                </div>

              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>