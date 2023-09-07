<script setup lang="ts">
import {useState} from "@/functions/hook";
import {useStore} from "@/store";

import {t} from '@/functions/i18n'

import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import SidebarTemplates from '@/components/Sidebar/SidebarTemplates.vue'

import {computed} from "vue";
import SidebarEmpty from "@/components/Sidebar/SidebarEmpty.vue";
import SidebarBlocs from "@/components/Sidebar/SidebarBlocs.vue";

enum States {
  BLOCS,
  TEMPLATES,
}

const props = defineProps<{
  onClose: () => void
}>()

const store = useStore();

const [state, setState] = useState(States.BLOCS)

const toggleMode = () => {
  setState(state.value === States.BLOCS ? States.TEMPLATES : States.BLOCS)
}

const hasTemplates = computed(() => store.templates.length > 0)
const isTemplateMode = computed(() => state.value === States.TEMPLATES)
const showEmpty = computed(() => store.data.length === 0 && hasTemplates)


const test = () => {
}

</script>

<template>
  <div class="sidebar">
    <div class="sidebar__header p-2">
      <button
          class="sidebar__header-close"
          type='button'
          @click.prevent=props.onClose
          :aria-label="t('close')"
      >
        <Icon name='cross' :size=25 />
      </button>
      <div class="sidebar__header-actions">
        <button
            v-if="hasTemplates"
            class="sidebar__header-actions-button"
            type='button'
            @click.prevent=toggleMode
            :aria-label="t(isTemplateMode ? 'addComponent' : 'useTemplate')"
        >
          <Icon :key="isTemplateMode ? 'bloc' : 'template'" :name="isTemplateMode ? 'bloc' : 'template'" :size=25 />
        </button>
        <button
            class="sidebar__header-actions-button"
            type='button'
            @click.prevent=store.togglePreviewMode
            :aria-label="t('responsiveView')"
        >
          <Icon name='responsive' :size=25 />
        </button>
      </div>
    </div>
    <SidebarEmpty v-if="state === States.BLOCS && showEmpty" :on-action="() => setState(States.TEMPLATES)" />
    <SidebarBlocs v-if="state === States.BLOCS && !showEmpty"/>
    <SidebarTemplates v-if="state === States.TEMPLATES" @click="() => setState(States.BLOCS)" />
    <div class="sidebar__footer p-2">
      <Button type="submit">
        <Icon additionalClass='m-right-1' name='save' :size=20 />
        {{ t('save') }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/components/styles/tools/functions';

.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--background-light);
  box-shadow: #0003 0 20px 25px -5px, #0000000a 0 10px 10px -5px;
  transition: transform .5s cubic-bezier(.19, 1, .22, 1) 0s;
  box-sizing: border-box;
  animation: .7s cubic-bezier(.19, 1, .22, 1) 0s 1 normal both running animateSidebar;
  z-index: 2;

  .sidebar__header, .sidebar__footer {
    display: flex;
    align-items: center;
    gap: functions.space(1);
    background-color: var(--background-light);
    justify-content: space-between;
    border-bottom: solid 1px hsla(var(--color-dark-h), var(--color-dark-l), var(--color-dark-s), .15);
    box-shadow: #0000000d 0 1px 2px;
  }

  .sidebar__header {
    .sidebar__header-close, .sidebar__header-actions-button {
      display: flex;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      color: var(--color);
      background: var(--background-light);
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      border: none;
      outline: none;
      cursor: pointer;

      &:hover, &:focus {
        background: var(--contrast);
        color: var(--color-light);
      }
    }

    .sidebar__header-actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: functions.space(2);
    }
  }

  .sidebar__footer {
    margin-top: auto;
    justify-content: flex-end;
    border-top: solid 1px hsla(var(--color-dark-h), var(--color-dark-l), var(--color-dark-s), .15);
    box-shadow: #0000000d 0 -1px 2px;

    button {
      margin: initial;
    }
  }

  .sidebar__empty {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .sidebar__content .smooth-dnd-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: functions.space(2);
    overflow: auto;

    .sidebar__content-item {
      position: relative;
      border: solid 1px var(--color-light);
      cursor: inherit;
      background: var(--background-light);
      box-shadow: none;
      color: var(--color-dark);
    }

    .sidebar__heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: functions.space(1);

      .sidebar__heading-title {
        width: 100%;
        text-align: left;
        font-size: var(--step-0);
        scroll-margin: functions.space(2);
        cursor: pointer;

        strong {
          display: block;
          color: var(--contrast);
          font-weight: bold;
          font-size: var(--step-1);
        }
      }
    }

    .sidebar__content-missing {
      position: relative;
      border: solid 1px var(--red);
      cursor: inherit;
      background: var(--red);
      box-shadow: none;
      color: var(--color-light);
    }
  }

  .sidebar__templates {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: functions.space(2);
    overflow: hidden;

    .sidebar__templates-card {
      position: relative;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: functions.space(1.5);
      align-items: center;
      width: 100%;
      cursor: pointer;
      background: var(--background-light);
      border: solid 1px var(--color-light);
      transition: .3s;

      &:hover {
        background: var(--color-light);
      }

      img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

      .sidebar__templates-card-body {
        display: grid;
        grid-template-columns: 1fr;
        color: var(--color-dark);

        .sidebar__templates-card-body-title {
          font-size: var(--step-1);
          font-weight: bold;
        }
      }
    }
  }
}

@keyframes animateSidebar {
  0% {
    transform: translate(-100%);
  }

  100% {
    transform: translate(0);
  }
}
</style>