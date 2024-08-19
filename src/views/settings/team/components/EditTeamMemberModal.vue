<script>
  import { Modal } from "mdb-ui-kit";
  import { UpdateProfile } from '../../../../actions/UserAction';
  import { FetchRoles } from '../../../../actions/RoleAction';
  import CustomScrollbar from 'custom-vue-scrollbar';
  export default {
    props: ['fetchMemberDataHandler'],
    data() {
      return {
        errors: {},
        modalInstance: null,
        userId: null,
        name: null,
        email: null,
        phone_office: null,
        phone_mobile: null,
        access_roles: null,
        company_name: null,
        is_owner: null,
        isSubmitUpdateMember: false,
        isLoading: false,
        roles: [],
        member: {},
      }
    },
    components: {
      CustomScrollbar
    },
    mounted() {
      this.modalInstance = new Modal(this.$refs.EditTeamMemberModalRef);
      this.company_name = 'company_name';
    },
    methods: {
      async showModalHandler(member) {
        this.fetchAllRoles();
        this.member = member;
        this.userId = member.user_id;
        this.name = member.name;
        this.email = member.email;
        this.phone_office = member.phone_office;
        this.phone_mobile = member.phone_mobile;
        this.access_roles = member.user_role;
        this.is_owner = member.is_owner ? 1 : 0;
        this.errors = {};
        this.modalInstance.show();
      },
      hideModalHandler() {
        this.modalInstance.hide();
      },
      async fetchAllRoles() {
        try {
          this.isLoading = true;
          const res = await FetchRoles();
          const { success, roles } = res;
          if (success) {
            this.roles = roles;
          }
        } catch (error) {
          this.$toast.error('Oops, something went wrong');
        } finally {
          this.isLoading = false;
        }
      },
      async updateTeamMemberHandler() {
        try {
          this.$toast.clear();
          this.isSubmitUpdateMember = true;
          const data = {
            name: this.name,
            email: this.email,
            phone_office: this.phone_office,
            phone_mobile: this.phone_mobile,
            access_roles: this.access_roles,
          };
          const res = await UpdateProfile(this.userId, data);
          this.isSubmitUpdateMember = false;
          var { success, message, errors } = res;
          this.$toast[message.type](message.text);
          if (success) {
            this.fetchMemberDataHandler();
          } else {
            this.errors = errors;
          }
        } catch (error) {
          console.log(error)
          this.$toast.error('Oops, something went wrong');
        } finally {
          this.isSubmitUpdateMember = false;
        }
      }
    },
  }
</script>

<template>

  <div class="modal fade"
    ref="EditTeamMemberModalRef"
    id="EditTeamMemberModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-base">Manage Team Member</h5>
        </div>

        <div class="modal-body">
          <br>
          <div class="row settings-group-item mb-3">
            <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Name:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
              <input @click="delete errors?.name"
                v-model="name"
                class="form-control"
                type="text">
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
            </div>
          </div>
          <div class="row settings-group-item mb-3">
            <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Email Address:</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
              <input v-model="email"
                class="form-control cursor-no-drop"
                type="text"
                readonly>
            </div>
          </div>
          <div class="row settings-group-item mb-3">
            <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Phone (office):</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
              <input @click="delete errors?.phone_office"
                v-model="phone_office"
                class="form-control"
                type="text">
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.phone_office?.length">{{ errors?.phone_office[0] }}</span>
            </div>
          </div>
          <div class="row settings-group-item mb-3">
            <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Phone (mobile):</label>
            </div>
            <div class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column">
              <input @click="delete errors?.phone_mobile"
                v-model="phone_mobile"
                class="form-control"
                type="text">
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.phone_mobile?.length">{{ errors?.phone_mobile[0] }}</span>
            </div>
          </div>
          <div class="row settings-group-item mb-0">
            <div class="col-3 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Role:</label>
            </div>
            <div
              class="col-7 me-auto d-flex justify-content-start align-items-center flex-direction-column position-relative">
              <div class="position-relative w-100">
                <input readonly
                  v-model="access_roles"
                  class="form-control cursor-pointer"
                  type="text"
                  data-mdb-toggle="dropdown">
                <div class="dropdown-menu custom-form-select roles overflow-auto"
                  style="max-height:7.5rem;">
                  <ul class="list-unstyled mb-0">
                    <li @click="access_roles=item.name"
                      v-for="(item, index) in roles"
                      :key="index"
                      v-show="access_roles != item.name"
                      :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1`">
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.access_roles?.length">{{ errors?.access_roles[0] }}</span>
            </div>
          </div>

          <hr style="margin: 2.5rem 0px;">

          <div class="row settings-group-item mb-0">
            <div class="col-3 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title text-danger mb-0">The danger zone:</label>
            </div>
            <div class="col-8">
              <div class="mb-4">
                <h6 class="modal-title text-base">Reset user password</h6>
                <p class="text-base fs-12px mb-3">
                  This will log <span class="text-danger fw-bold">{{ name }}</span> out of all sessions, remove their
                  current password and send a password reset email to <span class="text-danger fw-bold">{{ email
                    }}</span> .
                </p>
                <div class="">
                  <a class="btn btn-outline-warning btn-sm reset-btn"
                    href="">Reset password now</a>
                </div>
              </div>
              <!--  -->
              <div class="">
                <h6 class="modal-title text-base">Remove user from team</h6>
                <p class="text-base fs-12px mb-3">This will remove <span class="text-danger fw-bold">{{ name }}</span>
                  from {{ company_name }}. Their projects will remain in the team and can be reassigned to other users.
                </p>
                <div class="">
                  <a class="btn btn-outline-danger btn-sm remove-btn"
                    href="">Remove user from team</a>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div class="modal-footer flex-between-center border-top-0">
          <div class="row settings-group-item mb-0 w-100">
            <div class="col-6">
              <button type="button"
                class="btn btn-danger fw-bold"
                data-mdb-dismiss="modal">Cancel</button>
            </div>
            <div class="col-6">
              <button :disabled="isSubmitUpdateMember"
                @click="updateTeamMemberHandler"
                type="submit"
                class="ms-auto btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                <div v-if="isSubmitUpdateMember">
                  <svg class="spinner"
                    viewBox="0 0 50 50"
                    style="width:20px;height:20px;margin-left:0px;">
                    <circle style="stroke: #ffffff;"
                      class="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke-width="5"></circle>
                  </svg>
                  <span>Submitting...</span>
                </div>
                <span v-if="!isSubmitUpdateMember">Save Change</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped
  lang="scss">
  .reset-btn {
    background-color: #fff7e8;
  }

  .remove-btn {
    background-color: #ffe7eb;
  }

  .custom-form-select {
    width: 100%;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

    .dropdown-item {
      cursor: pointer;
    }
  }

  .form-subtitle {
    line-height: 15px;
    font-size: 12px;
    font-weight: 100;
    color: #abacb0;
    letter-spacing: 0.2px;
  }
</style>