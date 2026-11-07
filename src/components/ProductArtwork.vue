<script setup>
import { computed } from 'vue'
import { getProductGroup } from '../lib/productGroups'

const props = defineProps({
  item: { type: Object, required: true },
  variant: { type: String, default: 'card' },
  className: { type: String, default: '' },
})

const group = computed(() => getProductGroup(props.item))
const isHero = computed(() => props.variant === 'hero')
</script>

<template>
  <div
    class="relative overflow-hidden"
    :class="className"
    :style="{ background: `linear-gradient(150deg, ${group.bg} 0%, #FBF7EE 55%, ${group.bg} 100%)` }"
  >
    <svg class="absolute inset-0 w-full h-full opacity-[0.22]" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
      <circle cx="340" cy="60" r="150" fill="none" :stroke="group.color" stroke-width="0.8" stroke-dasharray="2 6" />
      <circle cx="50" cy="330" r="110" fill="none" :stroke="group.color" stroke-width="0.6" stroke-dasharray="2 5" />
      <circle cx="340" cy="60" r="105" fill="none" :stroke="group.color" stroke-width="0.6" opacity="0.7" />
    </svg>

    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span
        class="tracking-[0.45em] uppercase"
        :class="isHero ? 'text-[11px]' : 'text-[8px]'"
        :style="{ color: group.color, opacity: 0.65 }"
      >{{ group.en }}</span>
      <span
        class="font-display font-black leading-none my-1"
        :style="{ color: group.color, fontSize: isHero ? '132px' : '58px', opacity: 0.88 }"
      >{{ group.glyph }}</span>
      <span class="tracking-[0.3em]" :class="isHero ? 'text-[13px]' : 'text-[9px]'" :style="{ color: group.color }">
        {{ group.cn }}
      </span>
    </div>

    <span class="absolute bottom-2 right-2.5 text-[7px] tracking-[0.25em] uppercase text-stone-500/60">TASTE TRAIL</span>
  </div>
</template>
