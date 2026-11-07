<script setup>
import { computed, ref, watch } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import Reveal from '../components/Reveal.vue'
import FallbackImage from '../components/FallbackImage.vue'
import PeriodIntro from '../components/PeriodIntro.vue'
import TimelineMeals from '../components/TimelineMeals.vue'
import { COUNTRIES } from '../data'
import { MEAL_META, PERIOD_LABELS, PERIOD_MEAL_INDEX, getChinaHour, periodFromHour } from '../lib/periods'
import { ensureAudioReady, playPeriodSound, stopAllPeriodSounds } from '../lib/periodSound'

const props = defineProps({
  country: { type: String, required: true },
  todayCountry: { type: String, default: '' },
  featuredMealKey: { type: String, required: true },
  active: { type: Boolean, default: false },
})
const emit = defineEmits(['update:country', 'recipe', 'back'])

const focusMode = ref(true)
const autoCountry = ref(true)
const introPhase = ref(0)

const hour = getChinaHour()
const currentMealIdx = hour < 11 ? 0 : hour < 18 ? 1 : hour < 19 ? 2 : 3
const period = periodFromHour(hour)
const periodLabel = PERIOD_LABELS[period]
const periodMeal = MEAL_META[PERIOD_MEAL_INDEX[period]]

const effectiveCountry = computed(() => (autoCountry.value && props.todayCountry ? props.todayCountry : props.country))
const c = computed(() => COUNTRIES[effectiveCountry.value])
const currentMeal = MEAL_META[currentMealIdx]
const currentMealData = computed(() => c.value[currentMeal.key])
const currentMealIcon = ['clock', 'fire', 'pan', 'star'][currentMealIdx]

const totalKcal = computed(() => MEAL_META.reduce((sum, meal) => sum + c.value[meal.key].kcal, 0))
const totalMacros = computed(() => {
  const parse = (value) => parseInt(value.replace('g', ''), 10) || 0
  return MEAL_META.reduce(
    (sum, meal) => ({
      protein: sum.protein + parse(c.value[meal.key].macros.protein),
      carbs: sum.carbs + parse(c.value[meal.key].macros.carbs),
      fats: sum.fats + parse(c.value[meal.key].macros.fats),
    }),
    { protein: 0, carbs: 0, fats: 0 },
  )
})

const cycleCountry = () => {
  if (autoCountry.value) return
  const keys = Object.keys(COUNTRIES)
  const index = keys.indexOf(props.country)
  emit('update:country', keys[(index + 1) % keys.length])
}

