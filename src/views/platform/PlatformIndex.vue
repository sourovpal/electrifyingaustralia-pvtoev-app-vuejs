<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import {FetchLeadStatus} from '../../actions/CrmLeads';
import {title, menus} from './menu';
import {useLeadStore} from '../../stores/lead';
import {useAppStore} from '../../stores/app';

const lostIcon = `<svg class="svg-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>`;

export default {
  name:'PlatformIndex',
  components:{
    MobileHeader,
    Menu,
  },
  setup(props) {
    const leadStore = useLeadStore();
    const appStore = useAppStore();
    return {leadStore, appStore};
  },
  data() {
    return{
      title,
      lead_statuses:[],
      pipelines:[],
      menus:[],
    }
  },
  watch:{
    "appStore.getLeadStatuses"(newVal){
      this.lead_statuses = newVal;
    },
    "appStore.getPipelines"(newVal){
      this.pipelines = newVal;
    }
  },
  methods: {
    async makeMenus(leadStatuses=[], pipelinesList=[]){
      const lead_statuses = leadStatuses.map((item)=>{
        return {
            label:item.name,
            path:'/platform/leads',
            query:{status:btoa(item.name)},
            icon:item.is_lost==1?lostIcon:null,
        };
      });
      const pipelines = pipelinesList.map((item)=>{
        return {
            label:item.title,
            path:'/platform/deals',
            query:{pipeline:btoa(item.title)},
            icon:'',
        };
      });
      this.menus = await menus({lead_statuses, pipelines});
    }
  },
  created() {
    this.$watch(()=>[this.lead_statuses, this.pipelines], function(){
      this.makeMenus(this.lead_statuses, this.pipelines);
    });
  },
  mounted() {
    this.lead_statuses = this.appStore.getLeadStatuses;    
    this.pipelines = this.appStore.getPipelines;
  },
}
</script>

<template>
  <MobileHeader/>
  <section class="d-flex flex-row">
    <Menu :menus="menus" :title="title" />
    <router-view></router-view>
  </section>

</template>

<style>

</style>
