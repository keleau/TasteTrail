<script setup>
// 指针指向今天的目的地；双色指针是旅程，陶土轴心是味觉。

defineProps({
  size: { type: [Number, String], default: 56 },
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
    <circle cx="32" cy="32" r="24.5" stroke="#C9A84C" stroke-width="2.4" />
    <g transform="rotate(40 32 32)">
      <path d="M32 11.5 L35 32 L29 32 Z" fill="#C9A84C" />
      <path d="M32 52.5 L35 32 L29 32 Z" fill="#F3ECE0" />
    </g>
    <circle cx="32" cy="32" r="2.7" fill="#C97B5C" />
    <circle cx="32" cy="32" r="1.1" fill="#F3ECE0" />
  </svg>
</template>
