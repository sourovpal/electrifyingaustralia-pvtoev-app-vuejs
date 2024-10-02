<script setup>
  import { Modal } from "mdb-ui-kit";
  import { ref, reactive, watch, computed, onMounted, defineEmits } from 'vue';
  import SelectLeadSource from '../../../components/fields/SelectLeadSource.vue';
  import SelectObjectId from '../../../components/fields/SelectObjectId.vue';
  import DropdownOwnerList from '../../../components/dropdowns/DropdownOwnerList.vue';
  import { useLeadsStore, usePlatformStore } from '@stores';
  import { useApiRequest } from '@actions';
  import { $toast } from '@config';
  import { AvatarIcon } from "@assets/icons";


  const emits = defineEmits(['refresh', 'close']);
  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();

  const modalInstance = computed(() => leadsStore.getAddNewLeadModal);
  const selectedLeads = computed(() => leadsStore.getSelectedLeads);
  const leadSources = computed(() => platformStore.getSources);
  const leadStatuses = computed(() => platformStore.getStatuses);

  const attributes = reactive({
    name: null,
    address: null,
    phone_or_email: null,
    lead_source: null,
    lead_title: null,
    lead_status: null,
    lead_owner: null,
  });
  const errors = ref({});
  const isLoading = ref(false);
  const addNewLeadModalRef = ref(null);
  const isLoadingUsers = ref(false);
  const leadOwner = ref(null);

  function hideModal() {
    modalInstance.value?.hide();
    emits('close', true);
  }

  function fetchUsers() {
    if (platformStore.getUsers.length) return;
    platformStore.callFetchUsers(({ loading }) => {
      isLoadingUsers.value = loading;
    });
  }

  async function handleCreateNewLead() {
    errors.value = {};
    isLoading.value = true;
    attributes['lead_owner'] = leadOwner.value?.user_id;
    await useApiRequest({
      url: '/leads',
      method: 'POST',
      payload: attributes
    }).then(res => {
      const { success, message, errors: isErrors } = res;
      if (success) {
        $toast[message.type](message.text);
        hideModal();
        return emits('refresh', true);
      }
      errors.value = isErrors;
    }).catch(error => {
      $toast.error("Oops, something went wrong");
    }).finally(() => {
      isLoading.value = false;
    });
  }

  onMounted(() => {
    leadsStore.setAddNewLeadModal(new Modal(addNewLeadModalRef.value));
  });


</script>

<template>
  <div class="modal fade add-new-lead-modal"
    ref="addNewLeadModalRef">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="row m-0">
          <div class="col-lg-8">
            <div class="modal-header py-lg-2 px-0">
              <div class="d-flex justify-content-center align-items-center">
                <font-awesome-icon icon="fas fa-user-plus"
                  class="fs-14px text-head me-2"></font-awesome-icon>
                <span class="text-hard fw-bold fs-16px">Add New</span>
              </div>
              <div>
                <button class="btn btn-light btn-sm btn-floating d-lg-none"
                  @click="hideModal()">
                  <font-awesome-icon icon="fas fa-close"
                    class="fs-14px text-soft"></font-awesome-icon>
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
                  v-model="attributes.name"
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
                  v-model="attributes.address"
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
                  v-model="attributes.phone_or_email"
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
                <select-lead-source v-model="attributes.lead_source"
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
                <font-awesome-icon icon="fas fa-circle-info" class="me-2"></font-awesome-icon>
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
                  v-model="attributes.lead_title"
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
                <select-object-id :options="leadStatuses"
                  returnValue="status_id"
                  label="name"
                  v-model="attributes.lead_status" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
              </div>

              <div class="mb-3 add-new-lead-owner-list-dropdown">
                <label class="form-label-title"
                  for="">Owner
                  <span class="text-soft fs-12px ms-1">(Optional)</span></label>
                <div @mouseover="delete errors?.lead_owner"
                  @click="fetchUsers"
                  class="form-control cursor-pointer owner-form-control"
                  data-mdb-toggle="dropdown">
                  <div class="owner-info">
                    <div class="circle-avatar me-2">
                      <img class="avatar"
                        :src="leadOwner?.profile_avatar??AvatarIcon"
                        alt="" />
                    </div>
                    <div class="owner-name fs-16px fw--bold text-hard">
                      {{ leadOwner?.name??'No Owner' }}
                    </div>
                  </div>
                </div>
                <dropdown-owner-list :loading="isLoadingUsers"
                  :lead-owner="leadOwner"
                  @change="(owner)=> leadOwner = owner" />
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.lead_owner?.length">{{ errors?.lead_owner[0] }}</span>
              </div>

              <!-- <div class="mb-3">
                <label class="form-label-title"
                  for="">Tags <span class="text-soft fs-12px ms-1">(Optional)</span>
                </label>
                <div class="form-control tags-list-form-control">
                  <span v-for="(tag, index) in []"
                    :key="index"
                    class="tag-item">
                    <span class="text text-hard">{{ tag }}</span>
                    <span class="close">&times;</span>
                  </span>
                  <input @click="delete errors?.tags"
                    @keydown.enter="addNewTagHandler"
                    @blur="addNewTagHandler"
                    @keydown.delete="
                      (e) => e.target.value.length === 0 && removeTagHandler(null)"
                    class="tags-form-control"
                    type="text"
                    placeholder="Type here"
                    id="" />
                </div>
                <span class="fs-14px text-danger py-1 w-100 d-block"
                  v-if="errors?.tags?.length">{{ errors?.tags[0] }}</span>
              </div> -->
            </div>
          </div>
        </div>

        <div class="row m-0">
          <div class="col-lg-8 pb-2">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <button @click="hideModal"
                  class="btn btn-danger">
                  Cancel
                </button>
              </div>
              <div>
                <loading-button :is-loading="isLoading"
                  @submit="handleCreateNewLead">Save Change</loading-button>
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