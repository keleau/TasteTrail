<script setup>
import { computed } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import Eyebrow from '../components/Eyebrow.vue'
import Reveal from '../components/Reveal.vue'
import FallbackImage from '../components/FallbackImage.vue'
import Stamp from '../components/Stamp.vue'
import { IMGS, COUNTRIES, COUNTRY_KEYS } from '../data'

const props = defineProps({
  todayCountry: { type: String, required: true },
})
const emit = defineEmits(['recipe'])

const todayIdx = COUNTRY_KEYS.indexOf(props.todayCountry)
const nextCountry = COUNTRY_KEYS[(todayIdx + 1) % COUNTRY_KEYS.length]
const thirdCountry = COUNTRY_KEYS[(todayIdx + 2) % COUNTRY_KEYS.length]
const nextData = COUNTRIES[nextCountry]
const seasonal = COUNTRIES[thirdCountry]
const featuredMeal = computed(() => nextData.lunch)
const dinnerMeal = computed(() => nextData.dinner)
const seasonalMeal = computed(() => seasonal.dinner)

const tips = [
  { n: '01', t: '先放盐', d: '边做边调味，别等到最后。' },
  { n: '02', t: '把锅烧热', d: '一口热锅，就是第一样食材。' },
  { n: '03', t: '多尝几次', d: '舌头永远是最好的工具。' },
]
</script>

