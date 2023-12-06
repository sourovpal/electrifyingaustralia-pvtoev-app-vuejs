<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
    import "vue-custom-scrollbar/dist/vueScrollbar.css";

    export default {
    components:{
        vueCustomScrollbar,
    },
    data() {
      return {
        inputTags:false,
        tags: ['tag', 'input'],
      }
    },
    watch:{
        inputTags(){
            setTimeout(()=>{
                if(this.$refs['tagInputField']){
                    this.$refs['tagInputField'].focus();
                }
            },100);
        }
    },
    methods: {
      addTag(event) {
        event.preventDefault()
        let val = event.target.value.trim()
        if (val.length > 0) {
          if (this.tags.length >= 1) {
            for (let i = 0; i < this.tags.length; i++) {
              if (this.tags[i] === val) {
                return false
              }
            }
          }
          this.tags.push(val)
          event.target.value = ''
        //   console.log(this.tags)
        }
      },
      removeTag(index) {
        this.tags.splice(index, 1)
      },
      removeLastTag(event) {
        if (event.target.value.length === 0) {
          this.removeTag(this.tags.length - 1)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
#addNewLeadModal{
    .modal-dialog{
        .modal-content{
            overflow:hidden;
            max-width:896px;
            margin:auto;
            .form-control-input{
                background: #f5f7fa;
                border: none;
                border-bottom: 2px solid transparent;
                border-radius: 0px !important;
                &:focus {
                    box-shadow: none;
                    border-bottom-color: #007ee5;
                }
            }
            .col-details{
                background:#F8F9F9;
                overflow-y:auto;
                padding-bottom: 10px;
                .form-control-input{
                    background:#ffffff;
                }
            }
            .select-box::before{
                content: "";
                position: absolute;
                top: 47%;
                right: 15px;
                border: 4px solid rgb(12 33 60 / 47%);
                transform: translateY(-50%) rotate(-135deg);
                border-top-color: transparent;
                border-left-color: transparent;
            }
            .select-box::after {
                content: "";
                position: absolute;
                top: 53%;
                right: 15px;
                border: 4px solid rgb(12 33 60 / 47%);
                transform: translateY(-50%) rotate(45deg);
                border-top-color: transparent;
                border-left-color: transparent;
            }
            .tag-input-tag {
                height: 24px;
                color: white;
                float: left;
                font-size: 14px;
                margin-right: 10px;
                /* background-color: #667EEA; */
                border-radius: 15px;
                margin-top: 10px;
                line-height: 24px;
                padding: 0 8px;
                font-family: "Roboto";
                white-space:nowrap;
            }
            .tag-remove-btn{
                cursor: pointer;
            }
            .tag-remove-btn:hover{
                color: rgb(255, 12, 53);
            }
        }
    }
}
.owner-dropdown-toggler{
    cursor: pointer;
    width: auto !important;
    border: none;
    outline: none;
    padding: 10px 10px 10px 10px;
    background-color: white;
    position: relative;
    cursor: pointer;
    align-items: center;
    width: 100% !important;
    border-radius:3px;
    &::before{
        content: '';
        position: absolute;
        right:12px;
        top:45%;
        transform: translateY(-50%) rotate(45deg);
        border:0.25rem solid transparent;
        border-bottom-color: rgb(164, 164, 164);
        border-right-color: rgb(164, 164, 164);
    }
    .icon{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            border-radius: 50%;
            width:100%;
            height:100%;

        }
    }
}
.owner-list-dropdown{
    position: relative;
    .dropdown-menu{
        z-index: 1000;
        max-width: 100%;
        width: 18rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #292b2c;
        text-align: left;
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 0.25rem;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        margin-bottom:50px;
        &::before{
            content: "";
            position: absolute;
            top: -7px;
            right: 30px;
            border: 7px solid #f1f0f0;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
        &::after{
            content: "";
            position: absolute;
            top: -6px;
            right: 30px;
            border: 7px solid white;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
        @media screen and (max-width: 766px) {
            &::after,
            &::before{
                left:30px;
                right:auto !important;
            }
        }
        .dropdown-header{
            font-size: .75rem;
            padding: 0 0.5rem;
            font-weight: 700;
            line-height: 1.5rem;
            margin-bottom: 0;
            padding-top: 0.5rem;
        }
        .dropdown-item.noselect{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 10px;
            user-select: none;
            border-bottom: 1px solid #dddddd;
            img{
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                margin-right:10px;
            }
            span{
                display: inline-block;
                line-height: 18px;
            }
        }
        .project-owner-team-members{
            max-width:19rem;
            max-height:240px;
            .dropdown-item{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                user-select: none;
                img{
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    margin-right:10px;
                }
                span{
                    display: inline-block;
                    line-height: 18px;
                }
            }
        }
    }
    .dropdown-body{
        .dropdown-input{
            .project-owner-filter{
                background: #f5f7fa;
                font-size: .875rem;
                padding: 0.5rem 1rem;
                border: 0;
                width: 100%;
            }
        }
    }
}
.dropdown-menu.dropdown-menu-end{
    height:380px;
    background-color: transparent;
    box-shadow: none;
    &>div{
        box-shadow: 0px 0px 5px #dddddd;
    }
}
</style>
<template>

<div class="modal fade" id="addNewLeadModal" aria-hidden="true" aria-labelledby="addNewLeadModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="row m-0">
                <div class="col-8 px-3">
                    <div class="modal-header border-0 px-0 pt-3">
                        <div class="d-flex justify-content-center align-items-center">
                            <svg class="svg-dark" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <h4 class="modal-title title-dark ms-2">New lead</h4>
                        </div>
                    </div>
                    <div class="modal-body px-0 pt-4">

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Contact person <span class="fs-13px soft-text">(required)</span></label>
                            <input type="text" class="form-control form-control-input form-control-lg" placeholder="e.g. Nelson Zheng">
                        </div>

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Address <span class="fs-13px soft-text">(optional)</span></label>
                            <input type="text" class="form-control form-control-input form-control-lg" placeholder="Search for an address">
                        </div>

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Phone or email <span class="fs-13px soft-text">(optional)</span></label>
                            <input type="text" class="form-control form-control-input form-control-lg" placeholder="e.g. info@electrifyingaustralia.com">
                        </div>

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Lead source <span class="fs-13px soft-text">(optional)</span></label>
                            <input type="text" class="form-control form-control-input form-control-lg" placeholder="e.g. Facebook, Referral" autocomplete="on">
                        </div>

                        <div class="mb-1">
                            <label class="form-label fs-14px title-dark fw-bold mb-1">Existing leads / deals</label>
                            <span class="d-block fs-12px soft-text">No matching leads or deals found</span>
                        </div>


                    </div>
                    <div class="modal-footer d-flex justify-content-between align-items-center border-0 px-0">
                        <button class="btn btn-danger btn-sm" data-mdb-toggle="modal" data-mdb-dismiss="modal">Close</button>
                        <button class="btn btn-primary btn-sm" >Create Lead</button>
                    </div>
                </div>
                <div class="col-4 px-3 col-details">
                    <div class="modal-header border-0 px-0 pt-3">
                        <div class="d-flex justify-content-center align-items-center">
                            <svg class="svg-dark" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                            </svg>
                            <h4 class="modal-title title-dark ms-2">Details</h4>
                        </div>
                        <button type="button" class="btn-close fs-12px" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-0 pt-4">

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Lead title <span class="fs-13px soft-text">(optional)</span></label>
                            <input type="text" class="form-control form-control-input form-control-lg" placeholder="e.g. Nelson's House">
                        </div>

                        <div class="mb-3">
                            <label class="form-label fs-14px title-dark fw-bold">Lead status</label>
                            <div class="position-relative select-box w-100">
                                <select class="browser-default custom-select form-control form-control-input form-control-lg">
                                    <option selected>New</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3 owner-list-dropdown">
                            <label class="form-label fs-14px title-dark fw-bold">Owner</label>
                            <button class="owner-dropdown-toggler d-flex" data-mdb-toggle="dropdown" aria-expanded="false">
                                <div class="icon">
                                    <img src="https://unsplash.it/200?1" alt="">
                                </div>
                                <span class="ms-2 text-dark">No Owner</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end py-0" @click="(e)=>{e.stopPropagation()}">
                                <div class="py-1 bg-white">
                                    <div>
                                        <div class="dropdown-body">
        
                                            <div class="dropdown-input">
                                                <input type="text" placeholder="Filter for team members" class="project-owner-filter form-control" />
                                            </div>
        
                                            <div class="dropdown-header">Owner</div>
        
                                            <div class="dropdown-item noselect">
                                                <img src="https://unsplash.it/200?5" draggable="false" alt="No Owner's avatar" class="project-owner__profile-photo" />
                                                <span class="fs-14px fw-bold">
                                                    No Owner
                                                    <div class="project-owner-email text-muted fs-12px"></div>
                                                </span>
                                            </div>
        
                                            <vue-custom-scrollbar 
                                                :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" 
                                                class="project-owner-team-members">
        
                                                <div class="dropdown-header">
                                                    Change owner
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?4" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?7" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?8" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?5" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?4" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://unsplash.it/200?3" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                
                                            </vue-custom-scrollbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-0">
                            <label class="form-label fs-14px title-dark fw-bold mb-0">Tags <span class="fs-13px soft-text">(optional)</span></label>
                            <div class="d-flex flex-wrap">
                                <div v-for='(tag, index) in tags' :key='tag' class='tag-input-tag btn btn-sm btn-primary'>
                                    {{ tag }}<span class="ms-1 tag-remove-btn" @click='removeTag(index)'>&times;</span>
                                </div>
                            </div>
                            <div class="d-block-">
                                <div v-if="!inputTags" class="tag-input-tag cursor-pointer btn btn-sm btn-warning" @click="inputTags=true">
                                    <span>
                                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                    </span>
                                    Add Tag
                                </div>
                                <input 
                                    ref="tagInputField"
                                    v-if="inputTags"
                                    placeholder="Enter a Tag" 
                                    class='form-control form-control-input form-control-sm mt-2' 
                                    @blur='inputTags=false' 
                                    @keydown.enter='addTag' 
                                    @keydown.188='addTag' 
                                    @keydown.delete='removeLastTag' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>