<script setup lang="ts">
import {useStore} from "@/store";
import PreviewItem from "@/components/Preview/PreviewItem.vue";
import PreviewAddFloating from "@/components/Preview/PreviewAddFloating.vue";
import PreviewAddButton from "@/components/Preview/PreviewAddButton.vue";

const store = useStore()
const props = defineProps<{
  initialHTML: Record<string, string>
  previewUrl: string
}>()
</script>

<template>
  <div>
    <div v-for="(v, k) in store.data" :key="v._id">
      <PreviewAddFloating :position=k />
      <PreviewItem
          :title="store.definitions[v._name]?.title || ''"
          :data=v
          :initialHTML="initialHTML[v._id] || ''"
          :previewUrl=previewUrl
      />
    </div>
    <PreviewAddButton :position=store.data.length />
  </div>
</template>