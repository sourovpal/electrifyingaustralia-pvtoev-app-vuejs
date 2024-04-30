<script>
import {UpdateProfilePassword, FetchProfile, UpdateProfile} from '../../../actions/ProfileAction';
import {LogoutAction} from '../../../actions/AuthAction';
import ChangePassword from './components/ChangePassword.vue';
import EmailAddress from './components/EmailAddress.vue';
import ActiveSessions from './components/ActiveSessions.vue';

export default {
    name:'AccountIndex',
    data() {
      return{
        errors:{},
        user:{},
        sessions:[],
        isFetching:false,        
        isPasswordSubmit:false,
        intervalId:null,
      }
    },
    components:{
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
                    this.sessions = active_users;              
                }else{
                    this.user = user;
                    this.sessions = active_users;              
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
        this.intervalId = setInterval(()=>{
            this.fetchProfileData(true);
        },10000);
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    }
  }
  
</script>

<template>

    <div id="account-index" class="content content-y-100vh">
            <div class="content-header">
                <h1>Account</h1>
            </div>
        
            <div class="content-body">
                <section class="">
        
                    <email-address :user="user" />
                    
                    <hr class="mt-4 mb-5">
                    
                    <change-password/>
        
                    <hr class="mt-4 mb-5">
        
                    <active-sessions :sessions="sessions"/>
        
                    <br><br><br>
                </section>
            </div>            
    </div>

</template>
