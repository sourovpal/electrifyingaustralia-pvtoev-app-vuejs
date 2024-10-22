<script setup>
  import { ref, watchEffect } from "vue";
  import SearchBox from "./components/SearchBox.vue";
  import Projects from "./components/Projects.vue";
  import LearnCrm from "./components/LearnCrm.vue";
  import HeaderSection from "./components/HeaderSection.vue";
  import MobileHeader from "@components/MobileHeader.vue";
</script>

<template>
  <section class="content content-y-100vh">
    <header-section class="d-none d-md-flex"></header-section>
    <div class="container">
      <div class="home-content px-5 mx-5">
        <mobile-header class="d-md-none"></mobile-header>
        <search-box></search-box>
        <learn-crm></learn-crm>
        <projects></projects>
        <div class="d-block d-md-none"><br><br><br><br><br></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss"
  scoped>
  .content:deep() {
    margin-left: var(--main-left-navbar-width);
    width: calc(100% - var(--main-left-navbar-width));
    overflow: auto;

    .link {
      font-size: 15px;
    }

    .home-content {
      margin-top: 3.5rem;
      padding-top: 60px;
      padding-left: 67.5px;

      @media screen and (max-width: 767px) {
        padding-left: 0;
      }
    }

    .search-row {
      position: relative;
      min-height: 100px;

      .search-area {
        transform: all 0.3s;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9999;
        background-color: #ffffff;

        .search-box {
          position: relative;

          input,
          input:focus {
            background-color: #f5f7fa;
            border: none;
            outline: none;
            box-shadow: none;
          }

          .search-icon {
            position: absolute;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            top: 50%;
            transform: translateY(-50%);
            right: 12px;
            padding: 0px 0px;
          }
        }

        &.show {
          border-radius: 3px;
          padding-bottom: 10px;
          box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
            0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

          .search-box input {
            background-color: transparent !important;
          }

          .search-output {
            display: block;
          }
        }

        .search-output {
          display: none;

          .output-label {
            padding: 10px 12px 3.68px;
            display: inline-block;
            font-size: 14px;
            font-weight: 600;
            display: block;
            text-transform: uppercase;
          }

          .project-list {
            list-style: none;
            margin: 0;
            padding: 0;

            .list-item {
              margin-bottom: 10px;

              .item-link {
                display: block;

                .icon {
                  opacity: 0;
                  transition: opacity ease-in-out 0.1s;
                }

                &:hover {
                  background-color: rgb(246 246 246);

                  .icon {
                    opacity: 1 !important;
                  }
                }

                .search-result {
                  padding: 3.68px 12px 3.68px;
                  line-height: 20px;

                  &.map-result {
                    padding: 13.7px 12px;
                  }

                  .search-item {
                    position: relative;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 14px;

                    span {
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-right: 3px;
                    }
                  }

                  .search-item-details {
                    font-size: 12px;
                  }
                }
              }
            }
          }

          .not-found-result {
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
          }
        }
      }
    }

    .quick-start-project {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 3px;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      cursor: pointer;

      .thumbnail-area {
        position: relative;

        .thumbnail {
          width: 200px;
        }

        .duration {
          position: absolute;
          background-color: #1f2933;
          color: #fff;
          font-size: 0.8125rem;
          padding: 3px 4px;
          border-radius: 0.125rem;
          line-height: 1.1;
          bottom: 0.5rem;
          font-weight: 600;
          right: 0.5rem;
        }
      }

      .description {
        h1 {
          font-size: 1.125rem;
          padding: 10px 0px 0px 0px;
        }

        p {
          font-size: 14px;
          color: #7f8084;
        }
      }
    }

    .recent-project {
      margin-top: 50px;

      .header-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .header-title {
          margin-bottom: 0;
          margin-right: 1rem;
          font-size: 1rem;
          color: #1f2933;
          font-weight: 600;
        }
      }

      .project-link {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        display: block;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        overflow: hidden;

        .box {
          .thumbnail {
            background-color: #f4f4f4;
            background-size: cover;
            background-position: 50%;
            width: 100%;
            height: 120px;
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
            padding-top: 56.25%;
          }

          .info {
            margin: 1.5rem 1rem 1rem;

            .title {
              color: rgba(0, 0, 0, 0.87);
              font-size: 1.25rem;
              margin: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .sub-title {
              color: rgba(0, 0, 0, 0.54);
              font-size: 0.875rem;
              line-height: 1rem;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
