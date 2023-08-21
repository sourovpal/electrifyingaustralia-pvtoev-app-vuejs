<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'ProfileIndex',
    data() {
      return{
        editorOption:{
        }
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
        <h1>CRM Automations</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 mb-3">
                    <div class="settings-group-header">
                        <h2>Default Opportunity Owner</h2>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="settings-group-item owner-list-dropdown">
                        <label class="form-label-title">Select Default Owner</label>
                        <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false">
                            <div class="icon">
                                <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&d=mm&r=PG" alt="">
                            </div>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" @click="(e)=>{e.stopPropagation()}">
                            <!---->
                            <div>
                                <div class="dropdown-body">

                                    <div class="dropdown-input">
                                        <input type="text" placeholder="Filter for team members" class="project-owner-filter form-control" />
                                    </div>

                                    <div class="dropdown-header">
                                        Owner
                                    </div>

                                    <div class="dropdown-item noselect">
                                        <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="No Owner's avatar" class="project-owner__profile-photo" />
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
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>

                                        <div class="dropdown-item">
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>

                                        <div class="dropdown-item">
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>

                                        <div class="dropdown-item">
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>

                                        <div class="dropdown-item">
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>

                                        <div class="dropdown-item">
                                            <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                            <span class="username fs-14px">
                                                Susmita Chowdhury
                                                <div class="team-member-email text-muted fs-12px">
                                                    admin@electrifyingaustralia.com.au
                                                </div>
                                            </span>
                                        </div>
                                        <div class="dropdown-item">
                                            <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
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
            .owner-dropdown-toggler{
                cursor: pointer;
                width: auto!important;
                border:none;
                outline: none;
                padding:3px 25px 3px 0px;
                background-color: transparent;
                position: relative;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                &::before{
                    content: '';
                    position: absolute;
                    right:5px;
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
            .form-input-commant{
                font-size: 12px;
                padding: 6px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }

            // ===========================
            &.owner-list-dropdown{
                .dropdown-menu{
                    z-index: 1000;
                    max-width: 19rem;
                    width: 19rem;
                    padding: 0.5rem 0;
                    margin: 0.125rem 0 0;
                    font-size: 1rem;
                    color: #292b2c;
                    text-align: left;
                    background-color: #fff;
                    background-clip: padding-box;
                    border-radius: 0.25rem;
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
                        max-height:350px;
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
        }
    }

}

</style>