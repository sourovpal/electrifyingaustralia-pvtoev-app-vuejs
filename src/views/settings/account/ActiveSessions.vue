<script>
import { UpdateProfilePassword } from '../../../actions/ProfileAction';
export default {
    props:{
        sessions:Array,
    },
    data() {
      return{
      }
    },
    methods:{
        async logoutOthersDevice(token_id, current=0){
            try{
                const res = await LogoutAction(token_id);
                try{
                    this.fetchProfileData(true);
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){}
            }catch{

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }
        }
    }
}
</script>
<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Active sessions</h2>
            </div>
        </div>
        <div class="col-lg-9 col-12">
            <div class="table-responsive-lg">
                <table class="table table-bordered table-sm table-striped table-hover table-light">
                    <thead>
                        <tr>
                            <th class="fw-bold py-1" width="25%" scope="col">Browser</th>
                            <th class="fw-bold py-1" width="20%" scope="col">Location</th>
                            <th class="fw-bold py-1" width="15%" scope="col">IP</th>
                            <th class="fw-bold py-1" width="15%" scope="col">Sign In</th>
                            <th class="fw-bold py-1" width="15%" scope="col">Last seen</th>
                            <th class="fw-bold py-1" width="5%" scope="col">User</th>
                            <th class="fw-bold py-1" width="5%" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(session, index) in sessions" :key="index">
                            <td scope="col" class="py-1">{{ session.browser }}</td>
                            <td scope="col" class="py-1">{{ session.location }}</td>
                            <td scope="col" class="py-1">{{ session.ip_address }}</td>
                            <td scope="col" class="py-1">{{ session.created_at }}</td>
                            <td scope="col" class="py-1">{{ session.updated_at }}</td>
                            <td scope="col" class="py-1"><span :class="`btn btn-sm py-0 px-1 fs-12px btn-${(session.is_active==1)?'danger':'warning'}`">{{ (session.is_active == 1)?'Current':'Other' }}</span></td>
                            <td scope="col" class="py-1">
                                <button :disabled="session.is_active" @click="logoutOthersDevice(session.id)" class="btn btn-sm btn-danger py-0 px-1" v-tippy='{ content:"Sign Out", placement : "top" }'>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="14px" viewBox="0 0 24 24" width="14px" fill="#ffffff"><path d="M0,0h24v24H0V0z" fill="none"></path> <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"></path></svg>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="sessions.length<=0">
                            <td colspan="7" scope="col" class="py-1 text-center">No active sessions found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>