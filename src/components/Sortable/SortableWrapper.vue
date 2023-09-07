<script setup lang="ts">
import { Container } from 'vue3-smooth-dnd'
import type {IndexableObject} from "@/types";
import {computed} from "vue";

const props = defineProps<{
  items: IndexableObject[]
  onMove: (dragEvent: any) => void
}>()

const ids = computed(() => props.items.map(item => item._id))
const handleDragEnd = (dragEvent: any) => {
    props.onMove(dragEvent)
}
</script>

<template>
  <Container
      @drop="handleDragEnd($event)"
      non-drag-area-selector=".sidebar__heading"
      drag-class=".editor__sortable"
      :class="{isActive: true}"
      orientation="vertical"
  >
    <slot/>
  </Container>
</template>