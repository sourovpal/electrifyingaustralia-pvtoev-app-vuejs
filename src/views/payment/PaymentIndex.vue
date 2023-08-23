<script>
export default {
    name:'PaymentIndex',
    data(){
        return {
            status:false,
        }
    },
    methods:{
    }
}
</script>

<template>
<section class="payment-section">
    <div class="container">
        <div class="payment-content">

            <nav class="navbar navbar-mobile shadow-0">
                <div class="navbar-left d-flex d-md-none">
                    <div class="nav-item">
                        <a href="" class="navbar-brand nav-link align-items-start">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                        </a>
                    </div>
                    <div class="title">Leads</div>
                </div>

                <div class="navbar-right ms-auto">
                    
                    <div class="nav-item d-flex d-md-none">
                        <a href="" class="navbar-brand nav-link align-items-end">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                        </a>
                    </div>

                    <div class="nav-item d-flex d-md-none">
                        <a href="" class="navbar-brand nav-link align-items-end me-0">
                            <svg  xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g ><rect  fill="none" height="24" width="24"></rect></g><g ><path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path></g></svg>
                        </a>
                    </div>

                    <div class="d-none d-md-flex">
                        <button class="btn px-1 fw-bold shadow-none" style=""><img class="me-1" src="https://app.getpylon.com/img/gem.png" alt=""> Credits: 412</button>
                    </div>

                </div>
            </nav>

            <div class="row">
                <div class="col-lg-10 d-flex pay-area mx-auto position-relative">
                    <div class="col-left">
                        <div  class="card shadow-0 pay-gat">
                            <div  class="splash__title">Payment gateway</div> 
                            <h1>Collect payments</h1> 
                            <p  class="splash__desc">
                                Enable payment collection directly from your solar proposal.
                            </p> 
                            <a  href="/settings/payments/setup" class="btn btn-primary fw-bold text-capitalize">
                                Register my team
                            </a>
                            <p  class="splash__small">
                                By registering your team, you agree to our <a  href="https://observer.getpylon.com/terms" target="_blank">Terms of Use</a> and the <a  href="https://stripe.com/au/connect-account/legal" target="_blank">Stripe Connected Account Agreement</a>.
                            </p>
                        </div>
                    </div>
                    <div class="col-right">
                        <div class="card shadow-1">
                            <div class="video-thumbnail">
                                <img src="https://static.getpylon.com/images/video/payment-gateway-thumbnail.jpg" class="w-100"> 
                                <div class="duration">0:17</div>
                                <div class="video-thumbnail__overlay">
                                    <div class="video-thumbnail__icon">
                                        <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" class="icon--shadowed">
                                            <path d="M8 5v14l11-7z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>


    </div>
</section>
</template>

<style lang="scss">
.payment-section{
    height:100vh;
    @media screen and (min-width:768px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .link{
        font-size:15px;
    }
    .payment-content{
        padding-left: 67.5px;
        @media screen and (max-width:767px) {
            padding-left: 0;
        }
        .pay-area{
            @media screen and (max-width:767px) {
                flex-direction: column;
            }
        }
        .col-left,
        .col-right{
            width:50%;
        }
        .col-left{
            margin-right:45px;
            @media screen and (max-width:767px) {
                width:100%;
                margin-right:0px;
                margin-top:80px;
            }
            .pay-gat{
                .splash__title{
                    color: #007ee5;
                    text-transform: uppercase;
                    font-size: .875rem;
                    font-weight: 700;
                }
                .splash__desc{
                    font-size: .875rem;
                    min-height: 7rem;
                }
                .splash__small{
                    font-size: .75rem;
                    margin-top: 1rem;
                    color: #616e7c;
                }
            }
        }
        .col-right{
            position: relative;
            margin-left:45px;
            @media screen and (max-width:767px) {
                width:100%;
                margin-top: 30px;
                margin-left:0px;
                margin-bottom:100px;
            }
            img{
                height:272px;
            }
            .duration{
                position: absolute;
                background-color: #1f2933;
                color: #fff;
                font-size: .8125rem;
                padding: 3px 4px;
                border-radius: 0.125rem;
                line-height: 1.1;
                bottom: 0.5rem;
                font-weight: 600;
                right: 0.5rem;
            }
            .video-thumbnail__overlay {
                position: absolute;
                width: 100%;
                top: 0;
                height: 100%;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                .video-thumbnail__icon{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    justify-content: center;
                    align-items: center;
                    transform: translate(-50%, -50%);
                    transition: all 0.3s;
                    opacity:0; 
                    cursor: pointer;
                }
                &:hover{
                    .video-thumbnail__icon{
                        opacity: 1;
                    }
                }  
            }
        }
    }
}
</style>