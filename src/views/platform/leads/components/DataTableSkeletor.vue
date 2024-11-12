<script setup>
    import { Skeletor } from 'vue-skeletor';
    import { useLeadsStore, usePlatformStore } from '@stores';
    import { computed } from 'vue';
    const leadsStore = useLeadsStore();
    const headerAttributes = computed(() => leadsStore.getHeaders);
</script>

<template>
    <div class="tbl-tr full-width"
        v-for="(_, index) in Array.from(Array(25).keys())"
        :key="index">

        <div style="width:4rem;margin-left: -7px;flex-grow: 1;"
            class="tbl-td full-width">

            <label class="custom-form-checkbox btn btn-floating btn-light">
                <Skeletor style="width:20px;height:20px;border-radius:3px;" />
            </label>

        </div>

        <div v-if="!headerAttributes.includes('client')"
            style="width:16rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="1.8rem" height="1.8rem" class="me-2 rounded-circle" />
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('lead_title')"
            style="width:20rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('source')"
            style="width:10rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="60%" />
        </div>

        <div v-if="!headerAttributes.includes('status')" style="width:13rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="100%"
                style="height:28px;border-radius:3px;" />
        </div>

        <div v-if="!headerAttributes.includes('phone_number')" style="width:12rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor class="ms-auto"
                width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('email_address')" style="width:15rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('address_line_one')" style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('address_line_two')" style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('city')" style="width:10rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="70%" />
            <!-- city -->
        </div>

        <div v-if="!headerAttributes.includes('state')" style="width:10rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('post_code')" style="width:10rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('country')" style="width:10rem;flex-grow: 1;"
            class="tbl-td full-width">
            <Skeletor width="70%" />
            <!-- country -->
        </div>

        <div v-if="!headerAttributes.includes('last_update')" style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('first_create')" style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div v-if="!headerAttributes.includes('owner')" style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor style="width: 30px; height: 30px;border-radius:50%;" />
        </div>

    </div>
</template>