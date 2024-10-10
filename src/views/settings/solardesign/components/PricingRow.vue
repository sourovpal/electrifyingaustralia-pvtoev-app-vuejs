
<template>

<div class="list-group-item " :class="isActiveSection?'is-active':''" @click="isActiveSection=true" @blur="isActiveSection=false">
    <div class="handle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    </div>
    <div class="list-item-body">
        <div class="row">

            <div 
            @blur="isActiveSection=false" 
            v-html="item.description" 
            :class="item.description != ''?'active':''" 
            data-placeholder="Description"  
            contenteditable="true" class="col-lg-6"></div>

            <div 
            @blur="isActiveSection=false" 
            v-html="item.quantity"    
            :class="item.quantity > -1?'active':''" 
            data-placeholder="Quantity"  
            contenteditable="true"    
            class="placeholder-right col-lg-2"></div>
            
            <div 
            @blur="isActiveSection=false" 
            v-html="item.unit_price" 
            :class="item.unit_price > -1?'active':''" 
            data-placeholder="Unit price" 
            contenteditable="true"   
            class="placeholder-right col-lg-2"></div>

            <div 
            @blur="isActiveSection=false" 
            v-html="item.total_price" 
            :class="item.total_price > -1?'active':''" 
            data-placeholder="Total price" 
            contenteditable="true"  
            class="placeholder-right col-lg-2"></div>

        </div>
    </div>
    <div class="list-item-action">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    </div>
</div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            isActiveSection:false,
        };
    },
    props:['item'],
    methods:{
        changeActive(e){
            // console.log(this.props.item);
        }
    }
}
  
</script>

<style lang="scss" scoped>

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
    &.is-active,
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
                &.active::before,
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
    &.is-active{
        .list-item-body{
            .row{
                div{
                    border-right:1px solid #dddddd;
                    &:first-child,
                    &:last-child{
                        border-right-color:transparent ;
                    }
                }
            }
        }
    }
}
    
</style>