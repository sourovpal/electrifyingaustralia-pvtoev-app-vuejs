<script setup>
import PvToEvLogo from '@assets/logo/pvtoev.png'
</script>

<template>
    <nav class="navbar navbar-mobile d-flex shadow-0 border-bottom px-2">
        <div class="navbar-left">
            <div class="nav-logo">
                <img class="logo" :src="PvToEvLogo" alt="">
            </div>
        </div>
        <div class="navbar-right">
            <div>
                <button class="toolbar-btn btn btn-light btn-floating me-3">
                    <font-awesome-icon icon="fas fa-search"></font-awesome-icon>
                </button>
            </div>
            <div>
                <button class="toolbar-btn btn btn-light btn-floating">
                    <font-awesome-icon icon="fas fa-user"></font-awesome-icon>
                </button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    .nav-logo{
        width:100px;
        img{
            width:100%;
            object-fit: contain;
        }
    }
    .navbar.navbar-mobile {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #ffffff;
        width: 100%;
        height: 3.5rem;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        z-index: 99;

        .navbar-left {

            display: flex;
            justify-content: flex-start;
            align-items: center;

            .title {

                font-size: 1.375rem;
                font-weight: 600;

            }
        }

        .navbar-right {

            display: flex;
            justify-content: flex-start;
            align-items: center;

            .title {
                font-size: 1.375rem;
                font-weight: 600;

            }
        }
    }
</style>