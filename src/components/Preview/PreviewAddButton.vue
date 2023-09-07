<script setup lang="ts">
import {useStore} from "@/store";
import {t} from '@/functions/i18n'
import Icon from "@/components/ui/Icon.vue";

const props = defineProps<{
  position: number
}>()

const store = useStore()

</script>

<template>
  <div class="preview__addButton m-2 ">
  <button
      type='button'
      @click.prevent="store.setAddBlockIndex(props.position)"
  >
    <Icon name="plus" :size=20 />
    {{ t('addComponent') }}
  </button>
  </div>
</template>