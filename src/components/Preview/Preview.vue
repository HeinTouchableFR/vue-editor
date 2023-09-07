<script setup lang="ts">
import {PreviewModes, useStore} from "@/store";
import {useState} from "@/functions/hook";
import {computed, ref, watch, watchEffect} from "vue";
import {useWindowSize} from "vue-window-size";
import { PHONE_HEIGHT } from '@/constants'
import PreviewItems from "@/components/Preview/PreviewItems.vue";

const store = useStore()

const props = defineProps<{
  previewUrl: string,
}>()

const iframe = ref()
const [loaded, setLoaded] = useState<HTMLIFrameElement>(false)
const initialHTML = ref<Record<string, string>>({})
const [iframeRoot, setIframeRoot] = useState(null)
const showSpinner = computed(() => !loaded)

const { height: windowHeight } = useWindowSize()

const transform = computed(() => {
  if (store.previewMode === PreviewModes.PHONE && windowHeight.value < 844) {
    return  { transform: `scale(${windowHeight.value / PHONE_HEIGHT})` }
  }
  return null
})

watch(props, async () => {
  const r = await fetch(props.previewUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(store.data),
  })

  if (!r.ok) {
    return
  }

  // On écrit le contenu dans l'iframe
  const iframeDocument = iframe.value!.contentDocument!
  iframeDocument?.open()
  iframeDocument?.write(await r.text())
  iframeDocument?.close()
  const root = iframeDocument?.querySelector('#ve-components') as HTMLElement
  initialHTML.value = Array.from(root?.children).reduce(
      (acc, v, k) => ({ ...acc, [store.data[k]!._id]: v.outerHTML }),
      {},
  )
  root.innerHTML = ''
  setIframeRoot(root)

  const style = iframeDocument?.querySelector('style') as HTMLElement
  style.innerHTML = `
  :root {
            --font: "Rubik";
            --step--2: clamp(0.61rem,calc(0.6rem + 0.05vw),0.64rem);
            --step--1: clamp(0.73rem,calc(0.71rem + 0.11vw),0.80rem);
            --step-0: clamp(0.88rem,calc(0.84rem + 0.19vw),1.00rem);
            --step-1: clamp(1.05rem,calc(0.99rem + 0.31vw),1.25rem);
            --step-2: clamp(1.26rem,calc(1.17rem + 0.47vw),1.56rem);
            --step-3: clamp(1.51rem,calc(1.37rem + 0.69vw),1.95rem);
            --step-4: clamp(1.81rem,calc(1.62rem + 0.97vw),2.44rem);
            --step-5: clamp(2.18rem,calc(1.91rem + 1.36vw),3.05rem);
            --container-padding: 20px;
            --container-width: 1350px;
            --gap: 20px;
            --space: 8px;
            --contrast: #274754;
            --contrast-h: 197;
            --contrast-s: 37%;
            --contrast-l: 24%;
            --color-dark: #3c2b2a;
            --color-dark-h: 4;
            --color-dark-s: 17%;
            --color-dark-l: 20%;
            --color: #b2a4a3;
            --color-h: 4;
            --color-s: 9%;
            --color-l: 67%;
            --color-light: #f3edec;
            --color-light-h: 4;
            --color-light-s: 21%;
            --color-light-l: 94%;
            --accent: #004a99;
            --accent-h: 211;
            --accent-s: 100%;
            --accent-l: 30%;
            --accent-2: #00ffe5;
            --accent-2-h: 174;
            --accent-2-s: 100%;
            --accent-2-l: 50%;
            --red: #f25353;
            --green: #41cf7c;
            --yellow: #feb32b;
            --white: #fff;
            --color-1: #023e8a;
            --color-2: #e85d04;
            --color-3: #6a994e;
            --color-4: #d00000;
            --color-5: #ffb703;
            --color-6: #8338ec;
            --skeleton: var(--color-light);
            --border: var(--color);
            --background: var(--color-light);
            --background-light: #fff;
            --shadow: #d8e1e8;
        }
  .loader {
    display: inline-block;
  width: var(--loader-width);
  height: var(--loader-width);
  }

  .loader .loader__container {
    animation: fadeIn 0.4s cubic-bezier(0.1, 0.6, 0.3, 1);
    position: relative;
    width: 100%;
    height: 100%;
  }
  .loader .loader__container svg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
  }
  .loader .loader__container .circles {
    animation: spin 16s linear infinite;
  }
  .loader .loader__container .halo {
    animation: spin2 1.6s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite;
  }
  .loader .loader__container .halo circle {
        stroke-dasharray: var(--loader-offset);
        stroke-dashoffset: var(--loader-dashoffset);
        animation: trail 1.6s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite;
  }

  .preview__item {
    position: relative;
    cursor: pointer;
  }
  .preview__item:before {
    content: "";
    position: absolute;
    inset: 0;
    border-style: solid;
    border-color: transparent;
    border-width: 1px;
    z-index: 10;
  }

  .preview__item:hover, .preview__item:hover:before {
    border-color: var(--contrast);
  }

  .preview__item:hover {
    border-color: var(--contrast);
  }

  .preview__item:hover .preview__item-title {
      opacity: 1;
    }

  .preview__item .preview__item-title {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--contrast);
    color: var(--color-light);
    padding: 0.2rem 0.4rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    opacity: 0;
    transform: translateY(calc(1px - 100%));
  }

  .preview__addFloating {
    position: relative;
    margin-top: -40px;
    margin-bottom: -40px;
    opacity: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background: transparent;
    padding: 0;
    color: inherit;
    border: none;
    transition: opacity 0.3s;
  }
  .preview__addFloating:hover {
    opacity: 1;
  }
  .preview__addFloating span {
        pointer-events: none;
        font-size: 15px;
        height: 35px;
        background: var(--contrast);
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        position: absolute;
        left: 50%;
        bottom: -30px;
        transform: translate(-50%, 5px);
        color: var(--color-light);
        transition: transform 0.3s;
  }
  .preview__addFloating span:before {
            content: "";
            position: absolute;
            display: block;
            left: calc(50% - 6px);
            top: -6px;
            width: 12px;
            height: 12px;
            background: var(--contrast);
            transform: rotate(45deg);
  }
  .preview__addFloating:before {
        content: "";
        height: 2px;
        width: 100%;
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        z-index: 101;
        background: var(--contrast);
  }
  .preview__addFloating:after {
        content: "+";
        font-size: 1.5rem;
        z-index: 101;
        width: 40px;
        height: 40px;
        background: var(--contrast);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-light);
        border-radius: 40px;
        transition: transform 0.3s;
  }

  .preview__addButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: dashed 2px var(--color);
    width: calc(100% - 2rem);
    margin: 16px;
    padding: 16px;
  }
  .preview__addButton button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: inherit;
        padding: 8px;
  }
  .preview__addButton button:hover {
      color: var(--contrast);
  }
  .preview__addButton button svg{
        margin-right: 8px;
  }
}





  @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes spin2 {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(720deg);
      }
    }
    @keyframes trail {
      0% {
        stroke-dashoffset: var(--loader-dashoffset);
      }
      50% {
        stroke-dashoffset: var(--loader-dashoffset50);
      }
      100% {
        stroke-dashoffset: var(--loader-dashoffset);
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.1);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `
}, {
  immediate: true
})



</script>

<template>
  <div class="preview">
    <iframe
        :class="`${loaded ? 'loaded' : ''} ${store.previewMode === PreviewModes.PHONE ? 'mobile' : ''}`"
        ref="iframe"
        :style=transform
        @load="() => setLoaded(true)"
    />
    <Teleport v-if="iframeRoot" :to="iframeRoot">
      <PreviewItems
          :initialHTML=initialHTML
          :previewUrl=previewUrl
      />
    </Teleport>
  </div>
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