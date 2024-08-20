<script setup>
  import { FindLocalizationByCompany, UpdateLocalization } from '../../../actions/LocalizationAction';
  import { FetchCountriesList } from '../../../actions/AppAction';
  import { ref, reactive, onMounted, computed } from 'vue';
  import MultipleSelect from '../../platform/lead/components/modals/fields/MultipleSelect.vue';
  import { $toast } from '../../../config';

  const state = reactive({
    errors: {},
    countriesList: [],
    countries: '',
    localizations: {},
    isLoading: false,
    isSubmitLocalization: false,
  });

  const formatCountriesList = computed(() => {
    return state.countriesList?.map((item) => {
      return {
        'value': item.name
      }
    })
  });

  const formatCountries = computed({
    get() {
      if (state.countries) {
        return state.countries.split(',')
      }
      return null;
    },
    set(value) {
      return state.countries = value.join(',');
    }
  });

  const isResetButtonActive = computed({
    get() {
      function isEqual(val1, val2) {
        return (val1 === val2) || (val1 === null && val2 === "") || (val1 === "" && val2 === null);
      }
      return !(isEqual(state.countries, state.localizations.countries));
    }
  });

  async function fetchCountriesListHandler() {
    try {
      const res = await FetchCountriesList();
      const { success, countries } = res;
      if (success) {
        state.countriesList = countries;
      }
    } catch (error) {
      $toast.error('Oops, something went wrong');
    } finally { }
  }

  async function findLocalizationByCompanyHandler() {
    try {
      const res = await FindLocalizationByCompany();
      const { success, localizations } = res;
      if (success && localizations) {
        state.localizations = localizations;
        state.countries = localizations.countries;
      }
    } catch (error) {
      $toast.error('Oops, something went wrong');
    } finally { }
  }

  async function updateLocalizationHandler() {
    try {
      state.isSubmitLocalization = true;
      var payload = {
        countries: state.countries
      }
      const res = await UpdateLocalization(payload);
      const { success, message, errors } = res;
      $toast[message.type](message.text);
      if (!success) {
        state.errors = errors;
      } else {
        state.localizations['countries'] = state.countries;
      }
    } catch (error) {
      $toast.error('Oops, something went wrong');
    } finally {
      state.isSubmitLocalization = false;
    }
  }

  onMounted(() => {
    fetchCountriesListHandler();
    findLocalizationByCompanyHandler();
  });



</script>

<template>
  <div class="content content-y-100vh">

    <div class="content-header">
      <h1>Localisation</h1>
    </div>

    <div class="content-body">
      <div class="row">
        <div class="col-lg-2 mb-3 mb-lg-0">
          <div class="settings-group-header">
            <h2>Operating countries</h2>
          </div>
        </div>
        <div class="col-lg-6">

          <div class="settings-group-item">

            <label class="form-label-title"
              for="">Countries</label>

            <multiple-select :multiple="true"
              :options="formatCountriesList"
              v-model="formatCountries"></multiple-select>

            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="state.errors?.countries?.length">{{ state.errors?.countries[0] }}</span>
            <span v-else
              class="form-input-commant">List all the countries where your company operates. Address searching,
              settings, and support will be based on the countries you select.</span>
          </div>

          <div class="d-flex">
            <div>
              <loading-button :disabled="!isResetButtonActive"
                :isLoading="state.isSubmitLocalization"
                @click="updateLocalizationHandler">
                Save Settings
              </loading-button>
            </div>
            <div class="ms-auto">
              <button v-if="isResetButtonActive && state.countries"
                @click="state.countries = state.localizations?.countries"
                class="btn btn-danger fw-bold ms-auto">
                Reset
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<style lang="scss"
  scoped>
</style>