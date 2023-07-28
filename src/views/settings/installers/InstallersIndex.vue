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
        <h1>Installers list</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="15%" scope="col">Installer Name</th>
                                <th class="fw-bold" width="15%" scope="col">Email</th>
                                <th class="fw-bold" width="10%" scope="col">Phone</th>
                                <th class="fw-bold" width="10%" scope="col">License no.</th>
                                <th class="fw-bold" width="15%" scope="col">CEC accr. no.</th>
                                <th class="fw-bold" width="15%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
                                <td>
                                    <a class="me-1 btn btn-info btn-sm" href="">Edit</a>
                                    <a class="ms-1 btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-12 mt-3">
                    <a class="btn btn-primary" href="">Add new installer</a>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
.fw-initial{
    font-weight:inherit !important;
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