<script setup>
import { usePlatformStore } from "@stores";
import { useAuthStore } from "@stores";
import { AvatarIcon } from "@assets/icons";
import { computed, ref,     onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useApiRequest } from "@actions";
import { $toast } from "@config";
import { Skeletor } from "vue-skeletor";

const props = defineProps({
  loading: { type: Boolean, default: false },
  leadOwner: { type: Object, default: {} },
});
const emits = defineEmits(["change"]);

const platformStore = usePlatformStore();
const authStore = useAuthStore();
const search = ref(null);

const users = computed(() => platformStore.getUsers);
const editLeadId = computed(() => platformStore.getEditLeadId);
const authUser = computed(() => authStore.getUser);

const filterUsers = computed(() => {
  if (!search) return users.value;
  return users.value.filter((user) => {
    if (
      user.name?.toLowerCase()?.search(search.value?.toLowerCase()) > -1 ||
      user.email?.toLowerCase()?.search(search.value?.toLowerCase()) > -1
    ) {
      return user;
    }
  });
});
</script>


<template>
  <div class="owner-list-dropdown">
    <div
      class="dropdown-menu py-0 dropdown-menu-end"
      @click="(e) => e.stopPropagation()"
      style="width: 250px"
    >
      <div>
        <div class="dropdown-body">
          <div class="dropdown-input">
            <input
              v-model="search"
              type="text"
              placeholder="Filter owner"
              class="project-owner-filter form-control"
            />
          </div>

          <div class="dropdown-header">Primary owner</div>

          <div v-if="leadOwner?.user_id" class="dropdown-item noselect px-2">
            <img :src="leadOwner?.profile_avatar" draggable="false" />
            <span class="fs-14px fw-bold text-head">
              {{ leadOwner?.name }}
              <div class="project-owner-email text-muted fs-12px text-head">
                {{ leadOwner?.email }}
              </div>
            </span>
          </div>

          <div
            v-else
            class="dropdown-item noselect"
            @click="emits('change', item)"
          >
            <img
              :src="AvatarIcon"
              draggable="false"
              alt="No Owner's avatar"
              class="project-owner__profile-photo"
            />
            <span class="fs-14px fw-bold">
              No Owner
              <div class="project-owner-email text-muted fs-12px"></div>
            </span>
          </div>

          <div
            class="project-owner-team-members slim-scrollbar-"
            style="max-height: 300px"
          >
            <div class="dropdown-header">Change owner</div>

            <div
              v-if="loading"
              class="dropdown-item px-2"
              v-for="(_, index) in 5"
              :key="index * Math.random()"
            >
              <img :src="AvatarIcon" draggable="false" />
              <span class="username fs-14px text-head fw-bold w-100">
                <Skeletor style="width: 50%; height: 0.5rem" />
                <div class="team-member-email text-muted fs-12px text-head">
                  <Skeletor style="width: 80%; height: 0.5rem" />
                </div>
              </span>
            </div>

            <div
              v-else-if="(users?.length == 1 && leadOwner) || !users?.length"
              class="dropdown-item px-2"
            >
              <span class="username fs-14px fw-bold">
                Owner is not available.
              </span>
            </div>

            <div
              v-else
              class="dropdown-item px-2"
              v-for="(item, index) in filterUsers"
              v-show="item?.user_id != leadOwner?.user_id"
              :key="index"
              @click="emits('change', item)"
            >
              <img :src="item.profile_avatar" draggable="false" />
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