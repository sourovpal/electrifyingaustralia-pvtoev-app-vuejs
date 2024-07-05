<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'
import JobSheetInfo from './JobSheetInfo.vue'

const emit = defineEmits(['close']);
const shareModal = ref(null)
let myModal = null

onMounted(() => {
	myModal = new Modal(shareModal.value, {
		keyboard: false,
		backdrop: 'static',
	})
	myModal.show()
})

onBeforeUnmount(() => {
    myModal.hide();
});

const activeTab = ref('');
const handleModalClose = () => {
    myModal.hide() 
    emit('close');
};
const handleTabClick = (tabName) => {
    activeTab.value = tabName;
}
</script>

<template>
	<div class="modal fade" tabindex="-1" ref="shareModal">
		<div class="modal-dialog modal-xl modal-dialog-centered custom-radius share-modal-dialog">
			<div class="modal-content">
				<div class="modal-body p-0" id="modal-body">
                    <!-- <ProjectList /> -->
                    <JobSheetInfo />
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss">
.custom-radius {
    border-radius: 1rem;
    overflow: hidden;
}

.project {
    border: 2px solid blue;
    border-radius: 0.5rem;
    overflow: hidden;

    &-info {
        background: #e5f4ff;
    }

    &-list-wrapper li {
        margin-bottom: 1rem;
    }
}

</style>
