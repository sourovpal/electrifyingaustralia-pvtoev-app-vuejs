
<script>

export default{
    name:'DatatableHeader',
    props:['class'],
    methods:{
    },
}

</script>


<template>

    <div :class="class" class="tbl-header">
        <div class="tbl-tr">
            <slot></slot>
        </div>
    </div>

</template>

<style>
.tbl-header{
  height:35px;
  position: sticky;
  top: 0;
  z-index: 9;
  width: 100%;
}
.tbl-header .tbl-tr{
  display: inline-flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(182 182 182 / 40%);
  background-color: #ffffff;
  width: 100%;
}
.tbl-header .tbl-tr .tbl-th{
  /* border-bottom: 1px solid rgb(182 182 182 / 40%); */
  display: flex;
  flex-direction: row;
  font-size: .875rem;
  font-weight: 700;
  color: #515253;
  width:10rem;
  padding: 6px 10px 6px 20px;
  cursor: pointer;
  white-space: nowrap;
  background-color: #ffffff;
}
</style>