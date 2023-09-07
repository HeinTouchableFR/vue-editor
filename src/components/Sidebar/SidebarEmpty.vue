<script setup lang="ts">
import {t} from '@/functions/i18n'

import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  onAction: () => void
}>()
</script>

<template>
  <div class="sidebar__empty">
    <p class="m-bottom-1">{{ t('noContent') }}</p>
    <div>
      <Button type="button" @click.prevent="props.onAction">
        {{ t('useTemplate') }}
      </Button>
    </div>
  </div>
</template>