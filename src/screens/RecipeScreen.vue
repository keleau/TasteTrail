<script setup>
import { computed, ref } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import Eyebrow from '../components/Eyebrow.vue'
import Reveal from '../components/Reveal.vue'
import FallbackImage from '../components/FallbackImage.vue'
import MealStats from '../components/MealStats.vue'
import { matchShopItem, findDishShopItem } from '../lib/matchShopItem'

const props = defineProps({
  meal: { type: Object, required: true },
  country: { type: Object, required: true },
  cartItemIds: { type: Set, required: true },
})
const emit = defineEmits(['back', 'add-to-cart', 'remove-from-cart', 'open-shop-item', 'toggle-cart'])

const showModal = ref(false)
const flyAnimId = ref(null)

const dishShopItem = computed(() => findDishShopItem(props.meal))
const isInCart = (id) => props.cartItemIds.has(id)

const ingredientInfos = computed(() => props.meal.recipe.ingredients.map((ingredient) => {
  const match = matchShopItem(ingredient)
  return {
    ingredient,
    match,
    inCart: match ? isInCart(match.id) : false,
    isPurchasable: Boolean(match && !match.isNotPurchasable),
  }
}))

const addedCount = computed(() => ingredientInfos.value.filter((info) => info.isPurchasable && info.inCart).length)

const handleToggleItem = (item) => {
  if (isInCart(item.id)) {
    emit('remove-from-cart', item.id)
    return
  }
  emit('add-to-cart', item)
  flyAnimId.value = item.id
  window.setTimeout(() => { flyAnimId.value = null }, 700)
}

const handleBuyAll = () => {
  if (addedCount.value > 0) {
    emit('toggle-cart')
    return
  }
  const available = ingredientInfos.value.filter((info) => info.isPurchasable)
  if (!available.length) {
    showModal.value = true
    return
  }
  available.forEach((info) => {
    if (!info.inCart) handleToggleItem(info.match)
  })
  window.setTimeout(() => emit('toggle-cart'), 800)
}

const confirmBuyWhole = () => {
  showModal.value = false
  if (dishShopItem.value) {
    handleToggleItem(dishShopItem.value)
    return
  }
  ingredientInfos.value.forEach((info) => {
    if (info.isPurchasable && !info.inCart) handleToggleItem(info.match)
  })
}
</script>

