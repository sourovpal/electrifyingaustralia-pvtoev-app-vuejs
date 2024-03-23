<script>
import SidebarNav from './components/SidebarNav.vue';
import Menu from './components/Menu/Menu.vue';
import MobileHeader from './components/MobileHeader.vue';
import './asset/global.scss';
import { mapState } from 'vuex';
export default {
  components:{
    SidebarNav,
    Menu,
    MobileHeader,
  },
  data(){
    return {
      cou:this.$store.state.count,
    }
  },
  mounted(){
    Object.keys(this.$store._modules.root._children).forEach(moduleName => {
    const moduleMutations = this.$store._modules.root._children[moduleName]._rawModule.mutations;
    // Log mutation types for the current module
    console.log(`Mutations for module ${moduleName}:`, Object.keys(moduleMutations));
  });
    console.log(this.$store)
    this.$store.commit('increment')
    setInterval(()=>{
      // this.$store.dispatch('app/increment')
    }, 1000);
  },
  watch: {
    '$store.state.app.app_name'(newValue) {
      console.log(newValue)
      this.cou = newValue;
    }
  },
}
</script>

<template>
  <router-view></router-view>
</template>