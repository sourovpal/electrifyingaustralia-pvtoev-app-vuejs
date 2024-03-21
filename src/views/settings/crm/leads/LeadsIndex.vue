<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import LeadStatuses from './LeadStatuses.vue';
import DealPipelines from './DealPipelines.vue';
import {FetchLeadStatus, UpdateLeadStatus, FetchLeadStatusAndDealPiplines} from '../../../../actions/CrmLeads';

export default {
  name:'ProfileIndex',
    data() {
      return{
        lead_statuses:[
            { name: "Example Status",  id: 0 , status:1 }
        ]
      }
    },
    components:{
        CustomScrollbar,
        LeadStatuses,
        DealPipelines,
    },
    methods:{
        async fetchLeadStatusAndDealPiplinesHandler(){
            try{
                const res = await FetchLeadStatusAndDealPiplines();

                try{
                    const {lead_statuses} = res;
                    if(lead_statuses.length > 0){
                        this.lead_statuses = lead_statuses;
                    }
                }catch(error){
                    throw new Error(error.message);
                }

            }catch(error){
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }
        }
    },
    mounted() {
        this.fetchLeadStatusAndDealPiplinesHandler();
    },
  }
  
</script>

<template>
    <div class="content add-custom-scrollbar">
        <CustomScrollbar thumbWidth="8">
            <div class="content-header">
                <h1>Pipelines & Statuses</h1>
            </div>
            
            <div class="content-body">
                <section class="">
            
                    <DealPipelines/>
            
                    <hr class="mt-4 mb-5">
            
                    <LeadStatuses :lead_statuses="lead_statuses" />
            
            
                    <hr class="mt-4 mb-5">
            
                    <div class="row">
                        <div class="col-lg-3 col-3">
                            <div class="settings-group-header">
                                <h2>Lead Custom Properties</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-9">
                            <a class="fw-bold fs-14px" href="">
                                Edit Lead custom properties
                                <span class="icon">
                                    <svg  fill="#3b71ca" height="18" viewBox="0 0 24 24" width="18">
                                        <path  d="M0 0h24v24H0z" fill="none"></path>
                                        <path  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
            
                    <br><br><br>
                </section>
            </div>
        </CustomScrollbar>
    </div>
</template>
<style>
.ql-container{
    height:250px;
}
</style>
<style lang="scss" scoped>
.section-box{
    margin-bottom:20px;
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