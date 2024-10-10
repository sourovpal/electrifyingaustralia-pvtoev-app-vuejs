<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import SlideUpDown from 'vue-slide-up-down';
export default {
    props:['menus', 'title'],
    components:{
        CustomScrollbar,
        SlideUpDown,
    },
    data(){
        return{
            isMenuActive:null,
        }
    },
    watch: {
        "menus"(menus){
            try{
                var path = this.$route.path;
                var find = menus?.find((item)=>item.path == path);
                if(find){
                    this.isMenuActive = find?.label;
                }
            }catch(error){}
            
        }
    },
    methods: {
        toggleSubmenuHandler(label){
            if(this.isMenuActive == label){
                this.isMenuActive = null;
            }else{
                this.isMenuActive = label;
            }
        }
    },
}
</script>

<template>
    <section class="sidebar--submenu d-none d-md-block">
        <CustomScrollbar thumbWidth="8">
            <div class="submenu-header">
                <h1>{{ title }}</h1>
            </div>
    
            <div class="submenu-body">
                <div v-for="(menu, index) in menus" :key="index">

                    <div v-if="menu.separator">
                        <hr class="mx-4">
                    </div>
                  
                    <div v-if="!menu.separator" :class="`submenu-group ${(isMenuActive == menu.label)?'active-group':''}` ">

                        <router-link 
                        class="submenu-heading" 
                        :to="{path:menu.path, query:menu.query}" 
                        @click="toggleSubmenuHandler(menu.label)">

                          {{  menu.label }}

                          <div class="icon ms-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                          </div>

                        </router-link>
                        <slide-up-down :active="(isMenuActive == menu.label)" :duration="300">
                            <div class="submenu-list" ref="submenu">
                      
                              <router-link 
                              :to="{path:sub.path, query:{...sub.query}}" 
                              v-for="sub in menu.children" v-slot="{route}" 
                              :key="sub" class="submenu-link">
    
                                <span :class="(route.fullPath == $route.fullPath)?'active':''" class="sub-menu-text">
                                  {{ sub.label }}
                                </span>
    
                                <span v-if="sub.icon" v-html="sub.icon"></span>
    
                              </router-link>
                      
                            </div>
                        </slide-up-down>
                    </div>
                </div>
            </div>
        </CustomScrollbar>
    </section>
</template>

<style scoped lang="scss">
.sidebar--submenu{
  top:0;
  background-color: #f5f7fa;
  width: 18rem;
  max-height: 100vh;
  height: 100vh;
  margin-left: 4rem;
  overflow: hidden;
  border-right:1px solid #dddddd;
  position: relative;
  z-index: 99;
    @media (min-width: 767px){
        min-width:13rem;
    }
    @media (min-width: 1200px){
        min-width:16rem;
    }
  .submenu-header{
    padding: 1.5rem;
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
  .submenu-body{
    padding:0px 8px;
  }
}
</style>

<style scoped lang="scss">
    .submenu-group{
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        margin-bottom: 3px;
        /* background: #ffffff; */
        /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
      &.active-group{
        .submenu-heading{
            border-bottom-color:#dddddd;
        }
        .icon{
          svg{
            transform: rotate(90deg);
          }
        }
      }
      .submenu-heading{
        display: flex;
        margin-top: 0.25rem;
        width: 100%;
        padding:0.5rem 1rem;
        font-size: .9375rem;
        font-weight: 600;
        color: rgba(31,41,51,.87);
        background: transparent;
        border: 0;
        text-decoration: none;
        transition:all 0.2s;
        border-bottom: 1px solid transparent;
        &:hover,
        &.router-link-active{
          color:#449eff;
        }        
        .icon{
          display:flex;
          justify-content:center;
          align-items: center;
          svg{
            transition: all 0.3s;
          }
        }
      }
      .submenu-list{
        /* height: 0px; */
        overflow-y: hidden;
        transition:all 0.3s;
        .submenu-link{
            padding: 0.5rem 1rem;
            font-size: .875rem;
            color: rgba(31,41,51,.87);
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            line-height: 1;
            letter-spacing: .025em;
            width: 100%;
            background: transparent;
            border: 0;
            cursor: pointer;
            text-decoration: none;
            transition:all 0.2s;
            height: 32px;
            &:hover,
            &.router-link-active .active{
                color:#007bff;
            }
            .sub-menu-text{
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
      }
  }
  </style>
  <style>
    .sidebar--submenu .scrollbar__wrapper{
      height: 100vh !important;
    }
    .sidebar--submenu .scrollbar__wrapper .scrollbar__scroller{
      height: 100% !important;
    }
  </style>
