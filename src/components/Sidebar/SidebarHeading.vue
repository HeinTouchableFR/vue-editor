<script setup lang="ts">
const props = defineProps<{
  title?: string,
  description?: string,
  onClick?: () => void
}>()
</script>

<template>
  <div class="sidebar__heading">
    <div class="sidebar__heading-title" @click=onClick>
      <strong>{{ props.title }}</strong>
      {{ props.description }}
    </div>
    <slot/>
  </div>
</template>