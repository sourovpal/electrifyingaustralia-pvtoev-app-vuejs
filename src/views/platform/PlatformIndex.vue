<script>

  import MobileHeader from '@components/MobileHeader.vue';
  import Menu from '@components/Menu/Menu.vue';
  import { FetchLeadStatus } from '@/actions/CrmLeads';
  import { title, menus } from './menu';
  import { useLeadStore } from '@stores/lead';
  import { useAppStore } from '@stores/app';
  
  export default {
    name: 'PlatformIndex',
    components: {
      MobileHeader,
      Menu,
    },
    setup(props) {
      const leadStore = useLeadStore();
      const appStore = useAppStore();
      return { leadStore, appStore };
    },
    data() {
      return {
        title,
        menus: [],
      }
    },
    watch: {
      "getStatusAndPipeline"() { },
    },
    computed: {
      async getStatusAndPipeline() {
        this.menus = await menus();
        return { status: this.appStore.getLeadStatuses, pipelines: this.appStore.getPipelines };
      },
    },
  }
</script>

<template>
  <MobileHeader />
  <section class="d-flex flex-row">
    <Menu :menus="menus"
      :title="title" />
    <router-view></router-view>
  </section>

</template>

<style>

</style>