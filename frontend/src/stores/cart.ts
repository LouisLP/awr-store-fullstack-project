import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const cartCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const cartTotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  const isEmpty = computed(() => items.value.length === 0)

  const getQuantityInCart = (productId: number): number => {
    const item = items.value.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  const canAddToCart = (product: Product, additionalQuantity = 1): boolean => {
    const currentQuantityInCart = getQuantityInCart(product.id)
    return (currentQuantityInCart + additionalQuantity) <= product.availableCount
  }

  function addToCart(product: Product, quantity = 1): boolean {
    if (!canAddToCart(product, quantity)) {
      return false // Can't add more
    }

    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    }
    else {
      items.value.push({ product, quantity })
    }

    return true
  }

  function removeFromCart(productId: number): void {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const item = items.value.find(item => item.product.id === productId)
    if (item && quantity <= item.product.availableCount) {
      item.quantity = quantity
    }
  }

  function clearCart(): void {
    items.value = []
  }

  return {
    // State
    items,
    // Getters
    cartCount,
    cartTotal,
    isEmpty,
    // Helpers
    getQuantityInCart,
    canAddToCart,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
