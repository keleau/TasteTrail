<script setup>
defineProps({
  num: { type: String, default: '' },
})
</script>

<template>
  <div class="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase" style="color: var(--c-muted)">
    <span v-if="num" class="font-display text-[13px] animate-num-pop" style="color: var(--c-orange); font-style: italic">{{ num }}</span>
    <span><slot /></span>
    <span class="flex-1 h-px animate-line-draw" style="background: currentColor; opacity: 0.25" />
  </div>
</template>
