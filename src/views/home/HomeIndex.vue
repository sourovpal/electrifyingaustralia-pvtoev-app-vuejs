<script>
import { ref } from 'vue';
import axios from 'axios';
import axiosInstance from '../../actions/api';
export default {
    name:'HomeIndex',
    setup(props) {
        const searchBoxRef = ref(null) ;
        return {searchBoxRef};
    },
    data(){
        return {
            searchLocation:'',
            searchResult:[],
            searchProject:[1,2,3,4,5],
            access_token:'pk.eyJ1IjoiZGFuaWVsLXB5bG9uIiwiYSI6ImNqMGx6c3hjbDAwMjczM3A5aWx6aHhmM3MifQ.cA-6ahyjexJyGrc4xpCO8w',
        }
    },
    watch: {
        searchLocation(){
            if(this.searchLocation.length > 0){
                this.searchBoxRef.classList.add('show');
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchLocation}.json?access_token=${this.access_token}&proximity=90.4093,23.7272&types=address,locality,postcode&limit=5&language=en`)
                .then((res)=>{
                    if(typeof res.data != undefined){
                        const {features} = res.data;
                        this.searchResult = features;
                        console.log(features);
                        // features.place_name
                        // features.center[0, 1]
                    }
                });
            }else{
                this.searchResult=[];
                this.searchBoxRef.classList.remove('show');
            }

        }
    },
    methods:{
        handleLocationClick(item) {
            const ownerDetails = JSON.parse(localStorage.getItem('user_data'));
            const owner_id = ownerDetails.user_id;

            if (!owner_id) 
                return this.$toast.error('Oops, something went wrong');

            axiosInstance.post('projects/', { address: item.place_name_en, owner_id })
                .then(res => {
                    const projectId = res?.data?.project_id;
                    this.$router.push({ path: `library/proposals/${projectId}`});
                })
                .catch(e => {
                    this.$toast.error('Oops, something went wrong');
                    console.log(e);
                })
        }
    },
    mounted() {
        this.$el.addEventListener('click', (e)=>{
            if(e.target.closest('.search-area')){
                if(this.searchLocation.length > 0){
                    this.searchBoxRef.classList.add('show');
                }
            }else{
                this.searchBoxRef.classList.remove('show');
            }
        });
    },
}
</script>

<template>
<section class="home-section">
    <div class="container">
        <div class="home-content">

            <nav class="navbar navbar-mobile shadow-0">
                <div class="navbar-left d-flex d-md-none">
                    <div class="nav-item">
                        <a href="" class="navbar-brand nav-link align-items-start">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                        </a>
                    </div>
                    <div class="title">Leads</div>
                </div>

                <div class="navbar-right ms-auto">
                    
                    <div class="nav-item d-flex d-md-none">
                        <a href="" class="navbar-brand nav-link align-items-end">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                        </a>
                    </div>

                    <div class="nav-item d-flex d-md-none">
                        <a href="" class="navbar-brand nav-link align-items-end me-0">
                            <svg  xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g ><rect  fill="none" height="24" width="24"></rect></g><g ><path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path></g></svg>
                        </a>
                    </div>

                    <div class="d-none d-md-flex">
                        <button class="btn px-3 btn-light fw-bold shadow-none"><img class="me-1" src="https://app.getpylon.com/img/gem.png" alt=""> Credits: 412</button>
                    </div>

                </div>
            </nav>

            <div class="row d-none d-md-flex">
                <div class="col-lg-7 mx-auto position-relative">
                    <div class="search-row">
                        <div ref="searchBoxRef" class="search-area">
                            <div class="search-box">
                                <input v-model="searchLocation" class="form-control form-control-lg" type="text" placeholder="Search for an address or existing projects">
                                <button class="search-icon">
                                    <svg class="svg-5" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </button>
                            </div>
                            <div class="search-output">
                                <label class="output-label text-base mb-2">Existing projects</label>
                                <ul class="project-list">
                                    <li class="list-item" v-for="(item, index) in searchProject" :key="index">
                                        <a class="item-link" href="">
                                            <div class="search-result">
                                                <div class="search-item text-base">
                                                    <span>215 Carrolls Road</span> 
                                                    <span>Menangle</span> 
                                                    <span>New South Wales</span> 
                                                    <span>2568</span> 
                                                    <div class="icon">
                                                        <svg class="svg-5" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                                                    </div>
                                                </div>
                                                <div class="search-item-details soft-text">
                                                    <span>Mr. Stephen Brennan</span> · <span>0417 668 568</span> ·<span>sbrennan@<em>d</em>ealerdirectfinance.com.au</span> <span>· ###-0000-0267</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="not-found-result soft-text" v-if="!searchProject.length">No existing projects are available.</div>
                                <label class="output-label text-base mb-2">Start a new project</label>
                                <ul class="project-list">
                                    <li class="list-item mb-1" v-for="(item, index) in searchResult" :key="index">
                                        <!-- <a class="item-link" :href="`/map/lat=${item.center[0]+','+item.center[1]}`"> -->
                                        <a class="item-link cursor-pointer" @click="handleLocationClick(item)">
                                            <div class="search-result map-result">
                                                <div class="search-item text-base">
                                                    <span>{{ item.place_name }}</span>
                                                    <div class="icon map-icon">
                                                        <svg class="svg-5" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path> <path d="M0 0h24v24H0z" fill="none"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="not-found-result soft-text" v-if="!searchResult.length">No location found.</div>

                            </div>
                        </div>  
                    </div>
                </div>
            </div>
    
            
            <div class="row d-none d-md-flex">
                <div class="col-lg-7 mx-auto position-relative">
                    <div class="quick-start-project">
                        <div class=" px-0 thumbnail-area">
                            <img class="thumbnail" src="https://static.getpylon.com/images/video/resi_tut1.jpg" alt="">
                            <div class="duration">1:33</div>
                        </div>
                        <div class="ps-3">
                            <div class="description">
                                <h1>Quick start guide — Creating a project</h1>
                                <p>Learn how to create your first solar project in Pylon</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-end">
                        <a class="link" href="">View more guides</a>
                    </div>
                </div>
            </div>
    
    
            <div class="row recent-project">
                <div class="col-lg-7 mx-auto position-relative">
                    <div class="row">
                        <div class="header-area">
                            <h1 class="header-title">Recent Project</h1>
                            <a class="link" href="">View All</a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/j4y5odtd8Q/CzrY6YyKw/1689567773.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/YOStOUHf4g/MH5hSKZbw/1689572037.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/nje28Lr2mQ/VW83kAlRw/1689571505.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/j4y5odtd8Q/CzrY6YyKw/1689567773.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/cQutMGnSqQ/hFxCTa7b1g/1689564758.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <a class="project-link" href="">
                                <div class="box">
                                    <div class="thumbnail" style="background-image:url(https://static.getpylon.com/images/designs/47L8eFc9gQ/gZvsJZRQdw/uOHK07XeCQ/1689557885.jpeg);"></div>
                                    <div class="info">
                                        <h1 class="title">Unit 17 / 224 Flemington Rd</h1>
                                        <p class="sub-title">New South 2257</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>

        </div>


    </div>
</section>
</template>

<style lang="scss">

.home-section{
    height:120vh;
    padding-top:150px;
    .link{
        font-size:15px;
    }
    .home-content{
        padding-left: 67.5px;
        @media screen and (max-width:767px) {
            padding-left: 0;
        }
    }
    .search-row{
        position: relative;
        min-height:100px;
        .search-area{
            transform: all 0.3s;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 9999;
            background-color: #ffffff;
            .search-box{
                position:relative;
                
                input,input:focus{
                    background-color:#f5f7fa;
                    border:none;
                    outline: none;
                    box-shadow: none;
                }
                .search-icon{
                    position: absolute;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 12px;
                    padding: 0px 0px;
                }
            }
            &.show{                
                border-radius:3px;
                padding-bottom:10px;
                box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
                .search-box input{
                    background-color: transparent !important;
                }
                .search-output{
                    display: block;
                }
            }
            .search-output{
                display: none;
                .output-label{
                    padding:10px 12px 3.68px;                
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 600;
                    display: block;
                    text-transform: uppercase;
                }
                .project-list{
                    list-style: none;
                    margin:0;
                    padding:0;
                    .list-item{
                        margin-bottom:10px;
                        .item-link{
                            display:block;
                            :hover{
                                background-color:rgb(246 246 246);
                                .icon{
                                    opacity:1 !important;
                                }
                            }
                            .search-result{
                                padding:3.68px 12px 3.68px;                
                                line-height: 20px;
                                &.map-result{
                                    padding:13.7px 12px;                
                                }                                
                                .search-item{
                                    position: relative;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    font-size: 14px;
                                    span{
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        margin-right:3px;
                                    }
                                    .icon{
                                        position: absolute;
                                        right: 0;
                                        top: 100%;
                                        transform: translateY(-50%);
                                        opacity: 0;
                                        transition: opacity ease-in-out 0.1s;
                                        &.map-icon{
                                            top: 50%;
                                        }
                                    }                                    
                                }
                                .search-item-details{
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                }
                .not-found-result{
                    height: 260px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                }
            }
        }
    }

    .quick-start-project{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius:3px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        cursor: pointer;
        .thumbnail-area{
            position: relative;

            .thumbnail{
                width:200px;
            }
            .duration{
                position: absolute;
                background-color: #1f2933;
                color: #fff;
                font-size: .8125rem;
                padding: 3px 4px;
                border-radius: 0.125rem;
                line-height: 1.1;
                bottom: 0.5rem;
                font-weight: 600;
                right: 0.5rem;
            }
        }
        .description{
            h1{
                font-size:1.125rem;
                padding: 10px 0px 0px 0px;
            }
            p{
                font-size: 14px;
                color: #7f8084;
            }
        }
    }

    .recent-project{
        margin-top:50px;
        .header-area{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom:12px;
            .header-title{
                margin-bottom: 0;
                margin-right: 1rem;
                font-size: 1rem;
                color: #1f2933;
                font-weight: 600;
            }
        }
        .project-link{
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
            display: block;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
            overflow: hidden;
            .box{
                .thumbnail{
                    background-color: #f4f4f4;
                    background-size: cover;
                    background-position: 50%;
                    width: 100%;
                    height: 120px;
                    border-top-left-radius: 0.25rem;
                    border-top-right-radius: 0.25rem;
                    padding-top: 56.25%;
                }
                .info{
                    margin: 1.5rem 1rem 1rem;
                    .title{
                        color: rgba(0,0,0,.87);
                        font-size: 1.25rem;
                        margin: 0;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .sub-title{
                        color: rgba(0,0,0,.54);
                        font-size: .875rem;
                        line-height: 1rem;
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
}
</style>
