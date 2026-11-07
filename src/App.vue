<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import StatusBar from './components/StatusBar.vue'
import BottomNav from './components/BottomNav.vue'
import FloatingCartButton from './components/FloatingCartButton.vue'
import CartDrawer from './components/CartDrawer.vue'
import CheckoutModal from './components/CheckoutModal.vue'
import SplashScreen from './screens/SplashScreen.vue'
import ExploreScreen from './screens/ExploreScreen.vue'
import TodayScreen from './screens/TodayScreen.vue'
import CookScreen from './screens/CookScreen.vue'
import RecipeScreen from './screens/RecipeScreen.vue'
import MeScreen from './screens/MeScreen.vue'
import SearchScreen from './screens/SearchScreen.vue'
import ShopScreen from './screens/ShopScreen.vue'
import ShopItemDetailScreen from './screens/ShopItemDetailScreen.vue'
import { COUNTRIES, getDailyHeroData } from './data'

const CART_STORAGE_KEY = 'tasteTrailCart'

const todayHero = getDailyHeroData()
const todayCountry = todayHero.country

const screen = ref('splash')
const country = ref(todayCountry)
const prevScreen = ref('explore')
const shopCountry = ref('all')
const shopItemCtx = ref(null)
const shopItemHistory = ref([])
const justAddedId = ref(null)
const cart = ref([])
const cartOpen = ref(false)
const checkoutOpen = ref(false)
const cartBounce = ref(false)
const recipeCtx = ref((() => {
  const data = COUNTRIES[todayCountry]
  return { meal: data[todayHero.chefMealKey], country: data }
})())

const currentCountryData = computed(() => COUNTRIES[todayCountry])
const cartTotal = computed(() => cart.value.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0))
const cartCount = computed(() => cart.value.reduce((sum, entry) => sum + entry.quantity, 0))
const cartItemIds = computed(() => new Set(cart.value.map((entry) => entry.item.id)))
const appVisible = computed(() => screen.value !== 'splash')
const showCartButton = computed(() => appVisible.value && cartCount.value > 0)
const navVisible = computed(() => appVisible.value && !['recipe', 'search', 'shop-item', 'shop'].includes(screen.value))

onMounted(() => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) cart.value = parsed
  } catch { /* noop */ }
})

watch(cart, (value) => {
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value)) } catch { /* noop */ }
}, { deep: true })

const addToCart = (item) => {
  const existing = cart.value.find((entry) => entry.item.id === item.id)
  if (existing) {
    cart.value = cart.value.map((entry) => (
      entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
    ))
  } else {
    cart.value = [...cart.value, { item, quantity: 1 }]
  }
  justAddedId.value = item.id
  cartBounce.value = true
  window.setTimeout(() => { justAddedId.value = null }, 1500)
  window.setTimeout(() => { cartBounce.value = false }, 400)
}

const updateCartQuantity = (itemId, delta) => {
  cart.value = cart.value
    .map((entry) => (entry.item.id === itemId ? { ...entry, quantity: Math.max(0, entry.quantity + delta) } : entry))
    .filter((entry) => entry.quantity > 0)
}

const removeFromCart = (itemId) => {
  cart.value = cart.value.filter((entry) => entry.item.id !== itemId)
}

const goTo = (nextScreen) => {
  if (nextScreen === 'recipe' || nextScreen === 'shop-item') {
    prevScreen.value = screen.value
  }
  if (nextScreen === 'today' && screen.value !== 'today') {
    country.value = todayCountry
  }
  screen.value = nextScreen
}

const openItemDetail = (item) => {
  shopItemHistory.value = []
  shopItemCtx.value = item
  goTo('shop-item')
}

const navigateItemDetail = (item) => {
  if (shopItemCtx.value) shopItemHistory.value = [...shopItemHistory.value, shopItemCtx.value]
  shopItemCtx.value = item
}

const goBackFromShopItem = () => {
  if (shopItemHistory.value.length) {
    const previous = shopItemHistory.value[shopItemHistory.value.length - 1]
    shopItemHistory.value = shopItemHistory.value.slice(0, -1)
    shopItemCtx.value = previous
    return
  }
  screen.value = prevScreen.value || 'shop'
}

const openRecipe = (meal, countryData) => {
  recipeCtx.value = { meal, country: countryData }
  goTo('recipe')
}

