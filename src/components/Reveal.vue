<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  delay: { type: Number, default: 0 },
  className: { type: String, default: '' },
})

const el = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.14 })
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="reveal" :class="className" :style="{ transitionDelay: `${delay}ms` }">
    <slot />
  </div>
</template>
