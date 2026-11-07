<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import FallbackImage from './FallbackImage.vue'
import ProductArtwork from './ProductArtwork.vue'
import { SHOP_COUNTRIES } from '../data'

const props = defineProps({
  item: { type: Object, required: true },
  justAdded: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
})

const emit = defineEmits(['open', 'add'])

const flag = computed(() => (
  props.item.country ? SHOP_COUNTRIES.find((country) => country.id === props.item.country)?.flag : ''
))
</script>

<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_-4px_rgba(26,18,8,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(26,18,8,0.15)] transition-all duration-500 group border border-stone-100/80 hover:border-stone-200/80 cursor-pointer active:scale-[0.985]"
    :style="{ animation: 'fadeUp 0.6s cubic-bezier(.2,.7,.2,1) both', animationDelay: `${index * 35}ms` }"
    :data-product-id="item.id"
    @click="emit('open', item)"
  >
    <div class="relative aspect-[5/4] overflow-hidden bg-stone-50">
      <FallbackImage
        v-if="item.img"
        :src="item.img"
        :alt="item.cn"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <ProductArtwork
        v-else
        :item="item"
        class="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span v-if="flag" class="absolute top-2.5 left-2.5 w-6 h-6 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-[11px] shadow-sm">
        {{ flag }}
      </span>
      <span v-if="item.tags && item.tags.length" class="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E8650A] text-white text-[8px] tracking-[0.15em] font-bold rounded-full shadow-sm">
        {{ item.tags[0] }}
      </span>
    </div>
    <div class="p-3.5">
      <h4 class="font-display text-[14px] font-bold text-stone-900 leading-tight line-clamp-1 group-hover:text-[#C9550A] transition-colors">{{ item.cn }}</h4>
      <p class="text-stone-400 text-[10px] mt-1 line-clamp-1">{{ item.name }}</p>
      <p v-if="item.sourceMeal" class="text-stone-400/60 text-[9px] mt-1 italic line-clamp-1">来自 {{ item.sourceMeal }}</p>
      <div class="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-100">
        <div class="flex items-baseline gap-0.5">
          <span class="font-display text-[16px] font-black text-[#E8650A]">¥{{ item.price }}</span>
          <span class="text-stone-400 text-[9px]">/{{ item.unit }}</span>
        </div>
        <button
          class="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90"
          :class="justAdded ? 'bg-[#E8650A] text-white scale-110 shadow-md shadow-[#E8650A]/25' : 'bg-[#1A1208] text-[#E8650A] hover:bg-[#2A2218] hover:scale-105'"
          :aria-label="`把${item.cn}加入购物车`"
          @click.stop="emit('add', item)"
        >
          <AppIcon name="plus" :size="12" />
        </button>
      </div>
    </div>
  </div>
</template>
