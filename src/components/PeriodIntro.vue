<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  fading: { type: Boolean, default: false },
  period: { type: String, required: true },
  country: { type: Object, required: true },
  periodLabel: { type: Object, required: true },
  mealTime: { type: String, required: true },
  mealLabel: { type: String, required: true },
})

const isDark = computed(() => props.period === 'evening' || props.period === 'night')
const glow = computed(() => {
  if (props.period === 'morning') return 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,225,170,0.35) 0%, transparent 70%)'
  if (props.period === 'afternoon') return 'radial-gradient(ellipse 50% 35% at 50% 25%, rgba(220,230,240,0.4) 0%, transparent 70%)'
  if (props.period === 'evening') return 'radial-gradient(ellipse 55% 30% at 50% 65%, rgba(255,150,90,0.25) 0%, transparent 70%)'
  return 'radial-gradient(ellipse 45% 35% at 60% 25%, rgba(160,180,220,0.15) 0%, transparent 70%)'
})
</script>

<template>
  <div v-if="show" class="absolute inset-0 bottom-[56px] z-50 pointer-events-none transition-opacity duration-1000 ease-out" :class="fading ? 'opacity-0' : 'opacity-100'">
    <div class="absolute inset-0 intro-bg-fade">
      <div v-if="period === 'morning'" class="absolute inset-0" style="background: linear-gradient(160deg, #F8F4EB 0%, #EFE0C8 55%, #E0CCA8 100%)" />
      <div v-else-if="period === 'afternoon'" class="absolute inset-0" style="background: linear-gradient(160deg, #EEF1F5 0%, #E2E6EB 55%, #D3D0C8 100%)" />
      <div v-else-if="period === 'evening'" class="absolute inset-0" style="background: linear-gradient(180deg, #2A1B20 0%, #4A2F30 45%, #6B453E 80%, #8A6252 100%)" />
      <div v-else class="absolute inset-0" style="background: linear-gradient(170deg, #0D111B 0%, #182030 50%, #222C3F 100%)" />

      <div class="absolute inset-0 intro-glow-drift" :style="{ background: glow }" />
      <div
        class="absolute inset-0 opacity-[0.06]"
        style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;)"
      />
    </div>

    <div class="absolute top-16 left-0 right-0 flex justify-center intro-eyebrow-in">
      <p class="text-[10px] tracking-[0.5em] uppercase font-light" :style="{ color: isDark ? 'rgba(245,240,232,0.35)' : 'rgba(45,37,32,0.3)' }">
        {{ mealTime }} · {{ mealLabel }}
      </p>
    </div>

    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div class="intro-visual-in mb-10">
        <div v-if="period === 'morning'" class="w-20 h-20 rounded-full" style="background: radial-gradient(circle, rgba(255,235,180,1) 0%, rgba(245,205,130,0.8) 50%, rgba(230,180,100,0) 100%); filter: blur(2px)" />
        <div v-else-if="period === 'afternoon'" class="w-24 h-12 rounded-full" style="background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(235,240,245,0.4) 100%); filter: blur(3px)" />
        <div v-else-if="period === 'evening'" class="w-16 h-16 rounded-full" style="background: radial-gradient(circle, rgba(255,180,110,1) 0%, rgba(230,120,70,0.7) 55%, rgba(200,80,50,0) 100%); filter: blur(2px)" />
        <svg v-else width="72" height="72" viewBox="0 0 72 72" fill="none">
          <defs>
            <radialGradient id="moonGrad" cx="35%" cy="35%" r="55%">
              <stop offset="0%" stop-color="#F8F5EE" />
              <stop offset="100%" stop-color="#C8C2B4" />
            </radialGradient>
            <mask id="moonMask">
              <circle cx="36" cy="36" r="18" fill="white" />
              <circle cx="44" cy="32" r="16" fill="black" />
            </mask>
          </defs>
          <circle cx="36" cy="36" r="22" fill="rgba(220,230,250,0.15)" />
          <circle cx="36" cy="36" r="18" fill="url(#moonGrad)" mask="url(#moonMask)" />
        </svg>
      </div>

      <h2 class="intro-title-in font-display font-black tracking-tight" :style="{ fontSize: '76px', lineHeight: 0.9, color: period === 'night' ? '#F5F0E8' : period === 'evening' ? '#FFE0C0' : '#2D2520' }">
        {{ periodLabel.cn }}
      </h2>
      <p class="intro-subtitle-in font-display mt-4 text-[11px] tracking-[0.45em] uppercase" :style="{ color: isDark ? 'rgba(235,225,205,0.55)' : 'rgba(90,75,55,0.5)' }">
        {{ periodLabel.en }}
      </p>

      <div class="intro-progress-in relative mt-10" style="width: 200px; height: 2px">
        <div class="absolute inset-0 rounded-full opacity-20" :style="{ backgroundColor: isDark ? '#F5F0E8' : '#2D2520' }" />
        <div
          class="intro-progress-bar absolute inset-y-0 left-0 rounded-full"
          :style="{ backgroundColor: period === 'evening' ? '#FFB078' : period === 'night' ? '#D8DFED' : period === 'morning' ? '#D4B478' : '#AABBCF' }"
        />
      </div>

      <p class="intro-country-in mt-6 text-[10px] tracking-[0.5em] uppercase font-light" :style="{ color: isDark ? 'rgba(230,220,200,0.4)' : 'rgba(90,75,55,0.4)' }">
        {{ country.cn }} · {{ country.name }}
      </p>
    </div>
  </div>
</template>
