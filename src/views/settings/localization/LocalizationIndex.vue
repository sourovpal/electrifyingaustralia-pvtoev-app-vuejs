<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {FetchLocalization, UpdateLocalization} from '../../../actions/LocalizationAction';
export default {
  name:'ProfileIndex',
  data() {
    return {
      errors:{},
      selectedCountry:[],
      countries:[],
      showCountryList:false,
      searchInput:null,
      deleteCountry:null,
      isSubmitLocalization:false,
    }
  },
  components:{
    CustomScrollbar,
  },
  watch:{
    searchInput:function(n, o){
    }
  },
  methods: {
    async fetchLocalizationsHandler(){
      try{
        const res = await FetchLocalization();
        const {countries, localization} = res;

        try{
          if(localization && localization.countries){
            this.selectedCountry = localization.countries?.split(',');
          }
        }catch(error){}

        try{
          this.countries = countries;
        }catch(error){}

      }catch(error){
        try{
          var message = error.response.data.message;
          this.$toast[message.type](message.text);
        }catch(e){
          this.$toast.error('Oops, something went wrong');
        }
      }finally{

      }
    },
    selectedCountryHandler(name=null){
      if(name){
        this.selectedCountry.push(name);
        this.searchInput = null;
        this.$refs['searchInputRef'].focus();
      }
    },
    removeSelectedCountry(name=null){
      var index = -1;
      if(name){
        index = this.selectedCountry.indexOf(name);
      }else if(this.selectedCountry.length > 0){
        index = this.selectedCountry.length - 1;
      }
      if(index > -1){
        this.deleteCountry = this.selectedCountry[index];
        this.selectedCountry.splice(index, 1);
      }
    },
    searchCountries() {
      return this.countries.filter((item) =>{
        if(this.searchInput){
          if(item.name.toLowerCase().search(this.searchInput.toLowerCase()) > -1){
            return item;
          }
        }else{
          if(this.selectedCountry.includes(item.name)){
            item.status = false;
            return item; 
          }else if(this.deleteCountry === item.name){ 
            item.status = true;
            this.deleteCountry = null;
            return item;
          }else{
            return item;  
          }
        }
      });
    },
    async updateLocalizationHandler(){
      try{
        this.isSubmitLocalization = true;
        var data = {
          countries:this.selectedCountry.join(',')
        };
        
        const res = await UpdateLocalization(data);
        try{
          const {message} = res;
          this.$toast[message.type](message.text);
        }catch(error){}
        
      }catch(error){

        try{
          this.errors = error.response.data.errors;
        }catch(error){}

        try{
          var message = error.response.data.message;
          this.$toast[message.type](message.text);
        }catch(e){
          this.$toast.error('Oops, something went wrong');
        }

      }finally{
        this.isSubmitLocalization = false;
      }
    },
  },
  mounted() {
    this.fetchLocalizationsHandler();
    this.$el.addEventListener('click', (e)=>{
      if(this.showCountryList){
        var ele = e.target.closest('#LocalisationCountrySelect');
        if(!ele){
          this.showCountryList = false;
        }
      }
    });
  },
}
</script>

<template>
  <div class="content add-custom-scrollbar">
    <CustomScrollbar thumbWidth="8">
      <div class="content-header">
          <h1>Localisation</h1>
      </div>
      <div class="content-body">
          <section class="">
              <div class="row">
                  <div class="col-lg-2 col-12 mb-3 mb-lg-0">
                      <div class="settings-group-header">
                          <h2>Operating countries</h2>
                      </div>
                  </div>
                  <div class="col-lg-6 col-12">
  
                      <div class="settings-group-item position-relative" id="LocalisationCountrySelect">

                          <label class="form-label-title" for="">Countries</label>

                          <div class="form-control form-control-tags-input px-2" :class="`${showCountryList?'focus':''}`">

                            <label v-for="(country, index) in selectedCountry" :key="index" class="tag-lable">{{ country }}
                              <span @click="removeSelectedCountry(country)" class="close-tag">&times;</span>
                            </label>
                            
                            <input 
                            ref="searchInputRef" 
                            v-model="searchInput" 
                            @focus="showCountryList=true && delete errors?.countries" 
                            @keydown.delete="(e)=>e.target.value.length === 0 && removeSelectedCountry(null)"
                            type="text" 
                            class="tags-input">
                          </div>

                          <div class="search-tags-list overflow-auto" style="max-height:15rem;" v-if="showCountryList">
                              <ul>
                                <li 
                                :class="`${country.status?'':'d-none'}`"
                                @click="selectedCountryHandler(country.name)" 
                                v-for="(country, index) in searchCountries()" 
                                :key="index">{{ country.name }}</li>
                              </ul>
                          </div>
                          <span class="form-input-commant"  v-if="!errors?.countries?.length">List all the countries where your company operates. Address searching, settings, and support will be based on the countries you select.</span>
                          <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.countries?.length">{{ errors?.countries[0] }}</span>
                      </div>
  
                      <div>
                        <button :disabled="isSubmitLocalization" @click="updateLocalizationHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                          <div v-if="isSubmitLocalization">
                              <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                  <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                              </svg>
                              <span>Submitting...</span>
                          </div>
                          <span v-if="!isSubmitLocalization">Save Settings</span>
                        </button>
                      </div>
                  </div>
              </div>
              <br><br><br>
          </section>
      </div>
  
    </CustomScrollbar>
  </div>
</template>
<style lang="scss" scoped>
  .form-control-tags-input{
    min-height: 33px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    .tags-input{
      border: none;
      outline: none;
      background: transparent;
      flex-grow: 1;
      height: 28px;
      margin: 3px 3px 3px 3px;
    }
    .tag-lable{
      font-size: 14px;
      font-weight: 600;
      border: 1px solid #d3d3d3;
      padding: 2px 8px;
      border-radius: 5px;
      background: #eaedf1;
      line-height: 25px;
      margin: 3px 6px 3px 0px;
      user-select: none;
      .close-tag{
        font-size: 20px;
        font-weight: bold;
        position: relative;
        top: 2px;
        margin-left: 5px;
        cursor: pointer;
        padding: 0px 2px;
        transition: all 0.2s ease-in-out;
        line-height: 10px;
        &:hover{
          color:rgb(255, 34, 68);
        }
      }
    }
  }
  .search-tags-list{
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    position: absolute;
    left: 0;
    right: 0;
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 600;
        margin-top:5px;
        user-select: none;
        &:hover{
          background-color: rgb(0 38 113 / 6%);
          cursor: pointer;
        }
      }
    }
  }
</style>
