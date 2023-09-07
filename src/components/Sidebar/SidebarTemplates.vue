<script setup lang="ts">
import {useStore} from "@/store";
import {useState} from "@/functions/hook";
import type {EditorComponentTemplate} from "@/types";

const store = useStore()

const props = defineProps<{
  onClick: () => void
}>()

const [loadingTemplate, setLoadingTemplate] = useState(false)

const callback = async (t: EditorComponentTemplate) => {
  setLoadingTemplate(t)
  let data: EditorComponentTemplate['data']
  if (typeof t.data === 'function') {
    setLoadingTemplate(t)
    data = await t.data().catch(() => [])
    setLoadingTemplate(t)
  } else {
    data = t.data
  }

  store.setData(data)
  props.onClick()
}

</script>

<template>
  <div class="sidebar__templates p-2">
    <div
        v-for="template in store.templates"
        :key=template.name
        class="sidebar__templates-card"
        @click.prevent="loadingTemplate === template ? null : callback(template)"
    >
      <img :src=template.image alt=''/>
      <div class="sidebar__templates-card-body">
        <div class="sidebar__templates-card-body-title">
          {{ template.name }}
        </div>
        <div>{{ template.description }}</div>
      </div>
    </div>
  </div>
</template>