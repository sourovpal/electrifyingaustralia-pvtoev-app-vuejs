<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'ProfileIndex',
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
        <h1 class="mb-3">Custom financing</h1>
    </div>

    <div class="content-body">
        <div class="row">
            <div class="col-12 col-lg-10">
                <table class="table table-sm table-striped- table-hover">
                    <thead>
                        <tr>
                            <th class="text-muted fw-bold" width="40%" scope="col">Financier</th>
                            <th class="text-muted fw-bold" width="40%" scope="col">Last updated</th>
                            <th class="text-muted fw-bold" width="20%" scope="col"><span class="d-none">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Brighte</td>
                            <td class="text-right"><span>a month ago</span></td>
                            <td class="text-right">
                                <a href="/settings/packages/zE4WLJq04w" class="">Edit</a> 
                                <a href="/settings/packages/zE4WLJq04w" class="ms-2 d-inline-block">Delete</a> 
                                <button class="d-none">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>ACT Sustainable Household Scheme</td>
                            <td class="text-right"><span>9 days ago</span></td>
                            <td class="text-right">
                                <a href="/settings/packages/zE4WLJq04w" class="">Edit</a> 
                                <a href="/settings/packages/zE4WLJq04w" class="ms-2 d-inline-block">Delete</a> 
                                <button class="d-none">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-12 mt-3">
                <a class="btn btn-primary fw-bold" href="">Add new financier</a>
            </div>
        </div>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
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
        .settings-group-header{
            h2{
                font-weight: 600;
                font-size: 1rem;
            }
            .sub-title{
                font-size: 13px;
                padding: 4px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }
        }
        .settings-group-item{
            margin-bottom: 25px;
            .form-label-title{
                margin-bottom: 0.25rem;
                line-height: 1.5rem;
                font-weight: 600;
                color: #3e4c59;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                font-size: .875rem;
            }
            .form-control-input{
                background: #f5f7fa;
                border:none;
                border-bottom:2px solid transparent;
                border-radius:0px !important;
                &:focus{
                    box-shadow: none;
                    border-bottom-color: #007ee5;
                }                          
            }
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
            .form-input-commant{
                font-size: 12px;
                padding: 6px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }
        }
    }

}

</style>