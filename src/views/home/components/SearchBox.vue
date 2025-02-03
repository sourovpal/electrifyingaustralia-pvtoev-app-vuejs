<script setup>
  import { ref, watchEffect, watch } from "vue";
  import { onClickOutside } from '@vueuse/core'
  import axios from "axios";
  import api from "@actions/api";
  import { formatLeadAddress } from '@helpers';
  import { useRouter } from 'vue-router';
  import { $toast } from '@config';


  const accessToken = ref(
    "pk.eyJ1IjoiZGFuaWVsLXB5bG9uIiwiYSI6ImNqMGx6c3hjbDAwMjczM3A5aWx6aHhmM3MifQ.cA-6ahyjexJyGrc4xpCO8w"
  );

  const router = useRouter();
  const addresses = ref([]);
  const projects = ref([]);
  const is_loading = ref(false);
  const search_query = ref(null);

  async function searchLocation(event) {

    search_query.value = event.target.value;

    is_loading.value = true;

    const requests = [
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_query.value}.json?access_token=${accessToken.value}&proximity=90.4093,23.7272&types=address&limit=5&language=en`),
      api.post(`/platform/leads/search`, {
        contact: true,
        lead: true,
        search: search_query.value,
        limit: 5,
      })
    ];

    try {

      const responses = await axios.all(requests);
      const results = responses.flatMap(response => response.data);
      addresses.value = results[0]?.features;
      projects.value = results[1];
      is_loading.value = false;
    } catch (error) {

      is_loading.value = false;

      console.error("Error fetching locations:", error);

    }
  }


  const handleLocationClick = async (item) => {
    let line_one = `${item.address ?? ''} ${item.text_en ?? ''}`;

    const center = item.center;

    const context = item.context;

    let payload = {
      address_line_one: line_one,
      state: '',
      city: '',
      postcode: '',
      country: '',
    };

    context.map((row) => {
      if (row?.id?.includes('postcode')) payload.postcode = row.text_en;
      else if (row?.id?.includes('locality')) payload.city = row.text_en;
      else if (row?.id?.includes('region')) payload.state = row.text_en;
      else if (row?.id?.includes('country')) payload.country = row.text_en;
    });

    await api.post('/projects', payload)
      .then(({ data }) => {

        const { errors, message } = data;

        if (errors) return $toast.error(message.text);

        router.push({ path: `/library/proposals/${data.project_id}` });

      })
      .catch(error => $toast.error(error.message.text))
  }



</script>
<template>
  <div class="search-box">

    <icon-field>

      <input-icon class="pi pi-search" />

      <input-text style="width:35rem;"
        @input="searchLocation"
        placeholder="Search new address or projects"></input-text>

      <input-icon v-if="is_loading"
        class="pi pi-spin pi-spinner">

      </input-icon>

    </icon-field>

    <div v-if="search_query"
      :class="{'show':!!search_query}"
      class="search-result">
      <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
        style="width:100%;min-height:30rem;max-height:35rem;">

        <div class="address-location">

          <h6 class="fw-bold fs-16px text-head px-2 py-2">Existing Projects</h6>

          <ul class="list-unstyled mb-0 p-0">

            <li v-for="(address, index) in addresses"
              :key="index"
              class="address-label py-2 px-2 fs-14px text-head d-flex justify-content-start align-items-start">

              <material-icon name="solar_power"
                size="22"
                class="text-head me-2 location-icon"></material-icon>

              {{ address.place_name_en }}

            </li>

          </ul>

        </div>

        <div class="address-location">

          <h6 class="fw-bold fs-16px text-head px-2 py-2">Start a new project</h6>

          <ul class="list-unstyled mb-0 p-0">

            <li v-for="(address, index) in addresses"
              :key="index"
              @click="handleLocationClick(address)"
              class="address-label py-2 px-2 fs-14px text-head d-flex justify-content-start align-items-start">

              <material-icon name="location_on"
                size="24"
                class="text-head me-2 location-icon"></material-icon>

              {{ address.place_name_en }}

            </li>

          </ul>

        </div>

      </scroll-panel>

    </div>

  </div>
</template>

<style scoped
  lang="scss">
  .search-box {
    position: relative;

    .search-result {
      /* visibility: hidden; */
      opacity: 0;
      max-width: 35rem;
      min-width: 560px;
      top: 45px;
      transform-origin: center top;
      margin-top: 2px;
      z-index: 1001;
      position: absolute;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
    }

    &:hover .search-result,
    .search-result.show {
      visibility: visible !important;
      opacity: 1;
    }
  }

  .address-label {
    line-height: 1.3rem;
    cursor: pointer;

    &:hover {
      background-color: #f3f7fa;
      color: var(--crm-color-7) !important;

      .location-icon {
        color: var(--crm-color-7) !important;
      }
    }
  }
</style>