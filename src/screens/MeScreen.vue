<script setup>
import AppIcon from '../components/AppIcon.vue'
import Eyebrow from '../components/Eyebrow.vue'
import Reveal from '../components/Reveal.vue'
import Stamp from '../components/Stamp.vue'

const stamps = [
  { c: 'IT', y: '2024', r: -8 },
  { c: 'JP', y: '2024', r: 6 },
  { c: 'FR', y: '2023', r: -4 },
  { c: 'MX', y: '2024', r: 8 },
  { c: 'TH', y: '2023', r: -6 },
  { c: 'ES', y: '2024', r: 4 },
  { c: 'GR', y: '2025', r: -2 },
  { c: 'IN', y: '2025', r: 10 },
]
const achievements = [
  { icon: 'globe', title: '环球旅行者', desc: '探索了 10 多个国家', date: '2025 年 3 月' },
  { icon: 'chef', title: '家庭厨师', desc: '完成了 30 道菜谱', date: '2025 年 1 月' },
  { icon: 'star', title: '风味探索者', desc: '尝试了 5 种新菜系', date: '2024 年 11 月' },
  { icon: 'book', title: '图谱阅读者', desc: '读完 50 个美食故事', date: '2024 年 9 月' },
]
const cuisines = [
  { en: 'Italian', cn: '意大利', color: '#8B3A2A' },
  { en: 'Japanese', cn: '日本', color: '#2B5F8E' },
  { en: 'Mexican', cn: '墨西哥', color: '#C13B2A' },
  { en: 'French', cn: '法国', color: '#4A6741' },
  { en: 'Thai', cn: '泰国', color: '#E8650A' },
  { en: 'Greek', cn: '希腊', color: '#6B7A3F' },
]
const settings = ['语言 · Language', '通知 · Notifications', '隐私 · Privacy', '关于味途']
</script>

