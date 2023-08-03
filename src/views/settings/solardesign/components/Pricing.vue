
<template>

    <div class="row">
        <div class="col-lg-3 col-3">
            <div class="settings-group-header">
                <h2>Pricing</h2>
            </div>
        </div>
        <div class="col-lg-8 col-9">
                <div class="list-group pricing-list-group">
                    <draggable tag="div" :list="element" item-key="name" class="" handle=".handle" @start="dragging=true" @end="dragging=false">
                        <template #item="{ element }" >
                            <div class="list-group-item " :key="element.name">
                                <div class="handle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                </div>
                                <div class="list-item-body">
                                    <div class="row">
                                        <div contenteditable="true" data-placeholder="Description" class=" col-lg-6"></div>
                                        <div contenteditable="true" data-placeholder="Quantity" class="placeholder-right col-lg-2"></div>
                                        <div contenteditable="true" data-placeholder="Unit price" class="placeholder-right col-lg-2"></div>
                                        <div contenteditable="true" data-placeholder="Total price" class="placeholder-right col-lg-2"></div>
                                    </div>
                                </div>
                                <div class="list-item-action">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                </div>
                            </div>
                        </template>
                    </draggable>
                    <div class="list-group-item border-top add-new-item-btn">
                        <div contenteditable="true" class="list-item-body text-muted">
                            Add New
                        </div>
                    </div>
                </div>
            
            <div class="mt-5">
                <button class="btn btn-primary fw-bold">Save Settings</button>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    data() {
        return {
            element:[
                { name: "Google", text: "", id: 0 },
                { name: "Facebook", text: "", id: 1 },
                { name: "Youtube", text: "", id: 2 }
            ],
            dragging: false
        };
    },


  }
  
</script>

<style lang="scss" scoped>
.pricing-list-group{
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
    .list-group-item{
        &:first-child{
            border-top-left-radius:5px;
            border-top-right-radius:5px;
        }
        &:last-child{
            border-bottom-left-radius:5px;
            border-bottom-right-radius:5px;
            border-bottom:0px;
        }
        border-top: 0;
        border-left: 0;
        border-right: 0;
        position: relative;
        padding:0 50px 0 30px !important;
        &.active,
        &:hover{
            background-color: #ffffff !important;
        }
        .handle{
            position: absolute;
            top: 50%;
            left: 5px;
            opacity: 0;
            transition:opacity 0.2s ease-in-out;
            transform: translateY(-50%) scale(.7);
            cursor: all-scroll;
            svg{
                fill:#878787;
            }
        }
        .list-item-action{
            position: absolute;
            top: 50%;
            right: 8px;
            opacity: 0;
            transition:opacity 0.2s ease-in-out;
            transform: translateY(-50%) scale(.8);
            cursor: pointer;
            svg{
                fill:#878787;
            }
        }
        .list-item-body{
            cursor: text;
            .row{
                div{
                    outline: none;
                    white-space: nowrap;
                    overflow: hidden;
                    position: relative;
                    border-right:1px solid transparent;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    &:last-child{
                        border-right:0px;
                    }
                    &::before{
                        content: attr(data-placeholder);
                        position: absolute;
                        left:12px;
                        top:50%;
                        transform: translateY(-50%);
                        color:#b8babb;
                        font-size:15px;
                    }
                    &.placeholder-right{
                        text-align: right;
                        &::before{
                            right:12px !important;
                            text-align: right;
                        }
                    }
                    &:focus:before{
                        opacity: 0;
                    }
                }
            }
        }
        &:hover{
            .list-item-action,
            .handle{
                opacity: 1;
            }
        }
        &.active{
            .list-item-body{
                .row{
                    div{
                        border-right:1px solid #dddddd;
                    }
                }
            }
        }
    }
}

</style>