watch(
  [() => props.active, effectiveCountry],
  ([active], _previous, onCleanup) => {
    if (!active) return
    introPhase.value = 1
    ensureAudioReady()
    playPeriodSound(period)
    const fadeTimer = window.setTimeout(() => { introPhase.value = 2 }, 2300)
    const closeTimer = window.setTimeout(() => { introPhase.value = 0 }, 3150)
    onCleanup(() => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(closeTimer)
      stopAllPeriodSounds()
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="h-full overflow-y-auto pb-24 bg-[#F3ECE0]">
    <section v-if="focusMode" class="relative">
      <div class="relative h-[540px] rounded-b-3xl overflow-hidden cursor-pointer group transition-transform duration-300 active:scale-[0.99]" @click="emit('recipe', currentMealData)">
        <FallbackImage :src="currentMealData.img" :alt="currentMealData.cn" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] hero-ken-burns" />
        <div class="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/40 to-transparent hero-gradient-breathe" />

        <div class="absolute top-9 left-5 z-20">
          <button class="flex items-center gap-1.5 text-white/90 bg-black/25 backdrop-blur px-3 py-1.5 rounded-full text-[11px] tracking-[0.2em] hover:bg-black/40 active:scale-95 transition-colors" @click.stop="emit('back')">
            <AppIcon name="arrowRight" :size="12" style="transform: rotate(180deg)" />
            返回
          </button>
        </div>

        <div class="absolute top-9 right-5 z-20 flex items-center gap-3">
          <div class="flex items-center gap-2">
            <button
              class="px-2 py-0.5 rounded-full flex items-center justify-center text-[9px] tracking-wider transition-all"
              :class="autoCountry ? 'bg-white/20 text-white/80 border border-white/20' : 'bg-white/10 text-white/50 border border-white/10'"
              :title="autoCountry ? '自动匹配今日目的地' : '手动选择目的地'"
              @click.stop="autoCountry = !autoCountry"
            >
              {{ autoCountry ? '自动' : '手动' }}
            </button>
            <button
              class="flex items-center gap-1 transition-all"
              :class="autoCountry ? 'text-white/50' : 'text-white/80 hover:text-white'"
              :title="autoCountry ? '自动模式已锁定' : '点击切换国家'"
              :disabled="autoCountry"
              @click.stop="!autoCountry && cycleCountry()"
            >
              <span class="font-display text-[12px]">{{ c.cn }}</span>
            </button>
          </div>

          <button class="flex items-center gap-1.5 text-white bg-white/20 backdrop-blur border border-white/30 px-3 py-1.5 rounded-full text-[11px] tracking-[0.15em] hover:bg-white/30 active:scale-95 transition-all" @click.stop="focusMode = false">
            <AppIcon name="plus" :size="12" />
            <span>全天</span>
          </button>
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hero-eyebrow-fade">
              <AppIcon :name="currentMealIcon" :size="14" stroke="#fff" />
            </div>
            <p class="text-[9px] tracking-[0.35em] uppercase text-white/75 hero-eyebrow-fade hero-delay-150">{{ periodMeal.time }} · {{ periodMeal.cn }}</p>
            <span v-if="currentMeal.key === featuredMealKey" class="ml-1 bg-[#E8650A] text-white text-[8px] tracking-[0.2em] px-2 py-0.5 rounded-full font-semibold hero-badge-fade hero-delay-300">今日推荐</span>
          </div>
          <h1 class="font-display text-[42px] font-black leading-[0.95] tracking-tight hero-text-fade hero-delay-300">{{ currentMealData.cn }}</h1>
          <p class="font-display italic text-white/85 text-[15px] mt-0.5 hero-subtitle-fade hero-delay-450">{{ currentMealData.en }}</p>
          <div class="mt-3 flex items-center gap-1.5">
            <span class="bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[9px] tracking-widest px-2.5 py-1 rounded-full hero-badge-fade hero-delay-600">{{ currentMealData.kcal }} 千卡</span>
            <span class="bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[9px] tracking-widest px-2.5 py-1 rounded-full hero-badge-fade hero-delay-750">{{ currentMealData.taste }}</span>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-14 pointer-events-none" style="background: linear-gradient(to bottom, transparent, #F3ECE0)" />
    </section>

    <section v-else class="px-5 pt-9 pb-2">
      <div class="flex items-center justify-between">
        <button class="flex items-center gap-1.5 text-stone-700 bg-white border border-stone-300 px-3 py-1.5 rounded-full text-[11px] tracking-[0.2em] hover:bg-stone-50 active:scale-95 transition-colors" @click="emit('back')">
          <AppIcon name="arrowRight" :size="12" style="transform: rotate(180deg)" />
          返回
        </button>
        <button class="flex items-center gap-1.5 text-stone-700 bg-white border border-stone-300 px-3 py-1.5 rounded-full text-[11px] tracking-[0.15em] hover:bg-stone-50 active:scale-95 transition-all" @click="focusMode = true">
          <AppIcon name="bookmark" :size="12" />
          <span>单餐</span>
        </button>
      </div>
      <div class="flex items-center justify-between mb-4 mt-4">
        <div>
          <h1 class="font-display text-[32px] font-black leading-tight text-stone-900">{{ c.cn }} · 今日</h1>
          <p class="font-display italic text-stone-600 text-[14px] mt-0.5">{{ periodLabel.cn }}的味觉旅程</p>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-2">
        <button class="px-2.5 py-1 rounded-full text-[10px] tracking-wider transition-all" :class="autoCountry ? 'bg-[#E8650A]/10 text-[#E8650A] border border-[#E8650A]/30' : 'bg-stone-100 text-stone-500 border border-stone-200'" @click="autoCountry = !autoCountry">
          {{ autoCountry ? '自动目的地' : '手动目的地' }}
        </button>
        <button v-if="!autoCountry" class="px-2.5 py-1 rounded-full text-[10px] tracking-wider bg-stone-800 text-white hover:bg-stone-700 active:scale-95 transition-all" @click="cycleCountry">切换国家</button>
      </div>
    </section>

    <div class="px-5">
      <TimelineMeals v-if="!focusMode" :meals="MEAL_META" :c="c" :featured-meal-key="featuredMealKey" @recipe="emit('recipe', $event)" />
    </div>

    <section class="bg-[#F3ECE0] px-6 py-10 mt-2 border-t border-stone-300/60">
      <Reveal>
        <div class="flex items-center gap-2 mb-6">
          <span class="font-hand text-[20px] text-stone-600">四餐合计 —</span>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <p class="font-display text-[64px] font-black text-[#E8650A]">{{ totalKcal }}</p>
            <p class="text-stone-500 text-[11px] tracking-widest uppercase mt-1">千卡 · 总热量</p>
          </div>
          <div class="flex gap-4 text-right">
            <div v-for="macro in [{ value: `${totalMacros.protein}g`, label: '蛋白质' }, { value: `${totalMacros.carbs}g`, label: '碳水' }, { value: `${totalMacros.fats}g`, label: '脂肪' }]" :key="macro.label" class="border-l-2 border-stone-300 pl-3">
              <p class="font-display text-[18px] font-bold text-stone-900">{{ macro.value }}</p>
              <p class="text-stone-500 text-[9px] tracking-widest uppercase">{{ macro.label }}</p>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal :delay="150">
        <button class="mt-8 w-full bg-[#1A1208] text-white py-4 rounded-2xl text-[12px] tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#2A1F0F] active:scale-[0.98] transition-all" @click="emit('recipe', currentMealData)">
          <AppIcon name="pan" :size="16" /> 烹饪今日菜单
        </button>
      </Reveal>
    </section>

    <PeriodIntro
      :show="introPhase > 0"
      :fading="introPhase === 2"
      :period="period"
      :country="c"
      :period-label="periodLabel"
      :meal-time="periodMeal.time"
      :meal-label="periodMeal.cn"
    />
  </div>
</template>
