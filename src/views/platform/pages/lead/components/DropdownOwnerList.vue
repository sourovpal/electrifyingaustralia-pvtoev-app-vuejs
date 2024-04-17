<script>
    import {icons} from '../../../../../asset/svgicon.js';
    export default {
        props:['owners', 'owner', 'selectOwnerHandler'],
        data() {
            return {
                icons:{},
                searchOwner:null,
            }
        },
        methods: {
            resetSearchOwner(){
                this.searchOwner = null;
            },
            filterOwners(){
                return this.owners.filter((item) =>{
                    if(this.searchOwner){
                        if((item.name + item.email).toLowerCase().search(this.searchOwner.toLowerCase()) > -1){
                            return item;
                        }
                    }else{
                        return item;
                    }
                });
            }
        },
        mounted() {
            this.icons = icons;
        },
    }
</script>


<template>
    <div class="owner-list-dropdown">
        <div class="dropdown-menu pt-0 dropdown-menu-end" @click="(e)=>{e.stopPropagation()}" style="width:250px">
            <!---->
            <div>
                <div class="dropdown-body">
    
                    <div class="dropdown-input">
                        <input v-model="searchOwner" type="text" placeholder="Filter owner" class="project-owner-filter form-control" />
                    </div>
    
                    <div class="dropdown-header">
                        Primary owner
                    </div>
    
                    <div v-if="owner" class="dropdown-item noselect px-2">
                        <img :src="owner?.profile_avatar" draggable="false" />
                        <span class="fs-14px fw-bold">
                            {{ owner?.name }}
                            <div class="project-owner-email text-muted fs-12px">
                                {{ owner?.email }}
                            </div>
                        </span>
                    </div>

                    <div v-if="!owner" class="dropdown-item noselect" @click="selectOwnerHandler(null)">
                        <img :src="icons.avatar" draggable="false" alt="No Owner's avatar" class="project-owner__profile-photo" />
                        <span class="fs-14px fw-bold">
                            No Owner
                            <div class="project-owner-email text-muted fs-12px"></div>
                        </span>
                    </div>
    
                    <div class="project-owner-team-members">
    
                        <div class="dropdown-header">
                            Change owner
                        </div>
    
                        <div 
                        class="dropdown-item px-2" 
                        v-for="(item, index) in filterOwners()" 
                        v-show="item?.email != owner?.email"
                        :key="index"
                        @click="selectOwnerHandler(item)"
                        >
                            <img :src="item.profile_avatar" draggable="false" />
                            <span class="username fs-14px">
                                {{ item.name }}
                                <div class="team-member-email text-muted fs-12px">
                                    {{ item.email }}
                                </div>
                            </span>
                        </div>
                        <div class="dropdown-item px-2" v-if="owners?.length == 1 && owner">
                            <span class="username fs-14px fw-bold">
                                Owner is not available.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

    /* ================== */
    .owner-list-dropdown{
        .dropdown-menu{
            z-index: 1000;
            width: 100%;
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
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .project-owner-email,
                    .team-member-email{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }
            .project-owner-team-members{
                max-height:290px;
                overflow: auto;
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
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        .project-owner-email,
                        .team-member-email{
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
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
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }
    

</style>