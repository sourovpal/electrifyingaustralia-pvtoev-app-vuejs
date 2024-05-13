<script>
import {icons} from '../../../../../asset/svgicon';
import api from '../../../../../actions/api';
import SlideUpDown from 'vue-slide-up-down';
import ImagePreviewModal from '../ImagePreviewModal.vue';
export default {
    components:{
        ImagePreviewModal,
        SlideUpDown,
    },
    data() {
        return {
            progress:0,
            files:[],
            leadFiles:[],
            deletedLeadFiles:[],
            toggleDropdownBox:true,
            dragStart:false,
        }
    },
    watch: {
        "$store.state.lead.findLead"({lead_files}){
            this.leadFiles = lead_files;
        }
    },
    methods: {
        getFileIconHandler(extension){
            var ext = extension?.toLocaleLowerCase();
            var imgExt = ['jpg','jpeg','png','gif','bmp','svg','webp'];
            var icon = '';
            if(imgExt.includes(ext)){
                icon = icons['file_img'];
            }else if(ext == 'pdf'){
                icon = icons['file_pdf'];
            }else{
                icon = icons['file_document'];
            }
            return icon;
        },
        shortenFileNameHandler(fileName) {
            if (fileName.length <= 20) {
                return fileName;
            } else {
                const firstPart = fileName.substring(0, 20);
                const lastPart = fileName.substring(fileName.length - 10);
                return `${firstPart} ... ${lastPart}`;
            }
        },
        dragDropFilesHandler(e){
            e.preventDefault();
            this.dragStart = false;
            try{
                this.files = [];
                var files = e.dataTransfer?.files??[];
                for (let i = 0; i < files.length; i++) {
                    this.files.push({
                        file:files[i],
                        name: files[i].name,
                        progress: 0,
                        status: 1
                    });
                }
                this.leadFileUploadHandler();
            }catch(error){
                console.log(error);
            }
        },
        browseFilesHandler(){
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('multiple', true);
            input.click();
            input.addEventListener('change', (e)=>{
                this.files = [];
                var files = input?.files;
                for (let i = 0; i < input?.files.length; i++) {
                    this.files.push({
                        file:files[i],
                        name: files[i].name,
                        progress: 0,
                        status: 1
                    });
                }
                this.leadFileUploadHandler();
            });

        },
        async leadFileUploadHandler(){
            try {
                var leadId = this.$route.params?.id??null;

                var file = null;

                for (let i = 0; i < this.files?.length; i++) {

                     file = this.files[i];

                    const formData = new FormData();

                    formData.append('lead_file', file?.file);

                    formData.append('lead_id', leadId);

                    try{

                        const response = await api.post('/leads/file-upload', formData, {
                            onUploadProgress: progressEvent => {
                                try{

                                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                                    file.progress = progress;

                                }catch(error){}
                            }
                        });
                        if(response?.data){

                            await new Promise(resolve => setTimeout(()=>{
                                this.files[i].status = 2;
                                return resolve(true);
                            },500));

                        }
                        try{

                            const {deleted_lead_files, lead_files, message} = response?.data;
                            this.deletedLeadFiles = deleted_lead_files;
                            this.leadFiles = lead_files;

                        }catch(err){}

                    }catch(error){

                        this.files[i].status = 0;
                        
                    }

                }
            } catch (error) {}
        }
    },
    mounted() {
        this.icons = icons;
        try{
            const {lead_files} = this.$store.state.lead.getLeadFiles??[];
            this.leadFiles = lead_files;
        }catch(error){}
    },
}
</script>

<template>
    <div>
        <div class="dropdown-box border-bottom">
            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center" :class="{show:toggleDropdownBox}">
                <span class="fw-bold fs-14px text-uppercase text-head d-block">Uploaded files</span>
                <div class="">
                    <button 
                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
                    @click="toggleDropdownBox=!toggleDropdownBox"
                    >
                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                    </button>
                </div>
            </div>
    
            <slide-up-down :active="toggleDropdownBox" :duration="500">
                <div class="dropdown-body" style="height:100%;">
                    <div class=" px-3 py-1 pb-2 fs-12px">
                        <div class="lead-files">
                            <div class="empty-state" 
                            :class="{drag:dragStart}"
                            @dragover.prevent="dragStart=true" 
                            @dragleave.prevent="dragStart=false" 
                            @drop="dragDropFilesHandler">
                                <div class="icon icon--36">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
                                </div> 
                                <div class="empty-state__body">
                                    Attach files to store power bills,
                                    <br>
                                    site photos, and other information.
                                    <button @click="browseFilesHandler()" class="btn-text">Browse files</button>
                                </div>
                            </div> 
                            <div class="">
                                <br>
                                <div class="files-progress-list">
                                    <div class="item mb-2" v-for="(file, index) in files" :key="index" v-show="file?.status != 2">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <div class="fs-14px text-head">{{shortenFileNameHandler(file?.name) }}</div>
                                            <div class="fs-14px text-soft">{{ file?.progress }}%</div>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar" :class="`${file?.status == 0 ?'bg-danger':''}`" :style="`width:${file?.progress}%;border-radius: 5px;`"></div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-unstyled mt-3 file-list">
                                    <li class="file-list-item cursor-pointer pt-1 border-bottom pb-1 d-flex justify-content-between align-items-center text-head" 
                                    v-for="(item, index) in leadFiles" :key="index">
                                        <div @click="$refs['imagePreviewModalRef'].showModalHandler(item)">
                                            <img class="me-2" width="24" :src="getFileIconHandler(item?.extension)" alt="">
                                            <span class="fs-14px">{{shortenFileNameHandler(item?.name) }}</span>
                                        </div>
                                        <span class="file-size fs-12px">{{ item?.size }}</span>
                                        <span class="download-file fs-14px">
                                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </slide-up-down>
        </div>
        <ImagePreviewModal
        :files="leadFiles"
        ref="imagePreviewModalRef"
        />
    </div>

</template>

<style scoped lang="scss">
.file-list{
    .file-list-item{
        position: relative;
        .file-size,
        .download-file{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
        }
        .file-size{
            opacity: 1;
            z-index:9;
            transition: opacity 0.5s linear;
        }
        .download-file{
            opacity: 0;
            z-index: -9;
            transition: opacity 0.5s linear;
        }
        &:hover{
            .file-size{
                opacity: 0;
                z-index: -9;
            }
            .download-file{
                opacity: 1;
                z-index:9;
            }
        }
    }
}
.lead-files{
    .empty-state{
        -webkit-box-align: center;
        align-items: center;
        background-color: #e5f4ff;
        border: 2px solid #b3ddff;
        -webkit-border-radius: .25rem;
        border-radius: .25rem;
        color: #0062b3;
        display: flex;
        flex-direction: column;
        font-size: .875rem;
        gap: .25rem;
        justify-content: center;
        line-height: 1.25;
        min-height: 9.25rem;
        padding: 1rem;
        text-align: center;
        user-select: none;
        width: 100%;
        &.drag{
            border-style:dashed;
            border-color:#007ee5;
        }
        .btn-text {
            background: transparent;
            border: 0;
            color: #007ee5;
            padding: 0;
            text-decoration: underline;
        }
    }
}
.dropdown-header{
    &.show{
        button{
            transform:rotate(-180deg);
        }
    }
    button{
        transition: transform 0.3s ease-in-out;
    }
}
</style>