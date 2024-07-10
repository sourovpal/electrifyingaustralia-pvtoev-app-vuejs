<script>

</script>

<template>
    <nav class="navbar navbar-mobile d-flex d-md-none shadow-0 border-bottom">
        <div class="navbar-left">
            <div class="nav-item">
                <a href="" class="navbar-brand nav-link align-items-start">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                </a>
            </div>
            <!-- <div class="title">Leads</div> -->
        </div>
        <div class="navbar-right">
            
            <div class="nav-item">
                <a href="" class="navbar-brand nav-link align-items-end">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                </a>
            </div>

            <div class="nav-item">
                <a href="" class="navbar-brand nav-link align-items-end">
                    <svg  xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g ><rect  fill="none" height="24" width="24"></rect></g><g ><path  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path></g></svg>
                </a>
            </div>

        </div>
    </nav>
</template>

<style lang="scss">
.navbar.navbar-mobile{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
    width: 100%;
    height:4rem;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    padding: 8px 16px;
    z-index: 99;
    .navbar-left{

        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        .nav-item{

            width: 2.5rem;
            height: 3rem;

            .nav-link{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height:100%;
                position: relative;
                svg{
                    fill:#0d1620;
                }
            }
        }

        
        .title{

            font-size:1.375rem;
            font-weight: 600;
            
        }
    }

    .navbar-right{
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        .nav-item{

            width: 3rem;
            height: 3rem;

            .nav-link{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height:100%;
                position: relative;
                svg{
                    fill:#0d1620;
                }
            }
        }
        
        .title{

            font-size:1.375rem;
            font-weight: 600;
            
        }
    }
}

</style>
