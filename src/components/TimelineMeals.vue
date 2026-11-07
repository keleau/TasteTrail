<script setup>
import AppIcon from './AppIcon.vue'
import Reveal from './Reveal.vue'

const props = defineProps({
  meals: { type: Array, required: true },
  c: { type: Object, required: true },
  featuredMealKey: { type: String, required: true },
})
const emit = defineEmits(['recipe'])

const icons = ['clock', 'fire', 'pan', 'star']
</script>

<template>
  <section class="bg-[#F3ECE0] py-6 px-6">
    <Reveal>
      <p class="font-display italic text-[18px] text-stone-600 mb-6">今日行程<span class="text-stone-400"> · Today's Journey</span></p>
    </Reveal>
    <div class="relative">
      <svg class="absolute left-[22px] top-2 bottom-2 w-[2px]" preserveAspectRatio="none">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="#8B7355" stroke-width="1" stroke-dasharray="3 5" />
      </svg>
      <div class="space-y-8">
        <Reveal v-for="(meal, index) in meals" :key="meal.key" :delay="index * 80">
          <div class="relative flex gap-5 cursor-pointer active:scale-[0.99] transition-transform duration-150" @click="emit('recipe', c[meal.key])">
            <div class="relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0" :style="{ backgroundColor: meal.bg, borderColor: meal.accent, color: meal.accent }">
              <AppIcon :name="icons[index]" :size="20" />
            </div>
            <div class="flex-1 pb-2">
              <div class="flex items-center gap-2">
                <p class="text-[10px] tracking-[0.3em] text-stone-500">{{ meal.time }} · {{ meal.cn }}</p>
                <span v-if="meal.key === featuredMealKey" class="bg-[#E8650A]/15 text-[#E8650A] text-[8px] tracking-[0.2em] px-2 py-0.5 rounded-full font-semibold border border-[#E8650A]/30">今日推荐</span>
              </div>
              <h3 class="font-display text-[26px] font-bold text-stone-900 leading-tight">{{ c[meal.key].cn }}</h3>
              <p class="text-stone-500 text-sm">{{ c[meal.key].en }}</p>
              <div class="mt-3 flex gap-2 flex-wrap">
                <span class="text-[10px] tracking-widest px-2.5 py-1 rounded-full" :style="{ backgroundColor: `${meal.accent}22`, color: meal.accent }">{{ c[meal.key].kcal }} 千卡</span>
                <span class="text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-stone-200 text-stone-700">{{ c[meal.key].time }}</span>
                <span class="text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-stone-200 text-stone-700">{{ c[meal.key].taste }}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
