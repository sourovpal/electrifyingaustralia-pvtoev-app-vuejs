<script>
import { Skeletor } from 'vue-skeletor';
export default {
    components:{
        Skeletor
    }
}
</script>

<template>
    <div class="tbl-tr full-width" v-for="(_, index) in Array.from(Array(25).keys())" :key="index">

        <div style="width:4rem;margin-left: -7px;flex-grow: 1;" class="tbl-td full-width">

            <label class="custom-form-checkbox btn btn-floating btn-light">
                <Skeletor style="width:20px;height:20px;border-radius:3px;" />
            </label>

        </div>

        <div style="width:20rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:12rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" style="height:25px;border-radius:3px;" />
        </div>
        
        <div style="width:12rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor class="ms-auto" width="70%" />
        </div>
        
        <div style="width:15rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" /> 
            <!-- email -->
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
            <!-- city -->
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td full-width">
            <Skeletor width="70%" />
            <!-- country -->
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>
        
        <div style="width:10rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>
    </div>
</template>