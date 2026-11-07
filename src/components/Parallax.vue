<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  speed: { type: Number, default: 0.22 },
  className: { type: String, default: '' },
})

const root = ref(null)
const y = ref(0)
let scroller = null
let rafId = 0
let lastScroll = 0

const onScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    const current = scroller?.scrollTop || 0
    if (current !== lastScroll) {
      lastScroll = current
      y.value = current * props.speed
    }
    rafId = 0
  })
}

onMounted(() => {
  let parent = root.value?.parentElement
  while (parent) {
    const style = getComputedStyle(parent)
    if (/(auto|scroll)/.test(style.overflowY)) {
      scroller = parent
      break
    }
    parent = parent.parentElement
  }
  scroller?.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  scroller?.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <img
    ref="root"
    :src="src"
    :alt="alt"
    :class="className"
    :style="{ transform: `translate3d(0, ${-y}px, 0)` }"
  />
</template>
