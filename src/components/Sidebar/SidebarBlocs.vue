<script setup lang="ts">
import {useStore} from "@/store";


import SortableWrapper from '@/components/Sortable/SortableWrapper.vue'
import SidebarBloc from '@/components/Sidebar/SidebarBloc.vue'
import {applyDrag} from "@/functions/array";

const store = useStore();
const handleMove = (dragEvent: any) => {
store.updateData(applyDrag(store.data, dragEvent))
}

</script>

<template>
  <div class="sidebar__content p-2">
    <SortableWrapper :items=store.data :onMove=handleMove>
      <SidebarBloc
          v-for="(v, k) in store.data"
          :key=v._id
          :data={v}
          :definition=store.definitions[v._name]
          :path=k
      />
    </SortableWrapper>
  </div>
</template>