<template>
  <div class="h-full overflow-y-auto pb-24 bg-[#EBE3D3]">
    <section class="relative h-[340px] overflow-hidden">
      <FallbackImage :src="IMGS.cookingHero" alt="烹饪" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-[#1A1208]/95" />
      <div class="absolute top-12 left-6 right-6 flex items-start justify-between text-white">
        <div>
          <p class="text-[10px] tracking-[0.35em] uppercase text-[#E8650A] font-semibold">第 03 期 · 食谱</p>
          <p class="font-display italic text-[13px] text-white/70 mt-1">溯源 · 调味 · 上桌</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] tracking-[0.3em] uppercase text-white/60">第三卷</p>
          <p class="text-[10px] tracking-[0.25em] uppercase text-white/60 mt-0.5">2026 夏</p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <Reveal>
          <div class="flex items-end justify-between gap-4">
            <div>
              <h1 class="font-display text-[72px] font-black leading-[0.9] tracking-tight">厨房</h1>
              <h2 class="font-display italic text-[17px] text-white/75 leading-tight mt-1">口袋里的移动厨房。</h2>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section class="bg-[#F3ECE0] py-12 px-8 flex flex-col items-center text-center">
      <Reveal>
        <div class="flex items-center gap-4 text-[#8B7355]">
          <span class="h-px w-10 bg-[#8B7355]/50" />
          <AppIcon name="leaf" :size="20" stroke="#8B7355" />
          <span class="h-px w-10 bg-[#8B7355]/50" />
        </div>
        <p class="font-display italic text-[20px] text-stone-700 leading-[1.7] mt-5 max-w-[320px]">
          精选食材，来自认真做食物的人。<br />
          每一份食材包，都讲得清自己的来处。
        </p>
        <p class="font-hand text-[22px] text-stone-500 mt-4">— 厨房手记</p>
      </Reveal>
    </section>

    <section class="px-6 py-8 bg-[#EBE3D3]">
      <Reveal>
        <Eyebrow num="01">本周精选</Eyebrow>
        <div class="mt-3 flex items-end justify-between">
          <h3 class="font-display text-[34px] font-black text-stone-900 leading-[0.95]">今日食材包</h3>
          <span class="font-hand text-[22px] text-stone-500">N°1 →</span>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#F3ECE0] py-8">
      <Reveal>
        <div class="mx-6 bg-white rounded-[28px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer active:scale-[0.99] group" @click="emit('recipe', featuredMeal, nextData)">
          <div class="flex" style="height: 240px">
            <div class="relative overflow-hidden flex-shrink-0" style="width: 55%">
              <FallbackImage :src="featuredMeal.img" :alt="featuredMeal.cn" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-3 left-3 bg-[#E8650A] text-white text-[9px] tracking-[0.2em] px-2.5 py-1 rounded">新 · 今日</div>
            </div>
            <div class="flex-1 px-5 py-5 flex flex-col justify-between">
              <div>
                <p class="text-[#E8650A] text-[10px] tracking-widest uppercase mb-2">{{ nextData.cn }} · {{ nextData.name }}</p>
                <h4 class="font-display text-[22px] font-bold text-stone-900 leading-tight">{{ featuredMeal.cn }}食材包</h4>
                <p class="text-stone-500 text-[12px] mt-1">{{ featuredMeal.en }}</p>
              </div>
              <div class="space-y-1.5 text-[12px]">
                <div class="flex justify-between border-t border-stone-200 pt-2"><span class="text-stone-500">时间</span><span class="text-stone-900 font-medium">{{ featuredMeal.time }}</span></div>
                <div class="flex justify-between"><span class="text-stone-500">难度</span><span class="text-stone-900 font-medium">{{ featuredMeal.difficulty }}</span></div>
                <div class="flex justify-between"><span class="text-stone-500">份量</span><span class="text-stone-900 font-medium">2 人份</span></div>
                <div class="flex justify-between"><span class="text-stone-500">价格</span><span class="text-[#E8650A] font-bold">¥ {{ featuredMeal.price }}</span></div>
              </div>
            </div>
          </div>
          <div class="px-5 py-4 border-t border-stone-200 flex items-center justify-between bg-stone-50">
            <p class="text-stone-600 text-[11px] flex items-center gap-2">
              <AppIcon name="check" :size="14" stroke="#4A6741" />
              含：{{ featuredMeal.recipe.ingredients.slice(0, 3).map((item) => item.t).join('、') }}
            </p>
            <span class="bg-[#1A1208]/10 border border-[#1A1208]/30 text-[#1A1208] text-[10px] tracking-[0.2em] px-4 py-2.5 rounded-full transition-colors">查看 →</span>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#D9C7A8] py-12 px-6">
      <Reveal>
        <Eyebrow num="02">食材故事</Eyebrow>
        <h3 class="font-display text-[32px] font-black text-stone-900 leading-[0.95] mt-3">盒子里<br />都有什么？</h3>
        <p class="font-hand text-stone-700 text-[20px] mt-2">今日开箱 —</p>
      </Reveal>

      <Reveal :delay="120">
        <div class="mt-6 relative h-[320px]">
          <div class="absolute top-0 left-0 w-[55%] h-[55%] bg-white p-3 rounded-sm shadow-md hover:rotate-0 transition-transform duration-500" style="transform: rotate(-2deg)">
            <FallbackImage :src="IMGS.tomatoes" alt="番茄" class="w-full h-full object-cover" />
            <p class="font-hand text-center text-stone-800 text-[16px] mt-1">圣马扎诺番茄，DOP</p>
          </div>
          <div class="absolute top-8 right-0 w-[50%] h-[48%] bg-white p-3 rounded-sm shadow-md hover:rotate-0 transition-transform duration-500" style="transform: rotate(2deg)">
            <FallbackImage :src="IMGS.spices" alt="香料" class="w-full h-full object-cover" />
            <p class="font-hand text-center text-stone-800 text-[16px] mt-1">西西里香料拼配</p>
          </div>
          <div class="absolute bottom-0 left-[10%] w-[52%] h-[48%] bg-white p-3 rounded-sm shadow-md hover:rotate-0 transition-transform duration-500" style="transform: rotate(-1deg)">
            <FallbackImage :src="IMGS.market" alt="市集" class="w-full h-full object-cover" />
            <p class="font-hand text-center text-stone-800 text-[16px] mt-1">今早的市集</p>
          </div>
          <div class="absolute bottom-2 right-4 w-[38%] h-[45%] bg-white p-3 rounded-sm shadow-md hover:rotate-0 transition-transform duration-500" style="transform: rotate(3deg)">
            <FallbackImage :src="IMGS.vegetables" alt="蔬菜" class="w-full h-full object-cover" />
            <p class="font-hand text-center text-stone-800 text-[16px] mt-1">传家宝蔬菜</p>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="relative h-[440px] cursor-pointer active:scale-[0.99] group" @click="emit('recipe', dinnerMeal, nextData)">
      <FallbackImage :src="dinnerMeal.img" :alt="dinnerMeal.cn" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1A1208] via-[#1A1208]/70 to-transparent" />
      <div class="absolute top-4 right-5"><Stamp :country="nextData.flag" year="EST. 2026" :rotate="-8" active /></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <Reveal>
          <div class="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#E8650A] mb-2">
            <AppIcon name="chef" :size="14" /> 主厨精选 · Chef's Choice
          </div>
          <h3 class="font-display text-[48px] font-black leading-[0.92] tracking-tight">{{ dinnerMeal.cn }}</h3>
          <p class="font-display italic text-white/80 text-[17px] mt-1">{{ dinnerMeal.en }}</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex gap-2">
              <span class="bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] tracking-widest px-3 py-1.5 rounded-full">{{ dinnerMeal.time }}</span>
              <span class="bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] tracking-widest px-3 py-1.5 rounded-full">{{ dinnerMeal.difficulty }}</span>
            </div>
            <p class="font-display text-[28px] font-bold text-[#E8650A]">¥ {{ dinnerMeal.price }}</p>
          </div>
          <div class="mt-5 bg-transparent border border-white/70 text-white text-[11px] tracking-[0.2em] px-6 py-3 rounded-full flex items-center gap-2 self-start w-fit backdrop-blur-sm">
            开始烹饪 <AppIcon name="arrowRight" :size="14" />
          </div>
        </Reveal>
      </div>
    </section>

    <section class="bg-[#B8C5B3] py-10">
      <Reveal>
        <div class="px-6">
          <Eyebrow num="03">时令推荐</Eyebrow>
          <p class="font-hand text-stone-700 text-[20px] mt-3">这个季节的味道 —</p>
        </div>
        <div class="px-6 mt-5 flex gap-4 items-center cursor-pointer active:scale-[0.99] group" @click="emit('recipe', seasonalMeal, seasonal)">
          <div class="flex-shrink-0 w-[44%] h-[180px] rounded-[24px] overflow-hidden">
            <FallbackImage :src="seasonalMeal.img" :alt="seasonalMeal.cn" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div class="flex-1">
            <p class="text-[#4A6741] text-[10px] tracking-[0.25em] uppercase">{{ seasonal.flag }} {{ seasonal.cn }} · {{ seasonal.name }}</p>
            <h4 class="font-display text-[24px] font-bold text-[#2A3D28] leading-tight mt-1">{{ seasonalMeal.cn }}</h4>
            <p class="text-[#2A3D28]/80 text-[12px] mt-1">{{ seasonalMeal.en }}</p>
            <div class="mt-3 flex items-center gap-3">
              <p class="font-display text-[20px] font-bold text-[#4A6741]">¥ {{ seasonalMeal.price }}</p>
              <span class="bg-[#2A3D28] text-white text-[9px] tracking-[0.2em] px-3 py-2 rounded-full transition-colors">去看看</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>

    <section class="bg-[#F3ECE0] py-10 px-6">
      <Reveal>
        <Eyebrow num="04">厨房小贴士</Eyebrow>
        <h3 class="font-display text-[28px] font-black text-stone-900 leading-[0.95] mt-3">来自厨房</h3>
      </Reveal>
      <div class="mt-6 space-y-5">
        <Reveal v-for="(tip, index) in tips" :key="tip.n" :delay="index * 100">
          <div class="flex items-start gap-4">
            <p class="font-display text-[32px] font-black text-[#E8650A]/50 leading-none">{{ tip.n }}</p>
            <div class="flex-1 border-b border-stone-300 pb-4">
              <p class="font-display text-[18px] font-bold text-stone-900">{{ tip.t }}</p>
              <p class="text-stone-500 text-sm mt-1">{{ tip.d }}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
</template>
