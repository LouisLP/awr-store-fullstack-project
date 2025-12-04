import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  // Getters
  const cartCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const cartTotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addToCart(product: Product, quantity = 1) {
    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    }
    else {
      items.value.push({ product, quantity })
    }
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    // State
    items,
    isOpen,
    // Getters
    cartCount,
    cartTotal,
    isEmpty,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
