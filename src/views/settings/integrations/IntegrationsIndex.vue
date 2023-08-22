<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'AccountIndex',
    data() {
      return{
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
        <h1>Integrations</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">Lead Generators</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/solarquotes.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge badge-dark">
                                        Not connected
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/solarchoice.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/facebook.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge badge-dark">
                                        Not connected
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">Finance Providers</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://static.getpylon.com/images/partner/brighte_logo.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">Accounting</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/xero_logo.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">Email Marketing</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/xero_logo.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">Hardware</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/solaranalytics.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <hr class="my-5">

            <div class="row">
                <div class="col-12">
                    <div class="settings-group-header">
                        <h3 class="fw-bold mb-3">API</h3>
                    </div>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://jsonapi.org/images/jsonapi.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-lg-4">
                    <a href="">
                        <div class="card soft-shadow brand-card">
                            <div class="card-body">
                                <img class="card-img" src="https://app.getpylon.com/img/integrations/webhooks.png" alt="">
                                <div class="integrations-status">
                                    <span class="badge bg-success">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.soft-shadow{
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
.brand-card{
    .card-body{
        min-height: 6rem;
        max-height: 6rem;
        .card-img{
            width: auto;
            max-height: 54px;
            max-width: 66.67%;
        }
        .integrations-status{
            position: absolute;
            top: 5px;
            right: 10px;
            z-index: 99999;
        }
    }
}

</style>