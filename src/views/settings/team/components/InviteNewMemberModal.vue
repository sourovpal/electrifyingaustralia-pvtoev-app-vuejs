<script>
  import { Modal } from "mdb-ui-kit";
  import { SendInviteMail } from '../../../../actions/UserAction';
  import { FetchRoles } from '../../../../actions/RoleAction';
  import CustomScrollbar from 'custom-vue-scrollbar';
  export default {
    props: ['fetchMemberDataHandler'],
    data() {
      return {
        errors: {},
        modalInstance: null,
        email: null,
        access_roles: null,
        isSubmitInviteMember: false,
        isLoading: false,
        roles: [],
      }
    },
    components: {
      CustomScrollbar
    },
    mounted() {
      this.modalInstance = new Modal(this.$refs.InviteNewMemberModal);
    },
    methods: {
      showModalHandler() {
        this.fetchAllRoles();
        this.email = null;
        this.access_roles = null;
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
      async sendInviteMemberMail() {
        try {
          this.$toast.clear();
          this.isSubmitInviteMember = true;
          const data = {
            email: this.email,
            access_roles: this.access_roles,
          };
          const res = await SendInviteMail(data);
          const { success, message, errors } = res;
          this.$toast[message.type](message.text);
          if (success) {
            this.fetchMemberDataHandler();
          } else {
            this.errors = errors;
          }
        } catch (error) {
          this.$toast.error('Oops, something went wrong');
        } finally {
          this.isSubmitInviteMember = false;
        }
      }
    },
  }
</script>

<template>

  <div class="modal fade"
    ref="InviteNewMemberModal"
    id="InviteNewMemberModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-base">Member invitation</h5>
        </div>

        <div class="modal-body">
          <p class="form-subtitle">Invite team members by their email. Team members will be able to collaborate with
            existing projects and share designs.</p>
          <div class="row settings-group-item mb-3">
            <div class="col-2 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Email:</label>
            </div>
            <div class="col-8 me-auto d-flex justify-content-start align-items-center flex-direction-column">
              <input @click="delete errors?.email"
                v-model="email"
                class="form-control"
                type="text">
              <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.email?.length">{{ errors?.email[0] }}</span>
            </div>
          </div>
          <div class="row settings-group-item mb-0">
            <div class="col-2 ms-2 d-flex justify-content-end align-items-baseline">
              <label class="form-label-title mb-0">Role:</label>
            </div>
            <div
              class="col-8 me-auto d-flex justify-content-start align-items-center flex-direction-column position-relative">
              <div class="w-100 position-relative">
                <input readonly="true"
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
        </div>

        <div class="modal-footer flex-between-center border-top-0">
          <div class="row settings-group-item mb-0 w-100">
            <div class="col-6">
              <button type="button"
                class="btn btn-danger fw-bold"
                data-mdb-dismiss="modal">Cancel</button>
            </div>
            <div class="col-6">
              <button :disabled="isSubmitInviteMember"
                @click="sendInviteMemberMail"
                type="submit"
                class="ms-auto btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                <div v-if="isSubmitInviteMember">
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
                <span v-if="!isSubmitInviteMember">Invite member</span>
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