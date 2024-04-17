
<script>

export default{
    name:'DatatableBody',
    methods:{
        
    },
}

</script>


<template>

<div class="tbl-body">
    <slot></slot>
</div>

</template>

<style lang="scss">
.tbl-body{
  display:table;
  padding-bottom:100px;
  width:100%;
  position: relative;
}
.tbl-body .tbl-tr{
  display:flex;
  width: 100%;
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;
}
.tbl-body .tbl-tr .tbl-td{
  border-bottom: 1px solid rgba(182, 182, 182, 0.4);
  padding: 3px 10px 3px 15px;
  display:flex;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  position: relative;
  vertical-align: middle;
  width:12rem;
  justify-content: flex-start;
  align-items: center;
  .text-overflow-ellipsis{
    max-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    &.hover-scroll:hover{
      overflow: auto;
      word-wrap: break-word;
      display: flex !important;
      height: 30px;
      text-overflow: inherit;
      white-space: normal;
    }
  }
  .dropdown{
    & > button{
      transition: all 0.3s;
      border: 1px solid rgb(0 0 0 / 9%);
      padding: 4px 12px;
      &:hover{
        background-color: #f7f7f9;
        border:1px solid #007ee5;
        box-shadow: 0 1px 3px rgba(0,126,229,.34);
      }
    }
    .dropdown-menu{
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      padding: 6px 0px;
      border-radius: 3px;
      inset: 0px 0px auto auto !important;
      transform: translate3d(0px, 38.4px, 0px) !important;
      &::after{
          content: "";
          position: absolute;
          top: -6px;
          right: 20px;
          border: 7px solid white;
          transform: rotate(45deg);
          border-bottom-color: transparent;
          border-right-color: transparent;
      }
      .dropdown-item{
          border-radius: 0px !important;
          padding-top: 6px;
          padding-bottom: 6px;
          font-size: .8125rem;
          &.selected{
            position: relative;
            &::after{
              content: '';
              position: absolute;
              top:0px;
              left:0px;
              width:4px;
              height:100%;
              background-color: #007ee5;
              border-top-right-radius: 3px;
              border-bottom-right-radius: 3px;
            }
          }
          &:hover{
            color: #1d1e1f;
            text-decoration: none;
            background-color: #f7f7f9;
          }
          &:active{
            background-color: #e4e7eb;
            color: #1f2933;
          }
      }
    }
  }
}
@media only screen and (max-width: 991px){
  .tbl-body .tbl-tr.full-width,
  .tbl-body .tbl-tr .tbl-td.full-width{
    width:100% !important;
  }
  .tbl-body .tbl-tr .tbl-td.full-width{
    /* padding: 14px 10px 14px 20px; */
    font-weight: bold;
  }
}
.tbl-body .tbl-tr .tbl-td,
.tbl-body .tbl-tr .tbl-td a{
  color: #364a63;
}
.tbl-body .tbl-tr .tbl-td a:hover{
  color: #3b71ca;
}
.tbl-body .tbl-tr.active,
.tbl-body .tbl-tr:hover{
  background-color: rgb(6 31 65 / 8%);
}
.tbl .tbl-dropdown-title{
  font-size: 14px;
  max-width: 11rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #515253;
}
.dropdown--icon svg{
  fill:#515253;
}
</style>