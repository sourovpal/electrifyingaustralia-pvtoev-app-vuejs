<script>
  import { useLeadStore } from "../../../../../stores/lead";
  import { useAppStore } from "../../../../../stores/app";
  import { UpdateSubscribers } from "../../../../../actions/LeadAction";
  import { AvatarIcon } from "../../../../../assets/icons";

  export default {
    props: ["owners", "owner"],
    data() {
      return {
        searchOwner: null,
        selectedSubscribers: [],
      };
    },
    setup(props) {
      const leadStore = useLeadStore();
      const appStore = useAppStore();
      return { leadStore, appStore, AvatarIcon };
    },
    methods: {
      async selectSubscribersHandler(item) {
        if (this.selectedSubscribers.includes(item?.id)) {
          this.selectedSubscribers.splice(
            this.selectedSubscribers.indexOf(item?.id),
            1
          );
        } else {
          this.selectedSubscribers.push(item?.id);
        }
        try {
          if (this.owner?.id) {
            this.selectedSubscribers.push(this.owner.id);
          }
          const payload = {
            lead_id: this.$route.params?.id ?? "",
            user_ids: this.selectedSubscribers,
          };
          const res = await UpdateSubscribers(payload);
        } catch (error) { }
      },
      filterOwners() {
        return this.owners?.filter((item) => {
          if (this.searchOwner) {
            if (
              (item.name + item.email)
                .toLowerCase()
                .search(this.searchOwner.toLowerCase()) > -1
            ) {
              return item;
            }
          } else {
            return item;
          }
        });
      },
    },
    watch: {
      leadSubscribers(payload) {
        this.selectedSubscribers = payload;
      },
    },
    computed: {
      leadSubscribers() {
        return this.leadStore.getLeadSubscribers;
      },
    },
  };
</script>


<template>
  <div class="owner-list-dropdown">
    <div class="dropdown-menu py-0 dropdown-menu-end"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
      style="width: 250px">
      <!---->
      <div>
        <div class="dropdown-body">
          <div class="dropdown-input">
            <input v-model="searchOwner"
              type="text"
              placeholder="Filter subscriber"
              class="project-owner-filter form-control" />
          </div>

          <div class="dropdown-header">Primary Subscriber</div>

          <div v-if="owner?.id"
            class="dropdown-item noselect px-2">
            <img :src="owner?.profile_avatar"
              draggable="false" />
            <span class="fs-14px fw-bold text-head">
              {{ owner?.name }}
              <div class="project-owner-email text-muted fs-12px text-head">
                {{ owner?.email }}
              </div>
            </span>
          </div>

          <div v-else
            class="dropdown-item noselect"
            @click="selectOwnerHandler(null)">
            <img :src="AvatarIcon"
              draggable="false"
              alt="No Owner's avatar"
              class="project-owner__profile-photo" />
            <span class="fs-14px fw-bold">
              No Subscriber
              <div class="project-owner-email text-muted fs-12px"></div>
            </span>
          </div>

          <div class="project-owner-team-members slim-scrollbar-"
            style="max-height: 300px">
            <div class="dropdown-header">Subscribers</div>

            <div class="dropdown-item pe-2 ps-0"
              v-for="(item, index) in filterOwners()"
              v-show="item?.email != owner?.email"
              :key="index"
              @click="selectSubscribersHandler(item)">
              <label class="custom-form-checkbox btn btn-floating btn-light me-2 disabled">
                <svg v-if="!selectedSubscribers.includes(item?.id)"
                  class="unchecked"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
                </svg>
                <svg v-else
                  class="checked"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path
                    d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                  </path>
                </svg>
              </label>

              <img :src="item.profile_avatar"
                draggable="false" />
              <span class="username fs-14px text-head fw-bold">
                {{ item.name }}
                <div class="team-member-email text-muted fs-12px text-head">
                  {{ item.email }}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss"
  scoped>
  /* ================== */
  .owner-list-dropdown {
    .dropdown-menu {
      z-index: 1000;
      width: 100%;
      padding: 0.5rem 0;
      margin: 0.125rem 0 0;
      font-size: 1rem;
      color: #292b2c;
      text-align: left;
      background-color: #fff;
      background-clip: padding-box;
      border-radius: 0.25rem;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

      &::before {
        content: "";
        position: absolute;
        top: -7px;
        right: 30px;
        border: 7px solid #f1f0f0;
        border-right-color: white;
        border-bottom-color: white;
        transform: rotate(45deg);
        border-bottom-color: transparent;
        border-right-color: transparent;
      }

      &::after {
        content: "";
        position: absolute;
        top: -6px;
        right: 30px;
        border: 7px solid white;
        border-right-color: white;
        border-bottom-color: white;
        transform: rotate(45deg);
        border-bottom-color: transparent;
        border-right-color: transparent;
      }

      @media screen and (max-width: 766px) {

        &::after,
        &::before {
          left: 30px;
          right: auto !important;
        }
      }

      .dropdown-header {
        font-size: 0.75rem;
        padding: 0 0.5rem;
        font-weight: 700;
        line-height: 1.5rem;
        margin-bottom: 0;
        padding-top: 0.5rem;
      }

      .dropdown-item.noselect {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 10px;
        user-select: none;
        border-bottom: 1px solid #dddddd;

        img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          margin-right: 10px;
        }

        span {
          display: inline-block;
          line-height: 18px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          .project-owner-email,
          .team-member-email {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      .project-owner-team-members {
        max-height: 290px;
        overflow: auto;

        .dropdown-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          user-select: none;

          img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            margin-right: 10px;
          }

          span {
            display: inline-block;
            line-height: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            .project-owner-email,
            .team-member-email {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }

    .dropdown-body {
      .dropdown-input {
        .project-owner-filter {
          background: #f5f7fa;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border: 0;
          width: 100%;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
</style>