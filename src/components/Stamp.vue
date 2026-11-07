<script setup>
defineProps({
  country: { type: String, required: true },
  year: { type: String, required: true },
  rotate: { type: Number, default: -10 },
  active: { type: Boolean, default: true },
})
</script>

<template>
  <div
    class="stamp-in relative w-[72px] h-[72px] flex items-center justify-center"
    :style="{ transform: `rotate(${rotate}deg)`, opacity: active ? 1 : 0.4 }"
  >
    <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full">
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2" opacity="0.55" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.4" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.3" />
    </svg>
    <div class="relative flex flex-col items-center justify-center text-center leading-none">
      <span class="font-display text-[15px] font-bold" style="color: currentColor">{{ country }}</span>
      <span class="text-[8px] tracking-widest mt-0.5" style="color: currentColor; opacity: 0.7">{{ year }}</span>
    </div>
  </div>
</template>