const openMealByKey = (mealKey, countryData) => {
  openRecipe(countryData[mealKey], countryData)
}

const openRecipeFromToday = (meal) => {
  openRecipe(meal, COUNTRIES[country.value])
}

const goBackFromRecipe = () => {
  screen.value = prevScreen.value || 'explore'
}

const openShopFromExplore = (countryId) => {
  shopCountry.value = countryId
  goTo('shop')
}

const handleCheckout = () => {
  cartOpen.value = false
  checkoutOpen.value = true
}

const handlePayment = () => {
  cart.value = []
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-stone-300">
    <div class="app-container relative overflow-hidden bg-[#F3ECE0] shadow-[0_40px_80px_-20px_rgba(26,18,8,0.45)]" style="width: 390px; height: 844px; border-radius: 44px">
      <StatusBar v-if="appVisible" />

      <div class="absolute inset-0">
        <div v-if="screen === 'splash'" class="relative w-full h-full">
          <SplashScreen @enter="goTo('explore')" />
        </div>

        <div class="screen-wrap" :class="screen === 'explore' ? 'screen-visible' : 'screen-hidden'">
          <div :class="appVisible ? 'h-full pt-11' : 'h-full'">
            <ExploreScreen
              :hero="todayHero"
              :country-data="currentCountryData"
              :chef-meal-key="todayHero.chefMealKey"
              @recipe="openMealByKey($event, currentCountryData)"
              @start="goTo('today')"
              @search="goTo('search')"
              @shop="goTo('shop')"
              @shop-country="openShopFromExplore"
            />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'today' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-0">
            <TodayScreen
              :country="country"
              :today-country="todayCountry"
              :featured-meal-key="todayHero.featuredMealKey"
              :active="screen === 'today'"
              @update:country="country = $event"
              @recipe="openRecipeFromToday"
              @back="goTo('explore')"
            />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'cook' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-0">
            <CookScreen :today-country="todayCountry" @recipe="openRecipe" />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'recipe' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-0">
            <RecipeScreen
              :meal="recipeCtx.meal"
              :country="recipeCtx.country"
              :cart-item-ids="cartItemIds"
              @back="goBackFromRecipe"
              @add-to-cart="addToCart"
              @remove-from-cart="removeFromCart"
              @open-shop-item="openItemDetail"
              @toggle-cart="cartOpen = true"
            />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'me' ? 'screen-visible' : 'screen-hidden'">
          <div :class="appVisible ? 'h-full pt-11' : 'h-full'">
            <MeScreen />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'search' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-11">
            <SearchScreen @back="goTo('explore')" @recipe="openRecipe" />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'shop' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-0">
            <ShopScreen
              :initial-country="shopCountry"
              :just-added-id="justAddedId"
              @back="goTo('explore')"
              @item-detail="openItemDetail"
              @add-to-cart="addToCart"
            />
          </div>
        </div>

        <div class="screen-wrap" :class="screen === 'shop-item' ? 'screen-visible' : 'screen-hidden'">
          <div class="h-full pt-0">
            <ShopItemDetailScreen
              v-if="shopItemCtx"
              :item="shopItemCtx"
              :cart-item-ids="cartItemIds"
              @back="goBackFromShopItem"
              @navigate="navigateItemDetail"
              @add-to-cart="addToCart"
              @remove-from-cart="removeFromCart"
              @back-to-shop="screen = 'shop'"
            />
          </div>
        </div>
      </div>

      <BottomNav v-if="navVisible" :active="screen" @nav="goTo" />

      <FloatingCartButton
        v-if="showCartButton"
        :count="cartCount"
        :open="cartOpen"
        :bounce="cartBounce"
        @toggle="cartOpen = !cartOpen"
      />

      <CartDrawer
        v-if="cartOpen"
        :cart="cart"
        :count="cartCount"
        :total="cartTotal"
        @close="cartOpen = false"
        @update="updateCartQuantity"
        @remove="removeFromCart"
        @checkout="handleCheckout"
        @open-item="openItemDetail"
      />

      <CheckoutModal
        v-if="checkoutOpen"
        :cart="cart"
        :total="cartTotal"
        @close="checkoutOpen = false"
        @pay="handlePayment"
      />
    </div>
  </div>
</template>
