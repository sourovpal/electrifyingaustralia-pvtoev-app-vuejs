<script setup>
  const props = defineProps({
    isLost: { type: Boolean, default: false },
  });
</script>

<template>
  <bootstrap-modal v-bind="$attrs"
    :dialog-style="{'width':'350px'}">
    <template #header>
      <div class="modal-header py-1">
        <h6 class="mb-0 fw-bold">
          {{ isLost ? "Lost deal's" : "Won deal's" }}
        </h6>
        <button data-mdb-dismiss="modal"
          class="btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="fas fa-close"
            class="fs-14px text-soft" />
        </button>
      </div>
    </template>
    <template #body>
      <div class="mb-3">
        <label class="mb-2 fs-16px text-head">Pipeline</label>
        <input type="text"
          class="form-control" />
      </div>
      <div class="mb-3">
        <label class="mb-2 fs-16px text-head">Stage</label>
        <input type="text"
          class="form-control" />
      </div>
      <div class="mb-3">
        <label class="mb-2 fs-16px text-head">Commant</label>
        <textarea class="form-control"
          name=""
          id=""
          cols="30"
          rows="5"></textarea>
      </div>
      <div class="mt-5 d-flex justify-content-between align-items-center">
        <button class="btn btn-danger btn-sm"
          data-mdb-dismiss="modal">
          Close
        </button>
        <button class="btn btn-primary btn-sm">Submit</button>
      </div>
    </template>
  </bootstrap-modal>
</template>