<script setup lang="ts">
import {useStore} from "@/store";
import {InsertPosition} from "@/enum";
import {t} from '@/functions/i18n'

import {type EditorComponentData, type EditorComponentDefinitions, type EditorComponentTemplate} from "@/types";

import Button from '@/components/ui/Button.vue'
import Preview from '@/components/Preview/Preview.vue'


import {useState, useToggle} from "@/functions/hook";
import {stringifyFields} from "@/functions/object";
import {computed, ref, watch, watchEffect} from "vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

const props = defineProps<{
  data: EditorComponentData[],
  definitions: EditorComponentDefinitions,
  templates: EditorComponentTemplate[],
  hiddenCategories: string[],
  insertPosition: InsertPosition,
  previewUrl: string,
  iconsUrl: string,
  name: string,
  onChange: (v: string) => void,
}>()

const store = useStore();
store.$patch({
  data: props.data,
  definitions: props.definitions,
  templates: props.templates,
  hiddenCategories: props.hiddenCategories,
  insertPosition: props.insertPosition,
})


const [visible, toggleVisible] = useToggle(true);
const [skipNextChange, setSkipNextChange] = useState(true);

const cleanedData = ref( stringifyFields(store.getData))


watchEffect(() => cleanedData.value = stringifyFields(store.getData))

watchEffect(() => {
  if (skipNextChange.value) {
    setSkipNextChange(false);
  } else {
    props.onChange(cleanedData.value);
  }
})
const doNothing = () => null;
const handleClose = () => {
  toggleVisible();
}

const test = () => {
  console.log(store.getData)
  store.updateData([])
  console.log(store.getData)
}
</script>

<template>
  <div>
    <Button
        className='primary-outlined'
        type='button'
        @click=toggleVisible
    >
      {{ t('editContent') }}
    </Button>
    <div v-if="visible" class="vue-editor">
      <Sidebar :onClose=handleClose />
      <Preview previewUrl=previewUrl />
    </div>
    <textarea :name=props.name v-model="cleanedData" @change={doNothing}></textarea>
  </div>
</template>


<style lang="scss">
@use '@/components/styles/tools/functions';
@use "sass:string";
$sizes: (
    "size-0": functions.space(0),
    "size-1": functions.space(1),
    "size-2": functions.space(2),
    "size-3": functions.space(3),
    "size-4": functions.space(4),
    "size-5": functions.space(5),
    "size-6": functions.space(6),
);

$sides: top, left, bottom, right, inline, inline-start, inline-end, block, block-start, block-end;

@each $size-number, $size-value in $sizes {
  $number: string.slice($size-number, 6);

  .p {
    &-#{$number} {
      padding: $size-value;
    }

    @each $side in $sides {
      &-#{$side}-#{$number} {
        padding-#{$side}: $size-value;
      }
    }
  }

  .m {
    &-#{$number} {
      margin: $size-value;
    }

    @each $side in $sides {
      &-#{$side}-#{$number} {
        margin-#{$side}: $size-value;
      }
    }
  }
}
  .vue-editor {
    --sidebar: v-bind('store.sidebarWidth');
    --clamped: clamp(470px, var(--sidebar), calc(100vw - 375px));
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: var(--clamped) 1fr;
    color: var(--color);
    font-size: var(--step-0);
    transition: background-color .3s ease 0s;
    box-sizing: border-box;
    isolation: isolate;
    z-index: 9999;
    animation: .7s cubic-bezier(.19, 1, .22, 1) 0s 1 normal both running animateBackgroundIn;
  }

  @keyframes animateBackgroundIn {
    0% {
      background-color: #fff0;
    }

    100% {
      background-color: var(--color);
    }
  }
</style>