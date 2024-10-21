<script setup>
    
</script>

<template>
    <section class="action-bar">
        <slot></slot>
    </section>
</template>

<style lang="scss">
    .action-bar {
        border-bottom: 1px solid rgba(182, 182, 182, 0.4);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 2px 0px;

        .checkbox {
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .checkbox__input {
            position: absolute;
            width: 1.375em;
            height: 1.375em;
            opacity: 0;
            cursor: pointer;
        }

        .checkbox__input:checked+.checkbox__icon .tick {
            stroke-dashoffset: 0;
        }

        .checkbox__icon {
            width: 1.375em;
            height: 1.375em;
            flex-shrink: 0;
            overflow: visible;
        }

        .checkbox__icon .tick {
            stroke-dasharray: 20px;
            stroke-dashoffset: 20px;
            transition: stroke-dashoffset 0.2s ease-out;
        }

        .checkbox__label {
            margin-left: 0.5em;
        }

        .right-bar,
        .left-bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
</style>