<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  name:'ProfileIndex',
    data() {
      return{
        editorOption:{
        }
      }
    },
    components:{
        vueCustomScrollbar,
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Lead provider emails</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-12 mb-3">
                    <div class="settings-group-header">
                        <h2>Magic email address</h2>
                        <span class="sub-title">Use this email to receive your leads from lead providers.</span>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <p class="">leads-N7Ly5Vu5BQ@bots.getpylon.com</p>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>
<style lang="scss" scoped>
</style>