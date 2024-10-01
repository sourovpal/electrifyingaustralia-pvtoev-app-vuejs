<script>

  import MobileHeader from '@components/MobileHeader.vue';
  import Menu from '@components/Menu/Menu.vue';
  import { FetchLeadStatus } from '@actions/CrmLeads';
  import { title, menus } from './menu';
  import { usePlatformStore } from '@stores';
  import { useAppStore } from '@stores';

  export default {
    name: 'PlatformIndex',
    components: {
      MobileHeader,
      Menu,
    },
    setup(props) {
      const platformStore = usePlatformStore();
      const appStore = useAppStore();
      return { platformStore, appStore };
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
  <section class="d-flex flex-row platform">
    <Menu :menus="menus"
      :title="title" />
    <router-view></router-view>
  </section>

</template>

<style scoped
  lang="scss">
  .platform {
    height: 100vh;
  }
</style>