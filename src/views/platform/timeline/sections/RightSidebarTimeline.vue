<script setup>
  import CustomScrollbar from "custom-vue-scrollbar";
  import RightSidebarProperties from "./RightSidebarProperties.vue";
  import { Skeletor } from "vue-skeletor";
  import LeadUploadedFiles from "./LeadUploadedFiles.vue";
  import { useLeadStore } from "@stores/lead";
  import { useAppStore } from "@stores/app";
  import { DocumentIcon, ImageIcon, PdfIcon } from "@assets/icons";
  import RightSidebarContacts from './RightSidebarContacts.vue';
  import RightSidebarAddress from './RightSidebarAddress.vue';
  import LeadNotes from './LeadNotes.vue';
  import { ref } from 'vue';
  const isFirstLoading = ref(false);
  const toggleRightDetailsSidebar = ref(false);


</script>
<template>
  <div class="col-right"
    :class="{ show: toggleRightDetailsSidebar }">
    <CustomScrollbar>

      <RightSidebarContacts :isFirstLoading="isFirstLoading"></RightSidebarContacts>

      <!-- <div>
        <div class="dropdown-box border-bottom">
          <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Pinned activity</span>
            <div class="">
              <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <svg class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="dropdown-body"
            style="height: 0px">
            <div class="px-3 py-1 pb-2">
              <span class="text-head fs-14px">Nothing pinned</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="p-3 border-bottom">
        <right-sidebar-address :isFirstLoading="isFirstLoading"></right-sidebar-address>
        <right-sidebar-properties :isFirstLoading="isFirstLoading"></right-sidebar-properties>
      </div>

      <div class="">
        <div class="dropdown-box border-bottom">
          <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Tasks</span>
            <div class="">
              <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <svg class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body"
            style="height: 0px">
            <div class="px-3 py-1 pb-2 fs-12px">
              <div class="lead-files">
                <div class="empty-state">
                  <div class="icon icon--36">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor">
                      <path d="M0 0h24v24H0V0z"
                        fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z">
                      </path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none" />
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-box border-bottom">
          <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Tags</span>
            <div class="">
              <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <svg class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body"
            style="height: 0px">
            <div class="px-3 py-1 pb-2 fs-12px">
              <div class="lead-files">
                <div class="empty-state">
                  <div class="icon icon--36">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor">
                      <path d="M0 0h24v24H0V0z"
                        fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z">
                      </path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none" />
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-box border-bottom">
          <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Project Designs</span>
            <div class="">
              <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <svg class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body">
            <div class="px-3 py-1 pb-2 fs-12px">
              <div class="lead-files">
                <div class="empty-state">
                  <div class="icon icon--36">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor">
                      <path d="M0 0h24v24H0V0z"
                        fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z">
                      </path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none" />
              </div>
            </div>
          </div>
        </div>

        <lead-notes></lead-notes>

        <lead-uploaded-files></lead-uploaded-files>

        <div style="height: 10rem"></div>
      </div>
    </CustomScrollbar>

  </div>
</template>

<style lang="scss"
  scoped>
  .cursor-no-drop {
    cursor: no-drop;
  }

  .col-right {
    flex-grow: 1;
    width: 24rem;
    background-color: #f5f7fa;

    /* @media only screen and (min-width: 767px) and (max-width: 1500px) { */
    @media only screen and (max-width: 991.99px) {
      position: absolute;
      right: -30rem;
      transition: all 0.5s ease-in-out;
      height: 100vh;

      &.show {
        right: 0px !important;
      }
    }

    @media only screen and (min-width: 1px) and (max-width: 991px) {
      &.show {
        width: calc(100%) !important;
      }
    }

    .dropdown-box {
      .dropdown-header {
        &.show {
          button {
            transform: rotate(-180deg);
          }
        }

        button {
          transition: transform 0.3s ease-in-out;
        }
      }

      .dropdown-body {
        overflow: hidden;
        transition: height 0.3s ease-in-out;
        position: relative;

        .lead-files {
          .empty-state {
            -webkit-box-align: center;
            align-items: center;
            background-color: #e5f4ff;
            border: 2px solid #b3ddff;
            -webkit-border-radius: 0.25rem;
            border-radius: 0.25rem;
            color: #0062b3;
            display: flex;
            flex-direction: column;
            font-size: 0.875rem;
            gap: 0.25rem;
            justify-content: center;
            line-height: 1.25;
            min-height: 9.25rem;
            padding: 1rem;
            text-align: center;
            user-select: none;
            width: 100%;

            .btn-text {
              background: transparent;
              border: 0;
              color: #007ee5;
              padding: 0;
              text-decoration: underline;
            }
          }
        }

        .save-notes-btn {
          position: absolute;
          bottom: 18px;
          right: 25px;
          z-index: 999999;

          button {
            font-weight: bold;
            padding: 3px 6px;
            background-color: #fff3c4 !important;
          }
        }
      }
    }
  }
</style>