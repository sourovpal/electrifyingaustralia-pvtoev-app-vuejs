<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default {
  name:'AccountIndex',
    data() {
      return{
        editor: null,
      }
    },
    components:{
        QuillEditor
    }
  }
  
</script>

<template>

  <section class="content">
    
    <div class="content-header d-flex justify-content-start align-items-center">
        <router-link to="/settings/proposal-legals">
            <h1 class="mb-0">Proposal preferences</h1>
        </router-link>
        <div class="mx-2">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
        </div>
        <h1 class="mb-0">Warranty</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-6">

                    <div class="settings-group-item mb-3">
                        <QuillEditor theme="snow" placeholder="Insert text here ..." v-model:content="content" contentType="html" />
                    </div>
                    
                </div>
                <div class="col-lg-12 mt-3">
                    <button class="btn btn-primary fw-bold" href="">Save Settings</button>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </section>

</template>

<style lang="scss">
.ql-container{
    height:450px !important;
    background-color: #f9fafd !important;
}
</style>