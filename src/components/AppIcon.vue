<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 22 },
  stroke: { type: String, default: 'currentColor' },
})

const ICONS = {
  compass: '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><path d="M15.5 8.5 13 13l-4.5 1.5L11 11l4.5-1.5z" fill="currentColor" stroke="none" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />',
  pan: '<path d="M4 10c3.5 4 12.5 4 16 0" /><path d="M7 8a5 5 0 0 1 10 0" /><path d="M4 14v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M12 6c-.5-1 0-3 1.5-3" />',
  book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" /><path d="M18 3v16" /><path d="M8 7h6M8 11h6" />',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6" />',
  plus: '<path d="M12 5v14M5 12h14" />',
  search: '<circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />',
  pin: '<path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.6" />',
  chef: '<path d="M7 14a4 4 0 1 1 1-7.9A3 3 0 0 1 14 5a4 4 0 0 1 3 7" /><path d="M6 14v6h12v-6" /><path d="M6 17h12" />',
  star: '<path d="m12 3 2.6 5.6 6.1.6-4.6 4.3 1.3 6-5.4-3-5.4 3 1.3-6L3.7 9.2l6.1-.6z" />',
  globe: '<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />',
  clock: '<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />',
  fire: '<path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-4 0 0 2 1 3 2 0-3 0-5 0-6z" /><path d="M8 14a6 6 0 0 0 8 4 6 6 0 0 0-6-10" />',
  leaf: '<path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16" /><path d="M4 20c4-6 8-8 12-10" />',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z" />',
  check: '<path d="m5 12 5 5 9-11" />',
  back: '<path d="M15 19l-7-7 7-7" />',
  x: '<path d="M18 6L6 18M6 6l12 12" />',
  clockHistory: '<path d="M12 7v5l3 2" /><circle cx="12" cy="12" r="9" />',
  bag: '<path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" />',
  minus: '<path d="M5 12h14" />',
  cart: '<circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" />',
}

const inner = computed(() => ICONS[props.name] || '')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="stroke"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="inner"
  />
</template>
