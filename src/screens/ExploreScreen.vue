<script setup>
import { ref } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import Parallax from '../components/Parallax.vue'
import Eyebrow from '../components/Eyebrow.vue'
import Reveal from '../components/Reveal.vue'
import FallbackImage from '../components/FallbackImage.vue'
import { DESTINATIONS } from '../data'

const props = defineProps({
  hero: { type: Object, required: true },
  countryData: { type: Object, required: true },
  chefMealKey: { type: String, required: true },
})

const emit = defineEmits(['recipe', 'start', 'search', 'shop', 'shop-country'])

const scrollRef = ref(null)
const stick = ref(false)
const onScroll = () => { stick.value = (scrollRef.value?.scrollTop || 0) > 360 }

const altSnackKey = (primary) => (primary === 'streetFood' ? 'snack' : 'streetFood')
const chefMeal = () => props.countryData[altSnackKey(props.chefMealKey)]
const featuredMeal = () => props.countryData[props.chefMealKey]
</script>

<template>
  <div ref="scrollRef" class="h-full overflow-y-auto pb-24 bg-[#F3ECE0] relative" @scroll="onScroll">
    <div class="sticky top-0 z-20 transition-all duration-500" :class="stick ? 'glass-nav py-3 border-b border-stone-300/40' : 'bg-transparent py-5'">
      <div class="px-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-[#1A1208] flex items-center justify-center">
            <span class="text-[#E8650A] text-[11px] font-bold">味</span>
          </div>
          <span class="text-stone-700 text-[11px] tracking-[0.3em] uppercase">味途</span>
        </div>
        <div class="flex items-center gap-3 text-stone-600">
          <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200/60 active:scale-90 transition-colors" aria-label="搜索" @click="emit('search')">
            <AppIcon name="search" :size="18" />
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200/60 active:scale-90 transition-colors" aria-label="市集" @click="emit('shop')">
            <AppIcon name="bag" :size="18" />
          </button>
          <AppIcon name="bookmark" :size="18" />
        </div>
      </div>
    </div>

    <section class="relative bg-[#F3ECE0] pb-6">
      <Reveal>
        <div class="px-6 pt-4 flex items-center gap-2 mb-5">
          <span class="text-[10px] tracking-[0.3em] uppercase text-stone-500">第一章</span>
          <span class="text-stone-400">·</span>
          <span class="text-[10px] tracking-[0.3em] uppercase text-stone-500">{{ hero.dayLabel }}的目的地</span>
        </div>
      </Reveal>

      <Reveal :delay="120">
        <div class="relative h-[400px] mx-4 rounded-[32px] overflow-hidden group cursor-pointer" @click="emit('start')">
          <Parallax :src="hero.heroImg" :alt="countryData.cn" :speed="0.22" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div class="absolute top-5 right-5 text-white/70 text-[9px] tracking-widest text-right leading-tight">{{ hero.latLng }}</div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div class="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#E8650A]/90 mb-2">
              <span class="w-4 h-px bg-[#E8650A]" />
              {{ hero.heroSubtitle }}
            </div>
            <h2 class="font-display text-[46px] font-black leading-[0.95] tracking-tight">{{ countryData.cn }}</h2>
            <p class="font-display italic text-white/85 text-[17px] mt-1 leading-tight">{{ hero.description }}</p>
            <div class="mt-5 flex items-center gap-3">
              <button class="bg-transparent border border-white/60 text-white text-[11px] tracking-[0.25em] px-5 py-3 rounded-full flex items-center gap-2 active:scale-95 hover:bg-white/10 transition-all backdrop-blur-sm" @click.stop="emit('start')">
                开启今日旅程 <AppIcon name="arrowRight" :size="14" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal :delay="200">
        <div class="px-6 mt-4 flex gap-4 items-start">
          <span class="font-display text-[40px] leading-none text-[#E8650A]/60 -mt-1">“</span>
          <p class="font-display italic text-stone-700 text-[15px] leading-relaxed flex-1">{{ hero.quote }}</p>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#F3ECE0] py-8">
      <Reveal>
        <div class="px-6">
          <Eyebrow num="02">来自图谱</Eyebrow>
          <div class="flex items-baseline justify-between mt-3 mb-8">
            <h3 class="font-display text-[38px] font-black text-stone-900 leading-[0.95] tracking-tight">{{ featuredMeal().cn }}</h3>
            <div class="text-right">
              <p class="font-display text-[48px] font-black text-[#E8650A] leading-none">{{ featuredMeal().kcal }}</p>
              <p class="text-stone-400 text-[10px] tracking-widest">千卡</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal :delay="200">
        <div class="relative mx-6 rounded-[32px] overflow-hidden h-[300px] cursor-pointer group active:scale-[0.98] transition-transform" @click="emit('recipe', chefMealKey)">
          <FallbackImage :src="featuredMeal().img" :alt="featuredMeal().cn" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div class="absolute top-4 left-4 bg-white/90 text-stone-900 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full">{{ hero.heroSubtitle }}</div>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <p class="font-display text-[14px] text-white/90">{{ featuredMeal().en }}</p>
          </div>
        </div>
      </Reveal>

      <Reveal :delay="200">
        <div class="px-6 mt-8">
          <p class="font-display text-[18px] italic text-stone-600 leading-none mb-2">厨房故事<span class="text-stone-400 text-[14px]"> · Kitchen Story</span></p>
          <p class="text-stone-700 text-[15px] leading-[1.8]">{{ featuredMeal().story }}</p>
          <div class="mt-6 grid grid-cols-3 gap-3">
            <div class="border-t-2 border-stone-800 pt-2">
              <p class="font-display text-[22px] font-bold leading-none text-stone-900">{{ featuredMeal().time }}</p>
              <p class="text-stone-500 text-[10px] tracking-widest uppercase mt-1">时间</p>
            </div>
            <div class="border-t-2 border-stone-800 pt-2">
              <p class="font-display text-[22px] font-bold leading-none text-stone-900">{{ featuredMeal().difficulty }}</p>
              <p class="text-stone-500 text-[10px] tracking-widest uppercase mt-1">难度</p>
            </div>
            <div class="border-t-2 border-stone-800 pt-2">
              <p class="font-display text-[22px] font-bold leading-none text-stone-900">¥{{ featuredMeal().price }}</p>
              <p class="text-stone-500 text-[10px] tracking-widest uppercase mt-1">价格</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="relative bg-[#1A1208] py-14 px-6 overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E8650A]/20 blur-3xl" />
      <div class="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div class="relative">
        <Reveal>
          <div class="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-[#E8650A] mb-8">
            <AppIcon name="chef" :size="16" /><span>主厨来信 · Chef's Letter</span>
          </div>
        </Reveal>

        <Reveal :delay="100">
          <div class="flex items-center gap-4 mb-5">
            <div class="w-10 h-10 rounded-full bg-[#E8650A]/20 flex items-center justify-center border border-[#E8650A]/40">
              <AppIcon name="chef" :size="18" stroke="#E8650A" />
            </div>
            <div>
              <p class="text-white text-sm font-medium">{{ hero.chefName }}</p>
              <p class="text-white/50 text-[11px]">{{ hero.chefTitle }}</p>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="150">
          <div class="relative border-l-2 border-[#E8650A]/40 pl-4 ml-2">
            <p class="font-display italic text-[18px] text-white/90 leading-relaxed">{{ hero.chefLetter }}</p>
          </div>
        </Reveal>

        <Reveal :delay="200">
          <div class="mt-8 flex items-start gap-5">
            <div class="flex-1 bg-white p-3 rounded-sm shadow-lg transition-transform duration-500 hover:rotate-0 cursor-pointer active:scale-[0.98] group" style="transform: rotate(-2deg)" @click="emit('recipe', altSnackKey(chefMealKey))">
              <FallbackImage :src="chefMeal().img" :alt="chefMeal().cn" class="w-full h-[160px] object-cover" />
              <p class="font-display text-stone-800 text-center text-[16px] mt-1">{{ chefMeal().cn }}</p>
              <p class="font-display text-stone-500 text-center text-[12px]">{{ chefMeal().en }}</p>
            </div>
            <div class="w-[42%] pt-2">
              <p class="text-white/70 text-[10px] tracking-[0.3em] uppercase">主厨推荐</p>
              <h4 class="font-display text-[24px] text-white font-bold leading-tight mt-1">招牌<br />菜</h4>
              <div class="mt-4 space-y-2 text-[12px] text-white/70">
                <div class="flex justify-between"><span class="text-white/40">时间</span><span>{{ chefMeal().time }}</span></div>
                <div class="flex justify-between"><span class="text-white/40">难度</span><span>{{ chefMeal().difficulty }}</span></div>
                <div class="flex justify-between"><span class="text-white/40">价格</span><span>¥{{ chefMeal().price }}</span></div>
              </div>
              <button class="mt-5 bg-transparent border border-white/60 text-white text-[11px] tracking-[0.2em] px-5 py-3 rounded-full flex items-center gap-2 active:scale-95 hover:bg-white/10 transition-all backdrop-blur-sm" @click="emit('recipe', altSnackKey(chefMealKey))">
                打开菜谱 <AppIcon name="arrowRight" :size="14" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section class="bg-[#F3ECE0] pt-10 pb-8">
      <Reveal>
        <div class="px-6 flex items-baseline justify-between">
          <div>
            <Eyebrow num="03">更多目的地</Eyebrow>
            <h3 class="font-display text-[24px] font-bold text-stone-900 mt-2">目的地清单</h3>
          </div>
          <button class="text-[11px] tracking-widest uppercase text-stone-600 flex items-center gap-1 hover:text-[#E8650A] transition-colors" @click="emit('shop-country', 'all')">
            全部 <AppIcon name="arrowRight" :size="12" />
          </button>
        </div>
      </Reveal>
      <Reveal :delay="100">
        <div class="mt-6 flex gap-4 overflow-x-auto px-6 pb-3">
          <div
            v-for="(destination, index) in DESTINATIONS"
            :key="destination.id"
            class="flex-shrink-0 cursor-pointer"
            :style="{ width: '150px', transform: ['-2deg', '1deg', '-1deg', '2deg', '-2deg'][index] }"
            @click="emit('shop-country', destination.id)"
          >
            <div class="bg-white/80 backdrop-blur-md p-2 rounded-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/40">
              <FallbackImage :src="destination.img" :alt="destination.cn" class="w-full h-[140px] object-cover" />
              <div class="px-1 pt-2 pb-1">
                <p class="text-stone-400 text-[9px] tracking-[0.2em] uppercase">{{ destination.tag }}</p>
                <p class="font-display text-[17px] font-bold text-stone-900 leading-tight">{{ destination.cn }}</p>
                <p class="text-stone-400 text-[10px]">{{ destination.en }}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  </div>
</template>
