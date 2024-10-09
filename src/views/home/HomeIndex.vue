<script setup>
import { ref, watchEffect } from "vue";
import SearchBox from "./components/SearchBox.vue";
import Projects from "./components/Projects.vue";
import LearnCrm from "./components/LearnCrm.vue";
</script>

<template>
  <section class="home-section">
    <div class="container ">
      <div class="home-content">
        <nav class="navbar d-none navbar-mobile shadow-0">
          <div class="navbar-left d-flex d-md-none">
            <div class="nav-item">
              <a href="" class="navbar-brand nav-link align-items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                  ></path>
                </svg>
              </a>
            </div>
            <div class="title">Leads</div>
          </div>

          <div class="navbar-right ms-auto">
            <div class="nav-item d-flex d-md-none">
              <a href="" class="navbar-brand nav-link align-items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  ></path>
                </svg>
              </a>
            </div>

            <div class="nav-item d-flex d-md-none">
              <a href="" class="navbar-brand nav-link align-items-end me-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g>
                  <g>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>

            <div class="d-none d-md-flex">
              <button class="btn px-3 btn-light fw-bold shadow-none">
                <img
                  class="me-1"
                  src="https://app.getpylon.com/img/gem.png"
                  alt=""
                />
                Credits: 412
              </button>
            </div>
          </div>
        </nav>
        <search-box></search-box>
        <learn-crm></learn-crm>
        <projects></projects>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.home-section {
  height: 120vh;
  padding-top: 150px;

  .link {
    font-size: 15px;
  }

  .home-content {
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

              :hover {
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

                  .icon {
                    position: absolute;
                    right: 0;
                    top: 100%;
                    transform: translateY(-50%);
                    opacity: 0;
                    transition: opacity ease-in-out 0.1s;

                    &.map-icon {
                      top: 50%;
                    }
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
          height: 260px;
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