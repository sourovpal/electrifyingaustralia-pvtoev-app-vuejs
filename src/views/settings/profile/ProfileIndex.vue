<script>
import {FetchProfile} from '../../../actions/ProfileAction';
import BasicDetailsSection from './components/BasicDetailsSection.vue';
import ContactSection from './components/ContactSection.vue';
import ProfileAvatarSection from './components/ProfileAvatarSection.vue';
import PreferencesSection from './components/PreferencesSection.vue';

export default {
    name:'ProfileIndex',
    components:{
        BasicDetailsSection,
        ContactSection,
        PreferencesSection,
        ProfileAvatarSection,
    },
    data() {
        return{
            fetchUser:{},
            isLoading:false,
            isError:false,
            map_base_layer_style:null,
        }
    },
    methods: {
        async fetchProfileData(){
            try{
                this.isError = false;
                this.isLoading = true;

                const res = await FetchProfile();
                const {user} = res;
                
                this.fetchUser = user;
                this.isLoading = false;

            }catch(error){

                this.isError = true;

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }

            }finally{
                this.isLoading = false;
            }
        },
    },
    mounted() {

        try{
            const user = this.$store.getters.getUser;
            const company = this.$store.getters.getCompany;
            this.fetchUser = {...user, ...company};
        }catch(error){}

        this.fetchProfileData();
    },
}

</script>

<template>
    <div class="content content-y-100vh">        
          
            <div class="content-header">
                <h1>Profile</h1>
            </div>
      
            <div class="content-body">
                <section class="">

                    <BasicDetailsSection :fetch-user="fetchUser" />
                    <hr class="mt-4 mb-5">

                    <ContactSection :fetch-user="fetchUser" />
                    <hr class="mt-4 mb-5">

                    <PreferencesSection :fetch-user="fetchUser" />
                    <hr class="mt-4 mb-5">

                    <ProfileAvatarSection :fetch-user="fetchUser" />
                    <br><br><br>

                </section>
            </div>
    </div>
</template>
