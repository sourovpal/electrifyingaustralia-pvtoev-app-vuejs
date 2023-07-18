<script>
export default {
  data(){
    return {
      showChildren:false,
      submenuHeight:0,
    }
  },
  props:['menu'],
  created(){
    if(this.menu.path == this.$route.path){
      this.submenuHeight = 'fit-content';
      this.showChildren = true;
    }
  },
  watch:{
    '$route'(){

    }
  },
  methods:{
    menubarToggle(state = true){

      if(!this.showChildren && state){

          this.showChildren = true;

          this.$nextTick(()=>{
  
            this.submenuHeight = this.$refs['submenu'].scrollHeight + 'px';
  
            setTimeout(()=>{
              this.submenuHeight = 'fit-content';
            }, 300);
  
          });

      }else{

          this.$nextTick(()=>{
            
            if(this.showChildren){
              this.submenuHeight = this.$refs['submenu'].scrollHeight + 'px';
    
              setTimeout(()=>{
                this.submenuHeight = 0 + "px";
              }, 10);
              
              setTimeout(()=>{
                this.showChildren = false;
              }, 150);
            }
            
          });

      }
    }
  },
}
</script>

<template>

    <div :class="`submenu-group ${showChildren?'active-group':''}` ">
      <router-link class="submenu-heading" :to="menu.path" @click="menubarToggle">
        {{  menu.label }}
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
        </div>
      </router-link>
      <div class="submenu-list" :style="{height:submenuHeight}" ref="submenu">

        <router-link :to="{path:sub.path, query:sub.query}" v-for="sub in menu.children" v-slot="{route}" :key="sub" class="submenu-link" >
          <span :class="(route.fullPath == $route.fullPath)?'active':''">
            {{ sub.label }}
          </span>
        </router-link>

      </div>
    </div>
    
</template>

<style scoped lang="scss">

.submenu-heading {
  &.router-link-active ~ .submenu-list{
    // height: fit-content !important;
  }
}
  .submenu-group{

    &.active-group{
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
      padding: 0.75rem 1.5rem;
      font-size: .9375rem;
      font-weight: 600;
      color: rgba(31,41,51,.87);
      background: transparent;
      border: 0;
      text-decoration: none;
      transition:all 0.2s;
      &:hover,
      &.router-link-active{
        color:#007bff;
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
      height: 0px;
      overflow-y: hidden;
      transition:all 0.3s;
      .submenu-link{
        padding: 0.5rem 1.5rem 0.5rem 2.5rem;
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
        font-weight: 600;
        transition:all 0.2s;
        &:hover,
        &.router-link-active .active{
          color:#007bff;
        }
      }
    }
}
</style>
