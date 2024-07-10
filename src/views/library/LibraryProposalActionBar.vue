<script setup>
import {ref, onMounted} from 'vue'
import ActionBar from '../../components/ActionBar/ActionBar.vue'
import LeftActionBar from '../../components/ActionBar/LeftActionBar.vue'
import RightActionBar from '../../components/ActionBar/RightActionBar.vue'
import LibraryDesignDropdownList from './LibraryDesignDropdownList.vue'
import DropdownOwnerList from '../platform/lead/components/DropdownOwnerList.vue';
import { Skeletor } from 'vue-skeletor';

const owners = ref([
	{ id: 3, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 4, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 5, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 6, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 7, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 8, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
])


onMounted(() => {
    simulateApiCall();
});
const isLoading = ref(false);

const simulateApiCall = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
}

</script>

<template>
    <action-bar class="ml-3 library-proposal-action-bar">
		<left-action-bar>
			<div v-if="isLoading" style="width: 25rem;">
			    <Skeletor />
			    <Skeletor width="65%" />
			</div>
			<div v-else>
				<p class="mb-0">
					185 Military Road , Dover Heights
					<span class="text-secondary">New South Wales</span>
					<div class="d-inline-flex ms-2 gap-2">
                        <font-awesome-icon
						    class="text-secondary"
						    icon="fas fa-pen"
						/>
						<font-awesome-icon
						    class="text-secondary"
						    icon="fas fa-copy"
						/>
                    </div>
				</p>
				<div>
					<small class="text-secondary">
						Dov Frazer · 0402450222 · dovman@gmail.com ·
						###-0000-0414
					</small>
				</div>
			</div>
		</left-action-bar>

		<right-action-bar>
			<div v-if="isLoading" class="d-flex gap-2" style="width: 25rem;">
			    <Skeletor width="4.5rem"    height="2.4375rem" style="border-radius: 5px;" />
			    <Skeletor width="10.25rem"  height="2.4375rem" style="border-radius: 5px;" />
			    <Skeletor width="4.25rem"   height="2.4375rem" style="border-radius: 5px;" />
                <Skeletor width="2.4375rem" height="2.4375rem" style="border-radius: 50%;" />
			</div>

            <div v-else class="d-flex align-items-center gap-2">
				<font-awesome-icon
				    class="text-success"
				    icon="fas fa-check"
				/>
				<button class="btn btn-transparent text-info btn-link rounded-lg --shadow-none fw-bold">Link to CRM</button>
                <LibraryDesignDropdownList />

                <div class="dropdown">
                    <div class="d-flex cursor-pointer align-items-center gap-2 p-2 rounded"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
				        <font-awesome-icon icon="fas fa-puzzle-piece"/>
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-caret-down"
				        />
				    </div>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                            <a href="#" class="dropdown-item d-inline-flex align-items-center gap-2">
				                <img class="m8-img" src="https://static.getpylon.com/images/partner/servicem8_logo_square.png" alt=""/>
                                <div class="d-flex flex-column justify-content-center">
				                    <p class="mb-0">ServiceM8</p>
				                    <small>Connect to M8 account</small>
                                </div>
                            </a>
                        </li>
                    </ul>
			    </div>

                <div class="dropdown">
                    <div class="d-flex cursor-pointer align-items-center gap-2 p-2 rounded"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
				        <font-awesome-icon icon="fas fa-circle-user"/>
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-caret-down"
				        />
				    </div>
                    <DropdownOwnerList :owners="owners" />
                </div>

				<div class="dropdown">
				    <button
                        class="cursor-pointer btn btn-light proposal-menu-dropdown"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
				    >
                        <font-awesome-icon icon="fas fa-ellipsis-vertical"/>
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item fs-14px" href="#">Select template $ edit pages</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">Show sent e-signature requests</a></li>

                        <hr>

                        <li><a class="dropdown-item fs-14px" href="#">Sync with Solar Analytics</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">Sync with ServiceM8</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">Installer job sheet</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">User manual</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">CER statements</a></li>
                        <li><a class="dropdown-item fs-14px" href="#">Digital Handover</a></li>

                        <hr>

                        <li>
                            <a class="dropdown-item fs-14px d-inline-flex align-items-center gap-2 " href="#">
                                <font-awesome-icon icon="fas fa-check" />
                                <span>Mark as sold</span>
                            </a>
                        </li>

                        <li>
                            <a class="dropdown-item fs-14px d-inline-flex align-items-center gap-2 " href="#">
                                <font-awesome-icon icon="fas fa-archive" />
                                <span>Archive project</span>
                            </a>
                        </li>

                        <li>
                            <a class="dropdown-item fs-14px text-danger d-inline-flex align-items-center gap-2 " href="#">
                                <font-awesome-icon icon="fas fa-trash" />
                                <span>Delete project</span>
                            </a>
                        </li>
                    </ul>
			    </div>
            </div>
		</right-action-bar>
	</action-bar>
</template>

<style lang="scss" scoped>
.proposal-menu-dropdown {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 2rem !important;
}

.m8-img {
    width: 2rem;
    height: 2rem;
}

.library-proposal-action-bar {
    margin-left: 5rem !important;

    @media only screen and (min-width: 1200px) {
        margin-left: 1rem !important;
    }
}
</style>
