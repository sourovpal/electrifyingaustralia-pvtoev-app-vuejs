<script>
import CustomScrollbar from "custom-vue-scrollbar";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import ContactEditModal from "./modals/ContactEditModal.vue";
import StarRating from "vue-star-rating";
import RightSidebarProperties from "./CustomProperties/RightSidebarProperties.vue";
import { Skeletor } from "vue-skeletor";
import {
  UpdateLeadConfidence,
  DeleteLeadContact,
} from "../../../../actions/LeadAction";
import UploadeFiles from "./sections/UploadeFiles.vue";
import { useLeadStore } from "../../../../stores/lead";
import { useAppStore } from "../../../../stores/app";
import { DocumentIcon, ImageIcon, PdfIcon } from "../../../../assets/icons";

export default {
  components: {
    CustomScrollbar,
    QuillEditor,
    ContactEditModal,
    StarRating,
    RightSidebarProperties,
    Skeletor,
    UploadeFiles,
  },
  props: ["toggleRightDetailsSidebar", "findLeadByIdHandler", "isFirstLoading"],
  setup(props) {
    const leadStore = useLeadStore();
    const appStore = useAppStore();
    return { leadStore, appStore , DocumentIcon, PdfIcon, ImageIcon };
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
    selectPrimaryContactHandler(contact) {
      this.contact = contact;
    },
    async deleteLeadContactHandler(contact) {
      try {
        this.$toast.clear();
        if (contact?.is_primary) {
          return;
        }
        const res = await DeleteLeadContact(contact.id);
        var { message } = res;
        this.$toast[message.type](message.text);
        this.findLeadByIdHandler();
      } catch (error) {
        try {
          var message = error.response.data.message;
          this.$toast[message.type](message.text);
        } catch (e) {
          this.$toast.error("Oops, something went wrong");
        }
      }
    },
    async confidenceHandler() {
      try {
        const res = await UpdateLeadConfidence(
          {
            confidence: this.confidence,
          },
          this.lead?.id
        );
      } catch (error) {
        try {
          var message = error.response.data.message;
          this.$toast[message.type](message.text);
        } catch (e) {
          this.$toast.error("Oops, something went wrong");
        }
      }
    },
    copyToClipboard(text = null) {
      this.$toast.clear();
      if (text) {
        navigator.clipboard.writeText(text);
        this.$toast.success(`${text} Copied to Clipboard`);
        return text;
      }
      this.$toast.error("Oops, Not found.");
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
  <div class="col-right" :class="{ show: toggleRightDetailsSidebar }">
    <CustomScrollbar>
      <div
        class="col-r-header d-flex justify-content-between align-items-center border-bottom overflow-x-auto overflow-y-hidden"
      >
        <div
          class="left ps-3 py-1 d-flex justify-content-start align-items-center"
        >
          <div
            v-for="(item, index) in contacts"
            class="circle-avatar me-2 cursor-pointer"
            :class="`${contact?.id == item.id ? 'shadow-border' : ''}`"
            @click="selectPrimaryContactHandler(item)"
            v-tippy="{ content: `${item.full_name}`, placement: 'top' }"
            :key="index"
          >
            <img
              class="rounded-circle border"
              alt="avatar1"
              :src="item.avatar"
            />
          </div>

          <div
            v-if="isFirstLoading"
            class="circle-avatar me-2 cursor-pointer"
            v-for="(item, index) in 2"
            :key="index"
          >
            <Skeletor style="width: 32px; height: 32px; border-radius: 50%" />
          </div>
        </div>

        <div
          class="right pe-3 py-1 d-flex justify-content-end align-items-center"
        >
          <button
            @click="$refs['contactEditModalRef'].showModalHandler()"
            v-tippy="{ content: 'Add a contact', placement: 'top' }"
            class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
          >
            <svg
              class="svg-3"
              height="24"
              fill="currentcolor"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="personal-info px-3 py-3 border-bottom">
        <div
          class="d-flex justify-content-between align-items-center mb-1 position-relative"
        >
          <h3 class="user-name fs-18px fw-bold text-head mb-0">
            {{ contact?.full_name }}
            <Skeletor v-if="isFirstLoading" width="70%" />
          </h3>
          <button
            data-mdb-toggle="dropdown"
            class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
          >
            <svg
              class="svg-3"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              ></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <div
            class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot"
          >
            <span
              @click="$refs['contactEditModalRef'].showModalHandler(contact)"
              class="dropdown-item cursor-pointer text-head py-1"
              >Edit Contact</span
            >
            <span
              :data-mdb-toggle="`${!contact?.is_primary ? 'modal' : ''}`"
              data-mdb-target="#deleteLeadContactModal"
              :class="`${
                contact?.is_primary
                  ? 'cursor-no-drop text-soft'
                  : 'cursor-pointer text-head'
              }`"
              class="dropdown-item py-1"
              >Remove Contact</span
            >
          </div>
        </div>

        <div>
          <table class="tbl-contact-info w-100">
            <tr v-if="isFirstLoading">
              <td width="100%">
                <Skeletor width="65%" />
              </td>
            </tr>
            <tr v-if="isFirstLoading">
              <td width="100%">
                <Skeletor width="80%" />
              </td>
            </tr>

            <tr v-if="contact?.email">
              <td class="fs-16px" width="10%">
                <svg
                  class="svg-5"
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                  />
                </svg>
              </td>
              <td class="fs-16px">
                <a
                  class="d-block user-email text-head"
                  :href="`mailto:${contact?.email}`"
                  >{{ contact?.email }}</a
                >
              </td>
              <td class="hover" width="20%">
                <div class="d-flex justify-content-end align-items-center">
                  <button
                    @click="copyToClipboard(contact?.email)"
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      ></path>
                    </svg>
                  </button>
                  <a
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                    target="_blank"
                    :href="`mailto:${contact?.email}`"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>

            <!-- Another Emails -->
            <tr
              v-for="(item, index) in contact?.another_emails ?? []"
              :key="index"
            >
              <td class="fs-16px" width="10%">
                <svg
                  class="svg-5"
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                  />
                </svg>
              </td>
              <td class="fs-16px">
                <a
                  class="d-block user-email text-head"
                  :href="`mailto:${item?.email}`"
                  >{{ item?.email }}</a
                >
              </td>
              <td class="hover" width="20%">
                <div class="d-flex justify-content-end align-items-center">
                  <button
                    @click="copyToClipboard(item?.email)"
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      ></path>
                    </svg>
                  </button>
                  <a
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                    target="_blank"
                    :href="`mailto:${item?.email}`"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>

            <tr v-if="contact?.phone_number">
              <td class="fs-16px" width="10%">
                <svg
                  class="svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                  ></path>
                </svg>
              </td>
              <td class="fs-16px">
                <a
                  class="d-block text-head user-phone"
                  :href="`tel:${contact?.phone_number}`"
                  >{{ contact?.phone_number }}</a
                >
                <Skeletor v-if="isFirstLoading" width="70%" />
              </td>
              <td class="hover" width="20%">
                <div class="d-flex justify-content-end align-items-center">
                  <button
                    @click="copyToClipboard(contact?.phone_number)"
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      ></path>
                    </svg>
                  </button>
                  <a
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                    :href="`tel:${contact?.phone_number}`"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>

            <tr
              v-for="(item, index) in contact?.another_phones ?? []"
              :key="index"
            >
              <td class="fs-16px" width="10%">
                <svg
                  class="svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                  ></path>
                </svg>
              </td>
              <td class="fs-16px">
                <a
                  class="d-block text-head user-phone"
                  :href="`tel:${item?.phone_number}`"
                  >{{ item?.phone_number }}</a
                >
              </td>
              <td class="hover" width="20%">
                <div class="d-flex justify-content-end align-items-center">
                  <button
                    @click="copyToClipboard(item?.phone_number)"
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      ></path>
                    </svg>
                  </button>
                  <a
                    class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                    :href="`tel:${item?.phone_number}`"
                  >
                    <svg
                      class="svg-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div>
        <div class="dropdown-box border-bottom">
          <div
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
          >
            <span class="fw-bold fs-14px text-uppercase text-head d-block"
              >Pinned activity</span
            >
            <div class="">
              <button
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
              >
                <svg
                  class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="dropdown-body" style="height: 0px">
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
          <button
            class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
          >
            <svg
              class="svg-3"
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="mb-1">
          <div class="fs-12px text-soft mb-0">Address</div>
          <div class="d-flex">
            <div class="fs-14px fw-bold text-head mb-0">
              {{ address ?? " — " }}
            </div>
            <a
              target="_blank"
              v-if="address"
              :href="`https://www.google.com/maps/search/${address}`"
              class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto"
            >
              <svg
                class="svg-3"
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 0 24 24"
                width="18"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                ></path>
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
              <star-rating
                style="line-height: 20px"
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
                :show-rating="false"
              />
            </div>
          </div>
        </div>
        <right-sidebar-properties />
      </div>

      <div class="">
        <div class="dropdown-box border-bottom">
          <div
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
          >
            <span class="fw-bold fs-14px text-uppercase text-head d-block"
              >Tasks</span
            >
            <div class="">
              <button
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
              >
                <svg
                  class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body" style="height: 0px">
            <div class="px-3 py-1 pb-2 fs-12px">
              <div class="lead-files">
                <div class="empty-state">
                  <div class="icon icon--36">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input
                  accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-box border-bottom">
          <div
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center"
          >
            <span class="fw-bold fs-14px text-uppercase text-head d-block"
              >Tags</span
            >
            <div class="">
              <button
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
              >
                <svg
                  class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body" style="height: 0px">
            <div class="px-3 py-1 pb-2 fs-12px">
              <div class="lead-files">
                <div class="empty-state">
                  <div class="icon icon--36">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input
                  accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-box border-bottom">
          <div
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show"
          >
            <span class="fw-bold fs-14px text-uppercase text-head d-block"
              >Project Designs</span
            >
            <div class="">
              <button
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
              >
                <svg
                  class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36px"
                      viewBox="0 0 24 24"
                      width="36px"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="empty-state__body">
                    <strong>Start a new project</strong>
                    <br />
                    or link with an existing project
                  </div>
                  <button class="btn btn-sm btn-primary">Add Project</button>
                </div>
                <input
                  accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg"
                  type="file"
                  multiple="multiple"
                  style="display: none"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown-box border-bottom">
          <div
            class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show"
          >
            <span class="fw-bold fs-14px text-uppercase text-head d-block"
              >Notes</span
            >
            <div class="">
              <button
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
              >
                <svg
                  class="svg-3"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="dropdown-body">
            <div class="px-3 py-1 pb-2 fs-12px lead-timeline-notes">
              <QuillEditor theme="snow" :toolbar="[]" />
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

    <!-- Modal Area -->
    <ContactEditModal
      :findLeadByIdHandler="findLeadByIdHandler"
      ref="contactEditModalRef"
    />
    <!-- Delete Contact Confirm Modal -->
    <div
      class="modal fade"
      id="deleteLeadContactModal"
      aria-hidden="true"
      aria-labelledby="deleteLeadContactModal"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm mx-auto">
        <div class="modal-content">
          <div class="modal-header py-1">
            <div class="d-flex justify-content-center align-items-center py-0">
              <svg
                class="me-2 svg-5"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                ></path>
              </svg>
              <span class="text-hard fw-bold fs-16px">Delete</span>
            </div>
          </div>
          <div class="modal-body">
            <p class="fs-14px fw-bold text-center mb-1">
              Are you sure you want to delete this contact?
            </p>
            <p class="fs-12px text-center text-danger">
              This action cannot be undone! To confirm your intent, please click
              delete button.
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-primary btn-sm" data-mdb-dismiss="modal">
                Close
              </button>
              <button
                class="btn btn-danger btn-sm"
                data-mdb-dismiss="modal"
                @click="deleteLeadContactHandler(contact)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"
    scoped>
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

  tr:hover {
    td.hover {
      opacity: 1;
    }
  }
}
</style>