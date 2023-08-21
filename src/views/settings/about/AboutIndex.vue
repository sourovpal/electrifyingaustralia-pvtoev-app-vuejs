<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';


export default {
  name:'ProfileIndex',
    data() {
      return{
        content: '',
        countTextLength:0,
        editorOption:{
        }
      }
    },
    components:{
        vueCustomScrollbar,
        QuillEditor
    },
    watch:{
        content:function(){
            let tmp = document.createElement("DIV");
            tmp.innerHTML = this.content;
            this.countTextLength = (tmp.textContent || tmp.innerText || "").length;
        }
    }
    
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>About Us</h1>
    </div>

    <div class="content-body">

        <section class="">

            <div class="row">

                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Image</h2>
                        <span class="sub-title">This image will appear on your about us page.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-9 d-flex justify-content-start align-items-center">
                    <button class="btn btn-primary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z"></path></svg>
                        Upload
                    </button>
                </div>

            </div>

            <br><br><br><br><br><br><br>
            
            <div class="row">

                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Content</h2>
                        <span class="sub-title">This information will be used to populate the "about us" page in your solar proposal.</span>
                    </div>
                </div>

                <div class="col-lg-5 col-9">

                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Subtitle</label>
                        <input type="text" class="form-control form-control-sm form-control-input form-control-lg" value="Electrifying Australia PTY LTD">
                        <span class="form-input-commant">This will appear underneath your company name on the about us page</span>
                    </div>
                    
                    <div class="settings-group-item">
                        <label class="form-label-title" for="">Description</label>
                        <QuillEditor theme="snow" placeholder="Insert text here ..." v-model:content="content" contentType="html" />
                        <span class="form-input-commant">{{countTextLength}}/2000</span>
                    </div>

                    <div class="">
                        <button class="btn btn-primary" @click="filterText">Save Settings</button>
                    </div>

                </div>

            </div>

            <br><br><br>
            
        </section>
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