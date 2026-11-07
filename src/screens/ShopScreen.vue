<script setup>
import { computed, ref, watch } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import ProductCard from '../components/ProductCard.vue'
import { SHOP_ITEMS, SHOP_COUNTRIES } from '../data'

const props = defineProps({
  initialCountry: { type: String, default: 'all' },
  justAddedId: { type: String, default: null },
})
const emit = defineEmits(['back', 'item-detail', 'add-to-cart'])

const selectedCountry = ref(props.initialCountry)
const searchQuery = ref('')

watch(() => props.initialCountry, (value) => { selectedCountry.value = value })

const filteredItems = computed(() => {
  let items = SHOP_ITEMS
  if (selectedCountry.value !== 'all') {
    items = items.filter((item) => item.country === selectedCountry.value)
  }
  const keyword = searchQuery.value.trim().toLowerCase()
  if (keyword) {
    items = items.filter((item) => (
      item.name.toLowerCase().includes(keyword)
      || item.cn.includes(keyword)
      || item.description.toLowerCase().includes(keyword)
    ))
  }
  return items
})

const currentCountryData = computed(() => SHOP_COUNTRIES.find((country) => country.id === selectedCountry.value))
</script>

<template>
  <div class="h-full overflow-y-auto bg-[#F3ECE0] relative pb-24">
    <div class="sticky top-0 z-30 bg-[#F3ECE0]/85 backdrop-blur-xl">
      <div class="px-5 pt-11 pb-3 border-b border-stone-200/40">
        <div class="flex items-center justify-between mb-4">
          <button class="flex items-center gap-1.5 text-stone-700 bg-white/70 backdrop-blur px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] hover:bg-white active:scale-95 transition-all duration-200 border border-stone-200/50" @click="emit('back')">
            <AppIcon name="arrowRight" :size="12" style="transform: rotate(180deg)" />
            返回
          </button>
          <div class="text-center">
            <p class="text-[9px] tracking-[0.3em] uppercase text-stone-400">第四章 · 市集</p>
            <h1 class="font-display text-[22px] font-black text-stone-900 tracking-tight leading-none">市集</h1>
          </div>
          <div class="w-14" />
        </div>

        <div class="relative">
          <AppIcon name="search" :size="14" class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索食材、调味料…"
            class="w-full pl-10 pr-10 py-2.5 bg-white/80 border border-stone-200/60 rounded-full text-[13px] focus:outline-none focus:border-[#E8650A]/40 focus:bg-white transition-all duration-200 placeholder:text-stone-400 font-body"
          />
          <button v-if="searchQuery" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-300 active:scale-90 transition-colors" aria-label="清除搜索" @click="searchQuery = ''">
            <AppIcon name="x" :size="10" class="text-stone-500" />
          </button>
        </div>
      </div>
    </div>

    <div class="px-5 pt-5 pb-3">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[9px] tracking-[0.25em] uppercase text-stone-400">选择地区 · Regions</span>
        <button v-if="currentCountryData && currentCountryData.id !== 'all'" class="text-[10px] text-[#E8650A] hover:underline transition-colors font-medium" @click="selectedCountry = 'all'">清除</button>
      </div>
      <div class="relative -mx-1 px-1 overflow-x-auto scrollbar-hide pb-1">
        <div class="flex gap-2 min-w-max">
          <button
            v-for="(country, index) in SHOP_COUNTRIES"
            :key="country.id"
            class="relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300"
            :class="selectedCountry === country.id
              ? 'bg-[#1A1208] text-[#E8650A] shadow-md shadow-stone-900/10'
              : 'bg-white/60 text-stone-500 hover:bg-white hover:text-stone-700 border border-stone-200/40'"
            :style="{ animationDelay: `${index * 40}ms`, animation: 'fadeUp 0.5s cubic-bezier(.2,.7,.2,1) both' }"
            @click="selectedCountry = country.id"
          >
            <span v-if="country.flag" class="text-sm leading-none">{{ country.flag }}</span>
            <span class="text-[12px] font-medium whitespace-nowrap" :class="selectedCountry === country.id ? 'tracking-wide' : ''">{{ country.cn }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="px-5 pt-4 pb-4">
      <div class="flex items-baseline justify-between">
        <div class="flex items-baseline gap-2.5">
          <h2 class="font-display text-[26px] font-black text-stone-900 leading-none tracking-tight">
            {{ selectedCountry === 'all' ? '全部商品' : `${currentCountryData?.cn}精选` }}
          </h2>
          <span class="text-[12px] text-stone-400 font-medium">{{ filteredItems.length }} 件</span>
        </div>
      </div>
      <div class="mt-3 w-10 h-[2px] bg-gradient-to-r from-[#E8650A] to-[#E8650A]/20 rounded-full" />
    </div>

    <div class="px-5 pb-48">
      <div v-if="filteredItems.length" class="grid grid-cols-2 gap-4">
        <ProductCard
          v-for="(item, index) in filteredItems"
          :key="item.id"
          :item="item"
          :index="index"
          :just-added="justAddedId === item.id"
          @open="emit('item-detail', $event)"
          @add="emit('add-to-cart', $event)"
        />
      </div>
      <div v-else class="text-center py-24 text-stone-400">
        <div class="w-20 h-20 mx-auto mb-5 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
          <AppIcon name="search" :size="32" class="text-stone-300" />
        </div>
        <p class="font-display text-2xl italic text-stone-500">暂无商品</p>
        <p class="text-sm mt-3 text-stone-400">试试其他地区或关键词</p>
      </div>
    </div>
  </div>
</template>
