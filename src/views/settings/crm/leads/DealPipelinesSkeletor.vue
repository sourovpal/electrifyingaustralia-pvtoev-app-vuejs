<script>
import { Skeletor } from 'vue-skeletor';
export default {
    components:{
        Skeletor
    },
}
</script>

<template>
    <div class="section-box d-flex justify-content-start align-items-center" v-for="(item, index) in Array.from(Array(8).keys())" :key="index">
        <div class="card pipeline-card">
            <div class="card-head d-flex justify-content-between align-items-center px-3">
                <div class="d-flex justify-content-start align-items-center">
                    <Skeletor width="160" height="27" />
                    <Skeletor class="ms-2" width="27" height="27" style="border-radius: 100%;" />
                </div>
                <div>
                    <Skeletor class="ms-2" style="border-radius:8px;" width="80" height="27" />
                </div>
            </div>
            <div class="card-body d-flex justify-content-between align-items-center px-3">
                <div class="w-50">
                    <span class="time"><Skeletor width="75%" height="10" /></span>
                </div>
                <div class="d-flex justify-content-end align-items-center w-50">
                    <Skeletor width="45%" height="10" />
                    <div class="ms-2">
                        <Skeletor style="margin-bottom:2px;border-radius: 100%;" width="4" height="4" />
                        <Skeletor style="margin-bottom:2px;border-radius: 100%;" width="4" height="4" />
                        <Skeletor width="4" height="4" style="border-radius: 100%;" />
                    </div>
                </div>
            </div>
        </div>
        <div class="sorted-arrow">
            <button class="up" :disabled="true">
                <svg  fill="#838383" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect  fill="none" height="24" width="24"></rect><path  d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"></path></svg>
            </button>
            <button class="down" :disabled="true">
                <svg  fill="#838383" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect  fill="none" height="24" width="24"></rect><path  d="M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"></path></svg>
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .section-box{
        margin-bottom:14px;
        .pipeline-card{
            width:90%;
            border-radius:3px;
            box-shadow: rgb(9 30 66 / 7%) 0px 1px 1px, rgb(5 21 48 / 9%) 0px 0px 1px 1px;
            .card-head {
                padding-top: 13px;
                padding-bottom: 13px;
                .edit-pipeline-btn{
                    font-size:10px;
                    border-width:1px;
                }
            }
            .card-body{
                background-color: whitesmoke;
                padding-top: 13px;
                padding-bottom: 13px;
                .time{
                    font-size:14px;
                    color:#929292;
                }
                .edit-custom-pro-btn{
                    font-size:14px;
                    text-decoration: underline;
                    color:#838383;
                }
                .drop-down-action{
                    outline: none;
                    background:none;
                    border:none;
                    cursor: pointer;
                    margin-left:10px;
                }
            }
        }
    
        .sorted-arrow{
            display: flex;
            flex-direction: column;
            button{
                border:none;
                outline:none;
                background-color: transparent;
                margin-bottom:12px;
                padding: 0px 10px;
                svg{
                    width:18px;
                    height:18px;
                }
                &[disabled]{
                    opacity:.4!important;
                    cursor: no-drop;
                }
            }
        }
    }
    
    .list-group{
        .add-new-lead-status{
            border-bottom-left-radius:3px;
            border-bottom-right-radius:3px;
            border-top-left-radius:0;
            border-top-right-radius:0;
            cursor: pointer;
            font-size:14px;
            background-color: #f2f2f2 !important;
        }
    }
    </style>