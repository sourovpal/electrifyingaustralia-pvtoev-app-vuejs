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
        <h1>Job Sheets</h1>
    </div>

    <div class="content-body">
        <section class="">
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Bill of materials</h2>
                        <p class="sub-title">The bill of materials contains all the physical items that are needed to complete the job.</p>
                    </div>
                </div>
                <div class="col-lg-8 col-9">
                    <div class="settings-group-header">
                        <h2 class="text-muted">Default items</h2>
                    </div>
                    <table class="table table-sm table-striped- table-hover">
                        <thead>
                            <tr>
                                <th class="text-muted" width="30%" scope="col">Item</th>
                                <th class="text-muted" width="20%" scope="col">Unit quantity</th>
                                <th class="text-muted" width="25%" scope="col">Unit</th>
                                <th class="text-muted" width="10%" scope="col">Multiplier</th>
                                <th class="text-muted" width="10%" scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Feet</td>
                                <td>
                                </td>
                                <td>
                                    <div class="select-box">
                                        <select class="form-control">
                                            <option value="">Hello</option>
                                            <option value="">Hello 2</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-end">2</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feet</td>
                                <td>
                                </td>
                                <td>
                                    <div class="select-box">
                                        <select class="form-control">
                                            <option value="">Hello</option>
                                            <option value="">Hello 2</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-end">2</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feet</td>
                                <td>
                                </td>
                                <td>
                                    <div class="select-box">
                                        <select class="form-control">
                                            <option value="">Hello</option>
                                            <option value="">Hello 2</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="text-end">2</td>
                                <td></td>
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
.select-box{
    position: relative;
    &::before{
        content: "";
        position: absolute;
        top: 47%;
        right: 15px;
        border: 4px solid rgb(166 167 170 / 62%);
        transform: translateY(-50%) rotate(-135deg);
        border-top-color: transparent;
        border-left-color: transparent;
    }
    &::after{
        content: "";
        position: absolute;
        top: 53%;
        right: 15px;
        border: 4px solid rgb(166 167 170 / 62%);
        transform: translateY(-50%) rotate(45deg);
        border-top-color: transparent;
        border-left-color: transparent;
    }
} 
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