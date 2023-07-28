<script>

import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
    components:{
      vueCustomScrollbar
    },
    data(){
        return{
            status:false,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false,
                wheelSpeed:0.3,
            }
        }
    },
    props:['menus', 'title'],
    methods:{
    }
}
</script>

<template>
    <vue-custom-scrollbar :settings="settings" class="sidebar--submenu d-none d-md-block">

        <div class="submenu-header">
            <h1>{{ title }}</h1>
        </div>

        <div class="submenu-body">

            <div v-for="menu in menus" :class="`submenu-group`" :key="menu.label">
                <a class="submenu-heading d-flex justify-content-start align-items-center">
                    <span class="icon d-flex justify-content-start align-items-center" v-html="menu.icon"></span>
                    {{ menu.label }}
                </a>
                <div class="submenu-list">
                    <router-link class="submenu-link" v-for="sub in menu.children" :to="sub.path"  :key="sub.label">{{ sub.label }}</router-link>
                </div>
            </div>

        </div>

    </vue-custom-scrollbar>
</template>

<style scoped lang="scss">
.sidebar--submenu{
  // position: absolute;
  top:0;
  background-color: #ffffff;
  width: 18rem;
  max-height: 100vh;
  height: 100vh;
  margin-left: 4rem;
  overflow: hidden;
  border-right:1px solid #dddddd;
  position: relative;
  z-index: 99;
  padding-bottom:40px;
    @media (min-width: 767px){
        width:13rem;
    }
    @media (min-width: 1200px){
        width:18rem;
    }
  .submenu-header{
    padding: 1.4rem;
    padding-bottom: 0.25rem;
    h1{
        color: #1f2933;
        font-size: 1.5rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 1rem;
        font-weight: 600;
    }
  }
}

  .submenu-group{
    margin-bottom: 10px;
    .submenu-heading{
        padding: 1rem 1.5rem 0.5rem;
        font-size: .8125rem;
        font-weight: 700;
        margin: 0;
        color: #616e7c;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        gap: 0.375rem;
      .icon{
        width:18px;
      }
    }
    .submenu-list{
      .submenu-link{
        padding: 0.5rem 0.5rem 0.5rem 1.5rem;
        margin: 0 1rem 0 1.5rem;
        cursor: pointer;
        transition: background-color .2s ease;
        display: block;
        position: relative;
        font-size: .8125rem;
        border-radius: 0.25rem;
        color: #3e4c59;

        &:hover,
        &:focus,
        &.router-link-active{
            background: rgba(0,126,229,.12);
            color: #007ee5;
        }
      }
    }
}

</style>
