<script>
import { AvatarIcon } from "../../../assets/icons";

export default {
  props: ["users", "user"],
  setup() {
    return { AvatarIcon };
  },
  data() {
    return {
      searchuser: null,
    };
  },
  methods: {
    resetSearchuser() {
      this.searchuser = null;
    },
    filterusers() {
      return this.users?.filter((item) => {
        if (this.searchuser) {
          if (
            (item.name + item.email)
              .toLowerCase()
              .search(this.searchuser.toLowerCase()) > -1
          ) {
            return item;
          }
        } else {
          return item;
        }
      });
    },
  },
};
</script>


<template>
  <div class="user-list-dropdown">
    <div
      class="dropdown-menu py-0 dropdown-menu-end"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
      style="width: 250px"
    >
      <!---->
      <div>
        <div class="dropdown-body">
          <div class="dropdown-input">
            <input
              v-model="searchuser"
              type="text"
              placeholder="Filter user"
              class="project-user-filter form-control"
            />
          </div>

          <div class="dropdown-header">Primary user</div>

          <div v-if="user" class="dropdown-item noselect px-2">
            <img :src="user?.profile_avatar" draggable="false" />
            <span class="fs-14px fw-bold text-head">
              {{ user?.name }}
              <div class="project-user-email text-muted fs-12px text-head">
                {{ user?.email }}
              </div>
            </span>
          </div>

          <div
            v-else
            class="dropdown-item noselect"
            @click="$emit('user-selected', null)"
          >
            <img
              :src="AvatarIcon"
              draggable="false"
              alt="No user's avatar"
              class="project-user__profile-photo"
            />
            <span class="fs-14px fw-bold">
              No user
              <div class="project-user-email text-muted fs-12px"></div>
            </span>
          </div>

          <div class="project-user-team-members slim-scrollbar-">
            <div class="dropdown-header">Change user</div>

            <div
              class="dropdown-item px-2"
              v-for="(item, index) in filterusers()"
              v-show="item?.email != user?.email"
              :key="index"
              @click="$emit('user-selected', item)"
            >
              <img :src="item.profile_avatar" draggable="false" />
              <span class="username fs-14px text-head fw-bold">
                {{ item.name }}
                <div class="team-member-email text-muted fs-12px text-head">
                  {{ item.email }}
                </div>
              </span>
            </div>
            <div
              class="dropdown-item px-2"
              v-if="(users?.length == 1 && user) || !users?.length"
            >
              <span class="username fs-14px fw-bold">
                user is not available.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
/* ================== */
.user-list-dropdown {
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
        .project-user-email,
        .team-member-email {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .project-user-team-members {
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
          .project-user-email,
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
      .project-user-filter {
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
