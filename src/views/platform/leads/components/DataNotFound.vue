<script setup>
import { EmptyFolderIcon } from "@assets/icons";

</script>

<template>
  <div class="tbl-tr active">
    <div style="width: 100%; height: calc(89vh + 3px)" class="tbl-td">
      <div class="empty-folder">
        <div>
          <img :src="EmptyFolderIcon" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped
    lang="scss">
.tbl-tr {
  position: absolute;
}

.empty-folder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;

  img {
    width: 100%;
    object-fit: cover;
    opacity: 0.4;
  }
}
</style>