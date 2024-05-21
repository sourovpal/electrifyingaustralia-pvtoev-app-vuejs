<script>
export default {
    props:['data'],
    inheritAttrs:false
}
</script>

<template>
    <a v-for="(item, index) in data??[]" :key="index" class="" href="" draggable="true">
        <div class="pip-item">
            <h5 class="pip-title">{{ item?.contact?.full_name??'Example More than 100 million people' }}</h5>
            <p class="pip-sub-title">{{ item.title??'More than 100 million people across 185 countries use ChatGPT weekly to learn' }}</p>
            <div class="pip-user d-flex justify-content-between align-items-center">
                <div>
                    <img v-if="item.owner" class="pip-user-avatar" :src="item?.owner?.profile_avatar" alt="">
                    <img v-else class="pip-user-avatar" src="https://www.gravatar.com/avatar/31abcedd82c87dd621142af7f4dbe722?s=64&d=mp&r=PG" alt="">
                    <span class="pip-value">$-</span>
                </div>
                <div class="fs-16px star-value d-flex justify-content-start align-items-center">
                    <span class="me-1">{{ item.confidence }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#de911d" class="icon icon--star icon--inline"><path d="M0 0h24v24H0z" fill="none"></path><path d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                </div>
            </div>
            <div class="pip-source text-soft">{{ item?.source?.title??'Lead source name' }}</div>
        </div>
    </a>
    
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
            line-height: 20px;   
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 225px;
        }
    }
</style>