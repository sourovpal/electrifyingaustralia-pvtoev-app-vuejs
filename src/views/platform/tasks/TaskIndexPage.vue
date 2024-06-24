<script setup>
import SearchBar from '../../../components/SearchBar.vue';
import ActionBar from '../../../components/ActionBar/ActionBar.vue';

</script>

<template>
    <section class="content">
        <!-- Showing the wrong text at the moment -->
        <SearchBar /> 
        <action-bar>
            <!-- this is just a temporary filter -->
            <div class="temp-filter d-flex py-2 align-items-center gap-2" style="margin-left: 20px;">
				<font-awesome-icon
				    class="text-secondary"
				    icon="fas fa-bars"
				/>
                <span class="font-bold">All users</span>
            </div>
        </action-bar>

        <!-- <div class="tasks-list w-50 mx-auto mt-5 rounded" style="border: 2px dotted maroon;"> -->
        <div class="tasks-list w-50 mx-auto mt-5 rounded">

            <div class="overdue-tasks-wrapper">
                <p class="fw-bold lead">Overdue</p>
                <div class="tasks-wrapper">
                    <div class="task-bar shadow border">
                        <div class="row-1 d-flex gap-2 align-items-center">
                            <input type="checkbox" />
                            <p class="fw-bold mb-0">Lorem ipsum dolor sit amet</p>
                            <small class="status border fw-bold rounded px-2 py-1">Status</small>
                        </div>

                        <div class="row-2">
                            <div class="checkboxes-wrapper d-flex flex-wrap gap-2">
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" checked/>
                                <input type="checkbox" />
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
.task-bar {
    border-radius: 0.65rem;
    padding: 1rem;
    padding-top: 0.55rem;

    .checkboxes-wrapper {
        width: 65%;
        margin-top: 0.75rem;
    }
}

</style>
