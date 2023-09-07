<script setup lang="ts">
import Sortable from "@/components/Sortable/Sortable.vue";
import SidebarHeading from "@/components/Sidebar/SidebarHeading.vue";
import Icon from "@/components/ui/Icon.vue";

import {t} from '@/functions/i18n'
import type {EditorComponentData} from "@/types";
import {useStore} from "@/store";

const props = defineProps<{
  data: EditorComponentData
}>()
const store = useStore()

</script>

<template>
  <Sortable class="sidebar__content-missing p-block-2 p-inline-3">
    <div class='editor__sidebar-content-missing-wrapper'>
      <SidebarHeading :title="t('unknownComponent') + ': ' + props.data.v._name">
        <button @click.prevent="() => store.removeBloc(data.v)">
          <Icon name='trash' :size=20 />
        </button>
      </SidebarHeading>
    </div>
  </Sortable>
</template>