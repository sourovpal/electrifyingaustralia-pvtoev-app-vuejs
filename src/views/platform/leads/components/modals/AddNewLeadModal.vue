<script>
  import { Modal } from "mdb-ui-kit";
  import { CreateNewLead } from "@actions/LeadAction";
  import DropdownOwnerList from "../dropdowns/DropdownOwnerList.vue";
  import Storage from "@helpers/Storage";
  import { useAppStore } from "@stores/app";
  import { CONFIG } from "@config";
  import SelectObjectId from "./fields/SelectObjectId.vue";
  import SelectLeadSource from "./fields/SelectLeadSource.vue";

  export default {
    components: {
      DropdownOwnerList,
      SelectObjectId,
      SelectLeadSource,
    },
    props: ["leadSources", "leadStatus", "fetchAllLeadsHandler"],
    setup(props) {
      const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
      const appStore = useAppStore();
      return { userStorage, appStore };
    },
    data() {
      return {
        modalInstance: null,
        errors: {},
        name: null,
        lead_title: null,
        lead_status: null,
        lead_source: null,
        phone_or_email: null,
        owner: null,
        address: null,
        tags: [],
        currentStatus: null,
        isSubmitCreateLeadForm: false,
      };
    },
    watch: {
      leadStatus(status) {
        try {
          if (status?.length && status[0]) {
            this.currentStatus = status[0];
          }
        } catch (error) { }
      },
    },
    computed: {
      owners() {
        return this.appStore.getUsers;
      },
      currentOwner() {
        try {
          const { email } = this.userStorage.get();
          this.owner = this.owners.find((item) => item.email == email);
          return this.owner;
        } catch (error) { }
      },
    },
    methods: {
      resetLeadForm() {
        try {
          this.error = {};
          this.name = null;
          this.address = null;
          this.phone_or_email = null;
          this.lead_title = null;
          this.lead_source = null;
          this.owner = this.currentOwner;
        } catch (error) { }
      },
      showModalHandler() {
        this.resetLeadForm();
        this.modalInstance.show();
      },
      hideModalHandler() {
        this.resetLeadForm();
        this.modalInstance.hide();
      },
      selectOwnerHandler(owner) {
        this.owner = owner;
      },
      addNewTagHandler(event) {
        try {
          delete this.errors?.tags;
          event.preventDefault();
          let val = event.target.value.trim();
          if (val.length > 0) {
            var index = this.tags.indexOf(val);
            if (index > -1) {
              return (this.errors["tags"] = [`${val} already added.`]);
            } else {
              this.tags.push(val);
            }
          }
          event.target.value = "";
        } catch (error) { }
      },
      removeTagHandler(tag = null) {
        try {
          var index = -1;
          if (tag) {
            index = this.tags.indexOf(tag);
          } else if (this.tags.length > 0) {
            index = this.tags.length - 1;
          }
          if (index > -1) {
            this.deleteCountry = this.tags[index];
            this.tags.splice(index, 1);
          }
        } catch (error) { }
      },
      async createNewLeadHandler() {
        try {
          this.$toast.clear();
          this.isSubmitCreateLeadForm = true;
          var data = {
            name: this.name,
            phone_or_email: this.phone_or_email,
            address: this.address,
            lead_title: this.lead_title,
            lead_source: this.lead_source,
            lead_status: this.lead_status,
            lead_owner: this.owner?.user_id,
            tags: this.tags,
          };
          const res = await CreateNewLead(data);
          var { success, message, errors } = res;
          if (success) {
            this.$toast[message.type](message.text);
            this.resetLeadForm();
            this.fetchAllLeadsHandler({ page: 1 });
          } else {
            this.errors = errors;
          }
          this.isSubmitCreateLeadForm = false;
        } catch (error) {
          this.$toast.error("Oops, something went wrong");
          this.isSubmitCreateLeadForm = false;
        }
      },
    },
    mounted() {
      this.modalInstance = new Modal(this.$refs.addNewLeadModal);
    },
  };
</script>

