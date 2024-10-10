
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
  height: 35px;
  position: sticky;
  top: 0;
  z-index: 9;
  width: 100%;
  display:table;
}
.tbl-header .tbl-tr{
  display:flex;
  background-color: #ffffff;
  width: 100%;
  height:35px;
}

.tbl-header .tbl-tr .tbl-th{
  border-bottom: 1px solid rgb(182 182 182 / 40%);
  display: table-cell;
  font-size: .875rem;
  font-weight: 700;
  color: #515253;
  padding: 6px 10px 6px 15px;
  white-space: nowrap;
  background-color: #ffffff;
  width:12rem;
  user-select: none;
  -webkit-user-select: none;
}
.tbl-header .tbl-tr .tbl-th.space{
  flex-basis: 100% !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  width: 0px;
}
</style>