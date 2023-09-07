<script setup lang="ts">
import { Draggable } from "vue3-smooth-dnd";
</script>

<template>
  <Draggable>
    <div class="editor__sortable"/>
    <slot/>
  </Draggable>
</template>

<style lang="scss">
.editor__sortable {
  width: 10px;
  position: absolute;
  top: 0.5rem;
  left: 3px;
  bottom: 0.5rem;
  cursor: move;
  background: radial-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0) 31%, rgba(0, 0, 0, 0)) left top/5px 5px repeat;
}
</style>