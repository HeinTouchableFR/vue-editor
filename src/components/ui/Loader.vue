<script setup lang="ts">
const props = withDefaults(defineProps<{
  dots?: number
  width?: number
  strokeWidth?: number
  className?: string
}>(), {
  dots: 8,
  width: 28,
  strokeWidth: 4
})

const buildCircles = (w: number, n: number, r: number) => {
  const circleRadius = w / 2 - r
  let dom = []
  for (let i = 0; i < n; i++) {
    const a = (Math.PI / (n / 2)) * i
    const x = circleRadius * Math.sin(a) + w / 2
    const y = circleRadius * Math.cos(a) + w / 2
    const circle =  {
      key: i,
      cx: x,
      cy: y,
      r: r,
    }
    dom.push(circle)
  }
  return dom
}

const offset = Math.PI * (props.width - props.strokeWidth)

const style = {
  '--loader-width': `${props.width}px`,
  '--loader-offset': offset,
  '--loader-dashoffset': offset + offset / props.dots,
  '--loader-dashoffset50': offset + (2.5 * offset) / props.dots,
}


</script>

<template>
  <div class="loader" :style="style">
    <div class="loader__container">
      <svg
          class="circles"
          :viewBox="`0 0 ${props.width} ${props.width}`"
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <circle v-for="circle in buildCircles(props.width, props.dots, props.strokeWidth / 2)" :key="circle.key" :cx="circle.cx" :cy="circle.cy" :r="circle.r" fill="currentColor" />
      </svg>
      <svg
          class="halo"
          :viewBox="`0 0 ${props.width} ${props.width}`"
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <circle
            :cx="props.width / 2"
            :cy="props.width / 2"
            :r="props.width / 2 - props.strokeWidth / 2"
            :stroke-width="props.strokeWidth"
            stroke-linecap='round'
            stroke='currentColor'
        />
      </svg>
    </div>
  </div>
</template>