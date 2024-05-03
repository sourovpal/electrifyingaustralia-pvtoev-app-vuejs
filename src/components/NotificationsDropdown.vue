<script>

export default{
    data(){
        return{
            status:false,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false,
                wheelSpeed:0.3,
            }
        }
    },
}

</script>


<template>

<div class="sidebar-notification">
    <div class="notification-header">
        Notifications
        <a class="notification-read-all" href="">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
        </a>
    </div>
    
    <div class="notification-body">
        <a href="" class="notifications-item unread">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item unread">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item unread">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item unread">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item unread">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
        <a href="" class="notifications-item ">
            <div class="notifications-content-wrapper">
                <div class="notifications-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none"></path> 
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm5-2.5H7v-1l1-1v-2.61C8 9.27 9.03 7.47 11 7v-.5c0-.57.43-1 1-1s1 .43 1 1V7c1.97.47 3 2.28 3 4.39V14l1 1v1z"></path>
                    </svg>
                </div> 
                <div class="notifications-content">
                    <div class="notifications-text">Ally mentioned you in a comment on Mr. Hello how are your to day, Vince 2216 NSW 22/07/05:00 PM</div> 
                    <time datetime="2023-07-21T13:20:44+00:00" title="Friday, July 21st 2023, 6:50:44 pm" class="notifications-time">
                        Yesterday 6:50 pm
                    </time>
                </div>
            </div>
            <div class="notifications-marker"></div>
        </a>
    </div>

    
</div>

</template>

<style lang="scss">

.sidebar-notification{
    width: 360px;
    height: 390px;
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
    .notification-header{
        padding: 0.5rem 1rem;
        background-color: #f5f7fa;
        font-size: 1.125rem;
        color: #3e4c59;
        font-weight: 500;
        margin-bottom: 0;
        border-radius: 0.25rem 0.25rem 0 0;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        .notification-read-all{
            display: flex;
            justify-content: center;
            align-items: center;
            svg{
                fill:#9f9f9f;
            }
            &:hover{
                svg{
                    fill:#7c7c7c;
                }
            }
        }
    }
    .notification-body{
        height:335px;
        overflow: hidden;
        padding:5px 5px;
        .notifications-item{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            padding: 0.75em 1rem 0.75rem 0.5rem;
            font-size: .875rem;
            color: #1f2933;
            border-radius: 0.25rem;
            background-color: transparent;
            transition: all 0.3s;
            &.unread{
                .notifications-icon svg{
                    fill:#007bff !important;
                }
                .notifications-text{
                    color: #1f2933 !important;
                    font-weight: 600;
                }
                .notifications-time{
                    color: #007ee5 !important;
                }
                .notifications-marker{
                    height: 0.75rem;
                    width: 0.75rem;
                    background-color: #007ee5;
                    border-radius: 50%;
                    display: inline-block;
                    top: 0.125rem;
                    position: relative;
                }
                .notifications-content-wrapper{
                    width: calc(100% - 1.5rem) !important;
                }
            }
            &:hover{
                background-color: #ecf2f6;
            }
            .notifications-content-wrapper{
                width: 100%;
                color: #7b8794;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                align-items: flex-start;
                .notifications-icon svg{
                    fill:#9aa5b1;
                    margin-right:.5rem;
                }
                .notifications-text{
                    overflow: hidden;
                    line-height: 1.15;
                    color: #7b8794;
                    font-weight: 600;
                    font-size:14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .notifications-time{
                    font-size:14px;
                    color: #7b8794;
                    font-weight: 600;
                    font-size: .8125rem;
                }
            }            
        }
    }
}



</style>