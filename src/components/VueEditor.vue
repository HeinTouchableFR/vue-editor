<script setup lang="ts">
import {useStore} from "@/store";
import {InsertPosition} from "@/enum";
import {type EditorComponentData, type EditorComponentDefinitions, type EditorComponentTemplate} from "@/types";

const props = defineProps<{
  data: EditorComponentData[],
  definitions: EditorComponentDefinitions,
  templates: EditorComponentTemplate[],
  hiddenCategories: string[],
  insertPosition: InsertPosition
}>()

const store = useStore();
store.$patch({
  data: props.data,
  definitions: props.definitions,
  templates: props.templates,
  hiddenCategories: props.hiddenCategories,
  insertPosition: props.insertPosition,
})

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ store.data }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
