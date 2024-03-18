<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {FetchProfile} from '../../../actions/ProfileAction';
import BasicDetails from './BasicDetails.vue';
import ContactInformation from './ContactInformation.vue';
import ProfilePhoto from './ProfilePhoto.vue';
import Preferences from './Preferences.vue';

export default {
    name:'ProfileIndex',
    data() {
        return{
            fetchUser:{},
            isFetching:false,
            map_base_layer_style:null,
        }
    },
    components:{
        CustomScrollbar,
        BasicDetails,
        ContactInformation,
        Preferences,
        ProfilePhoto,
    },
    methods: {
        async fetchProfileData(){
            try{
                this.isFetching = true;
                const res = await FetchProfile();
                const {user} = res;
                this.fetchUser = user;             
            }catch{
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
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
    },
}

</script>

<template>
    <div id="profile-index" class="content">        

        <CustomScrollbar thumbWidth="8" direction="horizontal">
          
            <div class="content-header">
                <h1>Profile</h1>
            </div>
      
            <div class="content-body">
                <section class="">
                    <BasicDetails :fetchUser="fetchUser" />
                    <hr class="mt-4 mb-5">
                    <ContactInformation :fetchUser="fetchUser" />
                    <hr class="mt-4 mb-5">
                    <Preferences :fetchUser="fetchUser" />
                    <hr class="mt-4 mb-5">
                    <ProfilePhoto :fetchUser="fetchUser" />
                    <br><br><br>
                </section>
            </div>
      
        </CustomScrollbar>
    </div>
</template>

<style>
    #profile-index .scrollbar__wrapper{
        height: 100vh;
    }
    #profile-index .scrollbar__wrapper .scrollbar__scroller{
        height: 100%;
    }
    #profile-index .scrollbar__wrapper .scrollbar__content.scrollbar__content--horizontal{
        display: block;
    }
</style>