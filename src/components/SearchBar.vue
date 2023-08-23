<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default{
    components:{
        vueCustomScrollbar
    },
    data(){
        return{
            status:false,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        }
    },
    methods:{
        focus(){
            console.log('Hello');
            this.status = !this.status;
        }
    }
    
}
</script>

<template>

    <section class="search-bar position-relative d-none d-md-flex">
        <div :class="`search-area search-bar-width ${ status?'active':''}` " @click="focus">
            <input class="form-control shadow-none search-bar-width" type="text" placeholder="Search for a lead or deal">
            <svg class="search-icon" fill="#515253" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
            <vue-custom-scrollbar class="search-output"  :settings="settings">
                <div class="px-3">
                    
                </div>
            </vue-custom-scrollbar>
        </div>
        <div class="right-bar d-flex">
            <div class="item">
                <button class="btn bg-light fw-bold shadow-none"><img class="me-1" src="https://app.getpylon.com/img/gem.png" alt="">  Credits: 412</button>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>
.search-bar{
    border-bottom: 1px solid rgba(182, 182, 182, 0.4);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 768px){
        .search-bar-width{
            width:22rem;
        }
    }
    @media (min-width: 992px){
        .search-bar-width{
            width:30rem;
        }
    }
    @media (min-width: 1200px){
        .search-bar-width{
            width:40rem;
        }
    }
    .search-area{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin-top:6px;
        transition: all 0.3s;
        margin-left: 20px;
        &.active{
            background: #ffffff;
            background: white;
            z-index: 999;
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
            input{
                background:#ffffff;
            }
            .search-output{
                height: 604px;
                display: block;
                overflow: hidden;
            }
        }
        input{
            background: rgba(217, 229, 235, 0.3215686275);
            border: none;
            font-size: 1rem;
            padding: 11px 15px;
        }
        .search-icon{
            position: absolute;
            right: 20px;
            top: 12px;
        }
        .search-output{
            display: none;
        }
    }
    .right-bar{
        display: flex;
        justify-content:flex-start;
        align-items: center;
        margin-left: auto;
        .item{
            padding:8px 10px 8px 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
        }
    }
}
</style>