<script>
    import {Skeletor} from 'vue-skeletor';

    export default {
        props:['colSize'],
        inheritAttrs:false,
        components:{
            Skeletor
        }
    }
</script>

<template>
    <div class="pip-item" v-for="(item, index) in colSize??10" :key="index">
        <h5 class="pip-title">
            <Skeletor style="width:75%;height:10px;" />
        </h5>
        <p class="pip-sub-title">
            <Skeletor style="width:85%;height:8px;" />
            <Skeletor style="width:65%;height:8px;" />
        </p>
        <div class="pip-user d-flex justify-content-between align-items-center">
            <div>
                <img class="pip-user-avatar" src="https://www.gravatar.com/avatar/31abcedd82c87dd621142af7f4dbe722?s=64&d=mp&r=PG" alt="">
                <span class="pip-value">$0.00</span>
            </div>
            <div class="fs-16px star-value d-flex justify-content-start align-items-center">
                <span class="me-1" style="color:#dddddd;">0</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#dddddd" class="icon icon--star icon--inline"><path d="M0 0h24v24H0z" fill="none"></path><path d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            </div>
        </div>
        <div class="pip-source">
            <Skeletor style="width:85%;height:6px;" />
        </div>
    </div>

</template>
    
<style scoped lang="scss">
    .pip-item{
        background-color: #ffffff;
        border-radius: 4px;
        margin: 15px 0px;
        padding: 13px;
        height: 125px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        .pip-title{
            font-size: 16px;
            font-weight: 700;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
            margin-bottom: 5px;
            color:#007ee5;
        }
        .pip-sub-title{
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; 
        }
        .pip-user{
            line-height:18px;
            .pip-user-avatar{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #f1f1f1;
                object-fit: cover;
            }
            .pip-value{
                color: #1f2933;
                font-size: .875rem;
                font-weight: 700;
                line-height: 1.5rem;
                margin-left: .5rem;
            }
            .star-value{
                color: #de911d;
            }
        }
        .pip-source{
            font-size: 14px;
            font-weight: 500;
            color: #696767;
            line-height: 20px;   
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
        }
    }
</style>