<template>
  <div class="h-full overflow-y-auto pb-24 bg-[#F3ECE0]">
    <section class="bg-[#1B2845] px-8 pt-14 pb-10 relative overflow-hidden">
      <div class="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-[#C9A84C]/10 blur-2xl" />
      <div class="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#C9A84C]/10 blur-2xl" />
      <div class="relative">
        <Reveal>
          <div class="flex items-center gap-2 mb-8">
            <span class="font-display text-[14px] text-[#C9A84C] tracking-[0.2em]">味途共和国</span>
            <span class="text-[#C9A84C]/40 text-lg">·</span>
            <span class="font-display text-[14px] text-[#C9A84C]/60 tracking-[0.2em] uppercase">Republic of Taste</span>
          </div>
          <div class="flex items-center gap-5">
            <div class="relative w-20 h-20 rounded-full border-2 border-[#C9A84C]/40 flex items-center justify-center bg-[#C9A84C]/10">
              <svg viewBox="0 0 60 60" width="50" height="50" fill="none">
                <circle cx="30" cy="30" r="26" stroke="#C9A84C" stroke-width="0.8" />
                <circle cx="30" cy="30" r="18" stroke="#C9A84C" stroke-width="0.6" opacity="0.6" />
                <path d="M30 12 L34 30 L30 48 L26 30 Z" fill="#C9A84C" opacity="0.9" />
                <circle cx="30" cy="30" r="2.5" fill="#C9A84C" />
              </svg>
            </div>
            <div>
              <h1 class="font-display text-[34px] font-black text-white leading-none tracking-tight">味途</h1>
              <h1 class="font-display text-[22px] font-black text-[#C9A84C] leading-none tracking-tight mt-2">TASTE TRAIL</h1>
              <p class="text-[#C9A84C]/60 text-[10px] tracking-[0.3em] uppercase mt-2">旅行护照 · TRAVEL PASSPORT</p>
            </div>
          </div>
          <div class="mt-8 border-t border-white/10 pt-6 flex items-end justify-between">
            <div>
              <p class="text-white/40 text-[9px] tracking-[0.3em] uppercase mb-1">持有人 · Holder</p>
              <p class="font-display text-[22px] font-semibold text-white">陈亚力</p>
              <p class="text-white/40 text-[11px] mt-0.5">2023 年 1 月加入</p>
            </div>
            <div class="text-right">
              <p class="text-white/40 text-[9px] tracking-[0.3em] uppercase">护照编号</p>
              <p class="font-display text-[18px] text-[#C9A84C] tracking-widest">TT · 0427</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section class="bg-[#F3ECE0] px-6 py-10">
      <Reveal>
        <Eyebrow num="01">你的旅程</Eyebrow>
        <div class="mt-6 grid grid-cols-3 gap-0">
          <div class="pr-4 border-r border-stone-300">
            <p class="font-display text-[56px] font-black text-[#E8650A] leading-none">12</p>
            <p class="text-stone-500 text-[11px] mt-1 leading-tight">探索国家<br />Countries</p>
          </div>
          <div class="px-4 border-r border-stone-300">
            <p class="font-display text-[56px] font-black text-[#2B5F8E] leading-none">87</p>
            <p class="text-stone-500 text-[11px] mt-1 leading-tight">品尝菜品<br />Dishes</p>
          </div>
          <div class="pl-4">
            <p class="font-display text-[56px] font-black text-[#4A6741] leading-none">34</p>
            <p class="text-stone-500 text-[11px] mt-1 leading-tight">完成菜谱<br />Recipes</p>
          </div>
        </div>
      </Reveal>

      <Reveal :delay="120">
        <div class="mt-8 flex items-center gap-4 bg-[#EBE3D3] rounded-2xl px-5 py-4">
          <div class="relative w-16 h-16 flex-shrink-0">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" stroke="#DDD3C2" stroke-width="3" fill="none" />
              <circle cx="18" cy="18" r="16" stroke="#E8650A" stroke-width="3" fill="none" stroke-dasharray="100" stroke-dashoffset="35" stroke-linecap="round" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center font-display text-[15px] font-bold text-stone-900">65%</div>
          </div>
          <div class="flex-1">
            <p class="text-stone-500 text-[10px] tracking-[0.25em] uppercase">旅程进度</p>
            <p class="font-display text-[18px] font-bold text-stone-900 leading-tight mt-1">环球美食之旅<br />已完成 65%</p>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#EBE3D3] py-10">
      <Reveal>
        <div class="px-6">
          <Eyebrow num="02">签证印章</Eyebrow>
          <p class="font-display italic text-stone-600 text-[18px] mt-3">去过的地方 ·</p>
        </div>
      </Reveal>
      <Reveal :delay="100">
        <div class="mt-6 relative h-[360px] px-2">
          <div class="absolute top-0 left-3"><Stamp :country="stamps[0].c" :year="stamps[0].y" :rotate="stamps[0].r" active /></div>
          <div class="absolute top-2 right-2"><Stamp :country="stamps[1].c" :year="stamps[1].y" :rotate="stamps[1].r" active /></div>
          <div class="absolute top-24 left-[20%]"><Stamp :country="stamps[2].c" :year="stamps[2].y" :rotate="stamps[2].r" active /></div>
          <div class="absolute top-20 right-[20%]"><Stamp :country="stamps[3].c" :year="stamps[3].y" :rotate="stamps[3].r" active /></div>
          <div class="absolute bottom-4 left-4"><Stamp :country="stamps[4].c" :year="stamps[4].y" :rotate="stamps[4].r" active /></div>
          <div class="absolute bottom-6 left-[35%]"><Stamp :country="stamps[5].c" :year="stamps[5].y" :rotate="stamps[5].r" active /></div>
          <div class="absolute bottom-4 right-6"><Stamp :country="stamps[6].c" :year="stamps[6].y" :rotate="stamps[6].r" active /></div>
          <div class="absolute bottom-0 right-0"><Stamp :country="stamps[7].c" :year="stamps[7].y" :rotate="stamps[7].r" active /></div>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-full h-[240px] border-2 border-dashed border-stone-400/40 rounded-sm" style="transform: rotate(-0.5deg)" />
          </div>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#F3ECE0] px-6 py-10">
      <Reveal>
        <Eyebrow num="03">成就</Eyebrow>
        <p class="font-display italic text-stone-600 text-[18px] mt-3">一路收集 ·</p>
      </Reveal>
      <div class="mt-6 relative">
        <svg class="absolute left-[22px] top-2 bottom-2 w-[2px]" preserveAspectRatio="none">
          <line x1="1" y1="0" x2="1" y2="100%" stroke="#8B7355" stroke-width="1" stroke-dasharray="3 5" />
        </svg>
        <div class="space-y-6">
          <Reveal v-for="achievement in achievements" :key="achievement.title" :delay="80">
            <div class="flex gap-5 items-start">
              <div class="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center shadow-sm flex-shrink-0">
                <AppIcon :name="achievement.icon" :size="20" stroke="#8B3A2A" />
              </div>
              <div class="flex-1 pt-1 border-b border-stone-200 pb-4">
                <div class="flex items-baseline justify-between">
                  <p class="font-display text-[18px] font-bold text-stone-900">{{ achievement.title }}</p>
                  <p class="text-stone-400 text-[10px]">{{ achievement.date }}</p>
                </div>
                <p class="text-stone-500 text-xs mt-1">{{ achievement.desc }}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="bg-[#EBE3D3] px-6 py-10">
      <Reveal>
        <Eyebrow num="04">最爱菜系</Eyebrow>
        <p class="font-display italic text-stone-600 text-[18px] mt-3">口味偏好 ·</p>
      </Reveal>
      <Reveal :delay="100">
        <div class="mt-6 grid grid-cols-3 gap-3">
          <div v-for="cuisine in cuisines" :key="cuisine.en" class="bg-white rounded-xl p-4 border border-stone-200 text-center hover:shadow-md transition-shadow">
            <div class="w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2" :style="{ backgroundColor: `${cuisine.color}22`, color: cuisine.color }">
              <AppIcon name="star" :size="16" />
            </div>
            <p class="font-display text-[14px] font-bold text-stone-900">{{ cuisine.cn }}</p>
            <p class="text-stone-400 text-[9px] mt-0.5">{{ cuisine.en }}</p>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#F3ECE0] px-6 py-8 border-t border-stone-300/60">
      <div v-for="item in settings" :key="item" class="py-4 border-b border-stone-200 last:border-0 flex items-center justify-between">
        <p class="text-stone-700 text-sm">{{ item }}</p>
        <AppIcon name="arrowRight" :size="14" stroke="#8B7355" />
      </div>
    </section>
  </div>
</template>