<template>
  <div class="h-full bg-[#F3ECE0] relative">
    <div class="h-full overflow-y-auto pb-28">
      <div class="sticky top-0 z-50 h-0">
        <div class="absolute top-0 left-0 right-0 pt-11 px-5 flex items-center justify-between text-white">
          <button class="flex items-center gap-1.5 text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] tracking-[0.2em] hover:bg-black/50 active:scale-95 transition-all" @click="emit('back')">
            <AppIcon name="arrowRight" :size="12" style="transform: rotate(180deg)" /> 返回
          </button>
          <button class="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 active:scale-95 transition-all" aria-label="收藏">
            <AppIcon name="bookmark" :size="16" stroke="#fff" />
          </button>
        </div>
      </div>

      <section class="relative h-[380px]">
        <FallbackImage :src="meal.img" :alt="meal.cn" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/90" />
        <div class="absolute bottom-0 left-0 right-0 p-5 pb-14 text-white">
          <Reveal>
            <div class="flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-[#E8650A] mb-1.5">
              <AppIcon name="pin" :size="11" /> {{ country.cn }} · {{ country.name }}
            </div>
            <h1 class="font-display text-[44px] font-black leading-[0.92] tracking-tight">{{ meal.cn }}</h1>
            <p class="font-display italic text-white/75 text-[16px] mt-0.5">{{ meal.en }}</p>
          </Reveal>
        </div>
      </section>

      <section class="px-5 -mt-8 relative z-10">
        <div class="bg-white rounded-2xl shadow-[0_10px_30px_-12px_rgba(26,18,8,0.15)] border border-stone-200/70 px-5 py-4">
          <MealStats :meal="meal" show-macros />
        </div>
      </section>

      <section class="px-5 pt-7">
        <Reveal>
          <Eyebrow num="01">这道菜</Eyebrow>
          <p class="font-display italic text-stone-800 text-[18px] leading-[1.6] mt-3">{{ meal.story }}</p>
          <a href="#method" class="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.2em] uppercase text-[#E8650A] hover:text-[#C44F00] active:scale-95 transition-all">
            开始烹饪
            <AppIcon name="arrowRight" :size="10" />
          </a>
        </Reveal>
      </section>

      <section class="px-5 pt-7">
        <Reveal>
          <div class="flex items-baseline justify-between">
            <Eyebrow num="02">食材</Eyebrow>
            <p class="font-display text-stone-500 text-[11px] tracking-[0.15em]">2 人份</p>
          </div>
        </Reveal>
        <ul class="mt-3 divide-y divide-stone-300/80 border-y border-stone-300/80">
          <Reveal v-for="(info, index) in ingredientInfos" :key="index" :delay="index * 50">
            <li class="flex items-center gap-3 py-3 group">
              <button
                type="button"
                :disabled="!info.isPurchasable"
                class="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
                :class="!info.isPurchasable
                  ? 'border-stone-300 text-stone-300 cursor-not-allowed'
                  : info.inCart
                    ? 'bg-[#1A1208] border-[#1A1208] text-white scale-110 hover:bg-[#2A1F0F]'
                    : 'border-[#E8650A] text-[#E8650A] hover:bg-[#E8650A] hover:text-white active:scale-90'"
                :aria-label="info.inCart ? `移出购物车：${info.match?.cn}` : `加入购物车：${info.match?.cn || info.ingredient.t}`"
                @click="info.isPurchasable && handleToggleItem(info.match)"
              >
                <AppIcon :name="info.inCart ? 'x' : 'plus'" :size="info.inCart ? 12 : 14" />
              </button>
              <span class="font-display text-[12px] font-bold text-stone-400 w-14 shrink-0">{{ info.ingredient.n }}</span>
              <div class="flex-1 min-w-0">
                <button v-if="info.isPurchasable" type="button" class="text-stone-800 text-[14px] font-bold text-left hover:text-[#E8650A] transition-colors truncate block w-full" @click="emit('open-shop-item', info.match)">
                  {{ info.match.cn }}
                </button>
                <span v-else class="text-[14px] truncate block" :class="info.match?.isNotPurchasable ? 'text-stone-400' : 'text-stone-600'">
                  {{ info.ingredient.t }}
                  <span v-if="info.match?.isNotPurchasable" class="ml-2 text-[10px] text-stone-400">不可购买</span>
                </span>
              </div>
            </li>
          </Reveal>
        </ul>
      </section>

      <section id="method" class="px-5 pt-7">
        <Reveal>
          <div class="flex items-end justify-between gap-3">
            <div>
              <Eyebrow num="03">做法</Eyebrow>
              <h3 class="font-display text-[26px] font-black leading-none text-stone-900 mt-3">这样做</h3>
            </div>
            <button v-if="dishShopItem" type="button" class="shrink-0 flex items-center gap-1 text-[12px] font-bold tracking-wide text-[#E8650A] hover:text-[#C44F00] active:scale-95 transition-all whitespace-nowrap" @click="emit('open-shop-item', dishShopItem)">
              不想做，直接买
              <AppIcon name="arrowRight" :size="14" />
            </button>
          </div>
        </Reveal>
        <ol class="mt-5 space-y-4">
          <Reveal v-for="(step, index) in meal.recipe.steps" :key="index" :delay="index * 80">
            <li class="flex gap-3.5">
              <span class="font-display text-[22px] font-bold text-[#E8650A]/80 leading-none shrink-0 w-5 text-right tabular-nums">{{ step.n }}</span>
              <div class="flex-1 border-l-2 border-stone-300/70 pl-4">
                <h4 class="font-display text-[16px] font-bold text-stone-900 leading-snug">{{ step.t }}</h4>
                <p class="text-stone-600 text-[13px] mt-1 leading-relaxed">{{ step.d }}</p>
              </div>
            </li>
          </Reveal>
        </ol>
      </section>

      <section class="px-5 pt-7 space-y-4">
        <div class="bg-[#EBE3D3] rounded-2xl p-5">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
              <AppIcon name="chef" :size="15" stroke="#E8650A" />
            </div>
            <div class="flex-1">
              <p class="font-display italic text-[#1A1208] text-[14px] leading-[1.6]">
                尝一口，调一下，再尝一口。菜谱只是一张地图，你的炉火和舌头才是指南针。
              </p>
              <p class="text-stone-500 text-[10px] mt-2 tracking-[0.15em] uppercase">主厨提示</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="absolute bottom-0 left-0 right-0 z-30 px-4 pb-5 pt-3 bg-gradient-to-t from-[#F3ECE0] via-[#F3ECE0]/95 to-transparent">
      <button class="w-full py-3.5 rounded-2xl text-[12px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-lg bg-[#1A1208] text-[#E8650A] hover:bg-[#2A1F08] shadow-stone-900/20 active:scale-[0.98]" @click="handleBuyAll">
        {{ addedCount > 0 ? `查看购物车（${addedCount}）→` : '一键购买食材 →' }}
      </button>
    </div>

    <div v-if="showModal">
      <div class="absolute inset-0 z-50 bg-black/45 backdrop-blur-sm animate-fade-in" @click="showModal = false" />
      <div class="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 shadow-2xl animate-pop-in w-[340px]">
        <div class="flex items-start justify-between mb-4">
          <div>
            <p class="text-[9px] tracking-[0.25em] uppercase text-stone-400 mb-1">Confirm</p>
            <h3 class="font-display text-[22px] font-black text-stone-900 leading-tight">购买整份套餐？</h3>
          </div>
          <button class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition-colors" aria-label="关闭" @click="showModal = false">
            <AppIcon name="x" :size="14" />
          </button>
        </div>
        <p class="text-stone-600 text-[13px] leading-relaxed mb-5">
          这道菜暂时没有可单独购买的食材。要不要直接买一份 <span class="font-bold text-[#E8650A]">{{ meal.cn }}</span>？
        </p>
        <div class="flex gap-2.5">
          <button class="flex-1 py-3 rounded-2xl bg-stone-100 text-stone-700 text-[12px] tracking-[0.15em] font-bold hover:bg-stone-200 active:scale-[0.98] transition-all" @click="showModal = false">再想想</button>
          <button class="flex-1 py-3 rounded-2xl bg-[#E8650A] text-white text-[12px] tracking-[0.15em] font-bold hover:bg-[#D45A09] active:scale-[0.98] transition-all shadow-md shadow-[#E8650A]/30" @click="confirmBuyWhole">
            确认 · ¥{{ dishShopItem?.price ?? meal.price }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
