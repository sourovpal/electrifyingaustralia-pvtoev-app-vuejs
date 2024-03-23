<script>
    import { Skeletor } from 'vue-skeletor';
    export default {
        components:{
            Skeletor
        },
        data() {
            return {
                empatyFolderIcon:'/src/asset/icon/empty-folder-1.png'      
            }
        },
    }
    </script>
    
    <template>
        <div class="tbl-tr full-width active">
    
            <div style="width:100%;height:90vh;" class="tbl-td full-width">
                <div class="empty-folder">
                    <div>
                        <img :src="empatyFolderIcon" alt="">
                    </div>
                    <div class="text-center">
                        <router-link class="btn btn-primary fw-bold text-white" to="/settings/installers/new">
                            <span><svg data-v-3254ee1f="" class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title data-v-3254ee1f="">account-plus</title><path data-v-3254ee1f="" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg></span>
                            Add New
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </template>
    <style scoped lang="scss">
        .full-width{
            position: relative;
        }
        .empty-folder{
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            width:350px;
            img{
                width:100%;                
                object-fit: cover;
                opacity: 0.4;
            }
        }
    </style>