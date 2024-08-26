<script>
  import CustomScrollbar from "custom-vue-scrollbar";
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import "@vueup/vue-quill/dist/vue-quill.bubble.css";  
  import StarRating from "vue-star-rating";
  import RightSidebarProperties from "./CustomProperties/RightSidebarProperties.vue";
  import { Skeletor } from "vue-skeletor";
  import {
    UpdateLeadConfidence,
  } from "../../../../actions/LeadAction";
  import {
    DeleteContact,
  } from "../../../../actions/ContactAction";
  import UploadeFiles from "./sections/UploadeFiles.vue";
  import { useLeadStore } from "../../../../stores/lead";
  import { useAppStore } from "../../../../stores/app";
  import { DocumentIcon, ImageIcon, PdfIcon } from "../../../../assets/icons";
  import RightSidebarContacts from './sections/RightSidebarContacts.vue';
  export default {
    components: {
      CustomScrollbar,
      QuillEditor,
      StarRating,
      RightSidebarProperties,
      Skeletor,
      UploadeFiles,
      RightSidebarContacts
    },
    props: ["toggleRightDetailsSidebar", "findLeadByIdHandler", "isFirstLoading"],
    setup(props) {
      const leadStore = useLeadStore();
      const appStore = useAppStore();
      return { leadStore, appStore, DocumentIcon, PdfIcon, ImageIcon };
    },
    data() {
      return {
        lead: null,
        address: null,
        confidence: 0,
        images: [],
        progress: 0,
      };
    },
    watch: {
      currentLead(lead) {
        this.lead = lead;
        this.confidence = lead?.confidence;
        var temp = "";
        if (lead?.address_line_two) {
          temp += lead?.address_line_two;
          if (lead?.address_line_one) {
            temp += "/" + lead?.address_line_one;
          }
        } else if (lead?.address_line_one) {
          temp += lead?.address_line_one;
        }

        if (lead?.city || lead?.state || lead?.post_code) {
          temp += ", ";
        }

        if (lead?.city) {
          temp += lead?.city + " ";
        }

        if (lead?.state) {
          temp += lead?.state + " ";
        }

        if (lead?.post_code) {
          temp += lead?.post_code;
        }
        if (temp != "") {
          this.address = temp;
        }
      },
    },
    computed: {
      currentLead() {
        return this.leadStore.getCurrentLead;
      },
      contacts() {
        return this.leadStore.getLeadContacts;
      },
      contact: {
        get() {
          return this.leadStore.getPrimaryContact;
        },
        set(val) {
          this.leadStore.setPrimaryContact(val);
        },
      },
    },
    methods: {
      async confidenceHandler() {
        try {

          const res = await UpdateLeadConfidence({
            lead: this.lead?.lead_id,
            confidence: this.confidence,
          });

          const { success, message } = res;

          if (!success) {
            this.$toast.error(message.text);
          }

        } catch (error) {
          this.$toast.error("Oops, something went wrong");
        }
      },
      getFileIconHandler(name = "img.png") {
        var ext = name.split(".").pop().toLocaleLowerCase();
        var imgExt = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
        if (imgExt.includes(ext)) {
          return ImageIcon;
        } else if (ext == "pdf") {
          icon = PdfIcon;
        } else {
          return DocumentIcon;
        }
      },
      shortenFileNameHandler(fileName) {
        if (fileName.length <= 20) {
          return fileName;
        } else {
          const firstPart = fileName.substring(0, 20);
          const lastPart = fileName.substring(fileName.length - 10);
          return `${firstPart} ... ${lastPart}`;
        }
      },
    },
  };
</script>
<template>
  <div class="col-right"
    :class="{ show: toggleRightDetailsSidebar }">
    <CustomScrollbar>

      <RightSidebarContacts
      :isFirstLoading="isFirstLoading"
      ></RightSidebarContacts>

      <div>
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
      </div>
      <div class="p-3 border-bottom">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <div class="fs-14px fw-bold text-head mb-0 text-uppercase">
            lead Properties
          </div>
          <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
            <svg class="svg-3"
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px">
              <path d="M0 0h24v24H0z"
                fill="none"></path>
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
              </path>
            </svg>
          </button>
        </div>
        <div class="mb-1">
          <div class="fs-12px text-soft mb-0">Address</div>
          <div class="d-flex">
            <div class="fs-14px fw-bold text-head mb-0">
              {{ address ?? " — " }}
            </div>
            <a target="_blank"
              v-if="address"
              :href="`https://www.google.com/maps/search/${address}`"
              class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto">
              <svg class="svg-3"
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 0 24 24"
                width="18">
                <path d="M0 0h24v24H0z"
                  fill="none"></path>
                <path
                  d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z">
                </path>
              </svg>
            </a>
          </div>
        </div>
        <div class="mb-1">
          <div class="fs-12px text-soft mb-0">Value</div>
          <div class="d-flex">
            <div class="fs-14px fw-bold text-head mb-0">
              ${{ lead?.estimated_value ?? "$0.00" }}
            </div>
          </div>
        </div>
        <div class="mb-1">
          <div class="fs-12px text-soft mb-0">Source</div>
          <div class="d-flex">
            <div class="fs-14px fw-bold text-head mb-0">
              {{ lead?.source?.title ?? " — " }}
            </div>
          </div>
        </div>

        <div class="mb-1">
          <div class="fs-12px text-soft mb-0">Confidence</div>
          <div class="d-flex">
            <div class="mb-2">
              <star-rating style="line-height: 20px"
                :star-size="18"
                :rounded-corners="true"
                :border-width="2"
                inactive-color="#F8F9F9"
                active-color="#FF9529"
                border-color="#AEB6BF"
                active-border-color="#FF9529"
                :increment="0.5"
                v-model:rating="confidence"
                @click="confidenceHandler()"
                :show-rating="false" />
            </div>
          </div>
        </div>
        <right-sidebar-properties />
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
        <div class="dropdown-box border-bottom">
          <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show">
            <span class="fw-bold fs-14px text-uppercase text-head d-block">Notes</span>
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
            <div class="px-3 py-1 pb-2 fs-12px lead-timeline-notes">
              <QuillEditor theme="snow"
                :toolbar="[]" />
              <div class="save-notes-btn">
                <button class="btn btn-sm btn-outline-primary">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>

        <uploade-files />

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

  .personal-info {
    opacity: 1;

    .user-name {
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .tbl-contact-info {
    tr {
      td.hover {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      td {

        a.user-email,
        a.user-phone {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 250px;
        }
      }
    }

    
  }
</style>