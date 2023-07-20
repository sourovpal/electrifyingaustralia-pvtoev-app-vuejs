
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
    display: inline-block;
    padding-bottom:100px;
    margin-top: -5px;
  }
  .tbl-body .tbl-tr{
    display:inline-flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(182, 182, 182, 0.4);
    width: 100%;
    background-color: #ffffff;
  }
  .tbl-body .tbl-tr .tbl-td{
    // border-bottom: 1px solid rgb(182 182 182 / 40%);
    padding: 6px 10px 6px 20px;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 400;
    width:10rem;
    white-space: nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .text-overflow-ellipsis{
      max-width: fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dropdown{
      & > button{
        border: 1px solid transparent;
        transition: all 0.3s;
        &:hover{
          background-color: #f7f7f9;
          border:1px solid #007ee5;
          box-shadow: 0 1px 3px rgba(0,126,229,.34);
        }
      }
      .dropdown-menu{
        box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
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
  @media (max-width: 767px){
    .tbl-body .tbl-tr.full-width,
    .tbl-body .tbl-tr .tbl-td.full-width{
      width:100% !important;
    }
    .tbl-body .tbl-tr .tbl-td.full-width{
      padding: 14px 10px 14px 20px;
      font-weight: bold;
    }
  }
  .tbl-body .tbl-tr .tbl-td,
  .tbl-body .tbl-tr .tbl-td a{
    color: #515253;
  }
  .tbl-body .tbl-tr:hover{
    background: rgb(182 182 182 / 12%);
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