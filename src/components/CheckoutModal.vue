<script setup>
import { onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  cart: { type: Array, required: true },
  total: { type: Number, required: true },
})

const emit = defineEmits(['close', 'pay'])
const paid = ref(false)
const paidTotal = ref(0)
let timer = null

const handlePay = () => {
  paidTotal.value = props.total
  paid.value = true
  emit('pay')
  timer = window.setTimeout(() => emit('close'), 1800)
}

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<template>
  <div>
    <div class="absolute inset-0 z-[97] bg-black/50 backdrop-blur-sm animate-fade-in" @click="paid ? null : emit('close')" />
    <div class="absolute left-1/2 top-1/2 z-[98] -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 shadow-2xl w-[340px] animate-pop-in">
      <div v-if="paid" class="py-6 text-center">
        <div class="w-16 h-16 mx-auto rounded-full bg-[#E8650A]/10 flex items-center justify-center mb-5">
          <AppIcon name="check" :size="30" stroke="#E8650A" />
        </div>
        <h3 class="font-display text-[24px] font-black text-stone-900 leading-tight">下单成功</h3>
        <p class="text-stone-500 text-[13px] mt-2">演示订单已提交，合计 ¥{{ paidTotal }}</p>
        <p class="text-stone-400 text-[11px] mt-1">演示环境，不会产生真实扣款。</p>
      </div>
      <template v-else>
        <div class="flex items-center justify-between mb-5">
          <div>
            <p class="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-1">Checkout</p>
            <h3 class="font-display text-[22px] font-black text-stone-900 leading-tight">确认订单</h3>
          </div>
          <button class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition-colors" aria-label="关闭结算" @click="emit('close')">
            <AppIcon name="x" :size="14" />
          </button>
        </div>

        <div class="space-y-2 mb-5 max-h-[200px] overflow-y-auto">
          <div v-for="entry in cart" :key="entry.item.id" class="flex justify-between text-sm">
            <span class="text-stone-700 truncate mr-2">{{ entry.item.cn }} × {{ entry.quantity }}</span>
            <span class="font-bold text-stone-900 shrink-0">¥{{ entry.item.price * entry.quantity }}</span>
          </div>
        </div>

        <div class="border-t border-stone-200 pt-3 mb-5">
          <div class="flex justify-between items-center">
            <span class="text-stone-600">合计</span>
            <span class="font-display text-[24px] font-black text-[#E8650A]">¥{{ total }}</span>
          </div>
        </div>

        <div class="flex gap-2.5">
          <button class="flex-1 py-3 rounded-2xl bg-stone-100 text-stone-700 text-[12px] tracking-[0.2em] font-bold hover:bg-stone-200 active:scale-[0.98] transition-all" @click="emit('close')">再想想</button>
          <button class="flex-1 py-3 rounded-2xl bg-[#E8650A] text-white text-[12px] tracking-[0.2em] font-bold hover:bg-[#D45A09] active:scale-[0.98] transition-all shadow-md shadow-[#E8650A]/30" @click="handlePay">确认支付</button>
        </div>
      </template>
    </div>
  </div>
</template>
