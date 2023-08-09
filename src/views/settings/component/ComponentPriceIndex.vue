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
        <h1>Component prices</h1>
    </div>

    <div class="content-body">
        <section class="">
            
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Components list</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <a href="/settings/component-prices/panel" class="card card-shadow  py-3 px-3">
                            <div class="d-flex align-items-center justify-content-between">
                                Panels
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                    </svg>
                                </span>
                            </div>
                        </a>
                    </div>

                    <div class="settings-group-item">
                        <a href="/settings/component-prices/panel" class="card card-shadow  py-3 px-3">
                            <div class="d-flex align-items-center justify-content-between">
                                Panels
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                    </svg>
                                </span>
                            </div>
                        </a>
                    </div>

                    <div class="settings-group-item">
                        <a href="/settings/component-prices/panel" class="card card-shadow  py-3 px-3">
                            <div class="d-flex align-items-center justify-content-between">
                                Panels
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                    </svg>
                                </span>
                            </div>
                        </a>
                    </div>
                    <br>
                </div>
            </div>
            <hr class="mt-4 mb-5">
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Uploaded files</h2>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="text-muted" width="15%" scope="col">File name</th>
                                <th class="text-muted" width="10%" scope="col">Status</th>
                                <th class="text-muted" width="10%" scope="col">Total items	</th>
                                <th class="text-muted" width="20%" scope="col">Imported items</th>
                                <th class="text-muted" width="10%" scope="col">Skipped</th>
                                <th class="text-muted" width="10%" scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                            <tr>
                                <td>panels.jpg</td>
                                <td>
                                    <span class="badge badge-info">Approve</span>
                                </td>
                                <td><strong class="text-muted">25+</strong></td>
                                <td><strong class="text-muted">50+</strong></td>
                                <td>
                                    <span class="badge badge-success">Skip</span>
                                </td>
                                <td>25/08/2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.card{
    svg{
        fill:#3b6dc1;
    }
}
.card-shadow{
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.settings__item--wide{
    background: #f2f5fa !important;
    border: 1px solid #007ee5 !important;
    margin-bottom: 1.5rem;
    .title{
        font-size:1.125rem;
        font-weight: bold;
        color: #007ee5;
    }
    .sub-title{
        color: #004680;
        font-size: .875rem;
        opacity: .87;
    }
}
.content{
    .content-header{
        margin-top: 1.5rem;
        margin-bottom: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        line-height: 1.1;
        h1{
            height: 2rem;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.5rem;
            color: #1f2933;
            line-height: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 600;
        }
    }
    .content-body{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

}

</style>