<script setup>
import {onMounted} from 'vue'

</script>

<template>
	<div class="content content-y-100vh">
		<div
			class="content-header d-flex justify-content-start align-items-center mb-4 border-bottom pb-4"
		>
			<router-link to="/settings/installers">
				<h1 class="mb-0  text-soft">Task workflows</h1>
			</router-link>
			<div class="mx-2">
				<svg
					class="svg-5"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
					></path>
					<path fill="none" d="M0 0h24v24H0V0z"></path>
				</svg>
			</div>
			<h1 class="mb-0 text-base">Create workflow</h1>
		</div>

		<div class="content-body">
		    <div class="title-input-wrapper">
		        <label for="worflow-title-input" class="fs-6 fw-bold">Title</label>
                <input id="worflow-title-input" type="text" class="form-control rounded" placeholder="Enter title" />
		    </div>

		    <div class="task-crud-wrapper row gx-0 pt-2">
                <!-- task list -->
		        <div class="task-list-wrapper col-md-4 mt-3 --border">
		            <p class="fw-bold fs-6 mb-0">Tasks</p>

		            <ul class="task-list list-unstyled">
		                <li class="active-task ps-4 py-2">Bean task</li>
		            </ul>
		        </div>

                <!-- task form -->
		        <div class="task-form col-md-8 p-3 border rounded mt-4">
                    <div class="title-input-wrapper mb-4">
		                <label for="title-input" class="fs-6 fw-bold">Task title</label>
                        <input id="title-input" type="text" class="form-control rounded" placeholder="Enter title" />
		            </div>

                    <div class="title-input-wrapper mb-4">
		                <label for="task-input" class="fs-6 fw-bold">Task Description</label>
                        <textarea id="task-input" class="d-block w-100 pt-1" style="padding-left: 12px;" rows="3" placeholder="Enter description"></textarea>
		            </div>

                    <div class="title-input-wrapper">
		                <label for="time-input" class="fs-6 fw-bold">Relative due date after previous event</label>
                        <select class="d-block" name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
		            </div>

                    <button class="btn btn-primary mt-5">Save</button>
		        </div>
		    </div>

		</div>
	</div>
</template>

<style lang="scss" scoped>

.content-body {
    width: 60%;
}

.task-list {
    width: 90%;

}

.active-task {
    border-left: 3px solid #007ee5;
    background-color: #e5f4ff;
    font-style: italic;
}


.active-task::after {
    content: '*'
}

</style>
