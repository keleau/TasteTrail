<script setup>
import AppIcon from '../components/AppIcon.vue'
import FallbackImage from '../components/FallbackImage.vue'
import { IMGS } from '../data'

const emit = defineEmits(['enter'])
</script>

<template>
  <div class="relative w-full h-full overflow-hidden bg-[#1A1208]">
    <div class="absolute inset-0 slow-zoom">
      <FallbackImage :src="IMGS.pastaHand" alt="手工意面" class="w-full h-full object-cover opacity-85" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#1A1208]/95" />
    </div>

    <div class="absolute top-10 left-0 right-0 flex flex-col items-center text-white/70">
      <div class="fade-up text-[9px] tracking-[0.5em] uppercase">第 01 期 · 味途</div>
    </div>

    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <div class="fade-up-delay-1 mb-6">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="26" stroke="#E8650A" stroke-width="0.8" opacity="0.7" stroke-dasharray="2 2" />
          <circle cx="28" cy="28" r="18" stroke="#E8650A" stroke-width="0.8" opacity="0.5" />
          <circle cx="28" cy="28" r="2.5" fill="#E8650A" />
          <path d="M28 10 L32 26 L28 42 L24 26 Z" fill="#E8650A" opacity="0.85" />
        </svg>
      </div>
      <h1 class="fade-up-delay-1 font-display text-white leading-[0.95] tracking-tight" style="font-size: 82px; font-weight: 900">
        味途
      </h1>
      <p class="fade-up-delay-2 mt-2 text-[10px] tracking-[0.45em] uppercase text-white/40">Taste Trail</p>
      <div class="fade-up-delay-2 mt-4 flex items-center gap-3 text-white/55">
        <div class="h-px w-6 bg-white/50" />
        <span class="text-[11px] tracking-[0.3em]">用味道去旅行</span>
        <div class="h-px w-6 bg-white/50" />
      </div>
      <p class="fade-up-delay-2 font-hand text-white/50 text-[15px] mt-5 max-w-[260px] leading-relaxed">
        一本可以吃的旅行地图。一条路线，一种味道。
      </p>
    </div>

    <button class="fade-up-delay-4 absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white group" @click="emit('enter')">
      <span class="text-[10px] tracking-[0.4em] uppercase text-white/70 group-hover:text-white transition-colors">进入味途</span>
      <span class="block mx-auto w-px h-10 bg-gradient-to-b from-white/80 to-transparent relative overflow-hidden">
        <span class="absolute top-0 left-0 w-full h-3 bg-white" style="animation: slideDown 1.8s ease-in-out infinite" />
      </span>
      <span class="flex items-center gap-2 text-white/70 text-[11px] tracking-widest group-hover:text-white group-hover:translate-x-1 transition-all">
        开始 <AppIcon name="arrowRight" :size="14" />
      </span>
    </button>
  </div>
</template>