<template>
  <div class="modal fade add-new-lead-modal"
    id="addNewLeadModal"
    ref="addNewLeadModal"
    aria-hidden="true"
    aria-labelledby="addNewLeadModal"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="row m-0">
          <div class="col-lg-8">
            <div class="modal-header py-lg-2 px-0">
              <div class="d-flex justify-content-center align-items-center">
                <svg class="me-2 svg-5"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z">
                  </path>
                </svg>
                <span class="text-hard fw-bold fs-16px">New Lead</span>
              </div>
              <div>
                <button class="btn btn-light btn-sm btn-floating d-lg-none"
                  @click="hideModalHandler()">
                  <svg class="svg-5"
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="22">
                    <path
                      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="modal-body p-0 pt-3">
              <div class="mb-3">
                <label class="form-label-title"
                  for="">Contact person
                  <span class="text-soft fs-12px ms-1">(Required)</span>
                </label>
                <input @click="delete errors?.name"
                  v-model="name"
                  class="form-control"
                  type="text" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label-title"
                  for="">Address
                  <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <input @click="delete errors?.address"
                  v-model="address"
                  class="form-control"
                  type="text" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.address?.length">{{ errors?.address[0] }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label-title"
                  for="">Phone or email
                  <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <input @click="delete errors?.phone_or_email"
                  v-model="phone_or_email"
                  class="form-control"
                  type="text" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.phone_or_email?.length">{{ errors?.phone_or_email[0] }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label-title"
                  for="">Lead source
                  <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <select-lead-source v-model="lead_source"
                  :options="leadSources"
                  @click="delete errors?.lead_source" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_source?.length">{{ errors?.lead_source[0] }}</span>
              </div>

              <div class="mb-3">
                <label class="form-label-title"
                  for="">Existing leads / deals</label>
                <span class="fs-12px text-soft">No matching leads or deals found.</span>
              </div>
              <br />
            </div>
          </div>
          <div class="col-lg-4 lead-details-right">
            <div class="modal-header py-lg-2 px-0">
              <div class="d-flex justify-content-center align-items-center">
                <!-- <svg class="me-2 svg-5" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg> -->
                <svg class="me-2 svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <span class="text-hard fw-bold fs-16px">Details</span>
              </div>
            </div>
            <div class="modal-body p-0 pt-3">
              <div class="mb-3">
                <label class="form-label-title"
                  for="">Lead title
                  <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <input @click="delete errors?.lead_title"
                  v-model="lead_title"
                  class="form-control"
                  type="text"
                  name=""
                  id="" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_title?.length">{{ errors?.lead_title[0] }}</span>
              </div>
              <div class="mb-3 position-relative">
                <label class="form-label-title"
                  for="">Lead status
                  <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <select-object-id :options="leadStatus"
                  returnValue="status_id"
                  label="name"
                  :selected="currentStatus"
                  v-model="lead_status" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
              </div>
              <div class="mb-3 add-new-lead-owner-list-dropdown">
                <label class="form-label-title"
                  for="">Owner
                  <span class="text-soft fs-12px ms-1">(Optional)</span></label>
                <div @mouseover="delete errors?.lead_owner"
                  @click="$refs['dropdownOwnerListRef']?.resetSearchOwner()"
                  class="form-control cursor-pointer owner-form-control"
                  data-mdb-toggle="dropdown">
                  <div class="owner-info">
                    <div class="circle-avatar me-2">
                      <img class="avatar"
                        :src="owner?.profile_avatar"
                        alt="" />
                    </div>
                    <div class="owner-name fs-16px fw--bold text-hard">
                      {{ owner?.name }}
                    </div>
                  </div>
                </div>
                <dropdown-owner-list ref="dropdownOwnerListRef"
                  :select-owner-handler="selectOwnerHandler"
                  :owners="owners"
                  :owner="owner" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_owner?.length">{{ errors?.lead_owner[0] }}</span>
              </div>
              <div class="mb-3">
                <label class="form-label-title"
                  for="">Tags <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <div class="form-control tags-list-form-control">
                  <span v-for="(tag, index) in tags"
                    :key="index"
                    class="tag-item">
                    <span class="text text-hard">{{ tag }}</span>
                    <span @click="removeTagHandler(tag)"
                      class="close">&times;</span>
                  </span>
                  <input @click="delete errors?.tags"
                    @keydown.enter="addNewTagHandler"
                    @blur="addNewTagHandler"
                    @keydown.delete="
                      (e) =>
                        e.target.value.length === 0 && removeTagHandler(null)
                    "
                    class="tags-form-control"
                    type="text"
                    placeholder="Type here"
                    id="" />
                </div>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.tags?.length">{{ errors?.tags[0] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-0">
          <div class="col-lg-8 pb-2">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <button @click="hideModalHandler()"
                  class="btn btn-danger">
                  Cancel
                </button>
              </div>
              <div>
                <loading-button :is-loading="isSubmitCreateLeadForm"
                  @submit="createNewLeadHandler">Save Change</loading-button>
              </div>
            </div>
          </div>
          <div class="col-lg-4 lead-details-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"
  scoped>
  @media (min-width: 992px) {
    .add-new-lead-modal .modal-lg {
      --mdb-modal-width: 880px !important;
    }

    .lead-details-right {
      background-color: #f5f7fa;
    }
  }

  .tags-list-form-control {
    display: flex;
    flex-wrap: wrap;

    &:hover {
      border-color: #3b71ca;
      box-shadow: inset 0 0 0 1px #3b71ca;
    }

    .tag-item {
      border: 1px solid #b8b8b8;
      font-size: 14px;
      padding: 2px 0px 2px 6px;
      border-radius: 2px;
      background: #f8f8f8;
      letter-spacing: 0.5px;
      user-select: none;
      margin-right: 4px;
      margin-bottom: 2px;
      line-height: 15px;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        padding-right: 20px;
        width: 100%;
      }

      .close {
        position: absolute;
        right: 0;
        top: 2px;
        padding: 0px 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: red;
        }
      }
    }

    .tags-form-control {
      border: none;
      outline: none;
      padding: 0px 0px 2px;
      height: 25px;

      &::placeholder {
        font-size: 16px;
      }
    }
  }
</style>