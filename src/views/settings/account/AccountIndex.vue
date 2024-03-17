<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {UpdateProfilePassword, FetchProfile, UpdateProfile} from '../../../actions/ProfileAction';
import {LogoutAction} from '../../../actions/AuthAction';
import ChangePassword from './ChangePassword.vue';
import EmailAddress from './EmailAddress.vue';
import ActiveSessions from './ActiveSessions.vue';

export default {
    name:'AccountIndex',
    data() {
      return{
        errors:{},
        user:{},
        activeSessions:[],
        isFetching:false,        
        isPasswordSubmit:false,
      }
    },
    components:{
        CustomScrollbar,
        ChangePassword,
        EmailAddress,
        ActiveSessions,
    },
    methods: {
        async fetchProfileData(is_token=false){
            try{
                this.isFetching = true;
                const res = await FetchProfile(1);
                const {user, active_users} = res;
                if(is_token){
                    this.activeSessions = active_users;              
                }else{
                    this.user = user;
                    this.activeSessions = active_users;              
                }
            }catch{
                try{
                    var data = error.response.data;
                    this.$toast[data.type](data.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isFetching = false;
            }
        },        
    },
    mounted() {
        this.fetchProfileData();
        setInterval(()=>{
            this.fetchProfileData(true);
        },10000);
    },
  }
  
</script>

<template>

    <div id="account-index" class="content">
        <CustomScrollbar thumbWidth="10" direction="horizontal">
            <div class="content-header">
                <h1>Account</h1>
            </div>
        
            <div class="content-body">
                <section class="">
        
                    <email-address :user="user" />
                    
                    <hr class="mt-4 mb-5">
                    
                    <change-password/>
        
                    <hr class="mt-4 mb-5">
        
                    <active-sessions :sessions="activeSessions"/>
        
                    <br><br><br>
                </section>
            </div>            
        </CustomScrollbar>
    </div>

</template>

<style>
    #account-index .scrollbar__wrapper{
        height: 100vh;
    }
    #account-index .scrollbar__wrapper .scrollbar__scroller{
        height: 100%;
    }
    #account-index .scrollbar__wrapper .scrollbar__content.scrollbar__content--horizontal{
        display: block;
    }
</style>