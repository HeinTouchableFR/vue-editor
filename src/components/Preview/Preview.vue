<script setup lang="ts">
import {useStore} from "@/store";

const store = useStore()

const props = defineProps<{
  previewUrl: string,
}>()
</script>

<template>
  <div class="preview">{{ store.getData }}</div>
</template>

<style lang="scss">
  .preview {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: var(--color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: animatePreview 0.7s cubic-bezier(0.19, 1, 0.22, 1) both;

    iframe {
      transform-origin: 50% 50%;
      border: none;
      color: var(--contrast);
      transition: width 0.3s, height 0.3s, opacity 0.5s;
      opacity: 0;
      width: 100%;
      height: 100%;

      &.mobile {
        width: 390px;
        height: 844px;
      }

      &.loaded {
        opacity: 1;
      }
    }
  }

  @keyframes animatePreview {
    0% {
      transform: translateX(50px);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>