<script setup lang="ts">
import type {EditorComponentData, EditorComponentDefinition} from "@/types";
import SidebarBlocMissing from "@/components/Sidebar/SidebarBlocMissing.vue";

const props = defineProps<{
  data: EditorComponentData,
  definition?: EditorComponentDefinition,
  path: number
}>()
</script>

<template>
  <SidebarBlocMissing v-if="!props.definition" :data=props.data />
</template>