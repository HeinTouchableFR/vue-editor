<script setup lang="ts">
import {useStore} from "@/store";
import {t} from '@/functions/i18n'

const props = defineProps<{
  position: number
}>()

const store = useStore()
</script>

<template>
  <button class="preview__addFloating" @click.prevent="() => store.setAddBlockIndex(props.position)">
    <span>{{ t('addComponent') }}</span>
  </button>
</template>