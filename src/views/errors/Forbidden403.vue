<template>
  <br>
  {{ checked }}
  <Draggable class="mtl-tree" v-model="treeData" treeLine ref="tree" @check:node="onCheckNode">
    <template #default="{ node, stat }">
      <OpenIcon
        v-if="stat.children.length"
        :open="stat.open"
        class="mtl-mr"
        @click.native="stat.open = !stat.open"
      />
      
      <input
        class="mtl-checkbox mtl-mr"
        type="checkbox"
        v-if="node.children && node.text == 'All'"
      />
      
      <input
        class="mtl-checkbox mtl-mr"
        type="checkbox"
        v-if="node.children && node.text != 'All'"
        :value="node.text"
        @click="selectPermissionGroup(node.text, node.children)"
      />

      <input
        class="mtl-checkbox mtl-mr"
        type="checkbox"
        v-if="!node.children && node.text != 'All'"
        v-model="checked"
        :value="node.text"
      />

      <span class="mtl-ml">{{ node.text }}</span>
    </template>
  </Draggable>
</template>

<script>
  import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
  import '@he-tree/vue/style/default.css'
  import '@he-tree/vue/style/material-design.css'

  export default {
    components: { Draggable, OpenIcon },
    methods: {
      onCheckNode() {
        this.checked = this.$refs.tree.getChecked().map((v) => v.data.text)
      },
      selectPermissionGroup(group, children){

      }
    },
    data() {
      return {
        selectedPermissionGroups:{},
        checked:[],
        treeData: [
          {
            text: 'All',
            children: [
              {
                text: 'Dashboard',
                children: [
                  {
                    group: 'Dashboard',
                    text: 'Dashboard View',
                  },
                  {
                    group: 'Dashboard',
                    text: 'Dashboard Edit',
                  },
                ],
              },
              {
                text: 'Admins',
                children: [
                  {
                    group:'Admins',
                    text: 'Admins View',
                  },
                  {
                    group:'Admins',
                    text: 'Admins Edit',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
</script>