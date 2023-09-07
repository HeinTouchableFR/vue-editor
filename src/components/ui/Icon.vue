<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string,
  size?: number,
  path?: string,
  additionalClass?: string,
}>(), {
  size: 20,
  path: 'sprite.svg'
})


const href = `/${props.path}#${props.name}`
</script>

<template>
  <svg :class="props.additionalClass" :width=props.size :height=props.size>
    <use :href=href />
  </svg>
</template>