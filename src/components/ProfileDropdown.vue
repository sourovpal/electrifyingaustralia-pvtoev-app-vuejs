<script>

export default{
    props:{
        confirmDialog:{}
    },
    data() {
        return {
        }
    },
}
</script>


<template>

    
    
<div class="sidebar-profile pb-1">    
    <div class="user-menu-profile">
        <div class="user-menu-email">connections@electrifyingaustralia.com.au</div> 
        <div class="user-menu-role">Bijoy Chowdhury · Admin</div>
    </div>
    <a href="/settings/refer" class="dropdown-item">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
        Refer a friend
    </a>
    <hr class="my-2">
    <router-link to="/settings" class="dropdown-item">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none"></path> <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path></svg>
        Settings
    </router-link> 
    <a href="/settings/team-members" class="dropdown-item">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none"></path> <path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"></path></svg>
        Team members
    </a> 
    <a href="/settings/integrations" class="dropdown-item">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></svg>
        Integrations
    </a> 
    <a href="/settings/billing" class="dropdown-item">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></svg>
        Billing
    </a> 
    <hr class="mt-2 mb-1"> 
    <button @click="confirmDialog(true)" class="dropdown-item user-menu__logout">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none"></path> <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"></path></svg>
        Log out
    </button>
</div>

</template>

<style lang="scss">

.sidebar-profile{
    width: 255px;
    background: rgb(255, 255, 255);
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    top: auto !important;
    left: calc(4rem + 3px) !important;
    bottom: 6px !important;
    border-radius: 5px !important;
    z-index: 999999999 !important;
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12) !important;
    @media screen and (max-width: 991px){
        left: calc(3rem + 12px) !important;
    }
    .user-menu-profile{
        padding: 1rem;
        font-size: .857rem;
        color: rgba(0,0,0,.54);
        font-weight: 600;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #e4e7eb;
        .user-menu-email{
            color: #007ee5;
            margin-bottom: 0.25rem;
            text-overflow: ellipsis;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            font-size: .8125rem;
        }
        .user-menu-role{
            font-size: .8125rem;
            color: rgba(0,0,0,.54);
            font-weight: 600;
        }
    }
    .dropdown-item{
        font-size: .8125rem;
        padding: 0.5rem 1rem;
        font-weight: 600;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        gap: 0.5rem;
        color: #616e7c;
    }
    &::after{
        content: "";
        position: absolute;
        left: -6px;
        bottom: 16px;
        transform: rotate(45deg);
        border-top-color: transparent;
        width: 12px;
        height: 12px;
        background: white;
        border-left: 1px solid #c7c7c7;
        border-bottom: 1px solid #c7c7c7;
        z-index: -1;
    }
}



</style>