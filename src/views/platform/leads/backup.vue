<Datatable>
    <FilterRightSidebar :toggle="toggleFilterSidebar"
      @toggle-filter-sidebar-handler="toggleFilterSidebarHandler"
      :lead-properties="leadProperties"
      :custom-form-data="customFilterFormData"
      :lead-sources="leadSources"
      :owners="owners"
      ref="filterRightSidebarRef" />

    <datatable-header class=""
      v-if="isFirstLoading || fetchLeads.length">
      <div class="tbl-th"
        style="width: 3.6rem; flex-grow: 1"></div>

      <div v-show="!disabledHeaderColumns.includes('lead')"
        class="tbl-th"
        style="width: 20rem; flex-grow: 1">
        Lead
      </div>

      <div v-show="!disabledHeaderColumns.includes('source')"
        @click="leadSortedHandler('source')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">
        Source
        <column-sorted field="source"
          :column="column"
          :order="order" />
      </div>

      <div v-show="!disabledHeaderColumns.includes('status')"
        @click="leadSortedHandler('status')"
        class="tbl-th cursor-pointer"
        style="width: 12rem; flex-grow: 1">
        Status
        <column-sorted field="status"
          :column="column"
          :order="order" />
      </div>

      <div v-show="!disabledHeaderColumns.includes('phone_number')"
        class="tbl-th text-end"
        style="width: 12rem; flex-grow: 1">
        Phone Number
      </div>

      <div v-show="!disabledHeaderColumns.includes('email_address')"
        class="tbl-th"
        style="width: 15rem; flex-grow: 1">
        Email Address
      </div>

      <div v-show="!disabledHeaderColumns.includes('address_line_one')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Address One
      </div>

      <div v-show="!disabledHeaderColumns.includes('address_line_two')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Address Two
      </div>

      <div v-show="!disabledHeaderColumns.includes('city')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        City
      </div>

      <div v-show="!disabledHeaderColumns.includes('state')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        State
      </div>

      <div v-show="!disabledHeaderColumns.includes('post_code')"
        @click="leadSortedHandler('post_code')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">
        Postcode
        <column-sorted field="post_code"
          :column="column"
          :order="order" />
      </div>

      <div v-show="!disabledHeaderColumns.includes('country')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Country
      </div>

      <!-- Custom Propertys -->

      <div v-for="(propertie, index) in leadProperties"
        :key="index"
        class="tbl-th"
        v-show="!disabledHeaderColumns.includes(propertie.unique_id)"
        style="width: 12rem; flex-grow: 1">
        <span class="text-overflow-ellipsis w-100">{{
          propertie.label
          }}</span>
      </div>

      <div v-show="!disabledHeaderColumns.includes('last_update')"
        @click="leadSortedHandler('updated_at')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">
        Last Update
        <column-sorted field="updated_at"
          :column="column"
          :order="order" />
      </div>
      <div v-show="!disabledHeaderColumns.includes('first_create')"
        @click="leadSortedHandler('created_at')"
        class="tbl-th cursor-pointer"
        style="width: 10rem; flex-grow: 1">
        Created At
        <column-sorted field="created_at"
          :column="column"
          :order="order" />
      </div>

      <div v-show="!disabledHeaderColumns.includes('owner')"
        class="tbl-th"
        style="width: 10rem; flex-grow: 1">
        Owner
      </div>
    </datatable-header>

    <datatable-body>
      <div :class="selectedRows.includes(lead.lead_id) ? 'active' : ''"
        v-if="!isFirstLoading || fetchLeads.length"
        class="tbl-tr full-width"
        v-for="(lead, index) in fetchLeads"
        :key="index">
        <div style="width: 4rem; margin-left: -7px; flex-grow: 1"
          class="tbl-td full-width">
          <custom-checkbox @click="singleRowSelectedHandler(lead.lead_id)"
            :checked="selectedRows.includes(lead.lead_id)" />
        </div>

        <div v-show="!disabledHeaderColumns.includes('lead')"
          style="width: 20rem; flex-grow: 1"
          class="tbl-td full-width">
          <router-link class="text-overflow-ellipsis"
            :to="`/platform/leads/${lead.lead_id}`">
            {{ lead.lead_title ?? lead?.primary_contact?.full_name }}
          </router-link>
        </div>

        <div v-show="!disabledHeaderColumns.includes('source')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{ lead.source?.title }}</span>
        </div>

        <div v-show="!disabledHeaderColumns.includes('status')"
          style="width: 12rem; flex-grow: 1"
          class="tbl-td">
          <div class="dropdown w-100">
            <button
              class="btn btn-sm btn-outline-secondary fw-400 w-100 d-flex justify-content-between align-items-center"
              type="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false">
              <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head">{{ lead.status?.name
                ?? "Lead Status" }}</span>
              <div class="dropdown--icon">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"></path>
                  <path d="M0 0h24v24H0z"
                    fill="none"></path>
                </svg>
              </div>
            </button>
            <div class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton">
              <span style="width: 170px"
                v-for="(status, index) in leadStatus"
                :key="index"
                class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1"
                :class="`${
                  status.name == lead.status?.name ? 'selected' : ''
                }`"
                @click="updateLeadStatusHandler(lead.lead_id, status, lead)">
                <span class="text-overflow-ellipsis text-head">{{
                  status.name
                  }}</span>
                <svg v-if="status.is_lost"
                  class="svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18">
                  <path d="M0 0h24v24H0z"
                    fill="none"></path>
                  <path
                    d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z">
                  </path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div v-show="!disabledHeaderColumns.includes('phone_number')"
          style="width: 12rem; flex-grow: 1"
          class="tbl-td">
          <div class="d-flex justify-content-between align-items-center w-100">
            <div>
              <button v-show="lead?.primary_contact?.phone_number"
                @click="copyPhoneNumberHandler(lead)"
                class="copy-phone-number">
                <svg class="svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z"
                    fill="none"></path>
                  <path
                    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">
                  </path>
                </svg>
              </button>
              <a v-show="lead?.primary_contact?.phone_number"
                :href="`tel:${lead?.primary_contact?.phone_number}`"
                target="_blank"
                title="Call phone number"
                class="call-btn">
                <svg class="svg-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000">
                  <path d="M0 0h24v24H0z"
                    fill="none"></path>
                  <path
                    d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z">
                  </path>
                </svg>
              </a>
            </div>
            <div>
              {{ lead.primary_contact?.phone_number }}
            </div>
          </div>
        </div>

        <div v-show="!disabledHeaderColumns.includes('email_address')"
          style="width: 15rem; flex-grow: 1"
          class="tbl-td">
          <a class="text-overflow-ellipsis"
            href="">{{
            lead.primary_contact?.email
            }}</a>
        </div>

        <div v-show="!disabledHeaderColumns.includes('address_line_one')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{
            lead.address_line_one
            }}</span>
        </div>

        <div v-show="!disabledHeaderColumns.includes('address_line_two')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <span class="text-overflow-ellipsis">{{
            lead.address_line_two
            }}</span>
        </div>

        <div v-show="!disabledHeaderColumns.includes('city')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.city }}
        </div>

        <div v-show="!disabledHeaderColumns.includes('state')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.state }}
        </div>

        <div v-show="!disabledHeaderColumns.includes('post_code')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.post_code }}
        </div>

        <div v-show="!disabledHeaderColumns.includes('country')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.country }}
        </div>

        <!-- Custom Properties -->

        <div v-for="(propertie, index) in leadProperties"
          :key="index"
          :id="propertie?.unique_id"
          v-show="!disabledHeaderColumns.includes(propertie.unique_id)"
          class="tbl-td"
          style="width: 12rem; flex-grow: 1">
          <span :class="
              fetchCustomProperties(lead?.properties_values, propertie)
                ?.length > 30
                ? 'hover-scroll'
                : ''
            "
            class="text-overflow-ellipsis w-100">
            {{ fetchCustomProperties(lead?.properties_values, propertie) }}
          </span>
        </div>

        <div v-show="!disabledHeaderColumns.includes('last_update')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.updated_at }}
        </div>

        <div v-show="!disabledHeaderColumns.includes('first_create')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          {{ lead.created_at }}
        </div>

        <div v-show="!disabledHeaderColumns.includes('owner')"
          style="width: 10rem; flex-grow: 1"
          class="tbl-td">
          <div class="settings-group-item owner-list-dropdown position-relative">
            <button class="owner-dropdown-toggler"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              v-tippy="{ content: 'Change Owner', placement: 'top' }">
              <div class="icon">
                <img v-if="lead.owner?.profile_avatar"
                  :src="lead.owner?.profile_avatar"
                  alt="" />
                <img v-if="!lead.owner?.profile_avatar"
                  :src="AvatarIcon"
                  alt="" />
              </div>
            </button>
            <DropdownOwnerList :owners="owners"
              :owner="lead.owner"
              class="tbl-lead-owner-list"
              :selectOwnerHandler="
                (item) => updateLeadOwnerHandler(item, lead)
              " />
          </div>
        </div>
      </div>
    </datatable-body>
  </Datatable>