<script setup lang="ts">
import type {EditorComponentData} from "@/types";
import {ref} from "vue";
import {usePreview} from "@/functions/hook";
import Loader from "@/components/ui/Loader.vue";
import {useStore} from "@/store";

const store = useStore()

const props = defineProps<{
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
  title: string
}>()

const item = ref<HTMLDivElement>(null)
const { loading, html } = usePreview(props.data, props.previewUrl, props.initialHTML)

</script>

<template>
  <div :class="`preview__item ${store.focusIndex === data._id ? 'focused' : ''}`"
       ref="item"
       @click="() => store.setFocusIndex(data._id)"
  >
    <Loader v-if="loading" :width=15 :dots=6 />
    <div
        class="preview__item-title"
    >
      {{ props.title }}
  </div>
    <div v-html="html"></div>
  </div>
</template>