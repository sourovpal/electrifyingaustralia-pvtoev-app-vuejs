<script>
import ProfileDropdown from './ProfileDropdown.vue';
import NotificationsDropdown from './NotificationsDropdown.vue';

export default{
    components: { ProfileDropdown, NotificationsDropdown }
}
</script>

<template>
    <nav class="navbar navbar-vertical d-none d-md-flex shadow-none">
        <div class="navbar-top">
            <div class="nav-item">
                <router-link to="/app" class="navbar-brand nav-link" data-mdb-toggle="tooltip" data-mdb-placement="right" title="Tooltip on right">
                    <svg  width="26" height="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3L2 12H5V20H19V12H22L12 3M11.5 18V14H9L12.5 7V11H15L11.5 18Z" /></svg>
                </router-link>
            </div>
            
            <div class="nav-item">
                <router-link to="/platform" class="navbar-brand nav-link">
                    <svg  xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z"></path></svg>
                </router-link>
            </div>

            <div class="nav-item">
                <router-link to="/map" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                </router-link>
            </div>

            <div class="nav-item">
                <router-link to="/library" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path opacity="0.3" d="M6,6v10h16V6H6z"></path> <path d="M2,6H0v5h0l0,9c0,1.1,0.9,2,2,2h18v-2H2V6z M22,4h-8l-2-2H6C4.9,2,4,2.9,4,4l0,12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C24,4.9,23.1,4,22,4z M22,6v10H6V6H22z"></path></svg>
                </router-link>
            </div>
            
            <div class="nav-item">
                <router-link to="/payments" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"></path></svg>
                </router-link>
            </div>

        </div>
        <div class="navbar-bottom">

            <div class="nav-item">
                <a href="" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z"></path><polygon points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93"></polygon><polygon points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"></polygon></g></g></svg>
                </a>
            </div>

            <div class="nav-item">
                <a href="" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"></path> <path fill="none" d="M0 0h24v24H0V0z"></path></svg>
                </a>
            </div>

            <div class="nav-item">
                <a href="" class="navbar-brand nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z"></path> <path fill="none" d="M0 0h24v24H0V0z"></path></svg>
                </a>
            </div>

            <div class="nav-item">
                <a href="" class="navbar-brand nav-link">
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>
                </a>
            </div>

            <div class="position-relative">
                <div class="notifications__main-marker"></div>
                <div class="nav-item" data-mdb-toggle="dropdown" aria-expanded="false">
                    <a class="navbar-brand nav-link cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000"><path fill="none" d="M0 0h24v24H0V0z"></path> <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg>
                    </a>
                </div>
                <NotificationsDropdown class="dropdown-menu dropdown-menu-end" />
            </div>

            <div class="position-relative">
                <div class="nav-item" data-mdb-toggle="dropdown" aria-expanded="false">
                    <a class="navbar-brand nav-link cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                    </a>
                </div>
                <ProfileDropdown class="dropdown-menu dropdown-menu-end" />
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
.notifications__main-marker {
    background-color: #007ee5;
    display: block;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    width: 0.75rem;
    z-index: 2;
}
.navbar.navbar-vertical{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #f5f5f5;
    width: 4rem;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    z-index: 999;
    @media screen and (max-width:991px) {
        width:3rem;
    }
    .navbar-top,
    .navbar-bottom{

        .nav-item{

            width: 4rem;
            height: 3.25rem;

            .nav-link{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height:100%;
                position: relative;
                &::after{
                    content: "";
                    width: 38px;
                    height: 38px;
                    background-color: transparent;
                    top: 50%;
                    left: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%) scale(0.6);
                    border-radius: 50%;
                    z-index: -1;
                    transition: all 0.2s;
                }
                &:hover::after{
                    background-color: #e4eaef;
                    transform: translate(-50%, -50%) scale(1);
                }
                &.router-link-active{
                    svg{
                        fill:#007ee5;
                    }
                }
                svg{
                    fill:#616e7c;
                }
            }
        }
    }
    .navbar-top{

    }
    .navbar-bottom{

    }
}

</style>