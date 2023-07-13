<script>
import SidebarNav from './components/SidebarNav.vue';
import Menu from './components/Menu/Menu.vue';
import Dashboard from './components/Datatable/Dashboard.vue';
import MobileHeader from './components/MobileHeader.vue';
export default {
  components:{
    SidebarNav,
    Menu,
    Dashboard,
    MobileHeader,
  }
}
</script>

<template>
  <SidebarNav/>
  <MobileHeader/>
  <section class="">
    <Menu />
    <Dashboard />
  </section>

</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

*{
  font-family: 'Source Sans Pro', sans-serif !important;
  margin:0px;
  padding:0px;
}
html{
  scroll-behavior: smooth;
}
.ps__thumb-y{
  transition:all 0.1s ease-in-out;
}
.content{
  position: absolute;
  padding-left: 0rem;
  top: 4rem;
  width: 100%;
  height: 100%;
  @media (min-width: 767px){
    padding-left: 17rem;
    top: 0rem;
  }
  @media (min-width: 1200px){
    padding-left: 22rem;
  }
}
.svg-5{
  fill:#949393 !important;
}
.dropdown > button{
  border-radius:3px !important;
  transition: all 0.2s !important;
}
.dropdown-item{
    border-radius: 0px !important;
    text-decoration: none;
    &:hover{
      color: #1d1e1f !important;
      background-color: #f7f7f9 !important;
    }
    &:active{
      background-color: #e4e7eb !important;
      color: #1f2933 !important;
    }
}
</style>
