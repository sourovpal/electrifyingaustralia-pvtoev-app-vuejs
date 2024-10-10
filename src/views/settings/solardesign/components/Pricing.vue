
<template>

    <div class="row">
        <div class="col-lg-2 col-3">
            <div class="settings-group-header">
                <h2>Pricing</h2>
            </div>
        </div>
        <div class="col-lg-5 col-12">
                <div class="list-group pricing-list-group">
                    
                    <!-- <transition-group name="flip-list" tag="div">
                        <PricingRow>
                        </PricingRow>
                    </transition-group> -->


                    <div class="list-group-item border-top add-new-item-btn">
                        <div contenteditable="true" class="list-item-body text-muted">
                            Add New
                        </div>
                    </div>
                </div>
            <div class="mt-5">
                <button class="btn btn-primary fw-bold" @click="submitForm">Save Settings</button>
            </div>
        </div>
    </div>
</template>
<script>
import PricingRow from "./PricingRow.vue";
export default {
    components: {
        PricingRow
    },
    data() {
        return {
            items: [
                {
                    id:1,
                    description:'',
                    quantity:'',
                    unit_price:'',
                    total_price:'',
                },
                {
                    id:1,
                    description:'',
                    quantity:'',
                    unit_price:'',
                    total_price:'',
                },
            ],
            over: {},
            startLoc: 0,
            dragging: false,
            dragFrom: {} 
        }
    },
    methods: {
        startDrag(item, i, e) {
            this.startLoc = e.clientY;
            this.dragFrom = item;
        },
        finishDrag(item, pos) {
            this.items.splice(pos, 1);
            this.items.splice(this.over.pos, 0, item);
            this.over.item = this.dragFrom;
        },
        onDragOver(item, pos, e) {
            const dir = this.startLoc < e.clientY ? 'down' : 'up';
            setTimeout(() => {
                this.over = { item, pos, dir };
            }, 50);
        } 
    }
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
