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
  <router-view></router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

*{
  font-family: 'Source Sans Pro', sans-serif !important;
  margin:0px;
  padding:0px;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgb(237, 237, 237);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(165, 165, 165);
  border-radius: 10px;
}
html{
  scroll-behavior: smooth;
}
.fs-10px{
  font-size:10px !important;
}
.fs-11px{
  font-size:11px !important;
}
.fs-12px{
  font-size:12px !important;
}
.fs-13px{
  font-size:13px !important;
}
.fs-14px{
  font-size:14px !important;
}
.fs-15px{
  font-size:15px !important;
}
.cursor-pointer{
  cursor: pointer;
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
.svg-disabled{
  fill:#a2a2a2 !important;
}
.svg-5{
  fill:#919191 !important;
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
