<script>
export default{
    props: {
        placeholderText: {
            default: 'Search for a lead or deal',
            required: false
        }
    },
    data(){
        return{
            search:'',
            searchModel:false,
        }
    },
    methods:{
        searchModelHandle(event){
            if(!event.target.closest('.search-area')){
                this.searchModel = false;
            }else if(this.search.length > 0){
                this.searchModel = true;
            }
        }
    },
    watch:{
        search:function(current){
            (current.length > 0)?this.searchModel=true:this.searchModel=false;
        },
    },
    mounted() {
        this.$el.addEventListener('click', this.searchModelHandle);
    },
    destroyed() {
        this.$el.removeEventListener('click', this.searchModelHandle);
    }
}
</script>

<template>

    <section class="search-bar position-relative d-none d-md-flex">
        <div :class="`search-area search-bar-width ${ searchModel?'active':''}` ">
            <input 
            v-model="search"
            class="form-control shadow-none search-bar-width" 
            type="text" 
            :placeholder="placeholderText">
            <svg class="search-icon svg-5" fill="#515253" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
            <div class="search-output">
                <div class="px-3">
                    
                </div>
            </div>
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
    margin-left: 3rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 768px){
        .search-bar-width{
            width:22rem;
        }
    }
    @media (min-width: 992px){
        margin-left: 4rem;
        .search-bar-width{
            width:30rem;
        }
    }
    @media (min-width: 1200px){
        margin-left: 0;
        .search-bar-width{
            width:40rem;
        }
    }
    .search-area{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin-top:8px;
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
            padding: 8px 15px;
        }
        .search-icon{
            position: absolute;
            right: 20px;
            top: 9px;
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
