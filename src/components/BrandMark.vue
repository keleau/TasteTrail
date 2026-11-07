<script setup>
defineProps({
  size: { type: [Number, String], default: 56 },
  framed: { type: Boolean, default: false },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="味途 TasteTrail"
  >
    <rect v-if="framed" width="64" height="64" rx="14" fill="#1C2B45" />
    <circle v-if="framed" cx="32" cy="32" r="26" stroke="#C9A84C" stroke-width="3.5" />
    <circle v-if="framed" cx="32" cy="32" r="21" stroke="#C9A84C" stroke-width="1.2" opacity=".5" />
    <path d="M15 34 A17 17 0 0 0 49 34 Z" fill="#C9A84C" />
    <path
      d="M14 34 H50"
      stroke="#C9A84C"
      stroke-width="3.2"
      stroke-linecap="round"
    />
    <path
      d="M20 33 Q23 30 26 33 T32 33 T38 33"
      stroke="#1C2B45"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <path
      d="M37 17 L31 34"
      stroke="#C9A84C"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <path
      d="M41 17 L35 34"
      stroke="#C9A84C"
      stroke-width="2.2"
      stroke-linecap="round"
    />
  </svg>
</template>
